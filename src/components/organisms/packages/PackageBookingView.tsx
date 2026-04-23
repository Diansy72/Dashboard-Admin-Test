"use client";

import React, { useState } from "react";
import { TourPackage, PackageVehicleOption } from "@/types";
import { formatCurrency } from "@/lib/data";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { CheckCircle2, XCircle, Car, Users, Minus, Plus } from "lucide-react";

interface PackageBookingViewProps {
  pkg: TourPackage;
}

export default function PackageBookingView({ pkg }: PackageBookingViewProps) {
  const [participants, setParticipants] = useState<number>(pkg.minPax);
  const [selectedVehicle, setSelectedVehicle] = useState<PackageVehicleOption>(
    pkg.vehicleOptions[0]
  );

  const handleMinus = () => {
    if (participants > pkg.minPax) setParticipants(participants - 1);
  };

  const handlePlus = () => {
    if (participants < pkg.maxPax) setParticipants(participants + 1);
  };

  const totalPrice = pkg.estimatedPrice * participants + selectedVehicle.pricePerDay;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Column (Main Detailed Information) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="w-full lg:flex-1 space-y-8"
          >
            {/* Cost Information (Includes & Excludes) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Cost Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Included
                  </h4>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-500 mb-4 flex items-center gap-2">
                    <XCircle size={18} /> Excluded
                  </h4>
                  <ul className="space-y-3">
                    {pkg.excludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Vehicle Options</h3>
              <div className="grid gap-4">
                {pkg.vehicleOptions.map((vOption) => (
                  <label 
                    key={vOption.id} 
                    className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedVehicle.id === vOption.id 
                        ? "border-[var(--primary)] bg-[var(--primary)]/5" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--primary)] flex items-center justify-center">
                        {selectedVehicle.id === vOption.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] text-sm">{vOption.name}</p>
                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
                          <Users size={12} /> Max {vOption.capacity} capacity
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--primary)] text-sm">+{formatCurrency(vOption.pricePerDay)}</p>
                    </div>
                    {/* Hidden input to make it semantically accessible */}
                    <input 
                      type="radio" 
                      name="vehicle" 
                      className="hidden"
                      checked={selectedVehicle.id === vOption.id}
                      onChange={() => setSelectedVehicle(vOption)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Number of Participants</h3>
                  <p className="text-sm text-[var(--text-muted)]">Current vehicle capacity matches up to {selectedVehicle.capacity} pax.</p>
                </div>
                
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                  <button 
                    onClick={handleMinus}
                    disabled={participants <= pkg.minPax}
                    className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[var(--text-primary)]"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="w-16 text-center font-bold text-[var(--text-primary)]">
                    {participants}
                  </div>
                  <button 
                    onClick={handlePlus}
                    disabled={participants >= pkg.maxPax}
                    className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[var(--text-primary)]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
            
          </motion.div>

          {/* Right Column (Floating Panel) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-[var(--primary)] text-white p-6">
                <p className="text-sm font-medium mb-1">Estimated Base Price</p>
                <div className="text-3xl font-extrabold">{formatCurrency(pkg.estimatedPrice)} <span className="text-sm font-normal opacity-80">/pax</span></div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Package Cost ({participants} Pax)</span>
                    <span className="font-semibold">{formatCurrency(pkg.estimatedPrice * participants)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Vehicle ({selectedVehicle.name})</span>
                    <span className="font-semibold">{formatCurrency(selectedVehicle.pricePerDay)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-[var(--text-primary)]">Total Order Estimate</span>
                    <span className="font-extrabold text-[var(--primary)] text-lg">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                {/* Overcapacity warning if applicable */}
                {participants > selectedVehicle.capacity && (
                  <div className="mb-6 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2">
                    <span className="mt-0.5">⚠️</span>
                    <p>Total participants exceed the chosen vehicle capacity ({selectedVehicle.capacity}). Please select a larger vehicle or order multiple units later.</p>
                  </div>
                )}

                <button 
                  className="w-full py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-colors active:scale-[0.98] duration-200 shadow-md shadow-[var(--primary)]/20"
                >
                  Order Package Now
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
