import { Vehicle, NavItemType, TourPackage } from "@/types";

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    type: "car",
    licensePlate: "AB 1234 CD",
    pricePerDay: 350000,
    status: "rented",
    imageUrl: null,
    category: "MPV",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 5678 EF",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 9012 GH",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-02-10",
  },
  {
    id: 4,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 3456 IJ",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 7890 KL",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-03-05",
  },
  {
    id: 6,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 2345 MN",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-03-05",
  },
];

export const sidebarNavItems: NavItemType[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Pricelist",
    href: "/dashboard/pricelist",
    icon: "ClipboardList",
    hasSubmenu: true,
  },
  {
    label: "Landing Page",
    href: "/dashboard/landing-page",
    icon: "Globe",
  },
  {
    label: "Tour Packages",
    href: "/dashboard/tour-packages",
    icon: "Map",
  },
  {
    label: "About Us",
    href: "/dashboard/about-us",
    icon: "FileText",
  },
  {
    label: "Promo & Notif",
    href: "/dashboard/promo",
    icon: "Bell",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const mockPackages: TourPackage[] = [
  {
    id: "pkg-001",
    title: "Jogja Heritage & Candi Tour",
    description: "Nikmati perjalanan bersejarah menjelajahi keagungan budaya Yogyakarta dan Magelang, mulai dari keindahan Candi Borobudur hingga pesona Kraton Yogyakarta.",
    imageUrl: "/images/destination-borobudur.png",
    estimatedPrice: 650000,
    duration: "Full Day",
    minPax: 2,
    maxPax: 15,
    startTime: "07:00 AM",
    endTime: "08:00 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver profesional & ramah",
      "BBM / Bahan Bakar",
      "Air mineral",
      "Penjemputan di Hotel/Stasiun"
    ],
    excludes: [
      "Tiket masuk wisata",
      "Biaya parkir & Tol",
      "Makan & Pengeluaran pribadi",
      "Tips driver (Seikhlasnya)",
      "Guide tambahan di destinasi wisata"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 650000 },
      { id: "v2", name: "Toyota Innova Reborn", capacity: 7, pricePerDay: 850000 },
      { id: "v3", name: "Toyota Hiace Commuter", capacity: 15, pricePerDay: 1300000 }
    ]
  },
  {
    id: "pkg-002",
    title: "Jogja Complete Package",
    description: "Rasakan pengalaman tak terlupakan dari indahnya pegunungan hingga pesona pantai selatan yang eksotis dalam satu paket perjalanan seru.",
    imageUrl: "/images/hero-bg.png",
    estimatedPrice: 600000,
    duration: "Full Day",
    minPax: 2,
    maxPax: 15,
    startTime: "06:00 AM",
    endTime: "07:30 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver profesional & ramah",
      "BBM / Bahan Bakar",
      "Air mineral",
      "Penjemputan di area Jogja"
    ],
    excludes: [
      "Tiket masuk objek wisata",
      "Biaya parkir & Retribusi",
      "Makan pribadi",
      "Tips driver",
      "Sewa jeep (jika diperlukan di lokasi wisata)"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 600000 },
      { id: "v2", name: "Toyota Innova Reborn", capacity: 7, pricePerDay: 800000 },
      { id: "v3", name: "Isuzu Elf Long", capacity: 19, pricePerDay: 1400000 }
    ]
  },
  {
    id: "pkg-003",
    title: "City Tour Experince Jogja",
    description: "Jelajahi keasrian dan kearifan lokal kota Yogyakarta, nikmati jajanan khas dan pernak-pernik unik di setiap sudut kota.",
    imageUrl: "/images/destinations.png",
    estimatedPrice: 500000,
    duration: "Half Day (10 Jam)",
    minPax: 2,
    maxPax: 6,
    startTime: "09:00 AM",
    endTime: "07:00 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver / Guide",
      "BBM",
      "Free Parkir di rute kota"
    ],
    excludes: [
      "Tiket masuk museum/wisata",
      "Makan & Minum",
      "Tips"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 500000 },
      { id: "v2", name: "Honda Brio", capacity: 4, pricePerDay: 400000 }
    ]
  }
];
