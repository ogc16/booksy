
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for freelancers and small businesses just getting started",
      features: [
        "Up to 50 invoices per month",
        "Up to 10 clients",
        "Basic reporting",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$29",
      description: "Ideal for growing businesses with more complex needs",
      features: [
        "Unlimited invoices",
        "Unlimited clients",
        "Advanced reporting",
        "Priority email support",
        "Team access (up to 3 users)",
        "Expense tracking"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For larger organizations that need advanced features and support",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Custom reporting",
        "Dedicated account manager",
        "API access",
        "Phone support"
      ]
    }
  ];

  const handleGetStarted = (planName: string) => {
    // Navigate to payment page with plan info
    navigate("/payment", { state: { plan: planName } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose the Right Plan for Your Business</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Select a plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col ${plan.recommended ? "border-primary shadow-lg" : ""}`}
            >
              {plan.recommended && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Recommended
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleGetStarted(plan.name)}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need help choosing the right plan? Contact our sales team.
          </p>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Return to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
