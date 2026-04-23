import React from "react";
import Avatar from "@/components/atoms/Avatar";

interface UserMenuProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

export default function UserMenu({ name, role, avatarUrl }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <Avatar src={avatarUrl} name={name} size="md" />
      <div className="hidden md:block text-right">
        <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
          Halo, {name}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">{role}</p>
      </div>
    </div>
  );
}
