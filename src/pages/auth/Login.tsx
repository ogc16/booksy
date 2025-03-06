
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in the login function
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link to="/register" className="text-primary hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-center mb-2">Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p><strong>Admin:</strong> admin@example.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
            <div>
              <p><strong>Manager:</strong> manager@example.com</p>
              <p><strong>Password:</strong> manager123</p>
            </div>
            <div>
              <p><strong>Accountant:</strong> accountant@example.com</p>
              <p><strong>Password:</strong> accountant123</p>
            </div>
            <div>
              <p><strong>User:</strong> user@example.com</p>
              <p><strong>Password:</strong> user123</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
