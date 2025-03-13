import { AppLayout } from "@/layouts/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText, ShoppingCart, Users, Truck, Receipt } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Invoices from "./Invoices";
import SalesOrdersComponent from "./SalesOrders"; // Renamed to avoid confusion
import CreditNotes from "./CreditNotes";

const CustomersSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customers</h2>
      <p className="text-gray-600">Manage your customer relationships</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Add New Customer</h3>
              <p className="text-sm text-gray-500 mt-1">Create a new customer profile</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Sales = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { hasPermission } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-gray-600">Manage your sales activities</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-[800px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="orders">Sales Orders</TabsTrigger>
            <TabsTrigger value="creditnotes">Credit Notes</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/sales/invoices">
                <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Invoices</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your invoices and payments</p>
                    </div>
                  </div>
                </Card>
              </Link>

              
                <Card onClick={() => setActiveTab("orders")} className="p-6 cursor-pointer hover:shadow-md transition-shadow h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <ShoppingCart className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sales Orders</h3>
                      <p className="text-sm text-gray-500 mt-1">Manage your sales orders</p>
                    </div>
                  </div>
                </Card>
              

              <Card onClick={() => setActiveTab("creditnotes")} className="p-6 cursor-pointer hover:shadow-md transition-shadow h-full">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Receipt className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Credit Notes</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your credit notes</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow h-full">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Customers</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your customer relationships</p>
                  </div>
                </div>
              </Card>
               <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow h-full">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vendors</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your vendors</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

           <TabsContent value="invoices" className="mt-6">
            <Invoices />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <SalesOrdersComponent />
          </TabsContent>

          <TabsContent value="creditnotes" className="mt-6">
            <CreditNotes />
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <CustomersSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Sales;
