import { Project } from "@/types";

/**
 * Shown only when the Supabase `projects` query fails or returns nothing,
 * so the Work section never renders empty. Real projects are managed in the
 * admin dashboard.
 */
export const fallbackProjects: Project[] = [
  {
    id: "fallback-swift-pos",
    title: "Swift POS",
    description:
      "A point-of-sale platform for bars, restaurants and retail: sales, inventory, purchase orders, customers, staff and role-based access, reporting and analytics, and payment processing through M-Pesa.",
    demo_url: "https://app.swift9os.com",
    technologies: [
      "React",
      "TypeScript",
      "Django",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Daraja API",
    ],
    featured: true,
    created_at: "2025-01-01T00:00:00.000Z",
    order_index: 1,
  },
];
