import { Project } from "@/types";

/**
 * Shown only when the `projects` query fails or returns nothing, so the Work
 * section never renders empty. Titles match `case-studies.ts`, so the fallback
 * renders the same case studies. Real rows are managed in the admin dashboard.
 */
export const fallbackProjects: Project[] = [
  {
    id: "fallback-swift-pos",
    title: "Swift POS",
    description:
      "Multi-tenant point-of-sale SaaS for retail and restaurants, in production.",
    demo_url: "https://app.swift9os.com",
    technologies: ["Django REST Framework", "React", "React Native", "PostgreSQL"],
    featured: true,
    created_at: "2024-01-01T00:00:00.000Z",
    order_index: 1,
  },
  {
    id: "fallback-jetcrash",
    title: "JetCrash",
    description:
      "B2B real-time crash-gaming platform that operators embed via iframe.",
    technologies: ["Node.js", "TypeScript", "Socket.IO", "PostgreSQL"],
    featured: true,
    created_at: "2026-01-01T00:00:00.000Z",
    order_index: 2,
  },
  {
    id: "fallback-kikapu",
    title: "Kikapu",
    description:
      "Bookkeeping app for savings groups, released on the iOS App Store.",
    technologies: ["React Native", "Expo", "Supabase", "PostgreSQL"],
    featured: true,
    created_at: "2026-09-01T00:00:00.000Z",
    order_index: 3,
  },
];
