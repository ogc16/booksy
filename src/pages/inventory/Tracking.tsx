
import React from 'react';
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Locate, Package, Truck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample tracking data
const sampleShipments = [
  {
    id: "SHP-001",
    orderNumber: "ORD-001",
    customer: "Alice Johnson",
    dateShipped: "2023-10-16",
    status: "delivered",
    trackingNumber: "TRK123456789",
    carrier: "DHL Express"
  },
  {
    id: "SHP-002",
    orderNumber: "ORD-002",
    customer: "Bob Smith",
    dateShipped: "2023-10-19",
    status: "in-transit",
    trackingNumber: "TRK987654321",
    carrier: "FedEx"
  },
  {
    id: "SHP-003",
    orderNumber: "ORD-003",
    customer: "Carol Williams",
    dateShipped: "2023-11-06",
    status: "processing",
    trackingNumber: "TRK567891234",
    carrier: "DHL Express"
  }
];

const Tracking = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case 'in-transit':
        return <Badge variant="secondary">In Transit</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Shipment Tracking</h1>
            <p className="text-muted-foreground">Track shipments and manage delivery status</p>
          </div>
          
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Create Shipment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{sampleShipments.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sampleShipments.filter(shipment => shipment.status === 'in-transit').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sampleShipments.filter(shipment => shipment.status === 'delivered').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="shipments">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="tracking">Tracking Status</TabsTrigger>
            <TabsTrigger value="carriers">Carriers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shipments" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipment #</TableHead>
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date Shipped</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleShipments.map((shipment) => (
                        <TableRow key={shipment.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>{shipment.orderNumber}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell>{shipment.dateShipped}</TableCell>
                          <TableCell>{shipment.carrier}</TableCell>
                          <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Track a Shipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter tracking number" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button>
                    <Locate className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="carriers" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Carriers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["DHL Express", "FedEx", "UPS", "Kenya Post", "Sendy", "G4S"].map((carrier) => (
                    <Card key={carrier}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <span>{carrier}</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Tracking;
