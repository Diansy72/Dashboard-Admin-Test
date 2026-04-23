"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/data";
import { TourPackage } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Clock, Users, ArrowRight, Car, Search, X } from "lucide-react";
import { Link } from "@/i18n/routing";

interface PackageGridProps {
  packages: TourPackage[];
}

export default function PackageGrid({ packages }: PackageGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filtered = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-[var(--bg-main)] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 mb-12 -mt-32 relative z-20">
          <div className="flex-1 w-full max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full text-left pl-12 pr-4 py-3 bg-[var(--bg-main)] rounded-xl text-sm text-[var(--text-muted)] hover:ring-2 hover:ring-[var(--primary)]/20 transition-all cursor-text"
            >
              {searchTerm ? (
                <span className="text-[var(--text-primary)]">{searchTerm}</span>
              ) : (
                "Search packages..."
              )}
            </button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 md:flex-none px-6 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--primary-hover)] transition-colors active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Tabs (Dummy for UI adherence) */}
        <div className="flex items-center justify-center gap-8 mb-12 border-b border-[var(--border)] pb-4">
          <button className="text-[var(--primary)] font-bold text-sm border-b-2 border-[var(--primary)] pb-4 -mb-[18px]">
            <Car size={16} className="inline mr-2" /> Chartered Package Tour
          </button>
          <button className="text-[var(--text-muted)] font-semibold text-sm hover:text-[var(--text-primary)] transition-colors pb-4 -mb-[18px]">
            Sewa Kendaraan
          </button>
        </div>

        {/* Info Text */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Price per person: Minibus, Medium bus, long bus, suitable for large groups
          </p>
        </div>

        {/* Grid List */}
        {filtered.length > 0 ? (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((pkg) => (
              <motion.div
                variants={fadeInUp}
                key={pkg.id}
                className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Badge Top Left */}
                <div className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Best Seller
                </div>

                {/* Hero Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold truncate pr-4">{pkg.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  {/* Stats line */}
                  <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)] mb-4 pb-4 border-b border-[var(--border-light)] font-medium">
                    <div className="flex items-center gap-1.5"><Clock size={13} /> {pkg.duration}</div>
                    <div className="flex items-center gap-1.5"><Users size={13} /> {pkg.minPax}-{pkg.maxPax} Pax</div>
                    <div className="flex items-center gap-1.5"><Car size={13} /> Multiple Options</div>
                  </div>

                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Start from</p>
                      <span className="text-xl font-extrabold text-[var(--primary)]">
                        {formatCurrency(pkg.estimatedPrice)}
                      </span>
                    </div>
                    <Link 
                      href={`/packages/${pkg.id}`}
                      className="px-5 py-2.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition-colors active:scale-95"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)]">No packages found for "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex items-center p-2 relative z-10"
            >
              <div className="px-5 text-[var(--text-muted)]">
                <Search size={24} />
              </div>
              <input
                autoFocus
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 w-full py-5 bg-transparent outline-none text-lg text-[var(--text-primary)] placeholder:text-gray-400"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors cursor-pointer mr-2"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
