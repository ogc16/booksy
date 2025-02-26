import { AppLayout } from "@/layouts/AppLayout";

const Purchases = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Purchases</h1>
        <p className="text-gray-600">Manage your purchase orders and incoming stock</p>
      </div>
    </AppLayout>
  );
};

export default Purchases;
