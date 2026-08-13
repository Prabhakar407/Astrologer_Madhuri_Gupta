import os
import uuid
import smtplib
from datetime import datetime, timedelta, time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
    description="FastAPI service integrated with Google Calendar and Jitsi meetings",
    version="1.0.0"
)

# CORS configuration to allow cross-origin requests during local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service account configuration path
SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE", "service_account.json")
CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID", "primary")

# Gmail Configurations
GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

# Pydantic Schemas
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    serviceType: str
    birthDate: str  # YYYY-MM-DD
    birthTime: str  # HH:MM
    birthPlace: str
    bookingDate: str  # YYYY-MM-DD
    bookingTime: str  # HH:MM or E.g. "10:00 AM"
    additionalInfo: Optional[str] = None

class SlotResponse(BaseModel):
    date: str
    slots: List[str]

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
    except Exception as e:
        # Defaults to 10:00 AM on failure
        return time(10, 0)

# Helper: Get Google Calendar API client
def get_calendar_service():
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"[WARN] {SERVICE_ACCOUNT_FILE} not found. Running in MOCK Mode.")
        return None
    try:
        scopes = ['https://www.googleapis.com/auth/calendar']
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=scopes
        )
        return build('calendar', 'v3', credentials=creds)
    except Exception as e:
        print(f"[ERROR] Failed to load credentials: {e}. Running in MOCK Mode.")
        return None

# Helper: Send Confirmation Email
def send_email_confirmation(to_email: str, name: str, service_name: str, date_str: str, time_str: str, meet_link: str):
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print("[WARN] Gmail configurations not found. Skipping email dispatch.")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Confirmed: Your Astrological Consultation with Madhuri Gupta"
        msg['From'] = GMAIL_USER
        msg['To'] = to_email

        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #0b0c10; color: #c5c6c7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #121526; border: 1px solid #d4af37; border-radius: 12px; padding: 30px;">
              <h2 style="color: #d4af37; font-family: Georgia, serif; text-align: center;">Celestial Consultation Confirmed</h2>
              <hr style="border-color: rgba(212, 175, 55, 0.2);" />
              <p>Dear {name},</p>
              <p>Your session with <strong>Astrologer Madhuri Gupta</strong> has been successfully booked.</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; color: #8f929d;"><strong>Service:</strong></td>
                  <td style="padding: 8px 0; color: #fff;">{service_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8f929d;"><strong>Date:</strong></td>
                  <td style="padding: 8px 0; color: #fff;">{date_str}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8f929d;"><strong>Time Slot:</strong></td>
                  <td style="padding: 8px 0; color: #fff;">{time_str}</td>
                </tr>
              </table>
              <div style="text-align: center; margin: 35px 0 20px 0;">
                <a href="{meet_link}" style="background-color: #d4af37; color: #0b0c10; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Join Meeting Link</a>
              </div>
              <p style="font-size: 12px; color: #8f929d; text-align: center; margin-top: 30px;">
                Note: The meeting will take place via Jitsi Meet. Please test your camera/mic before joining.
              </p>
            </div>
          </body>
        </html>
        """
        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
          server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
          server.sendmail(GMAIL_USER, to_email, msg.as_string())
        
        print(f"[INFO] Confirmation email dispatched to {to_email}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to send email confirmation: {e}")
        return False

# Endpoints
@app.get("/api/available-slots", response_model=SlotResponse)
def get_available_slots(date: str = Query(..., regex=r"^\d{4}-\d{2}-\d{2}$")):
    service = get_calendar_service()
    
    # 9:00 AM to 6:00 PM standard slots (1.5-hour sessions)
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
            
            # Check collisions
            conflict = False
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
                    conflict = True
                    break
            
            if not conflict:
                free_slots.append(slot)
                
        return SlotResponse(date=date, slots=free_slots)
        
    except HttpError as error:
        print(f"[ERROR] Google Calendar HttpError: {error}")
        return SlotResponse(date=date, slots=default_slots)
    except Exception as e:
        print(f"[ERROR] Generic error during slot extraction: {e}")
        return SlotResponse(date=date, slots=default_slots)

@app.post("/api/bookings", status_code=status.HTTP_201_CREATED)
def create_booking(booking: BookingCreate):
    # 1. Generate unique meeting details
    meeting_id = str(uuid.uuid4())[:8]
    jitsi_link = f"https://meet.jit.si/MadhuriGuptaAstrology-{meeting_id}"
    
    # Parse times
    booking_date_obj = datetime.strptime(booking.bookingDate, "%Y-%m-%d")
    slot_time = parse_time_string(booking.bookingTime)
    start_time = datetime.combine(booking_date_obj.date(), slot_time)
    end_time = start_time + timedelta(minutes=60)
    
    # 2. Add Event to Google Calendar if configured
    service = get_calendar_service()
    event_created = False
    
    if service:
        try:
            event = {
                'summary': f"Astrology Consultation: {booking.name} ({booking.serviceType})",
                'location': jitsi_link,
                'description': f"Vedic birth details:\nDate: {booking.birthDate}\nTime: {booking.birthTime}\nPlace: {booking.birthPlace}\n\nClient notes: {booking.additionalInfo or 'None'}",
                'start': {
                    'dateTime': start_time.isoformat(),
                    'timeZone': 'UTC',  # Can configure to specific timezone
                },
                'end': {
                    'dateTime': end_time.isoformat(),
                    'timeZone': 'UTC',
                },
                'attendees': [
                    {'email': booking.email},
                ],
                'reminders': {
                    'useDefault': False,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 30},
                    ],
                },
            }
            
            # Insert the event into Google Calendar
            created_event = service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
            print(f"[INFO] Google Calendar event generated successfully. Event ID: {created_event.get('id')}")
            event_created = True
        except Exception as e:
            print(f"[ERROR] Google Calendar insertion failed: {e}")
    
    # 3. Send Email Dispatch
    email_dispatched = send_email_confirmation(
        to_email=booking.email,
        name=booking.name,
        service_name=booking.serviceType,
        date_str=booking.bookingDate,
        time_str=booking.bookingTime,
        meet_link=jitsi_link
    )
    
    # 4. Return booking dashboard details
    return {
        "status": "confirmed",
        "bookingId": meeting_id,
        "jitsiLink": jitsi_link,
        "calendarEventCreated": event_created,
        "emailDispatched": email_dispatched,
        "details": {
            "name": booking.name,
            "date": booking.bookingDate,
            "time": booking.bookingTime
        }
    }

if __name__ == "__main__":
    import uvicorn
    # Listen on localhost port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
