import { useState } from "react";
import { Eye, Edit, Download, XCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SalesOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", date: "2025-03-10", status: "Pending", amount: 100 },
    { id: 2, customer: "Jane Smith", date: "2025-03-12", status: "Shipped", amount: 200 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.id.toString().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toString().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  const handleCancelOrder = (id: number) => {
    setOrders(orders.map(order => {
      if (order.id === id && (order.status !== 'Shipped' && order.status !== 'Delivered')) {
        return { ...order, status: 'Cancelled' };
      }
      return order;
    }));
  };

  return (
    
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Sales Orders</h1>
        <p className="text-gray-600">Manage your sales orders and track fulfillment</p>

        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search by customer, id or amount..."
            className="w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            Create Sales Order
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of your sales orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                   <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost"><Eye className="inline-block h-4 w-4" /></Button>
                    <Button variant="ghost" className="ml-2"><Edit className="inline-block h-4 w-4" /></Button>
                    <Button variant="ghost" className="ml-2"><Download className="inline-block h-4 w-4" /></Button>
                    {(order.status !== 'Shipped' && order.status !== 'Delivered') && (
                      <Button
                        variant="ghost"
                        className="ml-2"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <XCircle className="inline-block h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    
  );
};

export default SalesOrders;
