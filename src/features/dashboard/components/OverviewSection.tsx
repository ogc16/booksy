import { Card } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart";
import { ChartBar, CreditCard, DollarSign, Receipt } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: any;
  trend: string;
}) => (
  <Card className="p-6 glass-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        <p className="text-sm text-success-DEFAULT mt-1">{trend}</p>
      </div>
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </Card>
);

export const OverviewSection = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$84,254.00"
            icon={DollarSign}
            trend="+8.5% from last month"
          />
          <StatCard
            title="Total Expenses"
            value="$24,865.00"
            icon={Receipt}
            trend="-2.3% from last month"
          />
          <StatCard
            title="Bank Balance"
            value="$59,389.00"
            icon={CreditCard}
            trend="+12.5% from last month"
          />
          <StatCard
            title="Net Profit"
            value="$32,754.00"
            icon={ChartBar}
            trend="+15.2% from last month"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <LineChart
            data={[
              { name: "Jan", value: 4000 },
              { name: "Feb", value: 3000 },
              { name: "Mar", value: 5000 },
              { name: "Apr", value: 4500 },
              { name: "May", value: 6000 },
              { name: "Jun", value: 5500 },
            ]}
          />
        </Card>

        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <BarChart
            data={[
              { name: "Utilities", value: 1200 },
              { name: "Rent", value: 2500 },
              { name: "Salaries", value: 4500 },
              { name: "Marketing", value: 1800 },
              { name: "Software", value: 900 },
            ]}
          />
        </Card>
      </div>
    </>
  );
};
