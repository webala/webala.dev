import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering write-ups by Daniel Webala on payments, performance, Next.js and the systems behind the products.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
