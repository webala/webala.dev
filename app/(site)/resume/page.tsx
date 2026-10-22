import type { Metadata } from "next";
import { ArrowUpRight, Download, Linkedin, Mail, MapPin } from "lucide-react";
import Button from "@/components/site/Button";
import { site } from "@/lib/content/site";
import {
  education,
  experience,
  skills,
  summary,
} from "@/lib/content/experience";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role} in ${site.location}: experience, education and skills.`,
};

const linkedin = site.socials.find((s) => s.id === "linkedin");

export default function ResumePage() {
  return (
    <main className="container-site pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Résumé</p>
            <h1 className="heading-lg mt-5">{site.name}</h1>
            <p className="mt-4 text-lg text-silver-mist">{site.role}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-silver-mist">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 hover:text-platinum"
                >
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              {linkedin && (
                <li>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-platinum"
                  >
                    <Linkedin size={14} strokeWidth={1.5} aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                {site.location}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={site.resumePdf}
              download={site.resumeFileName}
              variant="gradient"
            >
              <Download size={14} strokeWidth={1.75} aria-hidden="true" />
              Download PDF
            </Button>
            <Button href="/#contact" variant="ghost">
              Get in touch
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </header>

        <div className="surface-card mt-14 p-7 md:p-14">
          <section aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="eyebrow">
              Profile
            </h2>
            <p className="mt-5 max-w-[70ch] text-[17px] leading-relaxed text-liquid-mist">
              {summary}
            </p>
          </section>

          <section className="mt-14" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="eyebrow">
              Experience
            </h2>
            <ol className="mt-6 flex flex-col">
              {experience.map((role) => (
                <li
                  key={role.id}
                  className="grid grid-cols-1 gap-4 border-t border-white/10 py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
                >
                  <div>
                    <p className="text-[14px] text-liquid-mist">
                      {role.start} — {role.end}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-deep">{role.location}</p>
                  </div>
                  <div>
                    <h3 className="subheading">{role.title}</h3>
                    <p className="mt-1 text-silver-mist">{role.company}</p>
                    <ul className="mt-5 flex flex-col gap-3">
                      {role.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[15px] leading-relaxed text-silver-mist"
                        >
                          <span
                            className="mt-[0.6em] inline-block h-1.5 w-1.5 flex-none rounded-full bg-aqua"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="caption mt-5 text-slate-deep">
                      {role.stack.join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14" aria-labelledby="education-heading">
            <h2 id="education-heading" className="eyebrow">
              Education
            </h2>
            <ul className="mt-6">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="grid grid-cols-1 gap-4 border-t border-white/10 py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
                >
                  <div>
                    <p className="text-[14px] text-liquid-mist">
                      {e.start} — {e.end}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-deep">{e.location}</p>
                  </div>
                  <div>
                    <h3 className="subheading">{e.school}</h3>
                    <p className="mt-1 text-silver-mist">{e.degree}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="eyebrow">
              Skills
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="caption rounded-[6px] bg-kelp-hover/60 px-3 py-2 text-liquid-mist"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
