"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Bell, ChevronRight } from "lucide-react";
import SearchBar from "@/components/molecules/SearchBar";
import UserMenu from "@/components/molecules/UserMenu";

interface HeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  isCollapsed: boolean;
}

export default function Header({ breadcrumbs, isCollapsed }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-[var(--header-height)] bg-white z-30",
        "flex items-center justify-between px-6 gap-4",
        "border-b border-[var(--border)]",
        "transition-sidebar",
        isCollapsed
          ? "left-[var(--sidebar-collapsed-width)]"
          : "left-[var(--sidebar-width)]"
      )}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="text-[var(--text-muted)]"
                />
              )}
              <span
                className={cn(
                  index === breadcrumbs.length - 1
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-secondary)]"
                )}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-lg">
        <SearchBar className="w-full" />
      </div>

      {/* Right: Notification + User */}
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "relative p-2.5 rounded-[var(--radius-md)]",
            "text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)]",
            "transition-all duration-200 cursor-pointer"
          )}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="w-px h-8 bg-[var(--border)]" />

        <UserMenu name="Admin" role="Selamat datang" />
      </div>
    </header>
  );
}
