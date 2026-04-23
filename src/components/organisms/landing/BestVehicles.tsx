"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Star, Fuel, Users, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type VehicleTab = "all" | "motorcycle" | "car";

interface VehicleCard {
  name: string;
  type: "motorcycle" | "car";
  image: string;
  pricePerDay: number;
  rating: number;
  fuel: string;
  seats: number;
  transmission: string;
}

const vehicles: VehicleCard[] = [
  {
    name: "Honda Beat 110",
    type: "motorcycle",
    image: "/images/motorcycle-beat.png",
    pricePerDay: 75000,
    rating: 4.8,
    fuel: "Bensin",
    seats: 2,
    transmission: "Matic",
  },
  {
    name: "Toyota Avanza",
    type: "car",
    image: "/images/car-avanza.png",
    pricePerDay: 350000,
    rating: 4.9,
    fuel: "Bensin",
    seats: 7,
    transmission: "Manual",
  },
  {
    name: "Honda Beat 110",
    type: "motorcycle",
    image: "/images/motorcycle-beat.png",
    pricePerDay: 75000,
    rating: 4.7,
    fuel: "Bensin",
    seats: 2,
    transmission: "Matic",
  },
  {
    name: "Toyota Avanza",
    type: "car",
    image: "/images/car-avanza.png",
    pricePerDay: 350000,
    rating: 4.9,
    fuel: "Bensin",
    seats: 7,
    transmission: "Matic",
  },
];

export default function BestVehicles() {
  const [activeTab, setActiveTab] = useState<VehicleTab>("all");
  const t = useTranslations("Vehicles");

  const tabs: { id: VehicleTab; label: string }[] = [
    { id: "all", label: t("tabs.all") },
    { id: "motorcycle", label: t("tabs.motorcycle") },
    { id: "car", label: t("tabs.car") },
  ];

  const filteredVehicles =
    activeTab === "all"
      ? vehicles
      : vehicles.filter((v) => v.type === activeTab);

  return (
    <section id="vehicles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest">
            {t("subtitle")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mt-3">
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer",
                activeTab === tab.id
                  ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                  : "bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Vehicle Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="group bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-48 bg-[var(--bg-main)] p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {/* Rating badge */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {vehicle.rating}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-3">
                  {vehicle.name}
                </h3>

                {/* Specs */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Fuel size={13} />
                    <span className="text-xs">{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Users size={13} />
                    <span className="text-xs">{vehicle.seats}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Settings2 size={13} />
                    <span className="text-xs">{vehicle.transmission}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                  <div>
                    <span className="text-lg font-extrabold text-[var(--primary)]">
                      Rp {new Intl.NumberFormat("id-ID").format(vehicle.pricePerDay)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]"> {t("tagPerDay")}</span>
                  </div>
                  <button className="px-4 py-2 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition-colors cursor-pointer active:scale-95">
                    {t("btnBook")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
