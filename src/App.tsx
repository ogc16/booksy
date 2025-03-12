
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Banking from "./pages/Banking";
import Invoices from "./pages/Invoices";
import Estimates from "./pages/Estimates";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";
import Reports from "./pages/Reports";
import Expenses from "./pages/Expenses";
import Budget from "./pages/reports/Budget";
import ProfitLoss from "./pages/reports/ProfitLoss";
import Revenue from "./pages/reports/Revenue";
import Accountant from "./pages/Accountant";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AccountantReports from "./pages/accountant/Reports";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";

function App() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  // Define publicRoutes here so it's accessible in the component
  const publicRoutes = ['/', '/login', '/register', '/pricing', '/payment'];
  const authRoutes = ['/dashboard', '/banking', '/invoices', '/estimates', '/inventory', '/suppliers', '/purchases', '/reports', '/expenses', '/budget', '/profit-loss', '/revenue', '/accountant', '/admin', '/settings'];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!currentUser && authRoutes.some(route => location.pathname.startsWith(route))) {
      navigate('/login');
    } else if (currentUser && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [currentUser, location, navigate, authRoutes]);

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
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/banking" element={<ProtectedRoute><Banking /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
        <Route path="/estimates" element={<ProtectedRoute><Estimates /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/inventory/orders" element={<ProtectedRoute><Navigate to="/inventory?tab=orders" replace /></ProtectedRoute>} />
        <Route path="/inventory/tracking" element={<ProtectedRoute><Navigate to="/inventory?tab=tracking" replace /></ProtectedRoute>} />
        <Route path="/inventory/analytics" element={<ProtectedRoute><Navigate to="/inventory?tab=analytics" replace /></ProtectedRoute>} />
        <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
        <Route path="/purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/reports/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/reports/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
        <Route path="/reports/profit-loss" element={<ProtectedRoute><ProfitLoss /></ProtectedRoute>} />
        <Route path="/reports/revenue" element={<ProtectedRoute><Revenue /></ProtectedRoute>} />
        <Route path="/accountant" element={<ProtectedRoute><Accountant /></ProtectedRoute>} />
        <Route path="/accountant/reports" element={<ProtectedRoute><AccountantReports /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
