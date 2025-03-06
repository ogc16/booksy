
import { LandingLayout } from "@/layouts/LandingLayout";
import { HeroSection } from "./landing/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Clock, CreditCard, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Financial Tracking",
    description: "Keep track of all your income and expenses in one place, with powerful reporting tools.",
    icon: BarChart,
  },
  {
    title: "Invoice Management",
    description: "Create, send, and manage professional invoices and track their payment status.",
    icon: FileText,
  },
  {
    title: "Time Tracking",
    description: "Track time spent on projects, set reminders, and schedule meetings.",
    icon: Clock,
  },
  {
    title: "Payment Processing",
    description: "Accept payments online, manage refunds, and reconcile accounts.",
    icon: CreditCard,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <HeroSection />
      
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your business finances
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={() => navigate("/pricing")} size="lg">
            View Pricing
          </Button>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for businesses of all sizes, from freelancers to enterprises
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive interface designed to make financial management simple for everyone.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Secure</h3>
              <p className="text-gray-600">
                Bank-level encryption ensures your financial data is always protected.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Affordable</h3>
              <p className="text-gray-600">
                Flexible pricing plans that grow with your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Index;
