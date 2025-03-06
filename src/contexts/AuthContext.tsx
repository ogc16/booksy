
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "admin" | "manager" | "accountant" | "user";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration (in a real app, this would be in a database)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    email: "manager@example.com",
    password: "manager123",
    name: "Manager User",
    role: "manager" as UserRole,
  },
  {
    id: "3",
    email: "accountant@example.com",
    password: "accountant123",
    name: "Accountant User",
    role: "accountant" as UserRole,
  },
  {
    id: "4",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user" as UserRole,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("finance_app_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password before storing in state or localStorage
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("finance_app_user", JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some((u) => u.email === email)) {
      toast.error("User with this email already exists");
      setIsLoading(false);
      throw new Error("User already exists");
    }

    // In a real app, you would create the user in the database
    // For our mock, we'll just pretend it was created
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      name,
      role: "user" as UserRole,
    };

    setUser(newUser);
    localStorage.setItem("finance_app_user", JSON.stringify(newUser));
    toast.success("Account created successfully!");
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finance_app_user");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    if (!user) return false;

    // Role hierarchy: admin > manager > accountant > user
    const roleHierarchy: Record<UserRole, number> = {
      admin: 4,
      manager: 3,
      accountant: 2,
      user: 1,
    };

    const userRoleLevel = roleHierarchy[user.role];

    if (Array.isArray(requiredRole)) {
      // If any of the roles in the array is allowed
      return requiredRole.some((role) => roleHierarchy[role] <= userRoleLevel);
    }

    // Check if user's role level is sufficient
    return roleHierarchy[requiredRole] <= userRoleLevel;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
