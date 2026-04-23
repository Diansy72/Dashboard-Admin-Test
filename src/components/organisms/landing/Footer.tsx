"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Share2,
  Send,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";


const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Tour Packages", href: "#destinations" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "About Us", href: "#why-us" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  const quickLinks = [
    { label: tNav("home"), href: "#home" },
    { label: tNav("tourPackages"), href: "#destinations" },
    { label: tNav("cars"), href: "#vehicles" },
    { label: tNav("whyUs"), href: "#why-us" },
    { label: tNav("about"), href: "#testimonials" },
  ];

  const officeHours = [
    { day: "Senin - Jumat", time: "08:00 - 21:00" },
    { day: "Sabtu", time: "08:00 - 18:00" },
    { day: "Minggu", time: "09:00 - 17:00" },
  ];

  return (
    <footer className="bg-[var(--primary)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-[var(--primary-dark)] font-bold text-sm">
                  LA
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm">LA Group</h3>
                <p className="text-xs text-[var(--accent-light)]">
                  Andika Trans
                </p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {t("desc")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--primary-dark)] transition-all duration-300"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--primary-dark)] transition-all duration-300"
              >
                <Share2 size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--primary-dark)] transition-all duration-300"
              >
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 relative">
              {t("quickLinks")}
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--accent)]" />
            </h4>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-5 relative">
              {t("contactUs")}
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--accent)]" />
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-white/60">
                  Jl. Kaliurang KM 5, Yogyakarta
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="text-[var(--accent)] flex-shrink-0"
                />
                <span className="text-sm text-white/60">
                  +62 812-3456-7890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="text-[var(--accent)] flex-shrink-0"
                />
                <span className="text-sm text-white/60">
                  info@lagroup.co.id
                </span>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="font-bold text-sm mb-5 relative">
              {t("officeHours")}
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--accent)]" />
            </h4>
            <ul className="space-y-3 mt-4">
              {officeHours.map((item) => (
                <li key={item.day} className="flex items-center gap-3">
                  <Clock
                    size={14}
                    className="text-[var(--accent)] flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-white/80 font-medium">
                      {item.day}
                    </p>
                    <p className="text-xs text-white/50">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
