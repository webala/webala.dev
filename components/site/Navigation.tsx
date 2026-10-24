"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/content/site";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes; lock page scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`print-hide fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "bg-liquid-abyss/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
      <nav
        className="container-site flex h-20 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-platinum"
          aria-label={`${site.wordmark} home`}
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-aqua"
            aria-hidden="true"
          />
          webala<span className="text-silver-mist">.dev</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? "text-platinum" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/resume"
            className="btn-base btn-ghost !px-5 !py-3"
            aria-current={isActive("/resume") ? "page" : undefined}
          >
            Résumé
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="arrow-btn md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </nav>
      </header>

      {/* Mobile panel lives outside the header: backdrop-filter would otherwise
          turn the header into the containing block for this fixed element. */}
      <div
        id="mobile-menu"
        className={`print-hide md:hidden ${open ? "block" : "hidden"} fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-liquid-deep`}
      >
        <div className="container-site flex h-full flex-col justify-between py-10">
          <ul className="flex flex-col gap-2">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-2xl font-medium tracking-[-0.02em] text-platinum"
                >
                  <span>{item.label}</span>
                  <span className="caption text-slate-deep">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="btn-base btn-gradient"
            >
              View résumé
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <a href={`mailto:${site.email}`} className="btn-base btn-ghost">
              Email me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
