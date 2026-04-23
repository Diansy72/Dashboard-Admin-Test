"use client";

import React from "react";
import { Check, Car, Shield, Headphones, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/animations";

export default function StatsSection() {
  const t = useTranslations("Stats");

  const stats = [
    { value: "10K+", label: t("stat1") },
    { value: "1x", label: t("stat2") },
  ];

  const includes = [
    t("includeItems.0"),
    t("includeItems.1"),
    t("includeItems.2"),
    t("includeItems.3"),
    t("includeItems.4"),
    t("includeItems.5")
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUp}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[var(--accent)] to-amber-600" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-10 lg:p-14 items-center">
            {/* Left: Stats */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-6 uppercase tracking-wider">
                {t("tagline")}
              </span>

              <div className="flex items-center gap-8 mb-8">
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <div className="w-px h-16 bg-white/30" />}
                    <div>
                      <p className="text-5xl lg:text-6xl font-extrabold text-white">
                        {stat.value}
                      </p>
                      <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Shield size={18} />
                  <span>{t("trust")}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Headphones size={18} />
                  <span>{t("support")}</span>
                </div>
              </div>
            </div>

            {/* Right: Includes */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Car size={20} className="text-[var(--primary)]" />
                {t("includesTitle")}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <Check
                        size={14}
                        className="text-emerald-600 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-xl hover:bg-[var(--primary-hover)] transition-colors duration-300 cursor-pointer active:scale-[0.98]">
                {t("btnBooking")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
