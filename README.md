# 🌌 ASTROVERSE — AI-Powered Vedic Astrology & Spiritual Guidance Platform

> **Discover What the Universe Has Written for You.**  
> A premium, production-grade spiritual guidance platform harmonizing ancient Vedic Jyotish wisdom with modern artificial intelligence and high-precision astronomical ephemeris calculations.

---

## 🌟 Key Features

### 1. 🪐 Astronomical Ephemeris Janam Kundli
- **Astronomical Precision:** Calculates geocentric sidereal planetary positions using true planetary ephemeris tables and the official **Lahiri (Chitrapaksha) Ayanamsa**.
- **Ascendant & 12 Houses (Bhavas):** Computes exact Ascendant (Lagna) from Local Sidereal Time (LST) and geographic coordinates.
- **Interactive North & South Indian Charts:** Switch seamlessly between the authentic North Indian diamond chart and the South Indian square chart.
- **D9 Navamsa Chart:** Instant calculation and visualization of the spiritual Navamsa chart.
- **Planetary Status & Dignities:** Sortable Graha table with signs, degrees (DMS), Nakshatras, Padas, dignities (*Exalted, Debilitated, Mooltrikona, Own, Friendly, Enemy*), and retrograde (Vakri) status.
- **PDF Report Generation:** One-click export of a branded Astroverse Kundli PDF report.

### 2. 🤖 Context-Aware AI Astrologer
- Multi-turn conversational chatbot acting as a venerable Vedic Jyotish Acharya.
- Automatically passes the user's active birth chart data (Lagna, Moon sign, planetary placements, houses, Dasha, yogas) into the AI reasoning context.
- Dual-engine architecture:
  - Supports **Google Gemini API** (`GEMINI_API_KEY`) and **OpenAI API** (`OPENAI_API_KEY`).
  - Includes a built-in expert Vedic reasoning engine that delivers personalized readings even before external keys are configured.
- Suggested prompt chips for career timing, marriage indicators, gemstone recommendations, and transit effects.

### 3. 🔮 Personalized Vedic Horoscope
- Timeframes: **Daily, Weekly, Monthly, and Yearly**.
- 6 life categories: **Love & Relationships, Career & Profession, Finance & Wealth, Health & Wellness, Education, and Family**.
- Personalized with the seeker's natal Moon sign and Ascendant.
- Shows cosmic harmony rating, lucky numbers, lucky colors, auspicious gemstones, and favorable hours.

### 4. 💍 Ashtakoota Kundli Milan (36 Gunas Compatibility)
- Complete classical 36-point relationship compatibility calculation:
  1. **Varna (1 pt)** — Spiritual harmony & ego balance
  2. **Vashya (2 pts)** — Mutual magnetic attraction & dominance
  3. **Tara (3 pts)** — Destiny & birth star longevity
  4. **Yoni (4 pts)** — Intimacy & physical temperament
  5. **Graha Maitri (5 pts)** — Psychological rapport & planetary friendship
  6. **Gana (6 pts)** — Temperament (Deva, Manushya, Rakshasa)
  7. **Bhakoot (7 pts)** — Emotional welfare & family growth (with cancellations)
  8. **Nadi (8 pts)** — Genetic vitality & health (with cancellations)
- Cross-checking for **Mangal Dosha** matching.
- Visual score dial, strengths, potential friction points, and traditional Vedic remedies.

### 5. 🛡️ Vedic Doshas & Remedies
- Automated evaluation of:
  - **Mangal Dosha (Kuja Dosha):** Checks houses 1, 2, 4, 7, 8, 12 from Lagna, Moon, and Venus with classical cancellations (Ruchaka Yoga, Jupiter aspect, Moon-Mars yoga).
  - **Kaal Sarp Yoga:** Identifies all 12 classical types (*Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhachur, Ghatak, Vishdhar, Sheshnag*) and classifies into Full (*Purna*) vs Partial (*Anshik*).
  - **Pitra Dosha:** Ancestral karmic duty indicators.
  - **Guru Chandal Yoga:** Jupiter-Rahu/Ketu conjunction analysis.
  - **Shani Sade Sati & Dhaiya:** Real-time tracking of current Saturn in the sky relative to natal Moon (*Rising, Peak, Setting, Kantaka, or Ashtama Shani*).
- Practical, non-fear-mongering Vedic remedies (mantras, charities, gemstones, behavioral practices).

### 6. ⏳ 120-Year Vimshottari Dasha & Live Gochar
- Master 120-year Vimshottari Mahadasha timeline starting from birth Nakshatra.
- Automatic computation of active **Mahadasha, Antardasha (Bhukti), and Pratyantardasha**.
- Live planetary sky transits (**Gochar**) calculated dynamically for the current day.

### 7. 📅 Daily Hindu Panchang & Muhurat
- Computes the 5 limbs (*Pancha-Anga*): **Tithi, Vara, Nakshatra, Yoga, and Karana**.
- Accurate Sunrise, Sunset, Moonrise, and Moonset.
- Inauspicious timings: **Rahu Kaal, Yamaganda, Gulika Kaal, Dur Muhurat**.
- Auspicious timings: **Abhijit Muhurat, Brahma Muhurat, Amrit Kaal**.
- Integrated world city selector (300+ offline coordinates).

### 8. 🔢 Vedic & Pythagorean Numerology
- Computes **Life Path Number, Destiny (Expression) Number, Soul Urge (Heart's Desire) Number, Personality Number, Birth Day Number, and Personal Year Number**.
- Preserves master numbers (11, 22, 33).
- Deep interpretations and resonant colors, gemstones, and lucky numbers.

### 9. 📚 Astrology Learning Academy
- Interactive knowledge base covering:
  - 12 Zodiac signs with elements and ruling Grahas.
  - 9 Navagrahas with mythologies, gemstones, and sacred Beej mantras.
  - 12 Bhavas (houses) with physical & spiritual significations.
  - 27 Nakshatras with deities, ganas, and animal yonis.

### 10. 👑 Premium Memberships & Razorpay Checkout
- Tiers: **Free ($0), Pro (₹999/yr), VIP Premium (₹2,499/yr)**.
- Secure server-side payment verification (HMAC-SHA256).
- Supports live keys or transparent sandbox test mode for immediate checkout verification with celebratory confetti.

### 11. 🛡️ Admin Control Console
- Telemetry dashboard: Total registered users, active subscriptions, revenue metrics, and AI consultation queries.
- User Management: search users, update subscription tiers (Free, Pro, Premium), toggle admin privileges, or delete accounts.
- Subscription transaction audit trail.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Actions, API Routes) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (Celestial cosmic palette, glassmorphism) |
| **Astronomical Engine** | `astronomy-engine` (Jean Meeus ephemeris + Lahiri Chitrapaksha Ayanamsa) |
| **Animations & Effects** | Framer Motion, HTML5 Canvas Starfield, Canvas-Confetti |
| **PDF Generation** | `jspdf` |
| **Authentication** | JWT (`jsonwebtoken`), `bcryptjs`, Secure HttpOnly cookies |
| **Database** | File-backed JSON database engine (`data/database.json`) with atomic writes |
| **Payment Gateway** | Razorpay (Order creation + signature verification) |

---

## 🚀 Quick Start Guide

### 1. Installation
Clone or navigate to the project directory:
```bash
cd taksh_astro
npm install
```

### 2. Environment Configuration (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(All features run out of the box with built-in astronomical ephemeris and default database seeds without requiring external API keys).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔑 Pre-Seeded Accounts

| Role | Email | Password | Tier |
|---|---|---|---|
| **Administrator** | `admin@astroverse.com` | `admin123` | Premium / Admin |
| **Standard User** | `user@astroverse.com` | `user123` | Pro User |

---

## 📄 License
Created for ASTROVERSE Technologies. All rights reserved.
