
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
        <h1 className="text-3xl font-bold text-foreground">Budget Overview</h1>
        <p className="text-muted-foreground">View and manage your budget.</p>

        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Category</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Budgeted Amount</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Actual Amount</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Variance</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item) => {
                  const variance = item.actualAmount - item.budgetedAmount;
                  const isOverBudget = variance > 0;
                  
                  return (
                    <tr key={item.id} className="border-b border-border">
                      <td className="py-4 text-foreground">{item.category}</td>
                      <td className="py-4 text-right text-foreground">
                        ${item.budgetedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 text-right text-foreground">
                        ${item.actualAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 text-right ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
                        ${variance.toLocaleString('en-US', { minimumFractionDigits: 2, signDisplay: 'always' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;
