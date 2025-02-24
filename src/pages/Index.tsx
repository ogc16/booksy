
import { AppLayout } from "@/components/layout/AppLayout";
import { HeroSection } from "./landing/Hero";
import { PricingSection } from "./landing/PricingSection";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-12 animate-fadeIn">
        <HeroSection />
        <PricingSection />
      </div>
    </AppLayout>
  );
};

export default Index;
