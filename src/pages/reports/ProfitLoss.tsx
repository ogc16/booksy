
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfitLoss = () => {
  const navigate = useNavigate();
  
  const reports = [
    { id: 1, title: "Budget Overview", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", link: "/reports/expenses" },
  ];

  const profitLossData = [
    { name: "Jan", value: 2500 },
    { name: "Feb", value: 3200 },
    { name: "Mar", value: 2800 },
    { name: "Apr", value: 3500 },
    { name: "May", value: 4200 },
    { name: "Jun", value: 3800 },
  ];

  const expenseData = [
    { name: "Jan", value: 1800 },
    { name: "Feb", value: 2100 },
    { name: "Mar", value: 1900 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 2500 },
    { name: "Jun", value: 2300 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profit & Loss</h1>
            <p className="text-gray-600 mt-2">View income, expenses, and net profit</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <Button 
                key={`link-${report.id}`}
                variant={report.link === "/reports/profit-loss" ? "default" : "outline"}
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
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$20,000</div>
              <p className="text-sm text-green-600 mt-2">↑ 12% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$12,800</div>
              <p className="text-sm text-red-600 mt-2">↑ 8% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$7,200</div>
              <p className="text-sm text-green-600 mt-2">↑ 15% from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={profitLossData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expense Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={expenseData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfitLoss;
