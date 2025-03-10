
import { Card } from "@/components/ui/card";
import { LineChart } from "@/components/ui/chart";

const BalanceHistoryChart = () => {
  return (
    <Card className="p-6 lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Balance History</h3>
      <LineChart
        data={[
          { name: "Jan", value: 45000 },
          { name: "Feb", value: 48000 },
          { name: "Mar", value: 52000 },
          { name: "Apr", value: 49000 },
          { name: "May", value: 55000 },
          { name: "Jun", value: 59000 },
        ]}
      />
    </Card>
  );
};

export default BalanceHistoryChart;
