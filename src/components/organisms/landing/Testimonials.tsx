"use client";

import React from "react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      name: "Andi Prasetyo",
      role: "Traveler",
      avatar: null,
      rating: 5,
      text: t("items.1.text"),
    },
    {
      name: "Sinta Rahayu",
      role: "Business Traveler",
      avatar: null,
      rating: 5,
      text: t("items.2.text"),
    },
    {
      name: "Rudi Hartono",
      role: "Family Trip",
      avatar: null,
      rating: 5,
      text: t("items.3.text"),
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[var(--bg-main)]">
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

        {/* Testimonial Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="bg-white rounded-2xl p-7 border border-[var(--border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-400 group"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[var(--border-light)]">
                <div className="w-11 h-11 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm group-hover:bg-[var(--accent)] group-hover:text-[var(--primary-dark)] transition-colors duration-300">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
