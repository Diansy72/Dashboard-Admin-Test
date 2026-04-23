import React from "react";
import { mockPackages } from "@/lib/data";
import { notFound } from "next/navigation";
import PackageDetailHero from "@/components/organisms/packages/PackageDetailHero";
import PackageBookingView from "@/components/organisms/packages/PackageBookingView";
import Navbar from "@/components/organisms/landing/Navbar";
import Footer from "@/components/organisms/landing/Footer";

export default async function PackageDetailPage(props: { params: Promise<{ locale: string; id: string }> }) {
  const params = await props.params;
  const packageId = params.id;
  const pkg = mockPackages.find((p) => p.id === packageId);

  if (!pkg) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PackageDetailHero pkg={pkg} />
        <PackageBookingView pkg={pkg} />
      </main>
      <Footer />
    </>
  );
}
