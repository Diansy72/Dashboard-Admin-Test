"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { Plus } from "lucide-react";
import { mockPackages, mockTourBookingHistory } from "@/lib/data";
import { TourPackage, TourBookingHistory } from "@/types";
import TourPackageTable from "@/components/organisms/TourPackageTable";
import TourPackageForm from "@/components/organisms/TourPackageForm";
import TabGroup from "@/components/molecules/TabGroup";
import TourBookingHistoryTable from "@/components/organisms/TourBookingHistoryTable";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/molecules/Pagination";
import CreateTourBookingModal from "@/components/organisms/CreateTourBookingModal";

const tabs = [
  { id: "packages", label: "Packages" },
  { id: "booking-history", label: "Booking History" },
];

export default function TourPackagesManagement() {
  const [packages, setPackages] = useState<TourPackage[]>(mockPackages);
  const [activeTab, setActiveTab] = useState("packages");
  const [searchHistoryQuery, setSearchHistoryQuery] = useState("");
  const [historyPage, setHistoryPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPackage, setEditPackage] = useState<TourPackage | null>(null);
  const [bookingPackage, setBookingPackage] = useState<TourPackage | null>(null);
  const [historyData, setHistoryData] = useState<TourBookingHistory[]>(mockTourBookingHistory);

  const ITEMS_PER_PAGE = 5;

  const filteredHistory = historyData.filter((item) => {
    return (
      item.packageName.toLowerCase().includes(searchHistoryQuery.toLowerCase())
    );
  });

  const totalHistoryPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = filteredHistory.slice(
    (historyPage - 1) * ITEMS_PER_PAGE,
    historyPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (newPkg: TourPackage) => {
    if (editPackage) {
      setPackages((prev) => prev.map((p) => (p.id === newPkg.id ? newPkg : p)));
    } else {
      setPackages((prev) => [...prev, newPkg]);
    }
  };

  const handleEdit = (pkg: TourPackage) => {
    setEditPackage(pkg);
    setIsFormOpen(true);
  };

  const handleBooking = (pkg: TourPackage) => {
    setBookingPackage(pkg);
  };

  const handleBookingSubmit = (data: { customerName: string; phone: string; date: string; time: string; vehicleName: string; pax: number; notes: string; totalPrice: number }) => {
    if (bookingPackage) {
      const newHistoryEntry: TourBookingHistory = {
        id: `tbh-${Date.now()}`,
        packageName: bookingPackage.title,
        customerName: data.customerName,
        priceType: bookingPackage.priceType || "per_car",
        vehicleType: data.vehicleName,
        pax: data.pax,
        totalPrice: data.totalPrice,
        bookingDate: data.date,
        time: data.time,
        phone: data.phone,
      };
      setHistoryData((prev) => [newHistoryEntry, ...prev]);
    }
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Tour Packages" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Tour Package Management
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage your available tour packages
          </p>
        </div>
        {!isFormOpen && (
          <Button icon={<Plus size={18} />} onClick={() => setIsFormOpen(true)}>
            Add Tour Package
          </Button>
        )}
      </div>

      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          setSearchHistoryQuery("");
          setHistoryPage(1);
        }}
        className="mb-6 w-fit"
      />

      {isFormOpen ? (
        <TourPackageForm 
          initialData={editPackage || undefined} 
          onClose={() => {
            setIsFormOpen(false);
            setEditPackage(null);
          }} 
          onSave={handleSave} 
        />
      ) : activeTab === "packages" ? (
        <TourPackageTable packages={packages} onEdit={handleEdit} onBooking={handleBooking} onDelete={handleDelete} />
      ) : (
        <>
          <div className="bg-white rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--border)] p-5">
            <div className="w-full max-w-sm">
              <Input
                hasSearchIcon
                placeholder="Cari Nama Paket..."
                value={searchHistoryQuery}
                onChange={(e) => {
                  setSearchHistoryQuery(e.target.value);
                  setHistoryPage(1);
                }}
              />
            </div>
          </div>
          <TourBookingHistoryTable data={paginatedHistory} />
          <Pagination
            className="mt-4 px-5"
            currentPage={historyPage}
            totalPages={totalHistoryPages || 1}
            totalItems={filteredHistory.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setHistoryPage}
          />
        </>
      )}

      {bookingPackage && (
        <CreateTourBookingModal
          pkg={bookingPackage}
          onClose={() => setBookingPackage(null)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </DashboardLayout>
  );
}
