
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PurchaseOrder {
  id: string;
  vendor: string;
  date: string;
  total: number;
  status: string;
  bills?: any[];
}

interface PurchaseOrdersTabProps {
  purchaseOrders: PurchaseOrder[];
  getStatusStyle: (status: string) => string;
}

const PurchaseOrdersTab = ({ purchaseOrders, getStatusStyle }: PurchaseOrdersTabProps) => {
  return (
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
  );
};

export default PurchaseOrdersTab;
