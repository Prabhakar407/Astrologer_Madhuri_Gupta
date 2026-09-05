# Sarsa Jyotish Sansthan — Astrologer Madhuri Gupta

A full-stack celestial astrology web application combining a **React 19 + Vite 8** frontend with a **Python FastAPI** backend. Features dynamic Google Calendar sync, automated Google Sheets client logging, Jitsi Meet video consultation generation, and SMTP email automation.

---

## 📁 Project Architecture & File Structure

```text
Astrologer_Madhuri_Gupta/
│
├── 📂 frontend/                         # React 19 + Vite Frontend SPA
│   ├── 📂 public/                       # Static public assets (Served at root /)
│   │   ├── Goal.webp                    # Optimized WebP goal graphic (206 KB)
│   │   ├── Hero_person.webp             # High-priority hero portrait (89 KB)
│   │   ├── certificate.webp             # Official qualifications certificate (160 KB)
│   │   ├── contact_office.webp          # Consultation room photo (136 KB)
│   │   ├── marble-bg.webp               # Seamless background texture (26 KB)
│   │   ├── right_bottom.webp            # Occult alignment tarot graphic (156 KB)
│   │   ├── right_top.webp               # Celestial orbital graphic (67 KB)
│   │   ├── testimonial_*.webp           # Client review avatar images (~80-100 KB)
│   │   ├── wheel.webp                   # Rotating 12-house Zodiac wheel (209 KB)
│   │   ├── googlebd68ff44453661db.html  # Google Search Console verification token
│   │   ├── robots.txt                   # Crawler directives & sitemap reference
│   │   └── sitemap.xml                  # XML sitemap for SEO indexing
│   │
│   ├── 📂 src/                          # Frontend Application Source Code
│   │   ├── 📂 components/               # Reusable UI & Layout Components
│   │   │   ├── 📂 motion-primitives/    # Framer Motion animated components
│   │   │   │   └── text-shimmer.tsx     # Gold-reflecting text shimmer component
│   │   │   ├── Navbar.jsx               # Navigation bar with mobile drawer
│   │   │   └── Footer.jsx               # Site footer with Agra address & links
│   │   │
│   │   ├── 📂 pages/                    # Route Views & Page Components
│   │   │   ├── Home.jsx                 # Landing page (Hero, Goal, Services, FAQ)
│   │   │   ├── About.jsx                # Astrologer biography & credentials
│   │   │   ├── Services.jsx             # Comprehensive 4-service offerings catalogue
│   │   │   ├── Booking.jsx              # Slot booking, details form & checkout
│   │   │   ├── ContactPage.jsx          # Contact form, office info & Agra map
│   │   │   └── Testimonials.jsx         # Client reviews carousel
│   │   │
│   │   ├── App.jsx                      # App root router & layout provider
│   │   ├── main.jsx                     # React DOM entrypoint
│   │   └── index.css                    # Tailwind CSS & custom celestial styles
│   │
│   ├── index.html                       # HTML5 entrypoint with Schema.org JSON-LD
│   ├── vite.config.js                   # Vite configuration
│   ├── package.json                     # Frontend dependencies & npm scripts
│   └── package-lock.json                # Locked dependency tree
│
├── 📂 backend/                          # FastAPI Python Backend
│   ├── main.py                          # FastAPI application server & routes
│   ├── requirements.txt                 # Python backend dependencies
│   ├── service_account.json             # Google Cloud service account keys (GitIgnored)
│   ├── .env                             # Secret environment variables (SMTP, Sheets ID, etc.)
│   ├── .env.example                     # Environment template for developers
│   └── .venv/                           # Python virtual environment (GitIgnored)
│
├── .gitignore                           # Root git ignore rules
└── README.md                            # Complete documentation & developer guide
```

---

## ⚙️ Architecture & Data Flow

```text
[ Client Browser ] 
       │
       ├───> React SPA (frontend/) ───> UI / Pages
       │
       └───> API Calls (HTTPS / JSON)
                 │
                 ▼
     [ FastAPI Backend (backend/) ]
                 │
      ┌──────────┼──────────────────┐
      ▼          ▼                  ▼
[ Google Cal ] [ Google Sheets ] [ SMTP Email ]
(Creates Event) (Logs Client)   (Sends Meeting Link)
```

---

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite 8, Tailwind CSS, Framer Motion, Lucide React Icons.
* **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, Google API Client, Python-dotenv.
* **Integrations**: Google Calendar API v3, Google Sheets API v4, Jitsi Meet WebRTC, Gmail SMTP.
* **SEO**: Schema.org JSON-LD (`ProfessionalService`, `WebSite`, `Service`, `FAQPage`, `AggregateRating`), Open Graph, Twitter Cards, XML Sitemap, Robots.txt.

---

## 💻 Local Development Setup

### 1. Start the Backend Server
```bash
cd backend

# Activate Python virtual environment
source .venv/bin/activate  # On Linux/macOS
# or: .venv\Scripts\activate  # On Windows

# Install backend dependencies
pip install -r requirements.txt

# Launch FastAPI server
python main.py
# or: uvicorn main:app --reload --port 8000
```
* Backend URL: `http://127.0.0.1:8000`
* Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### 2. Start the Frontend Server
```bash
cd frontend

# Install dependencies
npm install

# Launch Vite development server
npm run dev
```
* Frontend URL: `http://localhost:5173`

---

## 📦 Production Deployment

### Frontend Production Build
```bash
cd frontend
npm run build
```
Outputs optimized static assets to `frontend/dist/`.

### Backend Production Command (Render)
* **Root Directory**: `backend` (or set Render root directory to `backend`)
* **Build Command**: `pip install -r requirements.txt`
* **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

