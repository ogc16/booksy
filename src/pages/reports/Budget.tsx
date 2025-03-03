
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";

const Budget = () => {
  const budgetData = [
    { name: "Jan", budgeted: 1000, actual: 950 },
    { name: "Feb", budgeted: 1200, actual: 1300 },
    { name: "Mar", budgeted: 1100, actual: 950 },
    { name: "Apr", budgeted: 1400, actual: 1200 },
    { name: "May", budgeted: 1300, actual: 1400 },
    { name: "Jun", budgeted: 1200, actual: 1100 },
  ];

  const categoryData = [
    { name: "Marketing", budgeted: 1000, actual: 800 },
    { name: "Salaries", budgeted: 5000, actual: 5200 },
    { name: "Rent", budgeted: 2000, actual: 1900 },
    { name: "Utilities", budgeted: 500, actual: 520 },
    { name: "Software", budgeted: 800, actual: 750 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Budget Overview</h1>
          <p className="text-gray-600 mt-2">Compare your budgeted amounts with actual spending</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget vs. Actual Spending</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={budgetData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={categoryData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;
