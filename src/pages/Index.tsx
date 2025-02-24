
import { LandingLayout } from "@/components/layout/LandingLayout";
import { HeroSection } from "./landing/Hero";
import { PricingSection } from "./landing/PricingSection";

const Index = () => {
  return (
    <LandingLayout>
      <div className="space-y-12 animate-fadeIn">
        <HeroSection />
        <PricingSection />
      </div>
    </LandingLayout>
  );
};

export default Index;
