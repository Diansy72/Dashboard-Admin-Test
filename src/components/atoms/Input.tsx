"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  hasSearchIcon?: boolean;
}

export default function Input({
  icon,
  hasSearchIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {(icon || hasSearchIcon) && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          {icon || <Search size={16} />}
        </span>
      )}
      <input
        className={cn(
          "w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)]",
          "px-4 py-2.5 text-sm text-[var(--text-primary)]",
          "placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]",
          "transition-all duration-200",
          (icon || hasSearchIcon) && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}
