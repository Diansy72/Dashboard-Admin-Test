"use client";

import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function RecommendedDestinations() {
  const t = useTranslations("Destinations");

  const destinations = [
    {
      title: t("items.1.title"),
      description: t("items.1.desc"),
      image: "/images/hero-bg.png",
      location: t("items.1.loc"),
    },
    {
      title: t("items.2.title"),
      description: t("items.2.desc"),
      image: "/images/destination-borobudur.png",
      location: t("items.2.loc"),
    },
    {
      title: t("items.3.title"),
      description: t("items.3.desc"),
      image: "/images/destinations.png",
      location: t("items.3.loc"),
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest">
            {t("subtitle")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mt-3">
            {t("title")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3 max-w-md mx-auto">
            {t("desc")}
          </p>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Destination Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {destinations.map((dest, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Location badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <MapPin size={12} className="text-white" />
                <span className="text-white text-xs font-medium">{dest.location}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                  {dest.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {dest.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Explore More */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            {t("exploreMore")}
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
