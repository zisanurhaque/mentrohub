# MentroHub — The Internet's Most Educational Destination

MentroHub is a humorous educational entertainment platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

The humor comes from the bold contrast:
- **Visual Presentation**: Inspired by the iconic dark charcoal and warm orange visual language of popular video-sharing platforms.
- **Educational Content**: 100% legitimate, high-quality educational masterclasses from world-renowned educators like **3Blue1Brown**, **freeCodeCamp**, **Harvard CS50**, **Veritasium**, **Andrej Karpathy**, **StatQuest**, and **Khan Academy**.
- **Provocative-but-Innocent Marketing Copy**: Headlines like *"Come for the Curiosity. Stay for the Knowledge"*, *"Vectors Get Nasty: Essence of Linear Algebra Explained"*, and *"Your Search History Is About to Get Smarter"*.
- **100% Standalone & Zero Database Setup**: Runs immediately out of the box with zero external backend or MongoDB requirements. Uses rich, verified educational demo data and browser storage for personal progress, bookmarks, notes, and comments!

---

## 🚀 Key Features

1. **Rich Video Discovery**:
   - Homepage with Trending Lessons, Most Watched Knowledge, Popular Categories, Curated Collections, and Fresh Brain Food.
   - Adult-site inspired video cards with HD badge, duration overlay, verified creator badges, view counts, and approval rating pills.
2. **Official YouTube Video Watch Experience**:
   - Responsive YouTube embed with proper aspect ratio and error fallback.
   - Interactive Like/Dislike ratings with percentage indicators.
   - Save/Bookmark to personal learning list.
   - Mark as Completed / Learning Progress tracking.
   - Social URL share with clipboard feedback.
   - Interactive **Personal Study Notes** with timestamp tagging.
   - Interactive **Comments & Discussion** system with nested replies.
3. **Powerful Search & Discovery**:
   - Search by title, description, instructor, tags, and category.
   - Instant search autocomplete suggestions dropdown.
   - Filter by Category, Difficulty (Beginner, Intermediate, Advanced), and Duration (<10m, 10-30m, >30m).
   - Sort by Relevance, Most Viewed, Newest Uploads, and Top Rated.
4. **Curated Collections**:
   - Multi-lesson sequential curricula (e.g., *Learn Python From Scratch*, *Visual Mathematics*, *Full-Stack Web Mastery*, *Deep Neural Networks*, *Financial Freedom*).
5. **User Accounts & Personalization**:
   - Client session authentication with instant profile management.
   - Personal Learning Dashboard (`/dashboard`) with Watch History, Saved Lessons, and Study Progress.
   - Profile management (`/profile`) with avatar selection and bio.
   - One-click demo login buttons for instant evaluation.
6. **Admin Dashboard & CMS (`/admin`)**:
   - Role-Based Access Control (Admin role).
   - Real calculated platform analytics (Total Videos, Total Views, Users, Likes, Comments, Category breakdown).
   - Video Management: Add video simply by pasting any YouTube URL; automatically extracts YouTube video ID and high-res thumbnail.
   - Video catalog table with delete and preview actions.
   - Category management to create and manage taxonomy.
7. **SEO & Performance**:
   - Dynamic XML `sitemap.ts`, `robots.ts`, OpenGraph metadata, and Server Components.

---

## 🛠️ Prerequisites & Quick Start

- **Node.js**: v18.17+ or v20+
- **npm** / **yarn** / **pnpm**
- **Zero Database Required**: No MongoDB, MySQL, or external backend setup needed!

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

The login screen includes **Instant One-Click Demo Access** buttons:

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@mentrohub.com` | *(any)* | Full Admin Console (`/admin`), CMS, Analytics |
| **Student** | `student@mentrohub.com` | *(any)* | Learning Hub, History, Bookmarks, Notes |

---

## 🧪 Build and Verification

To verify linting, type-checking, and create an optimized production build:

```bash
# Run ESLint
npm run lint

# Run Production Build
npm run build

# Start Production Server
npm start
```

---

## 📁 Project Architecture

```
mentrovate/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin Dashboard & CMS
│   │   ├── categories/         # Category Hub & Detail Pages
│   │   ├── collections/        # Curated Series / Learning Paths
│   │   ├── dashboard/          # Student Learning Hub (History, Saved, Notes)
│   │   ├── login/              # User Login & Demo Access
│   │   ├── profile/            # Profile settings
│   │   ├── register/           # Registration
│   │   ├── search/             # Search & Multi-filter Discovery
│   │   ├── watch/[id]/         # Video Player, Description, Notes & Comments
│   │   ├── globals.css         # Dark Charcoal & Warm Orange design tokens
│   │   ├── layout.tsx          # Root layout with AuthProvider & SEO metadata
│   │   ├── not-found.tsx       # 404 handler
│   │   ├── page.tsx            # Homepage
│   │   ├── robots.ts           # Search engine directives
│   │   └── sitemap.ts          # Dynamic XML Sitemap generator
│   ├── components/
│   │   ├── auth/               # AuthContext & Provider
│   │   ├── cards/              # VideoCard, CategoryCard, CollectionCard
│   │   ├── layout/             # Navbar, Footer, Container, CategoryNav
│   │   └── watch/              # WatchPlayer, WatchActions, StudyNotes, WatchComments
│   ├── lib/
│   │   ├── client-store.ts     # Client-side state store (auth, bookmarks, history, notes, comments)
│   │   ├── db.ts               # In-memory data queries & analytics
│   │   ├── formatters.ts       # View count & relative time utilities
│   │   ├── seed-data.ts        # 26 verified educational video records
│   │   └── youtube.ts          # YouTube URL extractor & helpers
│   └── types/                  # TypeScript interfaces
└── .env.example
```

---

## ⚖️ Content & Copyright Note

MentroHub is a parody educational interface. All video content is embedded through YouTube's official public iframe mechanism in compliance with YouTube's Terms of Service and standard Fair Use principles for educational purposes. All educational lectures remain the copyrighted property of their respective creators (3Blue1Brown, freeCodeCamp, Veritasium, Harvard CS50, Fireship, Khan Academy, etc.).
