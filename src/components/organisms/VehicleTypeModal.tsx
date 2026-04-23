"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import VehicleTypeCard from "@/components/molecules/VehicleTypeCard";
import { VehicleType } from "@/types";

interface VehicleTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: VehicleType) => void;
}

export default function VehicleTypeModal({
  isOpen,
  onClose,
  onSelect,
}: VehicleTypeModalProps) {
  const [selected, setSelected] = useState<VehicleType | null>(null);

  if (!isOpen) return null;

  const handleSelect = (type: VehicleType) => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]",
          "p-8 w-full max-w-md modal-content"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 p-1.5 rounded-[var(--radius-md)]",
            "text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)]",
            "transition-colors duration-200 cursor-pointer"
          )}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--text-primary)] text-center mb-8">
          Select Vehicle Type
        </h2>

        {/* Type Cards */}
        <div className="flex items-center justify-center gap-5">
          <VehicleTypeCard
            type="motorcycle"
            isSelected={selected === "motorcycle"}
            onClick={() => handleSelect("motorcycle")}
          />
          <VehicleTypeCard
            type="car"
            isSelected={selected === "car"}
            onClick={() => handleSelect("car")}
          />
        </div>
      </div>
    </div>
  );
}
