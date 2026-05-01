"use client";

import React, { useState } from "react";
import { X, Upload, Motorbike, Car, Tag } from "lucide-react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Vehicle } from "@/types";

interface AddVehicleFormProps {
  type?: "motorcycle" | "car";
  nextId?: number;
  initialData?: Vehicle;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
}

export default function AddVehicleForm({ type, nextId, initialData, onClose, onSave }: AddVehicleFormProps) {
  const formType = initialData?.type || type || "car";

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    licensePlate: initialData?.licensePlate || "",
    pricePerDay: initialData ? String(initialData.pricePerDay) : "",
    fuelConsumption: initialData?.fuelConsumption || "",
    maxSpeed: initialData?.maxSpeed || "",
    seatCapacity: initialData ? String(initialData.seatCapacity) : "",
    selfDrive: initialData?.selfDrive === false ? "NO" : "YES",
    features: initialData?.features || ([] as string[]),
  });

  const [currentFeature, setCurrentFeature] = useState("");

  const handleSave = () => {
    const newVehicle: Vehicle = {
      id: initialData ? initialData.id : (nextId || Date.now()),
      name: formData.name || "New Vehicle",
      type: formType,
      licensePlate: formData.licensePlate || "XX 0000 XX",
      pricePerDay: parseInt(formData.pricePerDay.replace(/\D/g, "")) || 0,
      status: initialData ? initialData.status : "available",
      imageUrl: initialData ? initialData.imageUrl : null,
      category: initialData ? initialData.category : (formType === "car" ? "Car" : "Motorcycle"),
      createdAt: initialData ? initialData.createdAt : new Date().toISOString().split("T")[0],
      fuelConsumption: formData.fuelConsumption,
      maxSpeed: formData.maxSpeed,
      seatCapacity: parseInt(formData.seatCapacity) || (formType === "car" ? 4 : 2),
      selfDrive: formData.selfDrive === "YES",
      features: formData.features,
    };
    onSave(newVehicle);
  };

  const handleAddFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()],
      }));
      setCurrentFeature("");
    }
  };

  return (
    <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[#003B73] flex items-center justify-center text-white">
            {formType === "car" ? <Car size={20} /> : <Motorbike size={20} />}
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {initialData ? "Edit" : "Add"} {formType === "car" ? "Car" : "Motorcycle"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
        >
          <X size={20} className="text-[var(--text-secondary)]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Row 1 */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Vehicle Name
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. Honda Beat"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Plate Number
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. AB 1234 CD"
            value={formData.licensePlate}
            onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Price per Day (Rp)
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. 100.000"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Fuel Consumption
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. 100 Km/L"
            value={formData.fuelConsumption}
            onChange={(e) => setFormData({ ...formData, fuelConsumption: e.target.value })}
          />
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Max Speed
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. 100 Km/H"
            value={formData.maxSpeed}
            onChange={(e) => setFormData({ ...formData, maxSpeed: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Seat Capacity
          </label>
          <Input
            className="bg-[var(--bg-main)] border border-gray-300"
            placeholder="e.g. 2"
            value={formData.seatCapacity}
            onChange={(e) => setFormData({ ...formData, seatCapacity: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Self Drive
          </label>
          <div className="relative">
            <select
              value={formData.selfDrive}
              onChange={(e) => setFormData({ ...formData, selfDrive: e.target.value })}
              className="w-full bg-[var(--bg-main)] border-none rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all appearance-none cursor-pointer"
            >
              <option value="YES">✓ YES</option>
              <option value="NO">✕ NO</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Image
          </label>
          <div className="w-full bg-[var(--bg-main)] rounded-[var(--radius-md)] px-4 py-2.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--border)] transition-colors">
            <Upload size={16} className="text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-muted)]">Upload</span>
          </div>
        </div>
      </div>

      {/* Row 3 - Additional Features */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-3">
          <Tag size={16} /> Additional Features
        </label>
        
        {formData.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F1F9] text-[#003B73] rounded-full text-xs font-medium"
              >
                {feature}
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      features: prev.features.filter((f) => f !== feature),
                    }))
                  }
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-[1fr_auto] gap-3 w-full">
          <Input
            className="bg-[var(--bg-main)] w-full"
            placeholder="Add Feature..."
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
          />
          <Button
            variant="secondary"
            className="bg-[#E8F1F9] text-[#003B73] hover:bg-[#D1E3F4]"
            onClick={handleAddFeature}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          className="bg-[#003B73] hover:bg-[#002A54] text-white px-8"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          className="bg-[var(--bg-main)] text-[var(--text-primary)] border-transparent hover:bg-[var(--border)] px-6"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
