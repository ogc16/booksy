import { AppLayout } from "@/layouts/AppLayout";

const Customers = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-gray-600">Manage your customer relationships</p>
      </div>
    </AppLayout>
  );
};

export default Customers;
