
import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Accountant = () => {
  const [balance, setBalance] = useState<number>(5000);
  const [deferredIncome, setDeferredIncome] = useState<number>(0);
  const [reports, setReports] = useState<
    { id: number; title: string; link: string }[]
  >([
    { id: 1, title: "Monthly Revenue Report", link: "/reports/revenue" },
    { id: 2, title: "Expense Breakdown", link: "/reports/expenses" },
    { id: 3, title: "Profit & Loss Statement", link: "/reports/profit-loss" },
    { id: 4, title: "Budget Overview", link: "/reports/budget" }
  ]);

  const [dashboardWidgets, setDashboardWidgets] = useState<
    { id: number; title: string; value: string }[]
  >([
    { id: 1, title: "Current Balance", value: `$${balance.toFixed(2)}` },
    { id: 2, title: "Outstanding Invoices", value: "12" },
    { id: 3, title: "Recent Transactions", value: "View Transactions" },
    { id: 4, title: "Deferred Income", value: `$${deferredIncome.toFixed(2)}`},
  ]);

  const [budgetItems, setBudgetItems] = useState<
    { id: number; category: string; budgetedAmount: number; actualAmount: number }[]
  >([
    { id: 1, category: "Marketing", budgetedAmount: 1000, actualAmount: 800 },
    { id: 2, category: "Salaries", budgetedAmount: 5000, actualAmount: 5200 },
    { id: 3, category: "Rent", budgetedAmount: 2000, actualAmount: 1900 },
  ]);

  const navigate = useNavigate(); // Use React Router's navigate instead of Next.js router

  useEffect(() => {
    setDashboardWidgets([
      { id: 1, title: "Current Balance", value: `$${balance.toFixed(2)}` },
      { id: 2, title: "Outstanding Invoices", value: "12" },
      { id: 3, title: "Recent Transactions", value: "View Transactions" },
      { id: 4, title: "Deferred Income", value: `$${deferredIncome.toFixed(2)}`},
    ]);
  }, [balance, deferredIncome]);

  const handleReportClick = (link: string) => {
    navigate(link); // Use navigate instead of router.push
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-3xl font-bold">Accounting Dashboard & Reports</h1>
        <p className="text-gray-600">Access your accounting dashboard and reports.</p>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardWidgets.map((widget) => (
            <div key={widget.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">{widget.title}</h3>
              <p className="mt-2">{widget.value}</p>
            </div>
          ))}
        </div>

        {/* Reports Section */}
        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Reports</h2>
          <ul className="space-y-2">
            {reports.map((report) => (
              <li key={report.id} className="border-b pb-2">
                <button
                  onClick={() => handleReportClick(report.link)}
                  className="text-cyan-600 hover:text-cyan-800"
                >
                  {report.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default Accountant;
