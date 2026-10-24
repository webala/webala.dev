import Link from "next/link";
import { site } from "@/lib/content/site";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hide bg-liquid-deep">
      <div className="container-site py-20 md:py-30">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-platinum"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-aqua" aria-hidden="true" />
              webala<span className="text-silver-mist">.dev</span>
            </Link>
            <p className="mt-5 max-w-[40ch] text-sm leading-[1.5] text-silver-mist">
              {site.name}, software engineer in {site.location}. Building web,
              mobile and backend systems, and writing about running them.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 flex flex-col gap-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resume" className="nav-link">
                  Résumé
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 flex flex-col gap-3">
              {site.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel={s.id === "email" ? undefined : "noopener noreferrer"}
                    className="nav-link inline-flex items-center gap-2.5"
                  >
                    <SocialIcon id={s.id} size={14} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[12px] text-slate-deep sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="caption">{site.location} · Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
