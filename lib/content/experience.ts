export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  /** Indexes into `bullets` shown on the home page. */
  highlights: number[];
  stack: string[];
}

export const experience: Role[] = [
  {
    id: "mothan",
    title: "Lead Engineer",
    company: "Mothan Technologies",
    location: "Nairobi, Kenya",
    start: "Jun 2025",
    end: "Present",
    summary:
      "Leading engineering on a high-traffic gaming platform: ledgered balances, real-time odds and a CI/CD pipeline.",
    bullets: [
      "Engineered a Django backend for a gaming platform, integrating ledger accounts to track user and system balances, resulting in a 20% reduction in reconciliation time.",
      "Developed a Next.js frontend with SCSS styling, improving user engagement by 15% through a more responsive and intuitive interface.",
      "Implemented Redis caching strategies, decreasing average page load times by 40% and enhancing the overall user experience.",
      "Automated odds and sports data synchronization using cron jobs, reducing manual intervention by 90% and ensuring real-time accuracy.",
      "Established a CI/CD pipeline, accelerating deployment cycles by 50% and enabling faster iteration and feature releases.",
    ],
    highlights: [0, 4],
    stack: ["Django", "Next.js", "Redis", "PostgreSQL", "CI/CD"],
  },
  {
    id: "beatbnk",
    title: "Senior Developer",
    company: "BeatBnk Limited",
    location: "Nairobi, Kenya",
    start: "Jun 2025",
    end: "Present",
    summary:
      "Payments and real-time infrastructure for a fintech product: M-Pesa and Paystack integration, queues and test automation.",
    bullets: [
      "Engineered a Next.js frontend with Tailwind CSS, decreasing page load times by 40% and improving user engagement by 25% through optimized component rendering.",
      "Integrated M-Pesa and Paystack payment gateways into the Node.js backend, processing over 10,000 transactions in the first month with a 99.9% success rate.",
      "Streamlined message queue processing in the Node.js backend, reducing latency by 15% and improving the overall system responsiveness for real-time data updates.",
      "Developed and implemented Jest unit tests that improved code quality, leading to a 15% decrease in critical production issues.",
      "Collaborated with cross-functional teams to design and implement comprehensive end-to-end automated tests, resolving over 50 complex integration issues and improving system stability by 18%.",
    ],
    highlights: [1, 2],
    stack: ["Node.js", "Next.js", "Tailwind CSS", "M-Pesa", "Paystack", "Jest"],
  },
  {
    id: "videoelf",
    title: "Software Engineer",
    company: "VideoElf",
    location: "Nairobi, Kenya",
    start: "Nov 2024",
    end: "Jul 2025",
    summary:
      "Built a modular Next.js frontend and a parallel video-aggregation pipeline with Celery and Redis.",
    bullets: [
      "Developed a modular Next.js frontend, reducing codebase size by 50% and improving page load times by 30% through reusable component architecture.",
      "Engineered a scalable video aggregation pipeline using yt-dlp, Celery, and Redis, enabling parallel downloads and increasing video processing throughput by 40%.",
      "Authored comprehensive Swagger API documentation for the Django backend, clarifying endpoints and reducing integration time for new developers by an estimated 25%.",
      "Streamlined CI/CD pipelines with Docker and PM2, automating deployments and decreasing release cycles from 2 days to under 2 hours.",
      "Implemented client-side data caching strategies, leveraging browser storage to improve platform performance and reduce server load by 15%, resulting in a 10% decrease in hosting costs.",
    ],
    highlights: [1, 3],
    stack: ["Next.js", "Django", "Celery", "Redis", "Docker"],
  },
  {
    id: "ahkhul",
    title: "Software Engineer",
    company: "Ah Khul Limited",
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
    highlights: [2, 3],
    stack: ["Express.js", "React", "M-Pesa", "Redis", "JWT"],
  },
  {
    id: "spaceyatech",
    title: "Frontend Developer",
    company: "Space Ya Tech",
    location: "Nairobi, Kenya",
    start: "May 2021",
    end: "Dec 2024",
    summary:
      "Component library and in-app chat for MentorIst, plus mentoring junior engineers in React.",
    bullets: [
      "Developed and integrated 15+ reusable React components into the MentorIst project, accelerating UI development by 20% and improving code maintainability.",
      "Led a team of 3 engineers to build MentorIst's in-app chat feature, resulting in a 30% increase in user engagement within the first month of launch.",
      "Optimized REST API queries by implementing client-side caching, reducing average response times by 40% and improving the overall user experience.",
      "Trained 5 junior engineers in React concepts through the MentorIst mentorship program, improving their code quality scores by 25% within 6 weeks.",
      "Engineered and implemented a new user authentication flow using JWT, decreasing unauthorized access attempts by an estimated 90%.",
    ],
    highlights: [1, 3],
    stack: ["React", "REST", "JWT"],
  },
];

export const education = [
  {
    school: "Strathmore University",
    degree: "Bachelor's Degree in Business Information and Technology",
    location: "Nairobi, Kenya",
    start: "Sep 2024",
    end: "Present",
  },
];

export const summary =
  "Creative and collaborative Software Engineer with 5 years of experience delivering innovative solutions across frontend and backend systems. Skilled in JavaScript, TypeScript, React.js and Next.js for engaging user experiences, complemented by backend proficiency in Node.js, Django and Python. Dedicated to producing high-quality, maintainable code and fostering a collaborative team environment.";

export const skills = [
  "React + Next.js",
  "JavaScript + TypeScript",
  "Node.js + Express",
  "Python + Django",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Tailwind CSS",
  "Docker",
  "CI/CD pipelines",
  "Microservices architecture",
  "Linux / WSL",
  "Code optimization",
  "Debugging",
];
