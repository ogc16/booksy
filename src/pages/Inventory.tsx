
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from "@/layouts/AppLayout";
import InventoryTable from "@/components/inventory/InventoryTable";
import PurchaseOrdersTable from "@/components/inventory/PurchaseOrdersTable";
import StockLevelsTable from "@/components/inventory/StockLevelsTable";
import { InventoryItem, PurchaseOrder, StockLevel } from '@/types/inventory';
import AddInventoryItemDialog from '@/components/inventory/AddInventoryItemDialog';
import Orders from "@/pages/inventory/Orders";
import Tracking from "@/pages/inventory/Tracking";
import Analytics from "@/pages/inventory/Analytics";

// Sample inventory data
const sampleInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "biw biw Headband",
    sku: "HB_BLUE",
    description: "biw-tiful blue",
    price: 400.00,
    quantity: 15,
    imageUrl: "/placeholder.svg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    attributes: {
      color: "blue"
    }
  },
  {
    id: "2",
    name: "blush PRO brush",
    sku: "BLUSH_BRUSH",
    description: "Professional makeup brush",
    price: 700.00,
    quantity: 8,
    imageUrl: "/placeholder.svg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Enhance Blush Highlighter",
    sku: "ENH_BLUSH_HIGH",
    description: "Premium highlighter",
    price: 1900.00,
    quantity: 5,
    imageUrl: "/placeholder.svg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Allure Eyeshadow Palette",
    sku: "ALL_EYE_PAL",
    description: "Versatile eyeshadow palette",
    price: 1900.00,
    quantity: 10,
    imageUrl: "/placeholder.svg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Sample purchase orders
const samplePurchaseOrders: PurchaseOrder[] = [
  {
    id: "po1",
    orderNumber: "PO-2023-001",
    supplier: "Beauty Wholesale Ltd",
    date: "2023-10-15",
    status: 'received',
    items: [
      {
        itemId: "1",
        name: "biw biw Headband",
        sku: "HB_BLUE",
        quantity: 10,
        unitPrice: 300.00,
        total: 3000.00
      }
    ],
    total: 3000.00
  },
  {
    id: "po2",
    orderNumber: "PO-2023-002",
    supplier: "Makeup Supplies Co",
    date: "2023-12-01",
    status: 'sent',
    items: [
      {
        itemId: "2",
        name: "blush PRO brush",
        sku: "BLUSH_BRUSH",
        quantity: 15,
        unitPrice: 500.00,
        total: 7500.00
      }
    ],
    total: 7500.00
  }
];

// Sample stock levels
const sampleStockLevels: StockLevel[] = [
  {
    itemId: "1",
    name: "biw biw Headband",
    sku: "HB_BLUE",
    currentStock: 15,
    reorderPoint: 5,
    reorderQuantity: 10,
    status: 'in-stock'
  },
  {
    itemId: "2",
    name: "blush PRO brush",
    sku: "BLUSH_BRUSH",
    currentStock: 8,
    reorderPoint: 10,
    reorderQuantity: 20,
    status: 'low-stock'
  },
  {
    itemId: "3",
    name: "Enhance Blush Highlighter",
    sku: "ENH_BLUSH_HIGH",
    currentStock: 0,
    reorderPoint: 3,
    reorderQuantity: 6,
    status: 'out-of-stock'
  },
  {
    itemId: "4",
    name: "Allure Eyeshadow Palette",
    sku: "ALL_EYE_PAL",
    currentStock: 10,
    reorderPoint: 5,
    reorderQuantity: 10,
    status: 'in-stock'
  }
];

const Inventory = () => {
  const { user } = useAuth();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(sampleInventoryItems);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleAddItem = (newItem: InventoryItem) => {
    setInventoryItems([...inventoryItems, newItem]);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Manage your products, purchase orders, and stock levels</p>
          </div>
          
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Products</CardTitle>
              <CardDescription>Unique inventory items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{inventoryItems.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Stock Value</CardTitle>
              <CardDescription>Current inventory value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KES {inventoryItems.reduce((total, item) => {
                  return total + (item.price * item.quantity);
                }, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Low Stock Items</CardTitle>
              <CardDescription>Items below reorder point</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sampleStockLevels.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="items">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="lpo">Purchase Orders</TabsTrigger>
            <TabsTrigger value="stock">Stock Levels</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="space-y-4 mt-4">
            <InventoryTable items={inventoryItems} />
          </TabsContent>
          
          <TabsContent value="lpo" className="space-y-4 mt-4">
            <PurchaseOrdersTable orders={samplePurchaseOrders} />
          </TabsContent>
          
          <TabsContent value="stock" className="space-y-4 mt-4">
            <StockLevelsTable stockLevels={sampleStockLevels} />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4 mt-4">
            <Orders />
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-4 mt-4">
            <Tracking />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 mt-4">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
      
      <AddInventoryItemDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onAddItem={handleAddItem}
      />
    </AppLayout>
  );
};

export default Inventory;
