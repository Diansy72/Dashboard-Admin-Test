import React from "react";
import { cn } from "@/lib/cn";
import { VehicleStatus } from "@/types";

interface BadgeProps {
  status: VehicleStatus | "booked";
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; dotColor: string; bgColor: string; textColor: string }
> = {
  available: {
    label: "Available",
    dotColor: "bg-green-500",
    bgColor: "bg-[var(--status-available-bg)]",
    textColor: "text-green-700",
  },
  rented: {
    label: "Booked",
    dotColor: "bg-red-500",
    bgColor: "bg-[var(--status-booked-bg)]",
    textColor: "text-red-700",
  },
  booked: {
    label: "Booked",
    dotColor: "bg-red-500",
    bgColor: "bg-[var(--status-booked-bg)]",
    textColor: "text-red-700",
  },
  service: {
    label: "Service",
    dotColor: "bg-amber-500",
    bgColor: "bg-[var(--status-service-bg)]",
    textColor: "text-amber-700",
  },
};

export default function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status] || statusConfig.available;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] text-xs font-semibold",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)}
      />
      {config.label}
    </span>
  );
}
