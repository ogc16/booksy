
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

const PricingTier = ({
  name,
  price,
  description,
  features,
  recommended,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}) => (
  <Card className={`p-6 ${recommended ? 'border-primary shadow-lg' : ''}`}>
    {recommended && (
      <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 inline-block">
        Recommended
      </span>
    )}
    <h3 className="text-xl font-semibold">{name}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-3xl font-bold">${price}</span>
      {price !== "0" && <span className="text-gray-500 ml-2">/month</span>}
    </div>
    <p className="mt-2 text-gray-600">{description}</p>
    <ul className="mt-6 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      className="w-full mt-6" 
      variant={recommended ? "default" : "outline"}
      onClick={() => toast.success(`Selected ${name} plan! (Demo only)`)}
    >
      Get Started
    </Button>
  </Card>
);

const Pricing = () => {
  const tiers = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out our features",
      features: [
        "Up to 5 vendors",
        "Basic expense tracking",
        "Single bank account",
        "Monthly reports",
        "Email support"
      ]
    },
    {
      name: "Basic",
      price: "29",
      description: "Great for small businesses",
      features: [
        "Up to 25 vendors",
        "Advanced expense tracking",
        "Up to 3 bank accounts",
        "Weekly reports",
        "Priority email support",
        "Custom categories"
      ]
    },
    {
      name: "Starter",
      price: "79",
      description: "Perfect for growing companies",
      features: [
        "Up to 100 vendors",
        "Advanced expense tracking",
        "Up to 10 bank accounts",
        "Daily reports",
        "24/7 phone support",
        "Custom categories",
        "Team collaboration",
        "Invoice automation"
      ],
      recommended: true
    },
    {
      name: "Pro",
      price: "199",
      description: "For large enterprises",
      features: [
        "Unlimited vendors",
        "Advanced expense tracking",
        "Unlimited bank accounts",
        "Real-time reports",
        "24/7 priority support",
        "Custom categories",
        "Advanced team collaboration",
        "Invoice automation",
        "API access",
        "Custom integrations"
      ]
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 mt-2">
            Choose the plan that best fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {tiers.map((tier) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              recommended={tier.recommended}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
