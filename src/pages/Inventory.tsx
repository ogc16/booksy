
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from "@/layouts/AppLayout";

const Inventory = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
        </div>

        <Tabs defaultValue="items">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="lpo">Purchase Orders</TabsTrigger>
            <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>
                  Manage your inventory items and their details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 h-64 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Item management interface will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lpo" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Local Purchase Orders</CardTitle>
                <CardDescription>
                  Create and manage your purchase orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 h-64 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">LPO management interface will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stock" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Levels</CardTitle>
                <CardDescription>
                  Monitor current stock levels and set reorder points.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 h-64 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Stock level monitoring interface will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Inventory;
