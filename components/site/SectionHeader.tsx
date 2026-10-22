import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[40ch]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="heading-lg mt-5">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-[52ch] text-silver-mist">{description}</p>
        )}
      </div>
      {action && (
        <Link href={action.href} className="nav-link inline-flex items-center gap-2 self-start md:self-auto">
          {action.label}
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
