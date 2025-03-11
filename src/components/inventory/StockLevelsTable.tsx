
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { StockLevel } from '@/types/inventory';
import { Card } from "@/components/ui/card";

interface StockLevelsTableProps {
  stockLevels: StockLevel[];
}

const StockLevelsTable: React.FC<StockLevelsTableProps> = ({ stockLevels }) => {
  const getStockStatus = (status: StockLevel['status']) => {
    switch (status) {
      case 'in-stock':
        return <span className="text-green-600 font-medium">In Stock</span>;
      case 'low-stock':
        return <span className="text-amber-600 font-medium">Low Stock</span>;
      case 'out-of-stock':
        return <span className="text-red-600 font-medium">Out of Stock</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getStockProgressColor = (status: StockLevel['status']) => {
    switch (status) {
      case 'in-stock': return "bg-green-600";
      case 'low-stock': return "bg-amber-600";
      case 'out-of-stock': return "bg-red-600";
      default: return "";
    }
  };

  const calculateProgressPercentage = (currentStock: number, reorderPoint: number) => {
    if (currentStock <= 0) return 0;
    const target = reorderPoint * 2; // Target is double the reorder point
    const percentage = (currentStock / target) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Stock Levels</h3>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Current Stock</TableHead>
                <TableHead className="text-center">Reorder Point</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockLevels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No stock levels found
                  </TableCell>
                </TableRow>
              ) : (
                stockLevels.map((item) => (
                  <TableRow key={item.itemId} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                    <TableCell className="text-center">{item.currentStock}</TableCell>
                    <TableCell className="text-center">{item.reorderPoint}</TableCell>
                    <TableCell>{getStockStatus(item.status)}</TableCell>
                    <TableCell className="w-[200px]">
                      <div className="flex flex-col gap-1">
                        <Progress 
                          value={calculateProgressPercentage(item.currentStock, item.reorderPoint)} 
                          className={`h-2 ${getStockProgressColor(item.status)}`} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default StockLevelsTable;
