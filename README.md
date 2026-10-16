# LIVERA — The Operating System for Living Culture

> *"Don't just preserve culture. Keep it alive."*

**LIVERA** is a competition-ready cultural technology platform designed to preserve, discover, authenticate, and transmit living cultural heritage, initially piloted in **West Bengal, India**.

---

## 🏛️ Startup Thesis & Core Outcomes

Traditional cultural preservation often treats heritage as a static museum archive or tourist curio. When living memory is severed from younger generations and master practitioners lack sustainable visibility, centuries-old oral knowledge, crafts, and musical philosophies vanish.

LIVERA connects four systematic outcomes:

1. **PRESERVE** — Digital encoding of vulnerable oral histories, songs, and indigenous techniques with contributor consent, rights attribution, and community ownership.
2. **DISCOVER** — Interactive geographic mapping and structured taxonomy of living traditions across crafts, music, rituals, and cuisine.
3. **CONNECT** — Peer-to-peer apprenticeship pathways connecting verified master craftspeople with learners, institutions, and research fellows.
4. **SUSTAIN** — Digital Cultural Passports with transparent provenance tracking, establishing fair compensation, intellectual protection, and institutional backing.

---

## 🚀 How to Run the Application

The application is completely self-contained using **HTML5, modern Vanilla CSS, and modular ES6 JavaScript** with local persistence. No external build steps, API keys, or paid services are required.

### Quick Start (Local Web Server)
Run the following in PowerShell / Terminal within the project folder:

```bash
# Using Python (already running on port 8080)
python -m http.server 8080
```

Open your browser at:
👉 **[http://localhost:8080](http://localhost:8080)**

*(Alternatively, `index.html` can also be opened directly in any modern web browser).*

---

## 🌟 Key Features & Interactive Workflows

### 1. Discover Experience (Home)
- **Hero Composition**: Visual tribute to Bengal's living heritage with headline *"Culture isn’t history. It’s alive."*
- **Impact Strip**: Prototype demonstration metrics (Stories Preserved: 1,240+, Practitioners: 186, Traditions: 42, Learning Hours: 3,800+).
- **Featured Cultural Traditions**: Interactive cards for Kantha embroidery, Bankura terracotta steeds, Baul mystic songs, Purulia Chhau masks, Patachitra scrolls, and Dokra lost-wax bronze.
- **Editorial Spotlight**: Deep-dive narrative on Gurupada Chitrakar (Patua bard of Pingla).
- **Institutional Partner Section**: Value propositions for museums, universities, tourism boards, and ethical brands, outlining future subscription, licensing, and facilitation commission models.

### 2. Living Archive (Knowledge Discovery)
- **14 Comprehensive Entries**: Detailed documentation across crafts, music, visual arts, folk satire, and culinary heritage.
- **Live Search & Filtering**: Instant search across titles, Bengali script, keywords, and tags. Filter pills by category (Craft, Music, Oral, Ritual, Culinary) and dropdown filtering by district.
- **Deep Detail Modal**: Context, lineage, raw material alchemy, technique description, provenance status badge, and related traditions.
- **Bookmarking**: Save traditions to a local collection stored in `localStorage`.

### 3. Artisans & Master Practitioners Directory
- **8 Detailed Illustrative Profiles**: Featuring master bards, sculptors, and weavers (Gurupada Chitrakar, Subhadra Devi Karmakar, Sadhan Das Baul, Dilip Kumbhakar, Kartik Sutradhar, Nimai Karmakar, Shampa Mondal, Manindra Nath Roy).
- **Lineage & Quote Cards**: Direct artisan testimonials, skill tags, experience, and ratings.
- **Request a Learning Session Workflow**: Interactive modal to express interest in virtual masterclasses or studio residencies. Form validates and generates a unique reference ID (e.g., `REQ-LIV-4821`) saved to local storage.

### 4. Learn a Craft (Apprenticeship Module)
- **3 Multi-Lesson Structured Pathways**:
  - *Nakshi Kantha Embroidery: From Cloth to Living Narrative* (Subhadra Devi)
  - *Bankura Terracotta: The Alchemy of Rarh Clay* (Dilip Kumbhakar)
  - *Voice of the Mystic: Fundamentals of Baul Music* (Sadhan Das Baul)
- **Interactive Lesson Player**: Step-by-step reading, knowledge check quizzes with instant answer feedback and educational explanations.
- **Progress Persistence**: Lesson completion tracking and progress bars saved to `localStorage`.

### 5. Interactive Cultural Map of Bengal
- **Stylized SVG Map**: Vector map of West Bengal with clickable regional pins for **Kolkata, Bankura, Bishnupur, Purulia, Shantiniketan, and Murshidabad**.
- **Dynamic Regional Hub Panel**: Updates featured practices, master practitioners, cultural landmarks, and one-click filtering into the Living Archive.

### 6. Digital Cultural Passports & Provenance Verification
- **Artifact Provenance Ledger**: Demonstrating transparent tracking of materials, techniques, and verification evidence without claiming unverified AI authentication.
- **Live Lookup**: Search by ID or click demo sample chips (`LIV-BEN-0842`, `LIV-TER-1109`, `LIV-PAT-3201`, `LIV-DOK-4590`).
- **Certificate View**: Official stamp seal, dimensions, provenance timeline, simulated ledger hash, and print/export action.

### 7. "Preserve a Story" Guided Workflow (Primary Interactive Feature)
- **4-Step Wizard**:
  - **Step 1**: Contributor Details (Name, Community/Village, Language, Category).
  - **Step 2**: Story Narrative, tradition name, approximate era, and simulated oral audio recording.
  - **Step 3**: Geographic context, who passed it down, and explicit cultural stewardship consent.
  - **Step 4**: Complete review summary, validation, and submission to the demo archive.
- **Generated Reference ID**: Produces unique IDs (e.g., `SUB-LIV-7391`) with transparent status *"Community contributed — awaiting editorial review"*.

### 8. Global Search & Demo State Controls
- **Global Search Modal**: Instant unified search across traditions, artisans, and pathways.
- **Saved Bookmarks Modal**: Dedicated drawer to inspect or remove saved traditions.
- **Reset Demo Data**: Bottom footer action to restore default seed state at any time.

---

## 📋 Startup Competition Judge Walkthrough Script

| Step | Action | What to Highlight to Judges |
| :--- | :--- | :--- |
| **1. Hook & Vision** | Open [http://localhost:8080](http://localhost:8080) | Introduce LIVERA as the Operating System for Living Culture. Point out the editorial warm ivory, parchment, and terracotta design language that rejects generic SaaS templates in favor of authentic cultural elegance. |
| **2. Living Archive** | Click **Living Archive** in nav | Type `Kantha` or select `Purulia`. Show the instant filtering. Click **Explore Story →** on *Purulia Chhau Martial Mask Craft* to demonstrate the depth of documented technique, GI Tag status, and regional context. Click the Bookmark icon. |
| **3. Master Practitioners** | Click **Artisans & Masters** | Highlight the human element. Open *Gurupada Chitrakar*’s profile. Show his linked Cultural Passport (`LIV-PAT-3201`). Click **Request Session** to demonstrate the peer-to-peer apprenticeship inquiry workflow. |
| **4. Cultural Passport** | Click **Passport** in nav | Click chip `LIV-TER-1109`. Show how LIVERA solves cultural counterfeiting and tourist exploitation through immutable provenance records, verified materials, and transparent validation tiers. |
| **5. Cultural Map** | Click **Cultural Map** | Click **Bankura**, **Shantiniketan**, and **Purulia** pins. Show how regional geography ties directly into featured practices and artisans. |
| **6. Learn a Craft** | Click **Learn a Craft** | Click **Start Pathway** on *Nakshi Kantha Embroidery*. Walk through Lesson 1, take the interactive quiz question, show the instant pedagogical feedback, and show how progress is tracked. |
| **7. Preserve a Story** | Click **Preserve a Story** in the top header | Walk through the 4-step wizard. Click the simulated voice recording button. Check the ethical consent box. Submit and show the generated reference ID and inclusion in the Community Registry. |

---

## 🎨 Design System Tokens

- **Backgrounds**: Warm Parchment (`#FDFBF7`), Surface Soft (`#F7F3EC`)
- **Primary Surfaces**: Deep Indigo (`#0A1128`), Midnight Blue (`#101935`)
- **Accents**: Terracotta (`#C85A32`), Vermilion (`#B83324`), Bengal Gold (`#C59A47`)
- **Typography**: Editorial Serif (`Playfair Display`, `Cinzel`) & Modern UI Sans (`Plus Jakarta Sans`)

---

*LIVERA — Keep Culture Alive.*
