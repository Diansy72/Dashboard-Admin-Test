import React from "react";
import { TourBookingHistory } from "@/types";
import { cn } from "@/lib/cn";
import Badge from "@/components/atoms/Badge";
import { formatCurrency } from "@/lib/data";

interface TourBookingHistoryTableProps {
  data: TourBookingHistory[];
  className?: string;
}

export default function TourBookingHistoryTable({ data, className }: TourBookingHistoryTableProps) {
  const columns = [
    "PACKAGE NAME",
    "CUSTOMER",
    "PRICE TYPE",
    "VEHICLE",
    "PAX",
    "TOTAL PRICE",
    "DATE",
    "TIME",
    "PHONE"
  ];

  if (data.length === 0) {
    return (
      <div className={cn("bg-white rounded-b-[var(--radius-xl)] border border-[var(--border)] p-8 text-center", className)}>
        <p className="text-[var(--text-secondary)]">No booking history available.</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-b-[var(--radius-xl)] border border-[var(--border)] overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[var(--border)]">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] bg-white">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={cn(
                  "hover:bg-[#F8FAFC]/50 transition-colors",
                  index % 2 === 1 && "bg-[#FAFBFC]"
                )}
              >
                <td className="px-5 py-4 text-sm font-semibold text-[#1E293B]">
                  {item.packageName}
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.customerName}
                </td>
                <td className="px-5 py-4">
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium",
                    item.priceType === "per_person" 
                      ? "bg-blue-50 text-blue-600" 
                      : "bg-purple-50 text-purple-600"
                  )}>
                    {item.priceType === "per_person" ? "Per Person" : "Per Car"}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.vehicleType}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-[#1E293B]">
                  {item.pax} {item.pax > 1 ? "Pax" : "Pax"}
                </td>
                <td className="px-5 py-4 text-sm font-bold text-[#1E293B]">
                  {formatCurrency(item.totalPrice)}
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.bookingDate}
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.time}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                  {item.phone || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
