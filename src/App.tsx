
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Landing pages
import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import Payment from "@/pages/Payment";

// Dashboard and main app routes
import Dashboard from "@/pages/Dashboard";
import Items from "@/pages/Items";
import Banking from "@/pages/Banking";
import Customers from "@/pages/Customers";
import Estimates from "@/pages/Estimates";
import RetainerInvoices from "@/pages/RetainerInvoices";
import SalesOrders from "@/pages/SalesOrders";
import Invoices from "@/pages/Invoices";
import CreditNotes from "@/pages/CreditNotes";
import Purchases from "@/pages/Purchases";
import TimeTracking from "@/pages/TimeTracking";
import Accountant from "@/pages/Accountant";
import Reports from "@/pages/Reports";
import Admin from "@/pages/Admin";

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* App routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<Items />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/retainer-invoices" element={<RetainerInvoices />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/credit-notes" element={<CreditNotes />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Redirect expenses to purchases with expenses tab */}
          <Route path="/expenses" element={<Navigate to="/purchases" replace />} />
          
          {/* Redirect documents to dashboard */}
          <Route path="/documents" element={<Navigate to="/dashboard" replace />} />

          {/* Report routes */}
          <Route path="/reports/budget" element={<Budget />} />
          <Route path="/reports/profit-loss" element={<ProfitLoss />} />
          <Route path="/reports/revenue" element={<Revenue />} />
          <Route path="/reports/expenses" element={<ExpensesReport />} />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
