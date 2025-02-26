import { AppLayout } from "@/layouts/AppLayout";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout>
      <div>
        {children}
      </div>
    </AppLayout>
  );
};

export default ReportsLayout;
