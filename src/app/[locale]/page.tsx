import LandingNavbar from "@/components/organisms/landing/Navbar";
import HeroSection from "@/components/organisms/landing/HeroSection";
import HowItWorks from "@/components/organisms/landing/HowItWorks";
import RecommendedDestinations from "@/components/organisms/landing/RecommendedDestinations";
import BestVehicles from "@/components/organisms/landing/BestVehicles";
import WhyChooseUs from "@/components/organisms/landing/WhyChooseUs";
import StatsSection from "@/components/organisms/landing/StatsSection";
import Testimonials from "@/components/organisms/landing/Testimonials";
import Footer from "@/components/organisms/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <RecommendedDestinations />
      <BestVehicles />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
