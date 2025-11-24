"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, BookOpen, Mail, Menu, FileText } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're not on the home page, redirect to home page first
    if (pathname !== "/") {
      e.preventDefault();
      router.push("/#contact");
    }
    // If we're on the home page, the default anchor link behavior will work
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-dark/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-text">
            <span className="text-primary">webala</span>·dev
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
            >
              <Home
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Home</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
            >
              <BookOpen
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Blog</span>
            </Link>
            <Link
              href="/resume"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
            >
              <FileText
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Resume</span>
            </Link>
            <Link
              href="#contact"
              onClick={handleContactClick}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
            >
              <Mail
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-secondary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
