"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function PackageListHero() {
  return (
    <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-[var(--primary)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/destination-borobudur.png"
          alt="Hero packages"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/90 via-transparent to-[var(--primary)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-4 inline-block">
            Find Your Perfect Tour
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Available Tour Packages
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">
            Discover the most popular adventures and heritage tours across the region. Unforgettable experiences await you.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
