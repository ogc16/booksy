
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const HeroSection = () => (
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
