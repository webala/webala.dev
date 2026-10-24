export const site = {
  name: "Daniel Webala",
  wordmark: "webala.dev",
  role: "Software Engineer · Full-stack, React Native & DevOps",
  shortRole: "Software Engineer",
  location: "Nairobi, Kenya",
  timezone: "UTC+3",
  url: "https://webala.dev",
  email: "webaladaniel@gmail.com",
  description:
    "Daniel Webala is a Nairobi-based software engineer who designs and builds web, mobile and backend systems end to end: React and Next.js, React Native, Node.js and Django, with the CI/CD, containers and monitoring to run them.",
  availability:
    "Open to contract and freelance work: full-stack web, React Native apps, backend APIs and DevOps. Remote with overlap for Europe and US Eastern hours, or on site in Nairobi. Can start within a week.",
  resumePdf: "/resume.pdf",
  resumeFileName: "Daniel_Webala_Resume.pdf",
  currentBuild: {
    name: "Swift POS",
    url: "https://app.swift9os.com",
    blurb: "a multi-tenant point-of-sale platform in production.",
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
    { label: "Approach", href: "/#approach" },
    { label: "Experience", href: "/#experience" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
