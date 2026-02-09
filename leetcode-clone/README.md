# LeetCode Clone

A full-stack LeetCode-style coding platform built with Next.js 16, featuring authentication, dark/light themes, and a PostgreSQL database.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Features Implemented](#features-implemented)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Environment Variables](#environment-variables)
6. [Getting Started](#getting-started)

---

## Tech Stack

| Category       | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js 16.1.6                 |
| Frontend       | React 19.2.3                   |
| Styling        | Tailwind CSS 4                 |
| UI Components  | shadcn/ui (New York style)     |
| Icons          | Lucide React                   |
| Authentication | Clerk                          |
| Database       | PostgreSQL (Neon Serverless)   |
| ORM            | Prisma 7.3.0 with Neon Adapter |
| Theme          | next-themes                    |

---

## Project Structure

```
leetcode-clone/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles & Tailwind
│   ├── layout.js                 # Root layout with providers
│   ├── (auth)/                   # Auth route group
│   │   ├── layout.jsx            # Centered auth layout
│   │   ├── sign-in/              # Sign-in page
│   │   └── sign-up/              # Sign-up page
│   └── (root)/                   # Main app route group
│       ├── layout.jsx            # Root layout with navbar
│       └── page.jsx              # Homepage/landing page
│
├── components/                   # Reusable components
│   ├── providers/                # Context providers
│   │   └── theme-provider.jsx    # Dark/light theme provider
│   └── ui/                       # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── badge.jsx
│       ├── mode-toggle.jsx       # Theme toggle dropdown
│       └── ... (40+ components)
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication module
│   │   └── actions/
│   │       └── index.js          # Server actions (onboard, role check)
│   └── home/
│       └── components/
│           └── navbar.jsx        # Navigation bar
│
├── lib/                          # Utility libraries
│   ├── db.js                     # Prisma client with Neon adapter
│   └── utils.js                  # Helper functions (cn)
│
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma             # Database models
│   └── migrations/               # Migration history
│
├── middleware.js                 # Clerk auth middleware
└── components.json               # shadcn/ui configuration
```

---

## Features Implemented

### 1. Authentication System

- **Clerk Integration** - Complete authentication with sign-in/sign-up
- **Protected Routes** - Middleware to protect private pages
- **User Onboarding** - Auto-creates user in database on first visit
- **Role-Based Access** - USER and ADMIN roles

### 2. Database Setup

- **PostgreSQL with Neon** - Serverless PostgreSQL database
- **Prisma ORM** - Type-safe database queries
- **Neon Adapter** - Optimized for serverless/edge environments
- **User Model** - Stores user data synced with Clerk

### 3. Theme System

- **Dark/Light Mode** - Full theme support
- **System Preference** - Respects OS theme setting
- **Persistent Theme** - Saves user preference
- **Theme Toggle** - Dropdown menu in navbar

### 4. UI Components

- **40+ shadcn/ui components** - Pre-built accessible components
- **Responsive Design** - Mobile-first approach
- **Custom Styling** - Amber/Indigo color scheme

### 5. Landing Page

- **Hero Section** - Eye-catching intro with CTAs
- **Features Section** - Platform highlights
- **Problem Categories** - Easy/Medium/Hard sections
- **Statistics Display** - Platform metrics
- **CTA Section** - Call-to-action footer

### 6. Navigation

- **Floating Navbar** - Glassmorphism design
- **User Button** - Profile dropdown when signed in
- **Admin Controls** - "Create Problem" for admins
- **Navigation Links** - Problems, About, Profile

---

## Step-by-Step Implementation

### Step 1: Project Setup

Created a Next.js 16 project with the following configuration:

```bash
npx create-next-app@latest leetcode-clone
```

Configuration choices:

- JavaScript (no TypeScript)
- Tailwind CSS
- App Router
- ESLint

---

### Step 2: Install Dependencies

```bash
# UI Components
npm install @base-ui/react class-variance-authority clsx cmdk lucide-react radix-ui tailwind-merge vaul

# Authentication
npm install @clerk/nextjs

# Database
npm install @prisma/client @prisma/adapter-neon @neondatabase/serverless ws
npm install prisma --save-dev

# Theme
npm install next-themes

# Additional UI
npm install embla-carousel-react react-day-picker react-resizable-panels recharts sonner date-fns
```

---

### Step 3: Configure Clerk Authentication

**Created:** `middleware.js`

```javascript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
```

**Purpose:** Protects all routes except sign-in, sign-up, and home page.

---

### Step 4: Setup Providers

**Created:** `app/layout.js`

- Wrapped app with `ClerkProvider` for authentication
- Wrapped app with `ThemeProvider` for dark/light mode
- Added Google fonts (Geist Sans & Mono)

**Created:** `components/providers/theme-provider.jsx`

- Thin wrapper around next-themes provider
- Enables system theme detection

---

### Step 5: Configure Database

**Created:** `prisma/schema.prisma`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  clerkId   String   @unique
  email     String   @unique
  role      UserRole @default(USER)
  firstName String?
  lastName  String?
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  USER
  ADMIN
}
```

**Created:** `lib/db.js`

- Configured Prisma with Neon serverless adapter
- Uses WebSocket for Node.js environment
- Lazy initialization with Proxy pattern
- Global caching to prevent connection exhaustion

---

### Step 6: Create Authentication Pages

**Created:** `app/(auth)/layout.jsx`

- Centered layout for auth pages

**Created:** `app/(auth)/sign-in/[[...sign-in]]/page.jsx`

- Renders Clerk's SignIn component

**Created:** `app/(auth)/sign-up/[[...sign-up]]/page.jsx`

- Renders Clerk's SignUp component

---

### Step 7: Create Server Actions

**Created:** `modules/auth/actions/index.js`

**Action 1: `onBoardUser()`**

- Gets current user from Clerk
- Creates/updates user in database using upsert
- Syncs Clerk data (name, email, image) to DB

**Action 2: `currentUserRole()`**

- Fetches user's role from database
- Used to show/hide admin features

---

### Step 8: Build Navigation

**Created:** `modules/home/components/navbar.jsx`

- Glassmorphism floating navbar design
- Logo and brand name
- Navigation links (Problems, About, Profile)
- Theme toggle button
- Conditional "Create Problem" button for admins
- Sign In/Sign Up buttons when logged out
- User avatar dropdown when logged in

---

### Step 9: Create Landing Page

**Created:** `app/(root)/page.jsx`

Sections implemented:

1. **Hero Section**
   - Animated badge
   - Bold headline with colored blocks
   - Descriptive subtext
   - CTA buttons (Start Coding, Browse Problems)
   - Statistics grid (50K+ problems, 10K+ users, etc.)

2. **Features Section**
   - 4 feature cards with icons
   - Interactive Coding, Track Progress, Global Community, Real-time Feedback

3. **Problem Categories**
   - 3 difficulty cards (Easy, Medium, Hard)
   - Color-coded (Amber for Easy/Hard, Indigo for Medium)
   - Problem counts and descriptions

4. **CTA Section**
   - Gradient background
   - Final call-to-action

---

### Step 10: Add shadcn/ui Components

Installed 40+ pre-built components:

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge dropdown-menu ...
```

Components include:

- Form elements (input, textarea, select, checkbox)
- Layout (card, dialog, drawer, sheet)
- Navigation (tabs, menubar, navigation-menu)
- Feedback (alert, sonner/toast, progress)
- Data display (table, avatar, badge)

---

### Step 11: Root Layout Setup

**Created:** `app/(root)/layout.jsx`

- Includes navbar with user role
- Background pattern (dot grid)
- Flex container for page content

---

## Environment Variables

Create a `.env` file with these variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd leetcode-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env` file with your Clerk and Neon credentials.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start development server

```bash
npm run dev
```

### 7. Open in browser

Navigate to `http://localhost:3000`

---

## What's Next?

Future features to implement:

- [ ] Problems listing page
- [ ] Problem detail page with code editor
- [ ] Code execution engine
- [ ] User profile page
- [ ] Submissions history
- [ ] Leaderboard
- [ ] Admin panel for problem creation
- [ ] Progress tracking
- [ ] Discussion forum

---

## Key Files Reference

| File                                      | Purpose              |
| ----------------------------------------- | -------------------- |
| `middleware.js`                           | Route protection     |
| `lib/db.js`                               | Database connection  |
| `modules/auth/actions/index.js`           | Auth server actions  |
| `modules/home/components/navbar.jsx`      | Navigation component |
| `app/(root)/page.jsx`                     | Landing page         |
| `prisma/schema.prisma`                    | Database schema      |
| `components/providers/theme-provider.jsx` | Theme context        |
| `components/ui/mode-toggle.jsx`           | Theme switcher       |

---

Built with Next.js 16, Clerk, Prisma, and Neon.
