import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Banking } from "./pages/Banking";
import { Invoices } from "./pages/Invoices";
import { Estimates } from "./pages/Estimates";
import { Inventory } from "./pages/Inventory";
import { Suppliers } from "./pages/Suppliers";
import { Purchases } from "./pages/Purchases";
import { Reports } from "./pages/Reports";
import { Expenses } from "./pages/Expenses";
import { Budget } from "./pages/Budget";
import { ProfitLoss } from "./pages/ProfitLoss";
import { Revenue } from "./pages/Revenue";
import { Accountant } from "./pages/Accountant";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";
import { AccountantReports } from "./pages/AccountantReports";
import { Pricing } from "./pages/Pricing";
import { Payment } from "./pages/Payment";
import { Settings } from "./pages/Settings";

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Redirect to login page if not authenticated
  useEffect(() => {
    const publicRoutes = ['/', '/login', '/register', '/pricing', '/payment'];
    const authRoutes = ['/dashboard', '/banking', '/invoices', '/estimates', '/inventory', '/suppliers', '/purchases', '/reports', '/expenses', '/budget', '/profit-loss', '/revenue', '/accountant', '/admin', '/settings'];

    if (!currentUser && authRoutes.some(route => location.pathname.startsWith(route))) {
      navigate('/login');
    } else if (currentUser && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [currentUser, location, navigate]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!currentUser && !publicRoutes.includes(location.pathname)) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/orders" element={<Navigate to="/inventory?tab=orders" replace />} />
          <Route path="/inventory/tracking" element={<Navigate to="/inventory?tab=tracking" replace />} />
          <Route path="/inventory/analytics" element={<Navigate to="/inventory?tab=analytics" replace />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/expenses" element={<Expenses />} />
          <Route path="/reports/budget" element={<Budget />} />
          <Route path="/reports/profit-loss" element={<ProfitLoss />} />
          <Route path="/reports/revenue" element={<Revenue />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/accountant/reports" element={<AccountantReports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
