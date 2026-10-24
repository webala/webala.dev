import { principles } from "@/lib/content/principles";
import SectionHeader from "./SectionHeader";

export default function Approach() {
  return (
    <section
      id="approach"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="approach-heading"
    >
      <SectionHeader
        id="approach-heading"
        eyebrow="Approach"
        title="How I design things that have to keep working."
        description="Five habits that show up in every system above, whether it moves money, matches drivers or streams a game round."
      />

      <ol className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
        {principles.map((p, i) => (
          <li
            key={p.title}
            className="flex gap-6 border-t border-white/10 py-9 md:gap-9"
          >
            <span className="caption mt-1.5 w-6 flex-none text-slate-deep">
              0{i + 1}
            </span>
            <div>
              <h3 className="subheading">{p.title}</h3>
              <p className="mt-4 max-w-[52ch] text-base leading-[1.5] text-silver-mist">
                {p.body}
              </p>
              <p className="meta mt-5 text-slate-deep">
                Applied in {p.evidence.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
