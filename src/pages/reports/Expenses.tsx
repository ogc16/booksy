
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const navigate = useNavigate();
  
  const reports = [
    { id: 1, title: "Budget Overview", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", link: "/reports/expenses" },
  ];

  const expenseData = [
    { name: "Jan", value: 1800 },
    { name: "Feb", value: 2100 },
    { name: "Mar", value: 1900 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 2500 },
    { name: "Jun", value: 2300 },
  ];

  const expensesByCategoryData = [
    { name: "Rent", value: 4800 },
    { name: "Utilities", value: 1200 },
    { name: "Salaries", value: 8500 },
    { name: "Marketing", value: 2000 },
    { name: "Software", value: 1500 },
    { name: "Other", value: 1000 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Expense Analysis</h1>
            <p className="text-gray-600 mt-2">Break down your expenses by category</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <Button 
                key={`link-${report.id}`}
                variant={report.link === "/reports/expenses" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(report.link)}
              >
                {report.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$19,000</div>
              <p className="text-sm text-red-600 mt-2">↑ 8% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Largest Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Salaries</div>
              <p className="text-sm text-muted-foreground mt-2">45% of total expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87</div>
              <p className="text-sm text-red-600 mt-2">↑ 12% from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={expenseData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={expensesByCategoryData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Expenses;
