"use client";

import React from "react";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/90 via-[var(--primary)]/70 to-[var(--primary)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--accent)]">
          <defs>
            <pattern id="batik" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.3" />
              <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <circle cx="0" cy="0" r="5" fill="currentColor" opacity="0.2" />
              <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#batik)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin size={14} className="text-[var(--accent)]" />
                <span className="text-white/90 text-xs font-medium tracking-wider uppercase">
                  {t("location")}
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                {t("title1")}{" "}
                <span className="relative inline-block">
                  <span className="text-[var(--accent)] italic font-serif">{t("title2")}</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                      d="M2 8C40 2 80 2 100 6C120 10 160 4 198 8" 
                      stroke="#D4A843" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </span>{" "}
                {t("title3")}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                {t("description")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                <a
                href="#vehicles"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--accent)] text-[var(--primary-dark)] rounded-xl font-bold text-sm hover:bg-[var(--accent-light)] hover:shadow-xl hover:shadow-[var(--accent)]/20 transition-all duration-300 active:scale-95"
              >
                {t("btnVehicles")}
                <ArrowRight size={18} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {t("btnHowItWorks")}
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/15">
              <div>
                <p className="text-3xl font-extrabold text-white">500+</p>
                <p className="text-xs text-white/50 mt-1">{t("stats.customers")}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-extrabold text-white">50+</p>
                <p className="text-xs text-white/50 mt-1">{t("stats.vehicles")}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-extrabold text-white">4.9</p>
                <p className="text-xs text-white/50 mt-1">{t("stats.rating")}</p>
              </div>
              </motion.div>
            </motion.div>
          {/* Right: Floating Images */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[500px]">
              {/* Main image */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-0 w-72 h-80 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              >
                <img
                  src="/images/destination-borobudur.png"
                  alt="Borobudur"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Secondary image */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-24 right-52 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500"
              >
                <img
                  src="/images/destinations.png"
                  alt="Destinations"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Floating card */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 right-8 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl flex items-center gap-3 animate-pulse"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{t("bookingAvailable")}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">{t("bookingDesc")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
