"use client";

import React from "react";
import { Car, Users, BadgeDollarSign, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

export default function WhyChooseUs() {
  const t = useTranslations("WhyUs");

  const features = [
    {
      icon: <Car size={22} />,
      title: t("items.1.title"),
      description: t("items.1.desc"),
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: <Users size={22} />,
      title: t("items.2.title"),
      description: t("items.2.desc"),
      color: "bg-emerald-500",
      bgLight: "bg-emerald-50",
    },
    {
      icon: <BadgeDollarSign size={22} />,
      title: t("items.3.title"),
      description: t("items.3.desc"),
      color: "bg-amber-500",
      bgLight: "bg-amber-50",
    },
    {
      icon: <Star size={22} />,
      title: t("items.4.title"),
      description: t("items.4.desc"),
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/why-choose-us.png"
                alt="Why choose us"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/30 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--accent)]/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--primary)]/5 rounded-2xl -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeInUp} className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest inline-block">
              {t("subtitle")}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mt-3 mb-4">
              {t("title")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] text-sm leading-relaxed mb-10 max-w-md">
              {t("desc")}
            </motion.p>

            {/* Feature List */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  variants={fadeInRight}
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[var(--border)] hover:shadow-md hover:border-[var(--primary)]/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`flex-shrink-0 p-2.5 rounded-xl ${feature.bgLight} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`${feature.color} text-white p-2 rounded-lg`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
