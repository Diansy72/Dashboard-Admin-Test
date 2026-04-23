export type VehicleStatus = "available" | "rented" | "service";
export type VehicleType = "car" | "motorcycle";
export type TransactionStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Vehicle {
  id: number;
  name: string;
  type: VehicleType;
  licensePlate: string;
  pricePerDay: number;
  status: VehicleStatus;
  imageUrl: string | null;
  category: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  vehicleId: number;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface NavItemType {
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  children?: NavItemType[];
}

export interface PackageVehicleOption {
  id: string;
  name: string;
  capacity: number;
  pricePerDay: number;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  estimatedPrice: number; // Base or starting price
  duration: string; // e.g. "Full Day" or "2D1N"
  minPax: number;
  maxPax: number;
  startTime: string; // e.g. "08:00 AM"
  endTime: string; // e.g. "08:00 PM"
  includes: string[];
  excludes: string[];
  vehicleOptions: PackageVehicleOption[];
}
