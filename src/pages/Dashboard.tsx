
import { AppLayout } from "@/components/layout/AppLayout";
import { OverviewSection } from "./dashboard/OverviewSection";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-12 animate-fadeIn">
        <OverviewSection />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
