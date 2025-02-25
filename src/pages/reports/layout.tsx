import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Download } from "lucide-react";
import { toast } from "sonner";

const ReportCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button variant="outline" size="sm" onClick={() => toast.success(`${title} downloaded successfully`)}>
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
    {children}
  </Card>
);

const Reports = () => {
  // Sample data - in a real app, this would come from your backend
  const monthlyRevenue = [
    { name: "Jan", value: 45000 },
    { name: "Feb", value: 52000 },
    { name: "Mar", value: 48000 },
    { name: "Apr", value: 61000 },
    { name: "May", value: 55000 },
    { name: "Jun", value: 67000 },
  ];

  const costBreakdown = [
    { name: "Raw Materials", value: 28000 },
    { name: "Labor", value: 35000 },
    { name: "Overhead", value: 18000 },
    { name: "Marketing", value: 12000 },
    { name: "Other", value: 7000 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-4"> {/* Added padding to the main content area */}
        <div>
          <h1 className="text-2xl font-semibold">Financial Reports</h1>
          <p className="text-gray-600 mt-1">View and download financial statements and reports</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReportCard title="Tax Summary">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-medium">$328,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Expenses</span>
                <span className="font-medium">$100,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Taxable Income</span>
                <span className="font-medium">$228,000</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Estimated Tax (25%)</span>
                <span className="font-medium text-primary">$57,000</span>
              </div>
            </div>
          </ReportCard>

          <ReportCard title="Balance Sheet">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Assets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Assets</span>
                    <span>$245,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fixed Assets</span>
                    <span>$380,000</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Liabilities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Liabilities</span>
                    <span>$125,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Long-term Liabilities</span>
                    <span>$200,000</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Equity</span>
                  <span className="font-medium text-primary">$300,000</span>
                </div>
              </div>
            </div>
          </ReportCard>

          <ReportCard title="Revenue Trend">
            <div className="h-[300px]">
              <LineChart data={monthlyRevenue} />
            </div>
          </ReportCard>

          <ReportCard title="Cost of Goods">
            <div className="h-[300px]">
              <BarChart data={costBreakdown} />
            </div>
          </ReportCard>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;