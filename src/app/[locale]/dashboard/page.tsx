"use client";

import React from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import {
  Car,
  Bike,
  TrendingUp,
  DollarSign,
  CalendarCheck,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    label: "Total Kendaraan",
    value: "24",
    change: "+3 bulan ini",
    icon: <Car size={22} />,
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
  },
  {
    label: "Sedang Disewa",
    value: "8",
    change: "33% dari armada",
    icon: <CalendarCheck size={22} />,
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50",
  },
  {
    label: "Pendapatan Bulan Ini",
    value: "Rp 12.5 Jt",
    change: "+12% dari bulan lalu",
    icon: <DollarSign size={22} />,
    color: "bg-amber-500",
    bgLight: "bg-amber-50",
  },
  {
    label: "Perlu Servis",
    value: "2",
    change: "Segera cek",
    icon: <AlertTriangle size={22} />,
    color: "bg-red-500",
    bgLight: "bg-red-50",
  },
];

const recentBookings = [
  { customer: "Budi Santoso", vehicle: "Toyota Avanza", date: "23 Apr 2026", status: "Active" },
  { customer: "Siti Rahayu", vehicle: "Honda Beat 110", date: "22 Apr 2026", status: "Completed" },
  { customer: "Ahmad Fauzi", vehicle: "Honda Beat 110", date: "21 Apr 2026", status: "Pending" },
  { customer: "Dewi Lestari", vehicle: "Toyota Avanza", date: "20 Apr 2026", status: "Active" },
];

const popularVehicles = [
  { name: "Toyota Avanza", type: "car", bookings: 45, revenue: "Rp 15.7 Jt" },
  { name: "Honda Beat 110", type: "motorcycle", bookings: 78, revenue: "Rp 5.8 Jt" },
  { name: "Toyota Avanza", type: "car", bookings: 32, revenue: "Rp 11.2 Jt" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Dashboard" }]}>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Dashboard Overview
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Selamat datang kembali! Berikut ringkasan bisnis Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-5 hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2.5 rounded-[var(--radius-lg)] ${stat.bgLight}`}
              >
                <div className={`${stat.color} text-white p-2 rounded-[var(--radius-md)]`}>
                  {stat.icon}
                </div>
              </div>
              <TrendingUp size={16} className="text-emerald-500 mt-1" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-2">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Booking Terbaru
            </h2>
            <button className="text-sm text-[var(--primary)] font-semibold hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Kendaraan</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="border-b border-[var(--border-light)] table-row-hover">
                    <td className="py-3.5 px-2 text-sm font-medium text-[var(--text-primary)]">{booking.customer}</td>
                    <td className="py-3.5 px-2 text-sm text-[var(--text-secondary)]">{booking.vehicle}</td>
                    <td className="py-3.5 px-2 text-sm text-[var(--text-secondary)]">{booking.date}</td>
                    <td className="py-3.5 px-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        booking.status === "Active"
                          ? "bg-blue-50 text-blue-700"
                          : booking.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Vehicles */}
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">
            Kendaraan Populer
          </h2>
          <div className="space-y-4">
            {popularVehicles.map((vehicle, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-[var(--radius-lg)] hover:bg-[var(--bg-main)] transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--primary)] text-white flex items-center justify-center flex-shrink-0">
                  {vehicle.type === "car" ? <Car size={18} /> : <Bike size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {vehicle.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {vehicle.bookings} bookings
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    {vehicle.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
