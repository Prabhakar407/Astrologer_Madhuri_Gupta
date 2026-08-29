import os
import uuid
import smtplib
import re
import html
import json
from datetime import datetime, timedelta, time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate, make_msgid
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv

# Google Auth & API imports
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Load environment configurations
load_dotenv()

app = FastAPI(
    title="Astrologer Madhuri Gupta - Booking Backend",
    description="FastAPI service integrated with Google Sheets, Google Calendar, and SMTP email notifications",
    version="2.0.0"
)

# CORS configuration to allow cross-origin requests during local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration File Paths
SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE", "service_account.json")
CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID", "primary")
SHEETS_CONFIG_FILE = "sheets_config.json"

# Pydantic Schemas
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    serviceType: str
    birthDate: str  # YYYY-MM-DD
    birthTime: str  # HH:MM
    birthPlace: Optional[str] = None
    bookingDate: str  # YYYY-MM-DD
    bookingTime: str  # HH:MM or E.g. "10:00 AM"
    additionalInfo: Optional[str] = None

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=2, max_length=2000)

class SlotResponse(BaseModel):
    date: str
    slots: List[str]

# -----------------------------------------------------------------------------
# Input Sanitization and Phone Validation Helpers
# -----------------------------------------------------------------------------

def sanitize_string(val: str) -> str:
    """Strip HTML tags and escape input string to secure against XSS injection."""
    if not val:
        return val
    # Strip basic HTML tags
    cleaned = re.sub(r"<[^>]*>", "", val)
    # Escape special characters
    return html.escape(cleaned.strip())

def is_spam_phone(phone: str) -> bool:
    """Validate phone digits for spam checks like consecutive repetitions or invalid sizes."""
    if not phone:
        return False
    # Strip any non-digit chars
    digits = re.sub(r"\D", "", phone)
    if not digits:
        return False
    # Check if all digits are the same (e.g. 1111111111)
    if len(set(digits)) == 1:
        return True
    # Check for consecutive repeating sequences of a single digit (8 or more)
    if re.search(r"(\d)\1{7,}", digits):
        return True
    # Suspect phone number sizes
    if len(digits) < 7 or len(digits) > 15:
        return True
    return False

# Helper: Parse 12-hour or 24-hour time to datetime.time object
def parse_time_string(time_str: str) -> time:
    try:
        # Check if 12-hour format with AM/PM (e.g. "10:00 AM")
        if "AM" in time_str or "PM" in time_str:
            dt = datetime.strptime(time_str, "%I:%M %p")
            return dt.time()
        # Fallback to 24-hour format
        dt = datetime.strptime(time_str, "%H:%M")
        return dt.time()
    except Exception:
        # Defaults to 10:00 AM on failure
        return time(10, 0)

# -----------------------------------------------------------------------------
# Google Sheets Integration
# -----------------------------------------------------------------------------

def get_google_services():
    """Retrieve initialized Sheets and Drive API clients using the service account credentials."""
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"[WARN] {SERVICE_ACCOUNT_FILE} not found. Sheets service is in MOCK Mode.")
        return None, None
    try:
        scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=scopes
        )
        sheets_service = build('sheets', 'v4', credentials=creds)
        drive_service = build('drive', 'v3', credentials=creds)
        return sheets_service, drive_service
    except Exception as e:
        print(f"[ERROR] Failed to initialize Google API clients: {e}")
        return None, None

def get_or_create_spreadsheet() -> Optional[str]:
    """Resolve spreadsheet ID from environment, config cache file, or create a new database dynamically."""
    # 1. Environment check
    sheet_id = os.getenv("GOOGLE_SHEET_ID")
    if sheet_id and sheet_id.strip() and sheet_id != "optional-existing-spreadsheet-id":
        return sheet_id.strip()

    # 2. Local config cache check
    if os.path.exists(SHEETS_CONFIG_FILE):
        try:
            with open(SHEETS_CONFIG_FILE, "r") as f:
                config = json.load(f)
                cached_id = config.get("spreadsheet_id")
                if cached_id:
                    return cached_id
        except Exception as e:
            print(f"[WARN] Could not read sheets configuration cache: {e}")

    # 3. Create a new spreadsheet
    sheets_service, drive_service = get_google_services()
    if not sheets_service or not drive_service:
        print("[WARN] Credentials missing. Google spreadsheet database generation skipped.")
        return None

    try:
        spreadsheet_body = {
            'properties': {
                'title': 'Astrologer Madhuri Gupta Customer Database'
            }
        }
        sheet = sheets_service.spreadsheets().create(body=spreadsheet_body, fields='spreadsheetId').execute()
        new_sheet_id = sheet.get('spreadsheetId')
        print(f"[INFO] Created new Google Sheet database with ID: {new_sheet_id}")

        # Share with the astrologer as Editor
        recipient = os.getenv("SMTP_RECEIVER")
        if recipient and "@" in recipient:
            try:
                user_permission = {
                    'type': 'user',
                    'role': 'editor',
                    'emailAddress': recipient
                }
                drive_service.permissions().create(
                    fileId=new_sheet_id,
                    body=user_permission,
                    fields='id'
                ).execute()
                print(f"[INFO] Shared spreadsheet with {recipient} as Editor.")
            except Exception as pe:
                print(f"[ERROR] Failed to share spreadsheet with {recipient}: {pe}")

        # Cache spreadsheet ID locally
        try:
            with open(SHEETS_CONFIG_FILE, "w") as f:
                json.dump({"spreadsheet_id": new_sheet_id}, f)
                print(f"[INFO] Saved spreadsheet ID to {SHEETS_CONFIG_FILE}")
        except Exception as ce:
            print(f"[WARN] Failed to write sheets config cache: {ce}")

        return new_sheet_id
    except Exception as e:
        print(f"[ERROR] Failed to generate spreadsheet: {e}")
        return None

def append_row_to_sheet(tab_name: str, row_data: list, headers: list):
    """Log customer data by appending it to the spreadsheet tab. Fallback to local files if credentials are missing."""
    sheets_service, _ = get_google_services()
    
    # Graceful fallback to local JSON database logging if credentials file is missing
    if not sheets_service:
        mock_file = f"mock_{tab_name.lower().replace(' ', '_')}.json"
        try:
            existing = []
            if os.path.exists(mock_file):
                with open(mock_file, "r") as f:
                    existing = json.load(f)
            record = dict(zip(headers, row_data))
            existing.append(record)
            with open(mock_file, "w") as f:
                json.dump(existing, f, indent=2)
            print(f"[INFO] Fallback: Logged record to local JSON database: {mock_file}")
        except Exception as fe:
            print(f"[ERROR] Fallback database logging failed: {fe}")
        return

    spreadsheet_id = get_or_create_spreadsheet()
    if not spreadsheet_id:
        print("[WARN] No Google Sheet ID resolved. Row logging skipped.")
        return

    try:
        # Try appending to the sheet range
        range_name = f"'{tab_name}'!A:A"
        body = {'values': [row_data]}
        sheets_service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id,
            range=range_name,
            valueInputOption='USER_ENTERED',
            insertDataOption='INSERT_ROWS',
            body=body
        ).execute()
        print(f"[INFO] Appended row to tab '{tab_name}' successfully.")
    except HttpError as error:
        # If tab does not exist (Error code 400), create it dynamically and update headers first
        if error.resp.status == 400:
            print(f"[INFO] Tab '{tab_name}' does not exist. Creating dynamically...")
            try:
                # Add sheet tab
                batch_body = {
                    'requests': [{
                        'addSheet': {
                            'properties': {'title': tab_name}
                        }
                    }]
                }
                sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=spreadsheet_id,
                    body=batch_body
                ).execute()
                
                # Write header row
                sheets_service.spreadsheets().values().update(
                    spreadsheetId=spreadsheet_id,
                    range=f"'{tab_name}'!A1",
                    valueInputOption='USER_ENTERED',
                    body={'values': [headers]}
                ).execute()
                
                # Retry appending row_data
                sheets_service.spreadsheets().values().append(
                    spreadsheetId=spreadsheet_id,
                    range=f"'{tab_name}'!A:A",
                    valueInputOption='USER_ENTERED',
                    insertDataOption='INSERT_ROWS',
                    body={'values': [row_data]}
                ).execute()
                print(f"[INFO] Dynamic tab creation & header initialization for '{tab_name}' completed.")
            except Exception as e2:
                print(f"[ERROR] Dynamic sheet creation or appending failed: {e2}")
        else:
            print(f"[ERROR] Sheets appending failed with HTTP error: {error}")
    except Exception as e:
        print(f"[ERROR] Generic error during sheet row append: {e}")

# -----------------------------------------------------------------------------
# Google Calendar Synchronization
# -----------------------------------------------------------------------------

def get_calendar_service():
    """Retrieve initialized Calendar API client using service account credentials."""
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"[WARN] {SERVICE_ACCOUNT_FILE} not found. Calendar service is in MOCK Mode.")
        return None
    try:
        scopes = ['https://www.googleapis.com/auth/calendar']
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=scopes
        )
        return build('calendar', 'v3', credentials=creds)
    except Exception as e:
        print(f"[ERROR] Failed to load Google Calendar credentials: {e}. Running in MOCK Mode.")
        return None

# -----------------------------------------------------------------------------
# SMTP Email Notifications (Spam-Safe)
# -----------------------------------------------------------------------------

def send_smtp_email(subject: str, text_body: str, html_body: str, to_email: str = None) -> bool:
    """Send structured multipart email using TLS. Ensures spam safety for identical sender/receiver setup."""
    sender_email = os.getenv("SMTP_EMAIL")
    sender_password = os.getenv("SMTP_PASSWORD")
    receiver_email = to_email or os.getenv("SMTP_RECEIVER")
    
    if not sender_email or not sender_password or not receiver_email:
        print("[WARN] SMTP configurations missing. Skipping email dispatch.")
        return False
        
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Date'] = formatdate(localtime=True)
        msg['Message-ID'] = make_msgid()
        
        # Attach both plain text and HTML versions for spam-safety
        part1 = MIMEText(text_body, 'plain', 'utf-8')
        part2 = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(part1)
        msg.attach(part2)
        
        # Connect to Gmail SMTP server
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
            
        print(f"[INFO] SMTP email '{subject}' dispatched to {receiver_email}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to dispatch SMTP email notification: {e}")
        return False

# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------

@app.get("/api/available-slots", response_model=SlotResponse)
def get_available_slots(date: str = Query(..., regex=r"^\d{4}-\d{2}-\d{2}$")):
    service = get_calendar_service()
    
    # 5 standard slots throughout the day
    default_slots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"]
    
    if not service:
        # Return default mock slots in developer mode
        return SlotResponse(date=date, slots=default_slots)
        
    try:
        # Setup query range for Google Calendar (start and end of the chosen date)
        start_dt = datetime.strptime(f"{date} 00:00:00", "%Y-%m-%d %H:%M:%S")
        end_dt = datetime.strptime(f"{date} 23:59:59", "%Y-%m-%d %H:%M:%S")
        
        # Format datetime strings to RFC3339 format
        time_min = start_dt.isoformat() + 'Z'
        time_max = end_dt.isoformat() + 'Z'
        
        # Retrieve events from the Google Calendar
        events_result = service.events().list(
            calendarId=CALENDAR_ID,
            timeMin=time_min,
            timeMax=time_max,
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        
        events = events_result.get('items', [])
        
        # Filter slots that conflict with existing calendar events
        free_slots = []
        for slot in default_slots:
            slot_time = parse_time_string(slot)
            slot_start = datetime.combine(start_dt.date(), slot_time)
            slot_end = slot_start + timedelta(minutes=60) # Assume 1 hour slot block
            
            # Count overlapping events
            overlap_count = 0
            for event in events:
                event_start_str = event.get('start', {}).get('dateTime') or event.get('start', {}).get('date')
                event_end_str = event.get('end', {}).get('dateTime') or event.get('end', {}).get('date')
                
                if not event_start_str or not event_end_str:
                    continue
                
                # Strip timezone offsets for clean comparison
                event_start = datetime.fromisoformat(event_start_str.replace('Z', '+00:00')).replace(tzinfo=None)
                event_end = datetime.fromisoformat(event_end_str.replace('Z', '+00:00')).replace(tzinfo=None)
                
                # Check intersection [slot_start, slot_end] overlaps [event_start, event_end]
                if (slot_start < event_end) and (slot_end > event_start):
                    overlap_count += 1
            
            # Enforce conflict rule: Slot is unavailable if it has 2 or more bookings
            if overlap_count < 2:
                free_slots.append(slot)
                
        return SlotResponse(date=date, slots=free_slots)
        
    except HttpError as error:
        print(f"[ERROR] Google Calendar HttpError: {error}")
        return SlotResponse(date=date, slots=default_slots)
    except Exception as e:
        print(f"[ERROR] Generic error during slot extraction: {e}")
        return SlotResponse(date=date, slots=default_slots)


def process_booking_creation(booking: BookingCreate):
    """Consolidated business logic helper for `/api/book-appointment` and `/api/bookings`."""
    # 1. Sanitize string inputs & validate phone number
    name = sanitize_string(booking.name)
    email = booking.email
    phone = sanitize_string(booking.phone) if booking.phone else "None"
    service_type = sanitize_string(booking.serviceType)
    birth_date = sanitize_string(booking.birthDate)
    birth_time = sanitize_string(booking.birthTime)
    birth_place = sanitize_string(booking.birthPlace) if booking.birthPlace else "Not Specified"
    booking_date = sanitize_string(booking.bookingDate)
    booking_time = sanitize_string(booking.bookingTime)
    additional_info = sanitize_string(booking.additionalInfo) if booking.additionalInfo else "None"

    # Input validations
    if phone != "None" and is_spam_phone(phone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Spam phone number pattern detected. Request rejected."
        )

    # 2. Setup times
    booking_date_obj = datetime.strptime(booking_date, "%Y-%m-%d")
    slot_time = parse_time_string(booking_time)
    start_time = datetime.combine(booking_date_obj.date(), slot_time)
    end_time = start_time + timedelta(minutes=60)

    # 3. Conflict enforcement & calendar creation
    meeting_id = str(uuid.uuid4())[:8]
    jitsi_link = f"https://meet.jit.si/MadhuriGuptaAstrology-{meeting_id}"
    service = get_calendar_service()
    event_created = False

    if service:
        try:
            # Query calendar events on the booking day to verify conflict rule
            day_start = datetime.strptime(f"{booking_date} 00:00:00", "%Y-%m-%d %H:%M:%S")
            day_end = datetime.strptime(f"{booking_date} 23:59:59", "%Y-%m-%d %H:%M:%S")
            time_min = day_start.isoformat() + 'Z'
            time_max = day_end.isoformat() + 'Z'

            events_result = service.events().list(
                calendarId=CALENDAR_ID,
                timeMin=time_min,
                timeMax=time_max,
                singleEvents=True
            ).execute()
            events = events_result.get('items', [])

            # Count overlapping bookings
            overlap_count = 0
            for event in events:
                event_start_str = event.get('start', {}).get('dateTime') or event.get('start', {}).get('date')
                event_end_str = event.get('end', {}).get('dateTime') or event.get('end', {}).get('date')
                
                if not event_start_str or not event_end_str:
                    continue
                
                event_start = datetime.fromisoformat(event_start_str.replace('Z', '+00:00')).replace(tzinfo=None)
                event_end = datetime.fromisoformat(event_end_str.replace('Z', '+00:00')).replace(tzinfo=None)
                
                if (start_time < event_end) and (end_time > event_start):
                    overlap_count += 1

            if overlap_count >= 2:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="This time slot is fully booked. Maximum booking limit reached (2 bookings per hour slot)."
                )

            # Insert Calendar Event
            calendar_event = {
                'summary': f"Astrology Consultation: {name} ({service_type})",
                'location': jitsi_link,
                'description': f"Vedic birth details:\nDate: {birth_date}\nTime: {birth_time}\nPlace: {birth_place}\n\nClient notes: {additional_info}",
                'start': {
                    'dateTime': start_time.isoformat(),
                    'timeZone': 'UTC',
                },
                'end': {
                    'dateTime': end_time.isoformat(),
                    'timeZone': 'UTC',
                },
                'reminders': {
                    'useDefault': False,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 30},
                    ],
                },
            }
            
            created_event = service.events().insert(calendarId=CALENDAR_ID, body=calendar_event).execute()
            print(f"[INFO] Google Calendar event generated. Event ID: {created_event.get('id')}")
            event_created = True

        except HTTPException:
            raise
        except Exception as ce:
            print(f"[ERROR] Google Calendar syncing failed: {ce}")

    # 4. Log to Google Sheet Database
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    birth_details_str = f"Date: {birth_date}, Time: {birth_time}, Place: {birth_place}"
    row_data = [timestamp, name, email, phone, service_type, booking_date, booking_time, "60 Mins", birth_details_str]
    headers = ["Timestamp", "Full Name", "Email", "Phone", "Service Name", "Date", "Time Slot", "Duration", "Birth Details"]
    
    append_row_to_sheet("Bookings", row_data, headers)

    # 5. SMTP Email Dispatch
    # A. Send confirmation email to customer
    cust_subject = f"Confirmed: Your Astrological Consultation with Madhuri Gupta"
    cust_text = f"Dear {name},\n\nYour session for {service_type} has been successfully scheduled.\n\nDate: {booking_date}\nTime: {booking_time}\nMeeting Link: {jitsi_link}\n\nWarm regards,\nAstrologer Madhuri Gupta Team"
    cust_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #4f3129; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #deb18a; border-radius: 12px; padding: 30px; background-color: #faf6e8;">
          <h2 style="color: #4f3129; text-align: center;">Consultation Confirmed</h2>
          <hr style="border-color: #deb18a;" />
          <p>Dear <strong>{name}</strong>,</p>
          <p>Your session with <strong>Astrologer Madhuri Gupta</strong> has been successfully booked.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 6px 0; color: #6f5149;"><strong>Service:</strong></td><td style="padding: 6px 0; color: #4f3129;">{service_type}</td></tr>
            <tr><td style="padding: 6px 0; color: #6f5149;"><strong>Date:</strong></td><td style="padding: 6px 0; color: #4f3129;">{booking_date}</td></tr>
            <tr><td style="padding: 6px 0; color: #6f5149;"><strong>Time Slot:</strong></td><td style="padding: 6px 0; color: #4f3129;">{booking_time}</td></tr>
            <tr><td style="padding: 6px 0; color: #6f5149;"><strong>Birth Place:</strong></td><td style="padding: 6px 0; color: #4f3129;">{birth_place}</td></tr>
          </table>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{jitsi_link}" style="background-color: #b8922b; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 20px; font-weight: bold; display: inline-block;">JOIN MEETING</a>
          </div>
          <p style="font-size: 11px; color: #8f6c60; text-align: center;">The session takes place via Jitsi Meet. No download required.</p>
        </div>
      </body>
    </html>
    """
    email_to_customer = send_smtp_email(cust_subject, cust_text, cust_html, to_email=email)

    # B. Send notification email to astrologer
    astro_subject = f"New Booking: {name} - {service_type}"
    astro_text = f"New consultation booked.\n\nClient Name: {name}\nEmail: {email}\nPhone: {phone}\nService: {service_type}\nDate: {booking_date}\nTime: {booking_time}\nBirth Details: {birth_details_str}\nNotes: {additional_info}\nMeeting Link: {jitsi_link}"
    astro_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #4f3129; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #deb18a; border-radius: 12px; padding: 30px; background-color: #ffffff;">
          <h2 style="color: #4f3129;">New Booking Alert</h2>
          <hr style="border-color: #deb18a;" />
          <p><strong>Client Details:</strong></p>
          <ul>
            <li>Name: {name}</li>
            <li>Email: {email}</li>
            <li>Phone: {phone}</li>
            <li>Service: {service_type}</li>
            <li>Scheduled: {booking_date} at {booking_time}</li>
            <li>Birth Details: {birth_details_str}</li>
            <li>Notes: {additional_info}</li>
          </ul>
          <p>Meeting Link: <a href="{jitsi_link}">{jitsi_link}</a></p>
        </div>
      </body>
    </html>
    """
    send_smtp_email(astro_subject, astro_text, astro_html, to_email=None)

    return {
        "status": "confirmed",
        "bookingId": meeting_id,
        "jitsiLink": jitsi_link,
        "calendarEventCreated": event_created,
        "emailDispatched": email_to_customer,
        "details": {
            "name": name,
            "date": booking_date,
            "time": booking_time
        }
    }


@app.post("/api/book-appointment", status_code=status.HTTP_201_CREATED)
def book_appointment_route(booking: BookingCreate):
    return process_booking_creation(booking)


# Retain alias path for backward compatibility
@app.post("/api/bookings", status_code=status.HTTP_201_CREATED)
def create_booking_alias(booking: BookingCreate):
    return process_booking_creation(booking)


@app.post("/api/contact", status_code=status.HTTP_200_OK)
def create_contact_query(contact: ContactCreate):
    # 1. Sanitize string inputs & validate phone number
    name = sanitize_string(contact.name)
    email = contact.email
    phone = sanitize_string(contact.phone) if contact.phone else "None"
    subject = sanitize_string(contact.subject)
    message = sanitize_string(contact.message)

    if phone != "None" and is_spam_phone(phone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Spam phone number pattern detected. Query rejected."
        )

    # 2. Log to Google Sheet Database
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    row_data = [timestamp, name, email, phone, subject, message]
    headers = ["Timestamp", "Name", "Email", "Phone", "Subject", "Message"]
    
    append_row_to_sheet("Contact Queries", row_data, headers)

    # 3. SMTP email notification to astrologer
    mail_subject = f"New Contact Query: {subject}"
    mail_text = f"New message from {name}.\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nSubject: {subject}\nMessage:\n{message}"
    mail_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #4f3129; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #deb18a; border-radius: 12px; padding: 30px; background-color: #ffffff;">
          <h2 style="color: #4f3129;">New Contact Query</h2>
          <hr style="border-color: #deb18a;" />
          <p><strong>Query Details:</strong></p>
          <ul>
            <li>Name: {name}</li>
            <li>Email: {email}</li>
            <li>Phone: {phone}</li>
            <li>Subject: {subject}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 3px solid #deb18a; padding-left: 15px; color: #6f5149;">
            {message}
          </blockquote>
        </div>
      </body>
    </html>
    """
    email_dispatched = send_smtp_email(mail_subject, mail_text, mail_html, to_email=None)

    return {
        "status": "success",
        "message": "Contact query recorded successfully.",
        "emailDispatched": email_dispatched
    }


if __name__ == "__main__":
    import uvicorn
    # Listen on localhost port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
