
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Landing pages
import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import Payment from "@/pages/Payment";

// Dashboard and main app routes
import Dashboard from "@/pages/Dashboard";
import Items from "@/pages/Items";
import Banking from "@/pages/Banking";
import Sales from "@/pages/Sales";
import Invoices from "@/pages/Invoices";
import Purchases from "@/pages/Purchases";
import TimeTracking from "@/pages/TimeTracking";
import Accountant from "@/pages/Accountant";
import Reports from "@/pages/Reports";
import Admin from "@/pages/Admin";
import Inventory from "@/pages/Inventory";
import LPO from "@/pages/LPO";
import AccountantReports from "@/pages/accountant/Reports";
import Suppliers from "@/pages/Suppliers";

// Report pages
import Budget from "@/pages/reports/Budget";
import ProfitLoss from "@/pages/reports/ProfitLoss";
import Revenue from "@/pages/reports/Revenue";
import ExpensesReport from "@/pages/reports/Expenses";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Error pages
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="finance-theme-preference">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected app routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/items" element={
                <ProtectedRoute requiredRole={["inventory", "admin"]}>
                  <Items />
                </ProtectedRoute>
              } />
              <Route path="/banking" element={
                <ProtectedRoute>
                  <Banking />
                </ProtectedRoute>
              } />
              <Route path="/sales" element={
                <ProtectedRoute>
                  <Sales />
                </ProtectedRoute>
              } />
              <Route path="/sales/invoices" element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              } />
              <Route path="/purchases" element={
                <ProtectedRoute>
                  <Purchases />
                </ProtectedRoute>
              } />
              <Route path="/time-tracking" element={
                <ProtectedRoute>
                  <TimeTracking />
                </ProtectedRoute>
              } />
              <Route path="/accountant" element={
                <ProtectedRoute requiredRole={["accountant", "admin", "manager"]}>
                  <Accountant />
                </ProtectedRoute>
              } />
              <Route path="/accountant/reports" element={
                <ProtectedRoute requiredRole={["accountant", "admin", "manager"]}>
                  <AccountantReports />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute requiredRole={["accountant", "manager", "admin"]}>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute requiredRole={["inventory", "admin"]}>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="/suppliers" element={
                <ProtectedRoute requiredRole={["inventory", "admin"]}>
                  <Suppliers />
                </ProtectedRoute>
              } />
              
              {/* Redirect tracking to inventory section */}
              <Route path="/tracking" element={<Navigate to="/inventory?tab=tracking" replace />} />
              
              {/* Redirect orders to inventory section */}
              <Route path="/orders" element={<Navigate to="/inventory?tab=orders" replace />} />
              
              {/* Redirect analytics to inventory section */}
              <Route path="/analytics" element={<Navigate to="/inventory?tab=analytics" replace />} />
              
              {/* Redirect expenses to purchases with expenses tab */}
              <Route path="/expenses" element={<Navigate to="/purchases" replace />} />
              
              {/* Redirect documents to dashboard */}
              <Route path="/documents" element={<Navigate to="/dashboard" replace />} />

              {/* Redirect removed pages */}
              <Route path="/estimates" element={<Navigate to="/sales" replace />} />
              <Route path="/retainer-invoices" element={<Navigate to="/sales" replace />} />
              <Route path="/sales-orders" element={<Navigate to="/sales" replace />} />
              <Route path="/credit-notes" element={<Navigate to="/sales" replace />} />
              <Route path="/invoices" element={<Navigate to="/sales/invoices" replace />} />
              
              {/* Redirect customers to sales with customers tab */}
              <Route path="/customers" element={<Navigate to="/sales?tab=customers" replace />} />

              {/* Report routes */}
              <Route path="/reports/budget" element={
                <ProtectedRoute requiredRole={["accountant", "manager", "admin"]}>
                  <Budget />
                </ProtectedRoute>
              } />
              <Route path="/reports/profit-loss" element={
                <ProtectedRoute requiredRole={["accountant", "manager", "admin"]}>
                  <ProfitLoss />
                </ProtectedRoute>
              } />
              <Route path="/reports/revenue" element={
                <ProtectedRoute requiredRole={["accountant", "manager", "admin"]}>
                  <Revenue />
                </ProtectedRoute>
              } />
              <Route path="/reports/expenses" element={
                <ProtectedRoute requiredRole={["accountant", "manager", "admin"]}>
                  <ExpensesReport />
                </ProtectedRoute>
              } />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
