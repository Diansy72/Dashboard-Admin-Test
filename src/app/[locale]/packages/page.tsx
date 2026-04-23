import React from "react";
import PackageListHero from "@/components/organisms/packages/PackageListHero";
import PackageGrid from "@/components/organisms/packages/PackageGrid";
import Navbar from "@/components/organisms/landing/Navbar";
import Footer from "@/components/organisms/landing/Footer";
import { mockPackages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-main)]">
        <PackageListHero />
        <PackageGrid packages={mockPackages} />
      </main>
      <Footer />
    </>
  );
}
