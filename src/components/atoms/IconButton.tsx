"use client";

import React from "react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "info" | "warning" | "danger" | "default";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  icon: React.ReactNode;
  tooltip?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  info: "text-[var(--primary)] hover:bg-[var(--primary)]/10",
  warning: "text-amber-600 hover:bg-amber-50",
  danger: "text-red-500 hover:bg-red-50",
  default: "text-[var(--text-secondary)] hover:bg-[var(--bg-main)]",
};

export default function IconButton({
  variant = "default",
  icon,
  tooltip,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      title={tooltip}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] cursor-pointer",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
