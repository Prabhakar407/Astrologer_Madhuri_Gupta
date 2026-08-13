# Astrologer Madhuri Gupta - Celestial Bookings App

This repository houses a premium, glassmorphic dark-theme celestial web application for **Astrologer Madhuri Gupta**, combining a React 19 + Vite 8 frontend with a Python FastAPI backend. It features dynamic Google Calendar integration, Jitsi Meet links generation, and automated email confirmation dispatch.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18+) & **npm** (v9+)
* **Python** (v3.10+)

### 2. File Structure
* [package.json](file:///home/prabhakar/Documents/Vibe%20Coding/Astrologer%20Madhuri%20Gupta/package.json): Frontend dependencies & configurations.
* [main.py](file:///home/prabhakar/Documents/Vibe%20Coding/Astrologer%20Madhuri%20Gupta/main.py): FastAPI backend.
* [requirements.txt](file:///home/prabhakar/Documents/Vibe%20Coding/Astrologer%20Madhuri%20Gupta/requirements.txt): Backend Python dependencies.
* [src/](file:///home/prabhakar/Documents/Vibe%20Coding/Astrologer%20Madhuri%20Gupta/src/): React components, layouts, styling, and pages.
* [.env](file:///home/prabhakar/Documents/Vibe%20Coding/Astrologer%20Madhuri%20Gupta/.env): Environment variables configuration.

---

## 🛠️ Configuration & Credentials

The application runs in **Mock Mode** by default if credentials are not provided. Follow these steps to configure live Google Calendar and Email dispatch:

### 1. Email Configuration (`.env`)
Generate a Gmail App Password:
1. Go to your **Google Account Settings** -> **Security**.
2. Enable **2-Step Verification**.
3. Search for **App passwords**. Generate one for "Mail" on your "Linux/Windows computer".
4. Copy the 16-character code and set it in your `.env` file:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ```

### 2. Google Calendar Integration (`service_account.json`)
1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable the **Google Calendar API**.
3. Create a **Service Account** under *IAM & Admin -> Service Accounts*.
4. Generate a new **JSON Key** for the Service Account.
5. Rename the downloaded file to `service_account.json` and place it in the root folder of this project.
6. Share your primary Google Calendar (or target calendar) with the Service Account email address (found in your JSON file) with permissions to **Make changes to events**.

---

## 💻 Running the Servers

For local development, you need to run both the frontend Vite dev server and the backend FastAPI server concurrently.

### Step 1: Start the Backend (FastAPI)
Activate your virtual environment and run the backend script:
```bash
# Activate virtual environment
source .venv/bin/activate

# Start the FastAPI server
python main.py
```
* The backend will start on: **`http://127.0.0.1:8000`**
* You can view interactive Swagger docs at: **`http://127.0.0.1:8000/docs`**

### Step 2: Start the Frontend (Vite)
Open a new terminal session, navigate to the project directory, and run:
```bash
# Start the Vite React development server
npm run dev
```
* The frontend will start on: **`http://localhost:5173`**
* Vite is configured to proxy all `/api` traffic automatically to `http://127.0.0.1:8000/api`.

---

## 📦 Production Builds

To compile and verify the frontend assets for production:
```bash
npm run build
```
This builds static assets into the `dist/` directory.
