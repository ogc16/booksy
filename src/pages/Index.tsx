import { LandingLayout } from "@/layouts/LandingLayout";

const Index = () => {
  return (
    <LandingLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-gray-600">Welcome to the landing page</p>
      </div>
    </LandingLayout>
  );
};

export default Index;
