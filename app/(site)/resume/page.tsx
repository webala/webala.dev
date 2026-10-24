import type { Metadata } from "next";
import { ArrowUpRight, Download, Linkedin, Mail, MapPin } from "lucide-react";
import Button from "@/components/site/Button";
import { site } from "@/lib/content/site";
import {
  education,
  experience,
  skillGroups,
  summary,
} from "@/lib/content/experience";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role} in ${site.location}: experience, education and skills.`,
};

const linkedin = site.socials.find((s) => s.id === "linkedin");

export default function ResumePage() {
  return (
    <main className="container-site pb-24 pt-32 md:pt-40 print:p-0">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between print:gap-4">
          <div>
            <p className="eyebrow print-hide">Résumé</p>
            <h1 className="heading-lg mt-5 print:mt-0 print:text-[22pt]">{site.name}</h1>
            <p className="mt-4 text-xl text-silver-mist print:mt-1 print:text-[11pt]">{site.role}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-silver-mist print:mt-2 print:text-[9.5pt]">
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
                    linkedin.com/in/daniel-webala-8b4992184
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                {site.location} · {site.timezone}
              </li>
              <li className="hidden print:inline">{site.url}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row print-hide">
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

        <div className="surface-card mt-14 p-9 md:p-14 print:mt-4">
          <section aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="eyebrow">
              Profile
            </h2>
            <p className="mt-5 max-w-[72ch] text-base leading-[1.5] text-liquid-mist md:text-xl md:leading-[1.5] print:mt-2 print:max-w-none print:text-[9.5pt]">
              {summary}
            </p>
          </section>

          <section className="mt-14 print:mt-6" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="eyebrow">
              Experience
            </h2>
            <ol className="mt-6 flex flex-col print:mt-2">
              {experience.map((role) => (
                <li
                  key={role.id}
                  className="print-break-avoid grid grid-cols-1 gap-4 border-t border-white/10 py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 print:grid-cols-1 print:gap-1 print:py-2.5"
                >
                  <div className="print:flex print:items-baseline print:gap-3">
                    <p className="text-sm text-liquid-mist print:text-[9pt]">
                      {role.start} — {role.end}
                    </p>
                    <p className="caption mt-2 text-slate-deep print:mt-0">
                      {role.engagement}
                    </p>
                    <p className="mt-1 text-xs text-slate-deep print:mt-0 print:text-[8.5pt]">{role.location}</p>
                  </div>
                  <div>
                    <h3 className="subheading print:text-[11.5pt]">{role.title}<span className="hidden print:inline print:font-normal print:text-[10pt]"> · {role.company}</span></h3>
                    <p className="mt-1 text-base text-silver-mist print:hidden">{role.company}</p>
                    <ul className="print-hide-deep mt-5 flex flex-col gap-3 print:mt-1.5 print:gap-0.5">
                      {role.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm leading-[1.5] text-silver-mist print:gap-2 print:text-[9pt] print:leading-[1.3]"
                        >
                          <span
                            className="mt-[0.55em] inline-block h-1.5 w-1.5 flex-none rounded-full bg-aqua print:mt-[0.5em] print:h-1 print:w-1"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="meta mt-5 text-slate-deep print-hide">
                      {role.stack.join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 print:mt-6" aria-labelledby="education-heading">
            <h2 id="education-heading" className="eyebrow">
              Education
            </h2>
            <ul className="mt-6 print:mt-2">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="print-break-avoid grid grid-cols-1 gap-4 border-t border-white/10 py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 print:grid-cols-1 print:gap-0.5 print:py-2"
                >
                  <div className="print:flex print:items-baseline print:gap-3">
                    <p className="text-sm text-liquid-mist print:text-[9pt]">
                      {e.start} — {e.end}
                    </p>
                    <p className="mt-1 text-xs text-slate-deep print:text-[8.5pt]">{e.location}</p>
                  </div>
                  <div>
                    <h3 className="subheading print:text-[12pt]">{e.school}</h3>
                    <p className="mt-1 text-base text-silver-mist print:text-[10pt]">{e.degree}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 print:mt-6" aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="eyebrow">
              Skills
            </h2>
            <dl className="mt-6 flex flex-col print:mt-2">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="print-break-avoid grid grid-cols-1 gap-3 border-t border-white/10 py-5 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 print:grid-cols-[110px_minmax(0,1fr)] print:gap-3 print:py-1 print:border-0"
                >
                  <dt className="text-sm text-liquid-mist print:text-[9.5pt]">{group.label}</dt>
                  <dd className="flex flex-wrap gap-2 print:gap-1">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="meta rounded-[6px] bg-kelp-hover/60 px-3 py-1.5 text-liquid-mist print:px-1.5 print:py-0.5"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
