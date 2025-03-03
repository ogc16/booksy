
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, FileText, PlusCircle, Search, Filter, DollarSign, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Purchases = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Sample data for purchase orders
  const purchaseOrders = [
    { id: "PO-001", vendor: "Office Supplies Inc.", date: "2023-10-15", total: 1250.00, status: "Received" },
    { id: "PO-002", vendor: "Tech Equipment Ltd.", date: "2023-10-18", total: 3450.75, status: "Pending" },
    { id: "PO-003", vendor: "Furniture Warehouse", date: "2023-10-20", total: 5200.00, status: "Ordered" },
    { id: "PO-004", vendor: "Office Depot", date: "2023-10-22", total: 890.50, status: "Pending" },
    { id: "PO-005", vendor: "IT Solutions", date: "2023-10-25", total: 1750.25, status: "Ordered" },
  ];

  // Sample data for received items
  const receivedItems = [
    { id: "REC-001", poId: "PO-001", item: "Paper reams (A4)", quantity: 50, date: "2023-10-17" },
    { id: "REC-002", poId: "PO-001", item: "Stapler packs", quantity: 20, date: "2023-10-17" },
    { id: "REC-003", poId: "PO-001", item: "Ink cartridges", quantity: 15, date: "2023-10-17" },
  ];

  // Display status with appropriate styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Ordered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
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
            <p className="text-gray-600 mt-2">Manage your purchase orders and incoming stock</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Orders</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items to Receive</p>
                <h3 className="text-2xl font-bold">48</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bills to Pay</p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                <h3 className="text-2xl font-bold">$9,450.75</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="orders" className="space-y-4" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="items">Received Items</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>
          
          {/* Search and filter bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder={`Search ${activeTab === "orders" ? "purchase orders" : activeTab === "items" ? "received items" : "vendors"}...`} 
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" title="Filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>View and manage your purchase orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3">PO #</th>
                        <th scope="col" className="px-6 py-3">Vendor</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseOrders.map((order) => (
                        <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4">{order.vendor}</td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Received Items</CardTitle>
                <CardDescription>Track items received from vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3">Receipt #</th>
                        <th scope="col" className="px-6 py-3">PO #</th>
                        <th scope="col" className="px-6 py-3">Item</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Date Received</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivedItems.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 font-medium">{item.id}</td>
                          <td className="px-6 py-4">{item.poId}</td>
                          <td className="px-6 py-4">{item.item}</td>
                          <td className="px-6 py-4">{item.quantity}</td>
                          <td className="px-6 py-4">{item.date}</td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendors</CardTitle>
                <CardDescription>Manage your suppliers and vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No vendors added yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Add vendors to keep track of your suppliers</p>
                  <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Vendor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Purchases;
