"use client";

import React from "react";
import { Car, MessageCircle, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: <Car size={28} />,
      title: t("step1.title"),
      description: t("step1.desc"),
      step: "01",
    },
    {
      icon: <MessageCircle size={28} />,
      title: t("step2.title"),
      description: t("step2.desc"),
      step: "02",
    },
    {
      icon: <KeyRound size={28} />,
      title: t("step3.title"),
      description: t("step3.desc"),
      step: "03",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest">
            {t("subtitle")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mt-3">
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Steps */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/40 to-[var(--accent)]/20" />

          {steps.map((step, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="relative group text-center"
            >
              {/* Icon */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-[var(--primary)]/5 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative w-full h-full bg-white border-2 border-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-[var(--primary)] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  {step.icon}
                </div>
                {/* Step number */}
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--accent)] text-[var(--primary-dark)] text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
