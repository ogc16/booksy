
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ShoppingCart, CheckCircle, PackageCheck, TruckIcon, ClipboardList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import BarcodeScanner from "@/components/inventory/BarcodeScanner";

// Sample order data
const sampleOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    date: "2023-10-15",
    status: "pending",
    total: 15000.00,
    items: [
      { id: "ITEM-001", name: "biw biw Headband", quantity: 5, price: 2000.00 },
      { id: "ITEM-002", name: "Enhance Blush Highlighter", quantity: 2, price: 2500.00 }
    ]
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    date: "2023-10-18",
    status: "processing",
    total: 7500.00,
    items: [
      { id: "ITEM-003", name: "blush PRO brush", quantity: 3, price: 2000.00 },
      { id: "ITEM-004", name: "Allure Eyeshadow Palette", quantity: 1, price: 1500.00 }
    ]
  },
  {
    id: "ORD-003",
    customer: "Carol Williams",
    date: "2023-11-05",
    status: "ready_for_pickup",
    total: 12000.00,
    items: [
      { id: "ITEM-001", name: "biw biw Headband", quantity: 2, price: 2000.00 },
      { id: "ITEM-005", name: "Premium Makeup Kit", quantity: 1, price: 8000.00 }
    ]
  },
  {
    id: "ORD-004",
    customer: "David Brown",
    date: "2023-11-10",
    status: "completed",
    total: 9000.00,
    items: [
      { id: "ITEM-003", name: "blush PRO brush", quantity: 2, price: 2000.00 },
      { id: "ITEM-004", name: "Allure Eyeshadow Palette", quantity: 3, price: 1500.00 },
      { id: "ITEM-006", name: "Mascara Deluxe", quantity: 1, price: 1000.00 }
    ]
  }
];

const Orders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fulfillmentStep, setFulfillmentStep] = useState<string>('');
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'ready_for_pickup':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Ready for Pickup</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Shipped</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleOpenOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    setFulfillmentStep('');
    setScannedItems([]);
  };

  const handleUpdateStatus = (newStatus: string) => {
    // Update the order status in the state
    setOrders(orders.map(order => 
      order.id === selectedOrder.id
        ? { ...order, status: newStatus }
        : order
    ));
    
    setSelectedOrder({...selectedOrder, status: newStatus});
    toast.success(`Order ${selectedOrder.id} marked as ${newStatus.replace('_', ' ')}`);
  };

  const handleFulfillment = (step: string) => {
    setFulfillmentStep(step);
    
    if (step === 'verify_items') {
      // Reset scanned items when starting verification
      setScannedItems([]);
    }
  };

  const handleBarcodeScanned = (barcode: string) => {
    // In a real app, this would check the barcode against the items in the order
    // For demo, we'll simulate that the barcode matches an item
    
    if (scannedItems.includes(barcode)) {
      toast.error('This item has already been scanned');
      return;
    }
    
    setScannedItems([...scannedItems, barcode]);
    
    // Simulate verifying all items in the order
    if (scannedItems.length + 1 >= selectedOrder?.items.length) {
      toast.success('All items verified!');
    }
  };

  const handleCompleteStep = (nextStatus: string) => {
    handleUpdateStatus(nextStatus);
    setFulfillmentStep('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
        </div>
        
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">{orders.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Orders Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KES {orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">KES {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleOpenOrder(order)}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Customer: {selectedOrder?.customer} | Status: {selectedOrder?.status?.replace('_', ' ')}
            </DialogDescription>
          </DialogHeader>

          {/* Order Details Section */}
          {!fulfillmentStep && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder?.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">KES {item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">KES {(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="text-right font-bold">
                  Total: KES {selectedOrder?.total.toFixed(2)}
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                {selectedOrder?.status === 'pending' && (
                  <Button onClick={() => handleFulfillment('verify_items')}>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Start Fulfillment
                  </Button>
                )}

                {selectedOrder?.status === 'processing' && (
                  <Button onClick={() => handleFulfillment('ready_pickup')}>
                    <PackageCheck className="mr-2 h-4 w-4" />
                    Mark Ready for Pickup
                  </Button>
                )}

                {selectedOrder?.status === 'ready_for_pickup' && (
                  <Button onClick={() => handleFulfillment('complete')}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Order
                  </Button>
                )}

                {selectedOrder?.status !== 'cancelled' && selectedOrder?.status !== 'completed' && (
                  <Button variant="destructive" onClick={() => handleUpdateStatus('cancelled')}>
                    Cancel Order
                  </Button>
                )}
              </DialogFooter>
            </>
          )}

          {/* Verify Items Step */}
          {fulfillmentStep === 'verify_items' && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Item Verification</h3>
                <p>Scan each item's barcode to verify order contents</p>
                
                <div className="mt-4">
                  <BarcodeScanner onScan={handleBarcodeScanned} />
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Verification Progress</h4>
                  <div className="space-y-2">
                    {selectedOrder?.items.map((item: any, index: number) => (
                      <div key={item.id} className="flex items-center">
                        <div className={`mr-2 ${index < scannedItems.length ? 'text-green-500' : 'text-gray-300'}`}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  onClick={() => handleCompleteStep('processing')}
                  disabled={scannedItems.length < selectedOrder?.items.length}
                >
                  Confirm All Items
                </Button>
                <Button variant="outline" onClick={() => setFulfillmentStep('')}>
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Ready for Pickup Step */}
          {fulfillmentStep === 'ready_pickup' && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Ready for Pickup</h3>
                <p>Mark this order as ready for customer pickup.</p>
                
                <div className="flex items-center mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <TruckIcon className="h-5 w-5 text-amber-500 mr-2" />
                  <span>Order will be marked as ready for pickup and customer will be notified.</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => handleCompleteStep('ready_for_pickup')}>
                  Confirm Ready for Pickup
                </Button>
                <Button variant="outline" onClick={() => setFulfillmentStep('')}>
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          )}
          
          {/* Complete Order Step */}
          {fulfillmentStep === 'complete' && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Complete Order</h3>
                <p>Confirm that the order has been picked up or delivered to the customer.</p>
                
                <div className="flex items-center mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>This will mark the order as completed and update inventory records.</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => handleCompleteStep('completed')}>
                  Complete Order
                </Button>
                <Button variant="outline" onClick={() => setFulfillmentStep('')}>
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
