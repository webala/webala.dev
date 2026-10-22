export const site = {
  name: "Daniel Webala",
  wordmark: "webala.dev",
  role: "Lead Engineer · Full-stack",
  location: "Nairobi, Kenya",
  url: "https://webala.dev",
  email: "webaladaniel@gmail.com",
  description:
    "Daniel Webala is a Nairobi-based lead engineer building payment-grade web systems with Next.js, Node.js, Django and Postgres.",
  resumePdf: "/resume.pdf",
  resumeFileName: "Daniel_Webala_Resume.pdf",
  currentBuild: {
    name: "Swift POS",
    url: "https://app.swift9os.com",
    blurb:
      "a point-of-sale platform covering sales, inventory, purchase orders, role-based access and M-Pesa payments.",
  },
  socials: [
    {
      id: "email",
      label: "Email",
      handle: "webaladaniel@gmail.com",
      href: "mailto:webaladaniel@gmail.com",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "daniel-webala",
      href: "https://www.linkedin.com/in/daniel-webala-8b4992184/",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "webala",
      href: "https://github.com/webala",
    },
    {
      id: "x",
      label: "X / Twitter",
      handle: "@Webbie1001",
      href: "https://twitter.com/Webbie1001",
    },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
