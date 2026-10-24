export type Engagement = "Contract" | "Employment";

export interface Role {
  id: string;
  title: string;
  company: string;
  engagement: Engagement;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  /** Indexes into `bullets` shown on the home page. */
  highlights: number[];
  stack: string[];
}

/** Roles, newest first. Titles, dates and figures are kept exactly as verified. */
export const experience: Role[] = [
  {
    id: "grabride",
    title: "React Native Engineer",
    company: "Grabride",
    engagement: "Contract",
    location: "Nairobi, Kenya",
    start: "Apr 2026",
    end: "Present",
    summary:
      "Rider and driver apps for a Kenyan ride-hailing platform, shipped to the iOS App Store and Google Play.",
    bullets: [
      "Build the rider and driver apps in React Native and TypeScript on Expo SDK 57 and React Native 0.86 (New Architecture) with Expo Router, NativeWind and Gluestack UI.",
      "Designed the driver onboarding and KYC flow: multi-step driver and vehicle details, document uploads, a selfie and liveness check, and a verification status flow so drivers can only go online once approved.",
      "Ride booking, taxi type selection, driver matching, trip tracking and live ETA on Google Maps Platform (Maps SDK, Routes API), with Firebase, Google Sign-In, push notifications and background location for drivers.",
      "Typed API layer with TanStack Query and axios, request throttling and rate limiting; forms with React Hook Form and schema validation.",
      "Upgraded both apps to Expo SDK 57 / React Native 0.86; GitHub Actions pull-request checks and a release pipeline that builds signed Android App Bundles; Jest tests with jest-expo.",
      "Work through pull requests with another engineer in the company GitHub organisation; handled Google Play listing and policy fixes.",
    ],
    highlights: [1, 4],
    stack: ["React Native", "Expo", "TypeScript", "Google Maps Platform", "Firebase", "GitHub Actions"],
  },
  {
    id: "beatbnk",
    title: "Software Engineer",
    company: "BeatBnk Limited",
    engagement: "Contract",
    location: "Nairobi, Kenya",
    start: "Jun 2025",
    end: "May 2026",
    summary:
      "Fintech product work across a Next.js front end and a Node.js microservices backend: payments, KYC, queues and test automation.",
    bullets: [
      "Integrated M-Pesa and Paystack payment gateways into the Node.js backend: 1,000+ transactions in the first month at a 99.9% success rate.",
      "Made payment processing idempotent, eliminating double charges and cutting transaction error rates by 25%.",
      "Built the KYC flow: ID document upload during onboarding, a pending / approved / rejected verification status flow, and admin review tools for staff.",
      "Streamlined message-queue processing in the backend, reducing latency by 15% for real-time data updates.",
      "Shipped new microservices features that improved application performance by 15% for a user base of 50,000+; led a refactor of legacy microservice code that reduced complexity by 40%.",
      "Next.js and Tailwind CSS front end with optimised component rendering: page load times down 40%, engagement up 25%.",
      "Jest unit tests that cut critical production issues by 15%; with cross-functional teams, end-to-end automated tests that resolved 50+ integration issues and improved stability by 18%.",
      "With mobile and marketing teams, delivered new API endpoints that launched 2 product features 2 weeks ahead of schedule.",
    ],
    highlights: [1, 4],
    stack: ["Node.js", "Next.js", "Microservices", "Message queues", "M-Pesa", "Paystack", "Jest"],
  },
  {
    id: "mothan",
    title: "Tech Lead",
    company: "Mothan Technologies (Cheddaz Bet)",
    engagement: "Contract",
    location: "Nairobi, Kenya",
    start: "Jun 2025",
    end: "Dec 2025",
    summary:
      "Led a team of 2–3 engineers on a sports-betting platform and owned its architecture: stack, service design, data model and infrastructure.",
    bullets: [
      "Owned architecture decisions (stack, service design, data model, infrastructure), code review and coding standards for a team of 2–3 engineers.",
      "Django backend with ledger accounts for user and system balances, cutting reconciliation time by 20%.",
      "Near-real-time bet updates with 90% lower latency for 10,000+ concurrent users; asynchronous task processing brought average response times down 25%.",
      "Automated odds and sports data sync with cron jobs (manual intervention down 90%) and bet settlement scripts that made settlement 50% faster and saved 15 hours a week of manual work.",
      "Redis caching (average page load down 40%), a CI/CD pipeline (deployments 50% faster) and Prometheus and Grafana monitoring that halved critical error detection time.",
      "Next.js front end with SCSS, engagement up 15%; a front-end architecture refactor lifted retention 15% in the first quarter after launch.",
      "API documentation for 5+ external teams, cutting their onboarding time by 30%.",
    ],
    highlights: [0, 2],
    stack: ["Django", "PostgreSQL", "Redis", "Next.js", "Prometheus", "Grafana", "CI/CD"],
  },
  {
    id: "videoelf",
    title: "Software Engineer",
    company: "VideoElf",
    engagement: "Contract",
    location: "Nairobi, Kenya",
    start: "Nov 2024",
    end: "Jul 2025",
    summary:
      "Modular Next.js front end, a design system, and a parallel video-aggregation pipeline on Celery and Redis.",
    bullets: [
      "Engineered a video aggregation pipeline with yt-dlp, Celery and Redis for parallel downloads, raising processing throughput by 40%.",
      "Modular Next.js front end with a reusable component architecture: codebase 50% smaller, pages 30% faster to load.",
      "Design system applied across 5 product modules, cutting UI-related bug reports by 25%.",
      "CI/CD with Docker and PM2 took release cycles from 2 days to under 2 hours; backend logging and monitoring cut average error resolution time by 35%.",
      "Swagger API documentation for the Django backend, reducing new-developer integration time by about 25%.",
      "Client-side caching with browser storage reduced server load by 15% and hosting costs by 10%.",
    ],
    highlights: [0, 3],
    stack: ["Next.js", "Django", "Celery", "Redis", "Docker", "PM2"],
  },
  {
    id: "ahkhul",
    title: "Software Engineer",
    company: "Ah Khul Limited",
    engagement: "Employment",
    location: "Nairobi, Kenya",
    start: "Jan 2024",
    end: "Jul 2025",
    summary:
      "Gaming platforms: Express APIs, React game UIs, M-Pesa payments and JWT auth across products.",
    bullets: [
      "Developed a RESTful API using Express.js and Node.js, reducing server response time by 40% and improving overall platform performance.",
      "Engineered a React-based user interface for 2D games, resulting in a 30% increase in user engagement and a 20% reduction in bounce rate.",
      "Integrated M-Pesa payment gateway, processing over 10,000 transactions in the first month with a 99.99% success rate.",
      "Led a team of 4 engineers in implementing JWT authentication across all gaming platforms, enhancing security and reducing unauthorized access attempts by 60%.",
      "Revitalized platform performance by implementing Redis caching, decreasing database load by 50% and improving API response times by 25%.",
    ],
    highlights: [3, 4],
    stack: ["Express.js", "React", "Redis", "JWT", "M-Pesa"],
  },
  {
    id: "spaceyatech",
    title: "Frontend Developer",
    company: "Space Ya Tech",
    engagement: "Employment",
    location: "Nairobi, Kenya",
    start: "May 2021",
    end: "Dec 2024",
    summary:
      "Component library, in-app chat and authentication for Mentorlst, a mentorship platform, plus mentoring junior engineers.",
    bullets: [
      "Built 15+ reusable React components for Mentorlst, making UI development 20% faster.",
      "Led a team of 3 engineers to build Mentorlst's in-app chat, lifting user engagement 30% in its first month.",
      "REST API data fetching with client-side caching, bringing average response times down 40%.",
      "Mentored 5 junior engineers in React through the Mentorlst mentorship program; their code quality scores rose 25% within 6 weeks.",
      "Implemented the JWT-based user authentication flow.",
    ],
    highlights: [1, 3],
    stack: ["React", "REST", "JWT"],
  },
];

export const education = [
  {
    school: "Strathmore University",
    degree: "Bachelor's Degree, Business Information Technology (in progress)",
    location: "Nairobi, Kenya",
    start: "Sep 2024",
    end: "Present",
  },
];

export const summary =
  "Software engineer with 5+ years building production web, mobile and backend systems, from a multi-tenant point-of-sale SaaS and a real-time gaming platform to ride-hailing apps and a video pipeline. Comfortable owning a system end to end: data model, services, clients, CI/CD and monitoring. Works in TypeScript and Python across React, Next.js, React Native, Node.js and Django, mostly with remote teams.";

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML, CSS, SCSS"] },
  {
    label: "Web",
    items: ["React", "Next.js", "TanStack Query", "TanStack Table", "React Hook Form", "Zod", "Tailwind CSS", "Vite"],
  },
  { label: "Mobile", items: ["React Native", "Expo", "Expo Router", "EAS", "iOS App Store and Google Play releases"] },
  {
    label: "Backend and APIs",
    items: ["Node.js", "Express", "Django", "Django REST Framework", "REST API design", "WebSockets (Socket.IO, Django Channels)", "Microservices", "Message queues", "Celery", "Prisma"],
  },
  { label: "Data", items: ["PostgreSQL", "Supabase", "Redis", "MongoDB"] },
  {
    label: "Infrastructure and DevOps",
    items: ["Docker", "GitHub Actions CI/CD", "Linux", "Nginx reverse proxy", "SSL/TLS, firewall and VPS hardening", "PM2", "Prometheus", "Grafana", "AWS (EC2, S3, RDS)", "GCP (Maps Platform, Firebase)", "Cloudflare R2", "Vercel"],
  },
  { label: "Testing", items: ["Jest", "Vitest", "Supertest", "Playwright", "pytest"] },
  {
    label: "Security and payments",
    items: ["JWT and token auth", "HMAC and public-key request signing", "Row-level security", "M-Pesa", "Paystack"],
  },
];
