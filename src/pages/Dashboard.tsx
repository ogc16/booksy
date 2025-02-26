
import { AppLayout } from "@/components/layout/AppLayout";
import { OverviewSection } from "@/features/dashboard/components/OverviewSection";

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
