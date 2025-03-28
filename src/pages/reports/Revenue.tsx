
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Revenue = () => {
  const navigate = useNavigate();
  
  const reports = [
    { id: 1, title: "Budget Overview", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", link: "/reports/expenses" },
  ];

  const revenueData = [
    { name: "Jan", value: 2500 },
    { name: "Feb", value: 3200 },
    { name: "Mar", value: 2800 },
    { name: "Apr", value: 3500 },
    { name: "May", value: 4200 },
    { name: "Jun", value: 3800 },
  ];

  const revenueBySourceData = [
    { name: "Sales", value: 12500 },
    { name: "Services", value: 5800 },
    { name: "Subscriptions", value: 3200 },
    { name: "Other", value: 1500 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Revenue Report</h1>
            <p className="text-gray-600 mt-2">Analyze your revenue streams</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <Button 
                key={`link-${report.id}`}
                variant={report.link === "/reports/revenue" ? "default" : "outline"}
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
              <div className="text-3xl font-bold">$23,000</div>
              <p className="text-sm text-green-600 mt-2">↑ 15% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$420</div>
              <p className="text-sm text-green-600 mt-2">↑ 5% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">54</div>
              <p className="text-sm text-green-600 mt-2">↑ 10% from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={revenueData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={revenueBySourceData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Revenue;
