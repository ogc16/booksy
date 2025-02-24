
import { AppLayout } from "@/components/layout/AppLayout";
import { HeroSection } from "./landing/Hero";
import { PricingSection } from "./landing/PricingSection";
import { OverviewSection } from "./dashboard/OverviewSection";

const Dashboard = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <HeroSection />
      <OverviewSection />
      <PricingSection />
    </div>
  );
};

const Index = () => {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
};

export default Index;
