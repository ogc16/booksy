
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const reports = [
    { id: 1, title: "Budget Overview", description: "Compare budgeted amounts with actual spending", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", description: "View income, expenses, and net profit", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", description: "Analyze your revenue streams", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", description: "Break down your expenses by category", link: "/reports/expenses" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600">View and generate financial reports</p>
        </div>

        {/* Quick links navigation */}
        <div className="flex flex-wrap gap-2">
          {reports.map((report) => (
            <Button 
              key={`link-${report.id}`}
              variant={location.pathname === report.link ? "default" : "outline"}
              onClick={() => navigate(report.link)}
            >
              {report.title}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <Card 
              key={report.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigate(report.link)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <BarChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{report.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
