import { ArrowUpRight, Download } from "lucide-react";
import { experience } from "@/lib/content/experience";
import { site } from "@/lib/content/site";
import ArrowLink from "./ArrowLink";
import Button from "./Button";
import Molecule from "./Molecule";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section
      id="experience"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="experience-heading"
    >
      <SectionHeader
        id="experience-heading"
        eyebrow="Experience"
        title="Five years across six teams."
        description="Contract and in-house roles across mobility, gaming, fintech and media, mostly with remote teams."
        action={{ label: "Full résumé", href: "/resume" }}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-16">
        <ol className="flex flex-col">
          {experience.map((role, i) => (
            <li
              key={role.id}
              className={`group rounded-card py-10 transition-colors duration-300 md:px-9 md:hover:bg-liquid-kelp/50 ${
                i > 0 ? "border-t border-white/10 md:border-t-0" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow">
                    {role.company} · {role.engagement} · {role.start} — {role.end}
                  </p>
                  <h3 className="subheading mt-4">{role.title}</h3>
                </div>
                <ArrowLink
                  href="/resume"
                  label={`Read more about ${role.title} at ${role.company}`}
                  className="mt-1"
                />
              </div>
              <p className="mt-4 max-w-[60ch] text-base leading-[1.5] text-silver-mist">
                {role.summary}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {role.highlights.map((idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm leading-[1.5] text-silver-mist"
                  >
                    <span
                      className="mt-[0.6em] inline-block h-1.5 w-1.5 flex-none rounded-full bg-aqua"
                      aria-hidden="true"
                    />
                    <span>{role.bullets[idx]}</span>
                  </li>
                ))}
              </ul>
              <p className="caption mt-6 text-slate-deep">
                {role.stack.join(" · ")}
              </p>
            </li>
          ))}
        </ol>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Molecule className="mx-auto hidden w-full max-w-[320px] lg:block" />
          <div className="surface-card mt-0 p-9 lg:mt-10">
            <p className="eyebrow">Résumé</p>
            <p className="mt-4 text-sm leading-[1.5] text-silver-mist">
              Every role with its full set of outcomes, education and the stack I
              work in, on one page or as a PDF.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Button href="/resume" variant="gradient">
                Read online
                <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
              </Button>
              <Button
                href={site.resumePdf}
                download={site.resumeFileName}
                variant="ghost"
              >
                <Download size={14} strokeWidth={1.75} aria-hidden="true" />
                Download PDF
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
