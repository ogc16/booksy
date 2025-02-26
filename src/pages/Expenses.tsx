import { AppLayout } from "@/layouts/AppLayout";
import { Card } from "@/components/ui/card";
import { Receipt, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExpensesList = () => {
  const expenses = [
    { id: 1, description: "Office Supplies", date: "2024-03-15", amount: 250, category: "Supplies" },
    { id: 2, description: "Software Subscription", date: "2024-03-18", amount: 99, category: "Software" },
    { id: 3, description: "Team Lunch", date: "2024-03-20", amount: 175, category: "Meals" },
  ];

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card key={expense.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Receipt className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-medium">{expense.description}</h3>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-red-600">
                -${expense.amount.toFixed(2)}
              </span>
              <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                {expense.category}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const Expenses = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Expenses</h1>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            <span>New Expense</span>
          </Button>
        </div>
        <ExpensesList />
      </div>
    </AppLayout>
  );
};

export default Expenses;
