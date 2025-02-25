import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState } from 'react';

const Budget = () => {
  const [budgetItems, setBudgetItems] = useState<
    { id: number; category: string; budgetedAmount: number; actualAmount: number }[]
  >([
    { id: 1, category: "Marketing", budgetedAmount: 1000, actualAmount: 800 },
    { id: 2, category: "Salaries", budgetedAmount: 5000, actualAmount: 5200 },
    { id: 3, category: "Rent", budgetedAmount: 2000, actualAmount: 1900 },
  ]);

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-3xl font-bold">Budget Overview</h1>
        <p className="text-gray-600">View and manage your budget.</p>

        <div className="border p-4 rounded-md shadow-sm">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Category</th>
                <th className="text-right">Budgeted Amount</th>
                <th className="text-right">Actual Amount</th>
                <th className="text-right">Variance</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.category}</td>
                  <td className="py-2 text-right">${item.budgetedAmount.toFixed(2)}</td>
                  <td className="py-2 text-right">${item.actualAmount.toFixed(2)}</td>
                  <td className="py-2 text-right">${(item.actualAmount - item.budgetedAmount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;