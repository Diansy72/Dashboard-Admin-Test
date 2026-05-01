"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TabGroup from "@/components/molecules/TabGroup";
import Pagination from "@/components/molecules/Pagination";
import VehicleTable from "@/components/organisms/VehicleTable";
import VehicleTypeModal from "@/components/organisms/VehicleTypeModal";
import DetailModal from "@/components/organisms/DetailModal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import CreateBookingModal from "@/components/organisms/CreateBookingModal";
import AddVehicleForm from "@/components/organisms/AddVehicleForm";
import BookingHistoryTable from "@/components/organisms/BookingHistoryTable";
import { Plus } from "lucide-react";
import { mockVehicles, mockBookingHistory, formatCurrency, recentBookings } from "@/lib/data";
import { Vehicle, BookingHistory } from "@/types";
import Badge from "@/components/atoms/Badge";
import { useSearchParams } from "next/navigation";

const tabs = [
  { id: "vehicles", label: "Vehicles" },
  { id: "booking-history", label: "Booking History" },
];

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "available", label: "Available" },
  { value: "rented", label: "Booked" },
  { value: "service", label: "Service" },
];

const ITEMS_PER_PAGE = 5;

export default function PricelistPage() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "vehicles");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingVehicleType, setAddingVehicleType] = useState<"motorcycle" | "car" | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [bookingHistoryData, setBookingHistoryData] = useState<BookingHistory[]>(mockBookingHistory);

  // Detail modal
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  // Booking modal
  const [bookingTarget, setBookingTarget] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchQuery, statusFilter]);

  const filteredHistory = useMemo(() => {
    return bookingHistoryData.filter((item) => {
      const matchesSearch =
        item.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [bookingHistoryData, searchQuery]);

  const totalPages = Math.ceil(
    (activeTab === "vehicles" ? filteredVehicles.length : filteredHistory.length) / ITEMS_PER_PAGE
  );
  
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (vehicle: Vehicle) => {
    setDeleteTarget(vehicle);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleBooking = (
    vehicleId: number,
    bookingData: { customerName: string; phone: string; startDate: string; endDate: string; notes: string }
  ) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, status: "rented" as const } : v
      )
    );

    const bookedVehicle = vehicles.find((v) => v.id === vehicleId);
    if (bookedVehicle) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const newHistoryEntry: BookingHistory = {
        id: `bh-${Date.now()}`,
        vehicleName: bookedVehicle.name,
        licensePlate: bookedVehicle.licensePlate,
        category: bookedVehicle.category,
        bookingDate: bookingData.startDate,
        time: "08:00",
        duration: `${diffDays || 1} days`,
        customer: bookingData.customerName,
        phone: bookingData.phone || "-",
        notes: bookingData.notes || "-",
      };

      setBookingHistoryData((prev) => [newHistoryEntry, ...prev]);

      recentBookings.unshift({
        id: Date.now(),
        vehicleName: bookedVehicle.name,
        licensePlate: bookedVehicle.licensePlate,
        vehicleType: bookedVehicle.type,
        duration: `${diffDays || 1} days`,
        date: bookingData.startDate,
        initial: bookingData.customerName.charAt(0).toUpperCase(),
      });
    }
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pricelist" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Pricelist Management
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {vehicles.length} vehicles in fleet
          </p>
        </div>
        <Button
          icon={<Plus size={18} />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Vehicle
        </Button>
      </div>

      {/* Tabs */}
      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          setCurrentPage(1);
          setSearchQuery("");
        }}
        className="mb-6 w-fit"
      />

      {addingVehicleType || editVehicle ? (
        <AddVehicleForm
          type={addingVehicleType || undefined}
          initialData={editVehicle || undefined}
          nextId={vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1}
          onClose={() => {
            setAddingVehicleType(null);
            setEditVehicle(null);
          }}
          onSave={(newVehicle) => {
            if (editVehicle) {
              setVehicles((prev) => prev.map((v) => (v.id === newVehicle.id ? newVehicle : v)));
            } else {
              setVehicles((prev) => [newVehicle, ...prev]);
            }
            setAddingVehicleType(null);
            setEditVehicle(null);
          }}
        />
      ) : (
        <>
          {activeTab === "vehicles" ? (
            <>
          {/* Filters */}
          <div className="bg-white rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--border)] p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="w-full max-w-sm">
                <Input
                  hasSearchIcon
                  placeholder="Cari Nama..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="w-48">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <VehicleTable
            vehicles={paginatedVehicles}
            startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
            onView={(v) => setDetailVehicle(v)}
            onEdit={(v) => setEditVehicle(v)}
            onDelete={(v) => handleDelete(v)}
            onBooking={(v) => setBookingTarget(v)}
          />
        </>
      ) : (
        <>
          {/* Booking History Filters (only search) */}
          <div className="bg-white rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--border)] p-5">
            <div className="w-full max-w-sm">
              <Input
                hasSearchIcon
                placeholder="Cari Nama, Plat, atau Customer..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Booking History Table */}
          <BookingHistoryTable data={paginatedHistory} />
        </>
      )}

          <Pagination
            className="mt-4 px-5"
            currentPage={currentPage}
            totalPages={totalPages || 1}
            totalItems={activeTab === "vehicles" ? filteredVehicles.length : filteredHistory.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}



      {/* Vehicle Type Modal */}
      <VehicleTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(type) => {
          setAddingVehicleType(type as "motorcycle" | "car");
          setIsModalOpen(false);
        }}
      />

      {/* Vehicle Detail Modal */}
      <DetailModal
        isOpen={!!detailVehicle}
        onClose={() => setDetailVehicle(null)}
        title="Vehicle Detail"
        items={detailVehicle ? [
          { label: "ID", value: String(detailVehicle.id) },
          { label: "Name", value: detailVehicle.name },
          { label: "Type", value: detailVehicle.type === "car" ? "Car" : "Motorcycle" },
          { label: "Plate Number", value: detailVehicle.licensePlate },
          { label: "Category", value: detailVehicle.category },
          { label: "Price / Day", value: formatCurrency(detailVehicle.pricePerDay) },
          { label: "Fuel Consumption", value: detailVehicle.fuelConsumption || "-" },
          { label: "Max Speed", value: detailVehicle.maxSpeed || "-" },
          { label: "Seat Capacity", value: detailVehicle.seatCapacity ? String(detailVehicle.seatCapacity) : "-" },
          { label: "Type Drive", value: detailVehicle.selfDrive ? "Self Drive" : (detailVehicle.selfDrive === false ? "With Drive" : "-") },
          ...(detailVehicle.type === "motorcycle" ? [{ label: "Charger Phone", value: detailVehicle.hasPhoneCharger ? "YES" : "NO" }] : []),
          { label: "Additional Features", value: detailVehicle.features && detailVehicle.features.length > 0 ? detailVehicle.features.join(", ") : "-" },
          { label: "Status", value: <Badge status={detailVehicle.status === "rented" ? "booked" : detailVehicle.status} /> },
          { label: "Created At", value: detailVehicle.createdAt },
        ] : []}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Hapus Kendaraan"
        message={`Apakah Anda yakin ingin menghapus ${deleteTarget?.name} (${deleteTarget?.licensePlate})? Tindakan ini tidak dapat dibatalkan.`}
      />

      {/* Create Booking Modal */}
      <CreateBookingModal
        isOpen={!!bookingTarget}
        onClose={() => setBookingTarget(null)}
        vehicle={bookingTarget}
        onSubmit={(vehicleId, bookingData) => {
          handleBooking(vehicleId, bookingData);
          setBookingTarget(null);
        }}
      />
    </DashboardLayout>
  );
}
