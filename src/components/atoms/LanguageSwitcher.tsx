"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all">
      <Globe size={16} />
      <select
        value={locale}
        onChange={handleLocaleChange}
        className="appearance-none bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer outline-none border-none pr-4"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="id" className="text-black">ID (Indonesia)</option>
        <option value="en" className="text-black">EN (English)</option>
        <option value="ja" className="text-black">JA (日本語)</option>
        <option value="ms" className="text-black">MS (Melayu)</option>
        <option value="zh" className="text-black">ZH (中文)</option>
        <option value="ko" className="text-black">KO (한국어)</option>
        <option value="jv" className="text-black">JV (Basa Jawa)</option>
      </select>
      {/* Custom Chevron since appearance is none */}
      <div className="absolute right-2 pointer-events-none text-white/70">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
