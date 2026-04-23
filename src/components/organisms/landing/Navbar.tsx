"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/atoms/LanguageSwitcher";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations("Navbar");

  const navLinks = [
    { label: t("home"), href: "#home" },
    { label: t("tourPackages"), href: "#destinations" },
    { label: t("cars"), href: "#vehicles" },
    { label: t("whyUs"), href: "#why-us" },
    { label: t("about"), href: "#testimonials" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[var(--primary)]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-[var(--primary-dark)] font-bold text-sm">LA</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:block">
            LA Group
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Login Button & Lang Switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/dashboard"
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
              "bg-[var(--accent)] text-[var(--primary-dark)] hover:bg-[var(--accent-light)]",
              "hover:shadow-lg hover:shadow-[var(--accent)]/25 active:scale-95"
            )}
          >
            {t("login")}
          </Link>
        </div>

        {/* Mobile Menu Toggle & Lang Switcher */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-[var(--primary)] border-t border-white/10 overflow-hidden transition-all duration-300",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="mt-4 px-4 py-3 text-sm font-semibold text-center bg-[var(--accent)] text-[var(--primary-dark)] rounded-lg hover:bg-[var(--accent-light)] transition-colors"
          >
            {t("login")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
