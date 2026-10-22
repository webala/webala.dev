import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ArrowLinkProps {
  href: string;
  label: string;
  className?: string;
}

/** 32×32 "go to" trigger, always placed to the right of a card title. */
export default function ArrowLink({ href, label, className = "" }: ArrowLinkProps) {
  const external = /^(https?:|mailto:)/.test(href);
  const classes = `arrow-btn ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={label}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      >
        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={label}>
      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
    </Link>
  );
}
