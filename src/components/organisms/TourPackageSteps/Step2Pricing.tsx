import React, { useState } from "react";
import { Car, Bus, Plus, ChevronRight, ChevronDown } from "lucide-react";
import Button from "@/components/atoms/Button";
import { TourPackageFormData } from "@/types";
import { mockVehicles } from "@/lib/data";

interface Step2Props {
  formData: TourPackageFormData;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageFormData>>;
}

export default function Step2Pricing({ formData, setFormData }: Step2Props) {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [personPrice, setPersonPrice] = useState("");

  const [customVehicles, setCustomVehicles] = useState<any[]>([]);
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState("Small Car");
  const [customCapacity, setCustomCapacity] = useState("3");
  const [customNotes, setCustomNotes] = useState("");

  const getVehicleCapacity = (v: any) => v.seatCapacity || (v.category === "MPV" ? 6 : v.category === "Bus" || v.category === "Minibus" ? 15 : 4);

  const allVehicles = [...mockVehicles, ...customVehicles];

  const handleAddPricing = () => {
    if (!selectedVehicle) return;
    const vehicle = allVehicles.find((v) => v.id.toString() === selectedVehicle);
    if (!vehicle) return;

    if (formData.priceType === "per_car") {
      if (!carPrice) return;
      setFormData((prev) => ({
        ...prev,
        pricingOptions: [
          ...prev.pricingOptions,
          {
            id: `price-${Date.now()}`,
            type: "per_car",
            vehicleName: vehicle.name,
            capacity: getVehicleCapacity(vehicle),
            price: parseInt(carPrice),
          },
        ],
      }));
      setSelectedVehicle("");
      setCarPrice("");
    } else {
      if (!personPrice) return;
      setFormData((prev) => ({
        ...prev,
        pricingOptions: [
          ...prev.pricingOptions,
          {
            id: `price-${Date.now()}`,
            type: "per_person",
            vehicleName: vehicle.name,
            capacity: getVehicleCapacity(vehicle),
            price: parseInt(personPrice),
          },
        ],
      }));
      setSelectedVehicle("");
      setPersonPrice("");
    }
  };

  const handleSaveCustomVehicle = () => {
    if (!customName || !customCategory || !customCapacity) return;
    const newVehicle = {
      id: `cv-${Date.now()}`,
      name: customName,
      category: customCategory,
      seatCapacity: parseInt(customCapacity),
    };
    setCustomVehicles((prev) => [...prev, newVehicle]);
    setIsCustomFormOpen(false);
    setCustomName("");
    setCustomCategory("Small Car");
    setCustomCapacity("3");
    setCustomNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--primary)]/5 p-4 rounded-[var(--radius-lg)] border border-[var(--primary)]/20 flex items-center gap-4">
        <div className="text-[var(--primary)] shrink-0">
          {formData.priceType === "per_car" ? <Car size={24} /> : <Bus size={24} />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-[var(--primary)]">
            {formData.priceType === "per_car" ? "Price per Car Mode" : "Price per Person Mode"}
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            {formData.priceType === "per_car"
              ? "Select cars and set price per car"
              : "Select buses and set price per person"}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">
          {formData.priceType === "per_car" ? "Add Vehicle — Cars" : "Add Vehicle — Buses"}
        </h4>

        <div className="flex items-center gap-3">
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
          >
            <option value="">Select vehicle...</option>
            {allVehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({getVehicleCapacity(v)} seat)
              </option>
            ))}
          </select>
          <input
            type="number"
            value={formData.priceType === "per_car" ? carPrice : personPrice}
            onChange={(e) => formData.priceType === "per_car" ? setCarPrice(e.target.value) : setPersonPrice(e.target.value)}
            className="w-48 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            placeholder={formData.priceType === "per_car" ? "Price / car (Rp)" : "Price / person (Rp)"}
          />
          <Button
            className="bg-[#003B73] hover:bg-[#002A54] text-white shrink-0"
            onClick={handleAddPricing}
            disabled={!selectedVehicle || (formData.priceType === "per_car" ? !carPrice : !personPrice)}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <button 
          className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline"
          onClick={() => setIsCustomFormOpen(!isCustomFormOpen)}
        >
          <Plus size={16} /> Add Custom Vehicle Option 
          {isCustomFormOpen ? <ChevronDown size={14} className="ml-1" /> : <ChevronRight size={14} className="ml-1" />}
        </button>
        
        {isCustomFormOpen && (
          <div className="mt-4 bg-[#F8FAFC] border border-[var(--border)] rounded-[var(--radius-lg)] p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Vehicle Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                  placeholder="e.g. Toyota HiAce"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Category</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] cursor-pointer"
                >
                  <option value="Small Car">Small Car</option>
                  <option value="Medium Car">Medium Car</option>
                  <option value="MPV">MPV</option>
                  <option value="Minibus">Minibus</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Default Capacity</label>
                <input
                  type="number"
                  value={customCapacity}
                  onChange={(e) => setCustomCapacity(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Notes</label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <Button
              className="bg-[#003B73] hover:bg-[#002A54] text-white"
              onClick={handleSaveCustomVehicle}
              disabled={!customName || !customCategory || !customCapacity}
            >
              <Plus size={16} className="mr-1" /> Save Custom Vehicle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
