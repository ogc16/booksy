
import { Card } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart, LineChart } from "@/components/ui/chart";
import { ChartBar, CreditCard, DollarSign, Receipt, Check, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: any;
  trend: string;
}) => (
  <Card className="p-6 glass-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        <p className="text-sm text-success-DEFAULT mt-1">{trend}</p>
      </div>
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </Card>
);

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

const HeroSection = () => (
  <div className="text-center pb-12 border-b">
    <h1 className="text-4xl font-bold mb-4">Simplify Your Business Finances</h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Track expenses, manage invoices, and grow your business with our comprehensive financial management platform.
    </p>
    <div className="flex gap-4 justify-center">
      <Button onClick={() => toast.info("Sign in clicked (Demo only)")} className="gap-2">
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>
      <Button onClick={() => toast.info("Register clicked (Demo only)")} variant="outline" className="gap-2">
        <UserPlus className="w-4 h-4" />
        Register
      </Button>
    </div>
  </div>
);

const Dashboard = () => {
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
    <div className="space-y-12 animate-fadeIn">
      <HeroSection />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$84,254.00"
            icon={DollarSign}
            trend="+8.5% from last month"
          />
          <StatCard
            title="Total Expenses"
            value="$24,865.00"
            icon={Receipt}
            trend="-2.3% from last month"
          />
          <StatCard
            title="Bank Balance"
            value="$59,389.00"
            icon={CreditCard}
            trend="+12.5% from last month"
          />
          <StatCard
            title="Net Profit"
            value="$32,754.00"
            icon={ChartBar}
            trend="+15.2% from last month"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <LineChart
            data={[
              { name: "Jan", value: 4000 },
              { name: "Feb", value: 3000 },
              { name: "Mar", value: 5000 },
              { name: "Apr", value: 4500 },
              { name: "May", value: 6000 },
              { name: "Jun", value: 5500 },
            ]}
          />
        </Card>

        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <BarChart
            data={[
              { name: "Utilities", value: 1200 },
              { name: "Rent", value: 2500 },
              { name: "Salaries", value: 4500 },
              { name: "Marketing", value: 1800 },
              { name: "Software", value: 900 },
            ]}
          />
        </Card>
      </div>

      <div className="py-12 border-t">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
          <p className="text-gray-600 mt-2">
            Select the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
