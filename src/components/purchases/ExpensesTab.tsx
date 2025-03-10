
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Expense {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: string;
}

interface ExpensesTabProps {
  expenses: Expense[];
}

const ExpensesTab = ({ expenses }: ExpensesTabProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Track and manage your expenses</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => navigate("/reports/expenses")}>
          <FileText className="mr-2 h-4 w-4" />
          View Expense Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpensesTab;
