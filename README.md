# Online Home Tution Center

> **Powered by Aksharas Academy • Learn Beyond Limits**  
> Premium Educational MERN Stack Web Application & Student Engagement Platform

---

## 🌟 Executive Overview

**Online Home Tution Center** is a production-quality, responsive, and interactive educational platform designed for our client institution located in **Trichy, Tamil Nadu**.

The platform is engineered to fulfill three core institutional objectives:
1. **Institutional Marketing & Promotion:** Showcase the institution's authentic track record, Founder Mrs. Sandhya Subbaraman's profile, CBSE board results (Centums, 90%+), verified student testimonials, and drive high-conversion **Free Demo Class** bookings.
2. **Student Engagement & Gamification:** A signature **"MY LEARNING SPACE"** portal with daily challenges, streak flames, timed topic-wise quizzes with instant step-by-step explanations, MongoDB-backed achievement badges, and a friendly leaderboard.
3. **Research-Driven EdTech Solutions:** Directly resolves the two critical research barriers in online tutoring:
   - **Barrier 1: Insufficient Pedagogical Training** ➔ **Teacher Development Hub** (active learning modules, interactive lesson planner with database saving, and teaching readiness diagnostic).
   - **Barrier 2: Low Digital Literacy** ➔ **Digital Learning Made Simple** (interactive visual step-by-step tutorials for joining classes, webcam/mic controls, homework photo-to-PDF scanning, and digital readiness diagnostics).

---

## 🎨 Branding & Color System

The visual identity is anchored around the client's official **Aksharas Academy Logo (`/logo.png`)**:
- **Primary Brand Gold:** `#C29B1A` / `#D4AF37` / `#B8860B` (Lotus gold)
- **Deep Bronze Contrast:** `#2A231C` / `#1C1712` (Espresso dark coffee from logo typography)
- **Background Parchment:** `#FAF8F5` / `#F5EFE6` (Warm, premium pearl cream)
- **EdTech Accents:** Royal Indigo (`#2563EB`) and Emerald (`#10B981`) for clear interactive cues.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, Canvas Confetti |
| **Routing & State** | React Router v6, Context API (`AuthContext`, `ToastContext`) |
| **Backend API** | Node.js, Express.js, REST Architecture, CORS, Morgan |
| **Database & ODM** | MongoDB, Mongoose ODM (Atlas & In-Memory fallback support) |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs password hashing, protected middleware |

---

## 🚀 Key Modules & Capabilities

### 1. High-Conversion Institutional Marketing
- **Hero Section:** Featuring the headline *"Unlock Your Potential. Learn Beyond Limits."* with direct CTAs to find tutors, explore programs, or book demo classes.
- **Institutional Statistics:** 500+ Students Guided, 25+ Tutors, 15+ Subjects, 12,000+ Hours.
- **Why Choose Us:** 6 key pillars (Personalized Attention, Experienced Faculty, Flexible Schedules, Student-Centered Pedagogy, Interactive Learning, Progress Monitoring).
- **Verified Results (2019–2025):** Real CBSE Board examination data showing Centums (100/100 in Accountancy/Economics), 90%+ scores, and 80–90% bands.
- **Authentic Testimonial Carousel:** Real student testimonials with scores and photos (`/p1.png`–`/p10.png`).
- **Institutional Coordinates:** 54, 2nd Street, Royarthope, Srirangam, Trichy - 620006; Phone: `+91 9345793979`; Email: `aksharasacademy@gmail.com`; Embedded Google Map; One-click WhatsApp chat.

### 2. Signature Feature: "MY LEARNING SPACE"
- **Student Dashboard:** Daily learning goal progress ring, streak counter, upcoming live classes with direct Google Meet links.
- **Gamified Rewards:** 6 achievement badge tiers (`First Step`, `Quick Learner`, `Consistent Star`, `Quiz Champion`, `Weekly Achiever`, `Learning Master`) with unique MongoDB persistence to prevent duplicate claims.
- **Interactive Quizzes:**
  - Multiple-choice questions with countdown timers.
  - Live stepper with immediate feedback.
  - Final score breakdown: Score, Correct, Incorrect, Topic-wise performance, and targeted topics to improve.
  - Retry functionality and automatic points award.
- **Daily Learning Challenge:** New daily puzzle (Commerce, Math, Science, Logic, GK) with hint reveal, streak updates, and participation points.
- **Student Leaderboard:** Weekly rankings with positive reinforcement titles (*Legendary Scholar*, *Master Thinker*) and avatar privacy.

### 3. Smart Tutor Matching Engine
- 6-question interactive questionnaire:
  1. Class / Standard
  2. Primary Subject
  3. Curriculum (CBSE, State Board, ICSE, Foundation)
  4. Medium / Language (English, Tamil, Bilingual)
  5. Learning Difficulty (Concept building, Exam revision, Problem speed, Centum aim)
  6. Preferred Timing (Morning, Evening, Weekend)
- Real-time scoring algorithm matching against MongoDB tutors with match percentage and custom match reasons.

### 4. Teacher Development Hub (Pedagogical Training)
- Specifically tackles research barrier #1 (*Insufficient pedagogical training*).
- **Pedagogical Modules:** Socratic questioning, Active learning, Differentiated problem tiers, Formative assessment exit tickets.
- **Interactive Lesson Planner:** Create, structure, and save lesson plans to MongoDB with subject, class, objective, method, activity timeline, and assessment technique.
- **Teaching Readiness Assessment:** 7-point self-diagnostic calculating overall score, teaching strengths, areas for improvement, and recommended training modules.

### 5. Digital Learning Made Simple (Digital Literacy Center)
- Specifically tackles research barrier #2 (*Low digital literacy*).
- **Interactive Step-by-Step Guides:**
  - How to join online classes 5 minutes early.
  - Video conferencing controls (Mute/unmute, webcam, raise hand, in-call chat).
  - Scanning handwritten homework notes into clear single PDFs.
  - Organizing and accessing digital class notes on Google Drive.
  - Safe digital habits and online classroom etiquette.
- **Digital Literacy Readiness Diagnostic:** Self-check diagnostic quiz providing tailored recommendations.

### 6. Free Demo Class Booking Flow
- Modal and dedicated page for booking trial classes.
- Form fields: Student Name, Parent Name, Mobile, Email, Grade, Subject, Preferred Date, Time Slot, Learning Goals.
- Stores booking in MongoDB `bookings` collection with unique reference ID (e.g. `OHT-346676`).
- Instant confirmation screen with confetti animation.
- Admin dashboard allows approving, completing, or rescheduling bookings.

### 7. Role-Based Dashboards & 1-Click Demo Switcher
- **Student Dashboard:** Timetable, homework worksheets, points & badges showcase, daily challenge launcher.
- **Parent Dashboard:** Child's attendance rate (95.5%), subject score breakdown, weekly study hours, tutor observations, and "Schedule Tutor Call" action.
- **Tutor Dashboard:** Today's teaching schedule, active students count, lesson plan designer shortcut, post homework worksheets.
- **Admin Dashboard:** Platform KPIs, demo booking request approval workflow, visitor inquiry management, user directory.
- **1-Click Demo Role Switcher:** A floating widget at the bottom-left corner allowing anyone to switch immediately between **Student**, **Parent**, **Tutor**, **Admin**, and **Guest** with 0 typing required.

---

## 🔑 Demo Login Credentials

You can use the **1-Click Demo Switcher** pill at the bottom-left of the application, or log in manually:

| Role | Email | Password |
|---|---|---|
| **Student** | `student@tutioncenter.com` | `student123` |
| **Parent** | `parent@tutioncenter.com` | `parent123` |
| **Tutor (Founder)** | `sandhya@aksharasacademy.com` | `tutor123` |
| **Admin** | `admin@tutioncenter.com` | `admin123` |

---

## 💻 Installation & Setup Instructions

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** (v9.0 or higher)
- **MongoDB** (Local mongod, MongoDB Atlas URI, or automatic fallback)

### 1. Clone & Project Directory
```powershell
cd C:\Aswin\tution_web
```

### 2. Backend Setup
```powershell
cd server
npm install
npm run seed     # Populates rich demo data (Users, Tutors, Courses, Quizzes, Challenges, Testimonials)
npm start        # Starts Express server on port 5000
```

### 3. Frontend Setup
In a new terminal:
```powershell
cd C:\Aswin\tution_web\client
npm install
npm run dev      # Starts Vite dev server (http://localhost:5173 or http://localhost:5174)
```

### 4. Build for Production
```powershell
cd client
npm run build    # Generates optimized production build in client/dist
```

---

## 📡 REST API Endpoints Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Server health check and metadata |
| `/api/auth/register` | POST | Register student / parent / tutor |
| `/api/auth/login` | POST | User authentication & JWT issuance |
| `/api/auth/me` | GET | Current authenticated user profile |
| `/api/auth/claim-badge` | POST | Claim achievement badge in MongoDB |
| `/api/courses` | GET | List & filter courses by grade, subject, mode |
| `/api/tutors` | GET | List educators |
| `/api/tutors/match` | POST | Smart tutor matching algorithm |
| `/api/bookings` | POST | Book free demo class |
| `/api/bookings` | GET | List demo bookings (Admin) |
| `/api/bookings/:id` | PUT | Update booking status (Pending/Confirmed/Completed) |
| `/api/inquiries` | POST | Submit contact form inquiry |
| `/api/quizzes` | GET | List academic quizzes |
| `/api/quizzes/:id` | GET | Get quiz questions & timer |
| `/api/quizzes/:id/submit` | POST | Grade quiz, topic analysis, award points |
| `/api/challenges/today` | GET | Get today's daily learning challenge |
| `/api/challenges/submit` | POST | Submit challenge answer & update streak |
| `/api/lesson-plans` | GET / POST | Manage lesson plans (MongoDB) |
| `/api/training/modules` | GET | List teacher development modules |
| `/api/training/readiness-assessment` | POST | Grade teacher readiness assessment |
| `/api/digital-guides` | GET | List digital literacy visual tutorials |
| `/api/digital-guides/readiness-assessment` | POST | Grade digital literacy diagnostic |
| `/api/dashboard/student` | GET | Student dashboard stats & leaderboard |
| `/api/dashboard/parent` | GET | Parent supervision metrics & tutor notes |
| `/api/dashboard/tutor` | GET | Tutor roster & pedagogical overview |
| `/api/dashboard/admin` | GET | Administrative KPI dashboard |
| `/api/testimonials` | GET | Verified student achievement stories |
| `/api/seed` | POST | Re-seed database with fresh demo data |

---

## 🏛️ Institutional Contact Details

- **Institution:** Online Home Tution Center (Aksharas Academy)
- **Founder:** Mrs. Sandhya Subbaraman, M.Com, M.Phil, MBA, SET Qualified
- **Address:** 54, 2nd Street, Royarthope, Srirangam, Trichy - 620006, Tamil Nadu, India
- **Phone:** +91 93457 93979
- **Email:** aksharasacademy@gmail.com
- **Operating Hours:** Monday – Sunday, 6:00 AM – 9:00 PM IST
