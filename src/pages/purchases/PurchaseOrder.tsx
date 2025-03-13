import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import PurchaseMetricsCards from "@/components/purchases/PurchaseMetricsCards";
import PurchaseSearch from "@/components/purchases/PurchaseSearch";
import PurchaseOrdersTab from "@/components/purchases/PurchaseOrdersTab";

const PurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: "PO-001", 
      vendor: "Office Supplies Inc.", 
      date: "2023-10-15", 
      total: 1250.00, 
      status: "Received",
      bills: [
        {
          id: "BILL-001",
          vendor: "Office Supplies Inc.",
          date: "2024-03-15",
          dueDate: "2024-04-15",
          amount: 1250.00,
          status: "Unpaid"
        }
      ]
    },
    { id: "PO-002", vendor: "Tech Equipment Ltd.", date: "2023-10-18", total: 3450.75, status: "Pending" },
    { id: "PO-003", vendor: "Furniture Warehouse", date: "2023-10-20", total: 5200.00, status: "Ordered" },
    { id: "PO-004", vendor: "Office Depot", date: "2023-10-22", total: 890.50, status: "Pending" },
    { id: "PO-005", vendor: "IT Solutions", date: "2023-10-25", total: 1750.25, status: "Ordered" },
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
            <h1 className="text-3xl font-bold">Purchase Orders</h1>
            <p className="text-gray-600 mt-2">Manage your purchase orders</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>
          </div>
        </div>

        <PurchaseMetricsCards />

        <PurchaseSearch activeTab="orders" />

        <PurchaseOrdersTab purchaseOrders={purchaseOrders} getStatusStyle={getStatusStyle} />
      </div>
    </AppLayout>
  );
};

export default PurchaseOrder;