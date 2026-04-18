# CodeForge

<p align="center">
  <strong>A full-stack coding interview platform built for serious DSA practice.</strong><br />
  Solve problems, run code in multiple languages, track progress, and manage curated problem sets in a production-style web app.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" /></a>
  <a href="https://clerk.com/"><img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" /></a>
</p>

## Overview

**CodeForge** is a LeetCode-style coding platform designed to feel closer to a real product than a tutorial project. It combines secure authentication, live code execution, persistent user progress, admin-driven problem creation, and structured practice workflows in one modern full-stack app.

It was built to solve a practical problem: most coding practice platforms are either too limited for learning projects or too large to understand deeply. CodeForge sits in the middle. It gives users a focused environment for interview prep and DSA practice, while also serving as a strong engineering project that demonstrates product thinking, system design, and full-stack execution.

## Why This Project Exists

Interview preparation is not just about solving problems. It is about:

- practicing consistently in a realistic coding environment
- reviewing past submissions and progress over time
- organizing problems into reusable playlists
- supporting multiple languages and test-case based validation
- building a platform that mirrors real-world product constraints

CodeForge was created to bring those pieces together in one polished developer experience.

## What Makes CodeForge Stand Out

- **Live execution with Judge0** for fast, practical feedback on code submissions
- **Multi-language problem support** with language-specific starter code and reference solutions
- **Admin problem creation flow** with validation against real test cases before publishing
- **Progress tracking and analytics** to make practice measurable
- **Playlist-based learning** for curated topic prep such as arrays, graphs, or interview sets
- **Production-style architecture** using Next.js App Router, server actions, Prisma, Clerk, and Neon

## Live Demo

- **Live App:** https://codeforge-neon.vercel.app/

## Core Features

### Problem Solving Experience

- Browse coding problems with difficulty and tag metadata
- Open a dedicated coding workspace for each problem
- Write solutions in multiple languages using Monaco Editor
- Run code against test cases and inspect execution results

### Practice Management

- Save user progress and submission history
- Track solved problems over time
- Organize questions into custom playlists
- Review previous attempts from the profile dashboard

### Admin Workflow

- Create new problems from a dedicated admin interface
- Define examples, constraints, hints, test cases, and editorial content
- Validate reference solutions before saving problems to the database

### User Experience

- Clerk-based authentication and protected routes
- Responsive UI built with Tailwind CSS and reusable UI primitives
- Light and dark theme support
- Toast feedback and dashboard-style interactions

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Monaco Editor |
| UI | Radix UI, Lucide React, Sonner |
| Backend | Next.js App Router, Server Actions, Route Handlers |
| Database | PostgreSQL (Neon), Prisma ORM, Prisma Neon Adapter |
| Authentication | Clerk |
| Code Execution | Judge0 |
| Charts / Analytics | Recharts |

## Architecture

CodeForge uses a serverless-first architecture focused on fast iteration, clean boundaries, and production-style data flow.

```mermaid
graph TD
    Client[Browser / React 19] --> NextJS[Next.js App Router]
    NextJS --> Clerk[Clerk Authentication]
    NextJS --> Routes[Server Actions and API Routes]
    Routes --> Prisma[Prisma ORM]
    Prisma --> Neon[Neon PostgreSQL]
    Routes --> Judge0[Judge0 API]
    Judge0 --> Execution[Sandboxed Code Execution]
```

### How It Works

1. Users authenticate through Clerk and access protected routes through server-side route guards.
2. Problem data, playlists, submissions, and user state are persisted in PostgreSQL through Prisma.
3. Code execution requests are sent to Judge0 in batches for efficient test-case validation.
4. The UI renders a responsive coding workspace and analytics-driven profile experience through the Next.js App Router.

## Project Structure

```bash
CodeForge/
|-- app/                    # Next.js App Router routes and layouts
|   |-- (auth)/             # Authentication pages
|   |-- (root)/             # Main application routes
|   |-- api/                # Route handlers
|   |-- create-problem/     # Admin problem creation UI
|   `-- problem/[id]/       # Coding workspace
|-- components/             # Shared UI and providers
|-- hooks/                  # Custom React hooks
|-- lib/                    # Core utilities, DB client, Judge0 helpers
|-- modules/                # Domain modules: auth, profile, problems, home
|-- prisma/                 # Prisma schema and migrations
|-- public/                 # Static assets
`-- proxy.js                # Clerk route protection
```

## Key Implementation Highlights

### Judge0 Execution Flow

Code execution is designed to handle realistic submission workflows rather than just single input/output calls.

- test cases are converted into batched Judge0 submissions
- execution is polled until all jobs are completed
- results are matched back to expected outputs
- admin reference solutions are validated before a problem is stored

### Database Access Strategy

The Prisma client is initialized lazily in `lib/db.js`, which helps reduce unnecessary startup work and fits well with serverless deployment patterns.

### Full-Stack Product Thinking

This project is not just a code runner. It models real product concerns:

- role-based access control
- persistent user state
- protected admin workflows
- dashboard visibility into user activity
- structured content management for problem authoring

## Local Setup

### Prerequisites

- Node.js 18+
- A PostgreSQL database, such as Neon
- A Clerk application
- A Judge0 instance or API endpoint

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
CLERK_SIGN_UP_FORCE_REDIRECT_URL=/

# Judge0
JUDGE0_API_URL="https://ce.judge0.com"
JUDGE0_AUTH_TOKEN=""
```

Use `.env.example` as the reference template. For production, store environment variables in your hosting provider instead of committing local env files.

### Installation

```bash
npm install
npx prisma generate
npx prisma db push
```

### Run the App

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint checks
- `npm run postinstall` - generate Prisma client

## Deployment

CodeForge is ready to deploy on platforms like **Vercel**.

### Recommended Production Setup

- **Frontend / App Hosting:** Vercel
- **Database:** Neon PostgreSQL
- **Authentication:** Clerk
- **Code Execution Engine:** Judge0

### Production Checklist

- add all required environment variables in Vercel
- run Prisma migrations against the production database
- configure Clerk redirect URLs for the deployed domain
- ensure the Judge0 endpoint is reachable from the deployed app

## Challenges and Learnings

Building CodeForge involved several practical engineering challenges:

- designing a clean execution flow for asynchronous Judge0 polling
- modeling coding problems, submissions, solved problems, and playlists in Prisma
- balancing product polish with backend correctness
- protecting admin-only actions while keeping the rest of the app accessible
- structuring the codebase into reusable domain modules instead of a flat app

This project helped strengthen skills in full-stack architecture, API integration, data modeling, and building developer-facing products with real-world complexity.


## License

This project is currently private and intended for educational and portfolio use.

---

<p align="center">Built to practice problem solving and demonstrate production-grade full-stack engineering.</p>
