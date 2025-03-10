import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, FileText, PlusCircle, Search, Filter, DollarSign, ShoppingBag, Receipt } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Bill {
  id: string;
  vendor: string;
  date: string;
  dueDate: string;
  amount: number;
  status: string;
  description?: string;
  attachment?: File;
}

interface PurchaseOrder {
  id: string;
  vendor: string;
  date: string;
  total: number;
  status: string;
  bills?: Bill[];
}

interface ReceivedItem {
  id: string;
  poId: string;
  item: string;
  quantity: number;
  date: string;
}

interface Expense {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: string;
}

const Purchases = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
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

  const [receivedItems, setReceivedItems] = useState<ReceivedItem[]>([
    { id: "REC-001", poId: "PO-001", item: "Paper reams (A4)", quantity: 50, date: "2023-10-17" },
    { id: "REC-002", poId: "PO-001", item: "Stapler packs", quantity: 20, date: "2023-10-17" },
    { id: "REC-003", poId: "PO-001", item: "Ink cartridges", quantity: 15, date: "2023-10-17" },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Office Supplies", date: "2024-03-15", amount: 250, category: "Supplies" },
    { id: 2, description: "Software Subscription", date: "2024-03-18", amount: 99, category: "Software" },
    { id: 3, description: "Team Lunch", date: "2024-03-20", amount: 175, category: "Meals" },
  ]);
  
  const [bills, setBills] = useState<Bill[]>([
    { id: "BILL-001", vendor: "Office Supplies Inc.", date: "2024-03-15", dueDate: "2024-04-15", amount: 1250.00, status: "Unpaid" },
    { id: "BILL-002", vendor: "Tech Equipment Ltd.", date: "2024-03-10", dueDate: "2024-04-10", amount: 3450.75, status: "Paid" },
    { id: "BILL-003", vendor: "Electricity Company", date: "2024-03-01", dueDate: "2024-03-15", amount: 450.00, status: "Overdue" },
    { id: "BILL-004", vendor: "Internet Provider", date: "2024-03-05", dueDate: "2024-04-05", amount: 89.99, status: "Unpaid" },
  ]);
  
  const [newBill, setNewBill] = useState({
    vendor: "",
    billDate: "",
    dueDate: "",
    amount: "",
    description: ""
  });

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
  
  const handleCreateBill = () => {
    console.log("Creating bill:", newBill);
    setNewBill({
      vendor: "",
      billDate: "",
      dueDate: "",
      amount: "",
      description: ""
    });
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

        <Tabs defaultValue="orders" className="space-y-4" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-1 md:grid-cols-5 lg:w-[650px]">
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="items">Received Items</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder={`Search ${activeTab === "orders" ? "purchase orders" : 
                  activeTab === "bills" ? "bills" :
                  activeTab === "items" ? "received items" : 
                  activeTab === "expenses" ? "expenses" : "vendors"}...`} 
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
          
          <TabsContent value="bills" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Bills</CardTitle>
                  <CardDescription>Manage vendor invoices and payments</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Bill
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Create New Bill</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new bill from your vendor.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vendor" className="text-right">
                          Vendor
                        </Label>
                        <Input
                          id="vendor"
                          value={newBill.vendor}
                          onChange={(e) => setNewBill({...newBill, vendor: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="billDate" className="text-right">
                          Bill Date
                        </Label>
                        <Input
                          id="billDate"
                          type="date"
                          value={newBill.billDate}
                          onChange={(e) => setNewBill({...newBill, billDate: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dueDate" className="text-right">
                          Due Date
                        </Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newBill.dueDate}
                          onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={newBill.amount}
                          onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          value={newBill.description}
                          onChange={(e) => setNewBill({...newBill, description: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleCreateBill}>Save Bill</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill #</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Bill Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.id}</TableCell>
                          <TableCell>{bill.vendor}</TableCell>
                          <TableCell>{bill.date}</TableCell>
                          <TableCell>{bill.dueDate}</TableCell>
                          <TableCell>${bill.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusStyle(bill.status)}>
                              {bill.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">View</Button>
                              {bill.status === "Unpaid" && (
                                <Button variant="outline" size="sm">Mark Paid</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
          
          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Track and manage your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <Card key={expense.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Receipt className="w-8 h-8 text-primary" />
                          <div>
                            <h3 className="font-medium">{expense.description}</h3>
                            <p className="text-sm text-gray-500">{expense.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-red-600">
                            -${expense.amount.toFixed(2)}
                          </span>
                          <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                            {expense.category}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => navigate("/reports/expenses")}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Expense Report
                </Button>
              </CardFooter>
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
