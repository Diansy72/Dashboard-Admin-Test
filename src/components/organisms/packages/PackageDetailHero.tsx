"use client";

import React from "react";
import { TourPackage } from "@/types";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface PackageDetailHeroProps {
  pkg: TourPackage;
}

export default function PackageDetailHero({ pkg }: PackageDetailHeroProps) {
  return (
    <div className="relative pt-24 pb-8 lg:pt-32 lg:pb-16 overflow-hidden bg-[var(--primary)] min-h-[40vh] flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {pkg.duration}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {pkg.minPax}-{pkg.maxPax} Participants
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
            {pkg.title}
          </h1>
          <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">
            {pkg.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
