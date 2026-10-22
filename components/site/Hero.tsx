import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import ParticleSphere from "./ParticleSphere";
import { site } from "@/lib/content/site";
import { stats } from "@/lib/content/stats";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[min(140vw,118vh)] w-[min(140vw,118vh)] -translate-x-1/2 -translate-y-[54%] md:h-[min(92vw,112vh)] md:w-[min(92vw,112vh)]">
          <ParticleSphere className="h-full w-full" />
        </div>
        <div className="hero-fade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-liquid-abyss" />
      </div>

      <div className="container-site relative flex flex-col items-center pb-20 pt-36 text-center md:pb-24 md:pt-40">
        <p className="eyebrow">
          {site.name} · Lead Engineer · Nairobi, KE
        </p>
        <h1 className="display mt-7 max-w-[13ch]">
          Systems that hold up when the money moves.
        </h1>
        <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-silver-mist md:text-lg">
          Full-stack engineer with five years shipping payment-grade products
          across Next.js, Node.js, Django and Postgres. Currently building{" "}
          <a
            href={site.currentBuild.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-mist"
          >
            {site.currentBuild.name}
          </a>
          , {site.currentBuild.blurb}
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/#contact" variant="gradient">
            Get in touch
          </Button>
          <Button href="/resume" variant="ghost">
            View résumé
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </div>

        <dl className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-6 md:mt-28">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3">
              <dd className="stat order-1">{s.value}</dd>
              <dt className="caption order-2 max-w-[22ch] text-[13px] text-liquid-mist">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
