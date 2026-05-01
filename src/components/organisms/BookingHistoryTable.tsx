import React from "react";
import { BookingHistory } from "@/types";
import { cn } from "@/lib/cn";

interface BookingHistoryTableProps {
  data: BookingHistory[];
  className?: string;
}

export default function BookingHistoryTable({ data, className }: BookingHistoryTableProps) {
  const columns = [
    "VEHICLE NAME",
    "PLATE NUMBER",
    "CATEGORY",
    "BOOKING DATE",
    "TIME",
    "DURATION",
    "CUSTOMER",
    "PHONE",
    "NOTES"
  ];

  if (data.length === 0) {
    return (
      <div className={cn("bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-8 text-center", className)}>
        <p className="text-[var(--text-secondary)]">No booking history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-[var(--radius-xl)] border border-[var(--border)] overflow-hidden">
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
                  {item.vehicleName}
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-mono text-[#64748B] tracking-widest">
                    {item.licensePlate}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.category}
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.bookingDate}
                </td>
                <td className="px-5 py-4 text-sm text-[#1E293B]">
                  {item.time}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-[#1E293B]">
                  {item.duration}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                  {item.customer}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                  {item.phone || "-"}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)] truncate max-w-[150px]">
                  {item.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
