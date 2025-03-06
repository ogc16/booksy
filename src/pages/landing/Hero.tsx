
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pb-12 border-b">
      <h1 className="text-4xl font-bold mb-4">Simplify Your Business Finances</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Track expenses, manage invoices, and grow your business with our comprehensive financial management platform.
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate("/login")} className="gap-2">
          <LogIn className="w-4 h-4" />
          Sign In
        </Button>
        <Button onClick={() => navigate("/register")} variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Register
        </Button>
      </div>
    </div>
  );
};
