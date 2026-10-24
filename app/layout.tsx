import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/content/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const defaultTitle = `${site.name} · ${site.shortRole}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.wordmark}`,
  },
  description: site.description,
  keywords: [
    "Daniel Webala",
    "software engineer",
    "full-stack developer",
    "React Native developer",
    "system design",
    "DevOps",
    "Nairobi",
    "Next.js",
    "Django",
    "Node.js",
    "M-Pesa integration",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.wordmark,
    title: defaultTitle,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/w-logo.png", width: 512, height: 512, alt: site.wordmark }],
  },
  twitter: {
    card: "summary",
    site: "@Webbie1001",
    creator: "@Webbie1001",
    title: defaultTitle,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
