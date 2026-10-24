export interface CaseStudy {
  /** Lowercase fragments matched against a project title from the database. */
  match: string[];
  domain: string;
  headline: string;
  problem: string;
  architecture: string[];
  decisions: { title: string; why: string }[];
  proof: { value: string; label: string }[];
  stack: string[];
}

/**
 * System-design write-ups for the products designed end to end. The project
 * rows (title, links, image, order) still come from the database; this file
 * supplies the architecture narrative and is the source of truth for it.
 */
export const caseStudies: CaseStudy[] = [
  {
    match: ["swift pos", "swift90s", "swiftpos"],
    domain: "Multi-tenant SaaS · Point of sale",
    headline: "Swift POS",
    problem:
      "Retail and restaurant businesses needed one system for sales, stock, purchasing, kitchen orders and reporting, with staff permissions that hold up across many tenants and payments that settle through M-Pesa.",
    architecture: [
      "Django REST Framework API on PostgreSQL, with Redis, Celery and Celery Beat for background work and Django Channels WebSockets pushing payment and kitchen updates live.",
      "Multi-tenant data model with role-based access control across 7 role levels, activity logs and audit trails, structured logging and rate limiting; OpenAPI schema generated with drf-spectacular.",
      "Three clients on one contract: a React + TypeScript web app, a Next.js admin panel and a React Native (Expo) app at feature parity, sharing types, Zod schemas, the API client and TanStack Query hooks through a pnpm monorepo package.",
      "M-Pesa STK Push with callback handling, paybill configuration and refunds; PDF receipts, Excel export, i18n and analytics dashboards.",
    ],
    decisions: [
      {
        title: "Per-device tokens without logging anyone out",
        why: "Moved auth from single DRF tokens to Knox per-device tokens (django-rest-knox) behind a backward-compatible fallback, then closed multi-tenant access-control gaps found along the way.",
      },
      {
        title: "Shared contracts instead of duplicated clients",
        why: "One typed package feeds web and mobile, so a schema change breaks the build rather than production.",
      },
      {
        title: "Operations designed in, not bolted on",
        why: "GitHub Actions type-checks shared, web and mobile and runs the backend suite; Docker Compose deploys to an Ubuntu VPS; Prometheus and Grafana watch it; backups go to Cloudflare R2.",
      },
    ],
    proof: [
      { value: "200+", label: "Backend tests in CI" },
      { value: "7", label: "Role levels" },
      { value: "3", label: "Clients, one shared contract" },
    ],
    stack: [
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Channels",
      "React",
      "TypeScript",
      "Next.js",
      "React Native",
      "Expo",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    match: ["jetcrash", "jet crash"],
    domain: "B2B platform · Real-time gaming",
    headline: "JetCrash",
    problem:
      "Betting operators wanted to embed real-time crash games in their own sites without trusting the game logic to the browser or each other, and without latency on bets and cash-outs.",
    architecture: [
      "Three services in Node.js, Express and TypeScript on PostgreSQL via Prisma: a game engine with PRNG-based crash points, a partner gateway, and an ops admin API, each validated with Zod.",
      "A React + Vite game client rendered with PixiJS and driven over Socket.IO, a Next.js ops dashboard and a Next.js showcase site; operators embed 7 games via iframe.",
      "Hot paths (bet placement, cash-outs, auto cash-outs) run through a distributed queue, cutting transaction latency by 30%+.",
      "Partner gateway handles authentication and sessions; requests are signed with private keys and verified with public keys, and webhooks are HMAC-signed.",
    ],
    decisions: [
      {
        title: "Separate the engine from the partners",
        why: "Operators never touch game state directly. The gateway is the only door, so trust boundaries are explicit and auditable.",
      },
      {
        title: "Sign everything crossing an organisation boundary",
        why: "Key-signed requests and HMAC webhooks reduced integration errors by 15% and gave partners a verifiable contract.",
      },
      {
        title: "Test and observe across five repositories",
        why: "600+ automated tests (Vitest, Supertest, Playwright), GitHub Actions building Docker images and deploying to a Linode VPS, Prometheus and Grafana, Pino structured logs, admin audit logs and downtime alerts.",
      },
    ],
    proof: [
      { value: "600+", label: "Automated tests, 5 repos" },
      { value: "30%+", label: "Lower transaction latency" },
      { value: "7", label: "Embeddable games" },
    ],
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "React",
      "PixiJS",
      "Next.js",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    match: ["kikapu"],
    domain: "Mobile · Group finance",
    headline: "Kikapu",
    problem:
      "Savings groups (chamas) keep money records that several officials must agree on and that must never be silently edited. The app had to make that true on a phone, offline-tolerant, with M-Pesa in the loop.",
    architecture: [
      "React Native with Expo Router and TypeScript, TanStack Query and Zustand, supabase-js with sessions in SecureStore; released on the iOS App Store.",
      "Supabase PostgreSQL with row-level security policies, Deno Edge Functions and Zod schemas shared with the client.",
      "Double-entry, append-only SQL ledger: balanced debit and credit lines, amounts stored as integer cents, updates and deletes blocked by triggers, corrections recorded as new adjustment transactions.",
      "Idempotent M-Pesa callback handling keyed on a unique external reference, so replays return the existing transaction instead of a duplicate.",
    ],
    decisions: [
      {
        title: "The database enforces the rules",
        why: "Triggers and RLS mean a buggy client, a replayed webhook or a curious user cannot corrupt a group's books.",
      },
      {
        title: "Quorum before money moves",
        why: "Payouts and expenses need approval from group officials before they are recorded, mirroring how chamas actually decide.",
      },
    ],
    proof: [
      { value: "iOS", label: "Live on the App Store" },
      { value: "0", label: "Mutable ledger rows" },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row-level security",
      "Deno",
      "Zod",
      "M-Pesa",
    ],
  },
];

export function findCaseStudy(title: string): CaseStudy | undefined {
  const t = title.toLowerCase();
  return caseStudies.find((c) => c.match.some((m) => t.includes(m)));
}
