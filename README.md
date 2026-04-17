# CodeForge

<p align="center">
  <img src="/public/logo.svg" alt="CodeForge Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>Master Problem Solving. Build Your Coding Skills.</strong>
</p>

<p align="center">
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge" alt="TypeScript" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </a>
</p>

---

## Overview

**CodeForge** is a full-stack coding practice platform built with Next.js 16, designed to help developers master problem-solving skills through hands-on practice. Inspired by leading coding platforms, it provides an interactive environment where users can solve real-world programming challenges, track their progress, and compete with developers worldwide.

Whether you're preparing for technical interviews or looking to sharpen your algorithmic skills, CodeForge offers a comprehensive set of tools to accelerate your programming journey.

---

## Features

### Core Features

- **Interactive Code Editor** - Write and execute code in multiple programming languages with a rich Monaco-based editor
- **Problem Library** - Access 500+ curated problems across Easy, Medium, and Hard difficulty levels
- **Real-time Code Execution** - Get instant feedback on your solutions using Judge0 integration
- **Submission History** - Track all your submissions with detailed results and explanations
- **Progress Tracking** - Monitor your improvement with analytics and achievement systems

### User Experience

- **Dark/Light Theme** - Full dark mode support with system preference detection
- **Responsive Design** - Mobile-first approach works seamlessly on all devices
- **Glassmorphism UI** - Modern, sleek interface with smooth animations

### Administration

- **Admin Dashboard** - Create and manage problems with a dedicated admin interface
- **Role-Based Access** - User and Admin roles with proper access control

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React 19 | UI library |
| Tailwind CSS 4 | Styling and design |
| shadcn/ui | Component library |
| Monaco Editor | Code editor |
| Lucide React | Icon system |
| next-themes | Dark/light mode |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Backend API |
| Prisma 7 | ORM |
| PostgreSQL (Neon) | Serverless database |
| Clerk | Authentication |
| Judge0 | Code execution engine |

### Developer Tools

| Technology | Purpose |
|------------|---------|
| ESLint | Code linting |
| TypeScript-ready | Type safety |
| VS Code | Recommended editor |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                        │
│  ┌─────────────┐  ┌───���─────────┐  ┌─────────────────────┐  │
│  │   Navbar   │  │   Pages    │  │   Monaco Editor    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Server (Node.js)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  App Router │  │  API Routes │  │  Server Actions    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                    │                    │
                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Clerk   │  │  Judge0   │  │    PostgreSQL     │  │
│  │ (Auth)    │  │ (Code)    │  │     (Neon)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication** - Clerk handles sign-in/sign-up, synced with PostgreSQL via Prisma
2. **Problem Fetching** - Server Actions retrieve problems from database
3. **Code Execution** - User code sent to Judge0 API, results returned to client
4. **Submission Storage** - All submissions saved to PostgreSQL for history

---

## Screenshots

> Add your screenshots here to showcase the UI

| Page | Description |
|------|------------|
| Landing Page | Hero section with stats and CTA buttons |
| Problems List | Filterable table with difficulty badges |
| Problem Detail | Split-pane with editor and description |
| Profile | User stats and submission history |

---

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL database (Neon) or local PostgreSQL
- Clerk account for authentication
- Judge0 API for code execution

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# ============================================
# CodeForge Environment Variables
# ============================================

# ============================================
# Judge0 Code Execution Engine
# ============================================
# URL where Judge0 is running (default: local Docker setup)
JUDGE0_API_URL=http://localhost:2358

# Authentication token for Judge0 (must match judge0.conf AUTHN_TOKEN)
# Only needed if DISABLE_AUTH=false in judge0.conf
JUDGE0_AUTH_TOKEN=your-secret-auth-token-change-me

# ============================================
# Database (Already configured via Clerk/Prisma)
# ============================================
# DATABASE_URL=your-neon-database-url

# ============================================
# Clerk Authentication (Already configured)
# ============================================
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
# CLERK_SECRET_KEY=your-secret
```

### Step 4: Set Up the Database

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

### Step 5: Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Usage Guide

### For Developers

1. **Sign Up** - Create an account using Clerk authentication
2. **Browse Problems** - Navigate to the Problems page to view all challenges
3. **Solve Problems** - Click on any problem to open the code editor
4. **Run Code** - Use "Run" to test your solution against sample tests
5. **Submit** - Submit your final solution for evaluation

### For Administrators

1. **Access Admin Features** - Sign in with an admin account
2. **Create Problem** - Click "Create Problem" in the navbar
3. **Fill Form** - Add problem title, description, difficulty, and test cases
4. **Publish** - Make the problem available to all users

---

## Folder Structure

```
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with providers
│   ├── globals.css               # Global styles & Tailwind
│   ├── (auth)/                   # Auth route group
│   │   ├── layout.jsx            # Centered auth layout
│   │   ├── sign-in/              # Sign-in page
│   │   └── sign-up/              # Sign-up page
│   ├── (root)/                   # Main app route group
│   │   ├── layout.jsx            # Root layout with navbar
│   │   ├── page.jsx              # Homepage/landing page
│   │   ├── problems/             # Problems list page
│   │   ├── problem/[id]/         # Problem detail page
│   │   ├── profile/              # User profile page
│   │   ├── about/                # About page
│   │   └── create-problem/       # Admin problem creation
│   ├── api/                      # API routes
│   └── problem/[id]/             # Problem API
│
├── components/                   # Reusable UI components
│   ├── providers/                # Context providers
│   │   └── theme-provider.jsx    # Dark/light theme
│   └── ui/                       # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── badge.jsx
│       ├── mode-toggle.jsx
│       ├── dialog.jsx
│       └── ... (40+ components)
│
├── modules/                      # Feature modules
│   ├── auth/
│   │   └── actions/index.js        # Server actions (onboard, role check)
│   ├── problems/
│   │   ├── actions/             # Problem actions
│   │   └── components/          # Problem components
│   ├── profile/
│   │   └── components/          # Profile components
│   └── home/
│       └── components/
│           └── navbar.jsx        # Navigation bar
│
├── lib/                          # Utility libraries
│   ├── db.js                     # Prisma client
│   ├── utils.js                  # Helper functions
│   └── judge0.js                 # Judge0 integration
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database models
│   └── migrations/               # Migration history
│
├── public/                       # Static assets
│   ├── logo.svg                 # Logo
│   └── ...                      # Other assets
│
├── middleware.js                  # Clerk middleware
├── components.json               # shadcn/ui config
└── package.json                # Dependencies
```

---

## API Endpoints

### Server Actions (Recommended)

| Action | Purpose |
|--------|---------|
| `getAllProblems()` | Fetch all problems |
| `getProblemById(id)` | Fetch single problem |
| `executeCode(code, language, problemId)` | Run code with Judge0 |
| `getAllSubmissionByCurrentUserForProblem(id)` | Get user submissions |
| `createProblem(data)` | Create new problem (Admin) |

### Authentication

Handled entirely by Clerk:
- Sign In: `/sign-in`
- Sign Up: `/sign-up`

---

## Key Highlights

### Why CodeForge Stands Out

1. **Modern Tech Stack** - Built on Next.js 16 with the latest React features
2. **Serverless Database** - Neon provides scalable PostgreSQL without infrastructure management
3. **Real-time Execution** - Judge0 integration for instant code feedback
4. **Professional UI** - Glassmorphism design with shadcn/ui components
5. **Type-Safe** - Full type safety with Prisma ORM
6. **Authentication** - Secure auth with Clerk, including role-based access

### What Makes This Project Unique

- **Server Actions** - Modern Next.js data mutation without API routes
- **Split-Pane Editor** - Monaco editor with problem description side-by-side
- **Submission History** - Complete tracking of all user submissions
- **Admin Panel** - Full CRUD operations for problem management

---

## Future Improvements

- [ ] Leaderboard system
- [ ] Discussion forum for problems
- [ ] Company-specific problem sets
- [ ] Team/company accounts
- [ ] Contest system
- [ ] AI-powered hints
- [ ] Code review system
- [ ] Mobile app

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add some AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

Please make sure your code passes linting:

```bash
npm run lint
```

---

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## Author

**Abhishek** - Founder & Developer

- GitHub: [github.com](https://github.com)
- Email: contact@example.com
- LinkedIn: [linkedin.com](https://linkedin.com)

---

## Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor) - The editor that powers VS Code
- [Judge0](https://judge0.com) - Open source code execution engine
- [Clerk](https://clerk.com) - Authentication & user management

---

<div align="center">

**Built with Next.js, Prisma, and ❤️**

</div>