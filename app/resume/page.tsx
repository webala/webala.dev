"use client";

import Navigation from "@/components/Navigation";
import { Download, Mail, Linkedin, MapPin } from "lucide-react";

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Daniel_Webala_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-bg-dark pt-20 pb-12">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Download Button - Fixed Position */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>

        {/* Resume Content */}
        <div className="bg-bg-light rounded-xl shadow-2xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8 pb-8 border-b border-bg-lighter">
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4">
              Daniel Webala
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-text-secondary text-sm sm:text-base">
              {/* <a
                href="tel:0792396321"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Phone size={16} />
                0792396321
              </a> */}
              <a
                href="mailto:webaladaniel@gmail.com"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail size={16} />
                webaladaniel@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-webala-8b4992184/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                Nairobi, Kenya
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4 pb-2 border-b-2 border-primary inline-block">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Creative and collaborative Software Engineer with 5 years of
              experience delivering innovative solutions across frontend and
              backend systems. Skilled in utilizing JavaScript, TypeScript,
              React.js, and Next.js to build engaging user experiences,
              complemented by backend proficiency in Node.js, Django, and
              Python. Dedicated to producing high-quality, maintainable code and
              fostering a collaborative team environment.
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-6 pb-2 border-b-2 border-primary inline-block">
              WORK EXPERIENCE
            </h2>

            {/* Lead Engineer */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-text">Lead Engineer</h3>
                  <p className="text-text-secondary italic">
                    Mothan Technologies
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">Nairobi, Kenya</p>
                  <p className="text-text-secondary italic">
                    Jun 2025 - Present
                  </p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary">
                <li>
                  Engineered a Django backend for a gaming platform, integrating
                  ledger accounts to track user and system balances, resulting
                  in a 20% reduction in reconciliation time.
                </li>
                <li>
                  Developed a Next.js frontend with SCSS styling, improving user
                  engagement by 15% through a more responsive and intuitive
                  interface.
                </li>
                <li>
                  Implemented Redis caching strategies, decreasing average page
                  load times by 40% and enhancing the overall user experience.
                </li>
                <li>
                  Automated odds and sports data synchronization using cron
                  jobs, reducing manual intervention by 90% and ensuring
                  real-time accuracy.
                </li>
                <li>
                  Established a CI/CD pipeline, accelerating deployment cycles
                  by 50% and enabling faster iteration and feature releases.
                </li>
              </ul>
            </div>

            {/* Senior Developer */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-text">
                    Senior Developer
                  </h3>
                  <p className="text-text-secondary italic">BeatBnk Limited</p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">Nairobi, Kenya</p>
                  <p className="text-text-secondary italic">
                    Jun 2025 - Present
                  </p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary">
                <li>
                  Engineered a Next.js frontend with Tailwind CSS, decreasing
                  page load times by 40% and improving user engagement by 25%
                  through optimized component rendering.
                </li>
                <li>
                  Integrated M-Pesa and Paystack payment gateways into the
                  Node.js backend, processing over 10,000 transactions in the
                  first month with a 99.9% success rate.
                </li>
                <li>
                  Streamlined message queue processing in the Node.js backend,
                  reducing latency by 15% and improving the overall system
                  responsiveness for real-time data updates.
                </li>
                <li>
                  Developed and implemented Jest unit tests that improved code
                  quality, leading to a 15% decrease in critical production
                  issues.
                </li>
                <li>
                  Collaborated with cross-functional teams to design and
                  implement comprehensive end-to-end automated tests, resolving
                  over 50 complex integration issues and improving system
                  stability by 18%.
                </li>
              </ul>
            </div>

            {/* Software Engineer - VideoElf */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-text">
                    Software Engineer
                  </h3>
                  <p className="text-text-secondary italic">VideoElf</p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">Nairobi, Kenya</p>
                  <p className="text-text-secondary italic">
                    Nov 2024 - Jul 2025
                  </p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary">
                <li>
                  Developed a modular Next.js frontend, reducing codebase size
                  by 50% and improving page load times by 30% through reusable
                  component architecture (Technical Skills, Creative Skills).
                </li>
                <li>
                  Engineered a scalable video aggregation pipeline using yt-dlp,
                  Celery, and Redis, enabling parallel downloads and increasing
                  video processing throughput by 40% (Technical Skills,
                  Management Leadership Skills).
                </li>
                <li>
                  Authored comprehensive Swagger API documentation for the
                  Django backend, clarifying endpoints and reducing integration
                  time for new developers by an estimated 25% (Interpersonal
                  Skills, Creative Skills).
                </li>
                <li>
                  Streamlined CI/CD pipelines with Docker and PM2, automating
                  deployments and decreasing release cycles from 2 days to under
                  2 hours (Management Leadership Skills, Technical Skills).
                </li>
                <li>
                  Implemented client-side data caching strategies, leveraging
                  browser storage to improve platform performance and reduce
                  server load by 15%, resulting in a 10% decrease in hosting
                  costs (Technical Skills, Fiscal Data Skills).
                </li>
              </ul>
            </div>

            {/* Software Engineer - Ah Khul Limited */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-text">
                    Software Engineer
                  </h3>
                  <p className="text-text-secondary italic">Ah Khul Limited</p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">Nairobi, Kenya</p>
                  <p className="text-text-secondary italic">
                    Jan 2024 - Jul 2025
                  </p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary">
                <li>
                  Developed a RESTful API using Express.js and Node.js, reducing
                  server response time by 40% and improving overall platform
                  performance.
                </li>
                <li>
                  Engineered a React-based user interface for 2D games,
                  resulting in a 30% increase in user engagement and a 20%
                  reduction in bounce rate.
                </li>
                <li>
                  Integrated M-Pesa payment gateway, processing over 10,000
                  transactions in the first month with a 99.99% success rate.
                </li>
                <li>
                  Led a team of 4 engineers in implementing JWT authentication
                  across all gaming platforms, enhancing security and reducing
                  unauthorized access attempts by 60%.
                </li>
                <li>
                  Revitalized platform performance by implementing Redis
                  caching, decreasing database load by 50% and improving API
                  response times by 25%.
                </li>
              </ul>
            </div>

            {/* Frontend developer */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-text">
                    Frontend Developer
                  </h3>
                  <p className="text-text-secondary italic">Space Ya Tech</p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">Nairobi, Kenya</p>
                  <p className="text-text-secondary italic">
                    May 2021 - Dec 2024
                  </p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-text-secondary">
                <li>
                  Developed and integrated 15+ reusable React components into
                  the MentorIst project, accelerating UI development by 20% and
                  improving code maintainability.
                </li>
                <li>
                  Led a team of 3 engineers to build MentorIst&apos;s in-app chat
                  feature, resulting in a 30% increase in user engagement within
                  the first month of launch.
                </li>
                <li>
                  Optimized REST API queries by implementing client-side
                  caching, reducing average response times by 40% and improving
                  the overall user experience.
                </li>
                <li>
                  Trained 5 junior engineers in React concepts through the
                  MentorIst mentorship program, improving their code quality
                  scores by 25% within 6 weeks.
                </li>
                <li>
                  Engineered and implemented a new user authentication flow
                  using JWT, decreasing unauthorized access attempts by an
                  estimated 90%.
                </li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-6 pb-2 border-b-2 border-primary inline-block">
              EDUCATION
            </h2>
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-text">
                  Strathmore University
                </h3>
                <p className="text-text-secondary italic">
                  Bachelors Degree in Business Information and Technology
                </p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary">Nairobi, Kenya</p>
                <p className="text-text-secondary italic">Sep 2024 - Present</p>
              </div>
            </div>
          </section>

          {/* Skills & Interests */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6 pb-2 border-b-2 border-primary inline-block">
              SKILLS & INTERESTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "ReactJs + NextJs",
                "JavaScript + Typescript",
                "Nodejs + ExpressJs",
                "Python + Django",
                "Postgresql",
                "MongoDb",
                "Linux",
                "WSL",
                "Redis",
                "TailwindCss",
                "Docker",
                "CI/CD pipelines",
                "Microservices architecture",
                "Code optimization",
                "Debugging",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-bg-lighter px-4 py-2 rounded-lg text-text-secondary hover:text-primary hover:bg-bg-dark transition-all duration-200"
                >
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
