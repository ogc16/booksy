
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";

// Enhanced colors for charts with proper contrasts
const CHART_COLORS = [
  "hsl(var(--primary))", 
  "hsl(var(--muted))",
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
];

// Budget vs Actual data
const yearBudgetData = [
  { name: "Jan", budgeted: 8000, actual: 7500 },
  { name: "Feb", budgeted: 9000, actual: 9500 },
  { name: "Mar", budgeted: 10000, actual: 9800 },
  { name: "Apr", budgeted: 9500, actual: 8900 },
  { name: "May", budgeted: 11000, actual: 11200 },
  { name: "Jun", budgeted: 10500, actual: 10300 },
  { name: "Jul", budgeted: 10000, actual: 9700 },
  { name: "Aug", budgeted: 11500, actual: 11300 },
  { name: "Sep", budgeted: 12000, actual: 12100 },
  { name: "Oct", budgeted: 12500, actual: 12000 },
  { name: "Nov", budgeted: 13000, actual: 12800 },
  { name: "Dec", budgeted: 15000, actual: 15500 },
];

// Department budget data
const departmentBudgetData = [
  { name: "Operations", value: 35000 },
  { name: "Marketing", value: 25000 },
  { name: "Sales", value: 40000 },
  { name: "R&D", value: 30000 },
  { name: "Admin", value: 20000 },
];

// Budget variance trend
const budgetVarianceData = [
  { name: "Jan", value: -500 },
  { name: "Feb", value: 500 },
  { name: "Mar", value: -200 },
  { name: "Apr", value: -600 },
  { name: "May", value: 200 },
  { name: "Jun", value: -200 },
  { name: "Jul", value: -300 },
  { name: "Aug", value: -200 },
  { name: "Sep", value: 100 },
  { name: "Oct", value: -500 },
  { name: "Nov", value: -200 },
  { name: "Dec", value: 500 },
];

// Category budget data
const categoryBudgetData = [
  { name: "Salaries", budgeted: 75000, actual: 73000 },
  { name: "Rent", budgeted: 24000, actual: 24000 },
  { name: "Utilities", budgeted: 12000, actual: 13500 },
  { name: "Software", budgeted: 18000, actual: 17200 },
  { name: "Marketing", budgeted: 35000, actual: 38000 },
  { name: "Travel", budgeted: 15000, actual: 10500 },
  { name: "Equipment", budgeted: 20000, actual: 22000 },
];

const Budget = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("yearly");
  
  const reports = [
    { id: 1, title: "Budget Overview", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", link: "/reports/expenses" },
  ];

  // Calculate budget summary
  const totalBudgeted = yearBudgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = yearBudgetData.reduce((sum, item) => sum + item.actual, 0);
  const variance = totalActual - totalBudgeted;
  const variancePercentage = (variance / totalBudgeted) * 100;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Budget Overview</h1>
            <p className="text-gray-600 mt-2">Compare your budgeted amounts with actual spending</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <Button 
                key={`link-${report.id}`}
                variant={report.link === "/reports/budget" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(report.link)}
              >
                {report.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <Tabs defaultValue="overview" className="w-auto">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="variance">Variance</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-wrap gap-2">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="quarterly">This Quarter</SelectItem>
                <SelectItem value="yearly">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budgeted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Variance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variance >= 0 ? '+' : ''}{variance.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Variance %
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${variancePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variancePercentage >= 0 ? '+' : ''}{variancePercentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget vs. Actual</CardTitle>
              <CardDescription>
                Compare budgeted amounts with actual spending by month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={yearBudgetData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Budget Allocation</CardTitle>
              <CardDescription>
                Budget distribution across departments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentBudgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentBudgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Budget']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Variance Trend</CardTitle>
              <CardDescription>
                Monthly budget variance (positive means over budget)
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={budgetVarianceData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Budget vs. Actual</CardTitle>
              <CardDescription>
                Compare budgeted and actual amounts by expense category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={categoryBudgetData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;
