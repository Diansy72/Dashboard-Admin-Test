"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Motorbike, Car } from "lucide-react";
import { VehicleType } from "@/types";

interface VehicleTypeCardProps {
  type: VehicleType;
  isSelected?: boolean;
  onClick: () => void;
}

const typeConfig: Record<VehicleType, { label: string; icon: React.ReactNode }> = {
  motorcycle: {
    label: "Motorcycle",
    icon: <Motorbike size={36} />,
  },
  car: {
    label: "Car",
    icon: <Car size={36} />,
  },
};

export default function VehicleTypeCard({
  type,
  isSelected = false,
  onClick,
}: VehicleTypeCardProps) {
  const config = typeConfig[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-[var(--radius-xl)]",
        "border-2 cursor-pointer min-w-[140px] min-h-[130px]",
        "transition-all duration-250 ease-out",
        "hover:scale-[1.03] active:scale-[0.98]",
        isSelected
          ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[var(--shadow-lg)]"
          : "border-[var(--border)] bg-white text-[var(--primary)] hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
      )}
    >
      <span className={cn(
        "p-3 rounded-[var(--radius-lg)]",
        isSelected ? "bg-white/20" : "bg-[var(--bg-main)]"
      )}>
        {config.icon}
      </span>
      <span className="text-sm font-semibold">{config.label}</span>
    </button>
  );
}
