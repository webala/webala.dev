import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "gradient" | "ghost" | "kelp";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  download?: string | boolean;
  className?: string;
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const variantClass: Record<Variant, string> = {
  gradient: "btn-gradient",
  ghost: "btn-ghost",
  kelp: "btn-kelp",
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function Button({
  variant = "kelp",
  href,
  download,
  className = "",
  children,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = `btn-base ${variantClass[variant]} ${className}`.trim();

  if (href && (isExternal(href) || download)) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        aria-label={ariaLabel}
        {...(isExternal(href) && !href.startsWith("mailto:")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
