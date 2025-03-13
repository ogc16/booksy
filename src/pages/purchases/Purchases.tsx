import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import PurchaseMetricsCards from "@/components/purchases/PurchaseMetricsCards";
import PurchaseSearch from "@/components/purchases/PurchaseSearch";
import PurchaseOrdersTab from "@/components/purchases/PurchaseOrdersTab";
import BillsTab from "@/components/purchases/BillsTab";
import ReceivedItemsTab from "@/components/purchases/ReceivedItemsTab";
import ExpensesTab from "@/components/purchases/ExpensesTab";

// import SuppliersTab from "@/components/purchases/SuppliersTab";

const Purchases = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: "PO-001", 
      supplier: "Office Supplies Inc.", 
      date: "2023-10-15", 
      total: 1250.00, 
      status: "Received",
      bills: [
        {
          id: "BILL-001",
          supplier: "Office Supplies Inc.",
          date: "2024-03-15",
          dueDate: "2024-04-15",
          amount: 1250.00,
          status: "Unpaid"
        }
      ]
    },
    { id: "PO-002", supplier: "Tech Equipment Ltd.", date: "2023-10-18", total: 3450.75, status: "Pending" },
    { id: "PO-003", supplier: "Furniture Warehouse", date: "2023-10-20", total: 5200.00, status: "Ordered" },
    { id: "PO-004", supplier: "Office Depot", date: "2023-10-22", total: 890.50, status: "Pending" },
    { id: "PO-005", supplier: "IT Solutions", date: "2023-10-25", total: 1750.25, status: "Ordered" },
  ]);

  const [receivedItems, setReceivedItems] = useState([
    { id: "REC-001", poId: "PO-001", item: "Paper reams (A4)", quantity: 50, date: "2023-10-17" },
    { id: "REC-002", poId: "PO-001", item: "Stapler packs", quantity: 20, date: "2023-10-17" },
    { id: "REC-003", poId: "PO-001", item: "Ink cartridges", quantity: 15, date: "2023-10-17" },
  ]);

  const [bills, setBills] = useState([
    { id: "BILL-001", vendor: "Office Supplies Inc.", date: "2024-03-15", dueDate: "2024-04-15", amount: 1250.00, status: "Unpaid" },
    { id: "BILL-002", vendor: "Tech Equipment Ltd.", date: "2024-03-10", dueDate: "2024-04-10", amount: 3450.75, status: "Paid" },
    { id: "BILL-003", vendor: "Electricity Company", date: "2024-03-01", dueDate: "2024-03-15", amount: 450.00, status: "Overdue" },
    { id: "BILL-004", vendor: "Internet Provider", date: "2024-03-05", dueDate: "2024-04-05", amount: 89.99, status: "Unpaid" },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Office Supplies", date: "2024-03-15", amount: 250, category: "Supplies" },
    { id: 2, description: "Software Subscription", date: "2024-03-18", amount: 99, category: "Software" },
    { id: 3, description: "Team Lunch", date: "2024-03-20", amount: 175, category: "Meals" },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Ordered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Unpaid":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Purchases</h1>
            <p className="text-gray-600 mt-2">Manage your purchase orders, bills, incoming stock, and expenses</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>
          </div>
        </div>

        <PurchaseMetricsCards />

        <Tabs defaultValue="orders" className="space-y-4" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-1 md:grid-cols-5 lg:w-[650px]">
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="items">Received Items</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>
          
          <PurchaseSearch activeTab={activeTab} />

          <TabsContent value="orders">
            <PurchaseOrdersTab purchaseOrders={purchaseOrders} getStatusStyle={getStatusStyle} />
          </TabsContent>
          
          <TabsContent value="bills">
            <BillsTab bills={bills} getStatusStyle={getStatusStyle} />
          </TabsContent>
          
          <TabsContent value="items">
            <ReceivedItemsTab receivedItems={receivedItems} />
          </TabsContent>
          
          <TabsContent value="expenses">
            <ExpensesTab expenses={expenses} />
          </TabsContent>
          
          <TabsContent value="suppliers">
           {/*<SuppliersTab />*/}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Purchases;
