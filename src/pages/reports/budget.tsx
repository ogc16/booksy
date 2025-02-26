
import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BarChart } from "@/components/ui/chart";

interface BudgetItem {
  id: number;
  category: string;
  budgetedAmount: number;
  actualAmount: number;
}

const Budget = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 1, category: "Marketing", budgetedAmount: 1000, actualAmount: 800 },
    { id: 2, category: "Salaries", budgetedAmount: 5000, actualAmount: 5200 },
    { id: 3, category: "Rent", budgetedAmount: 2000, actualAmount: 1900 },
  ]);

  const [newItem, setNewItem] = useState<Omit<BudgetItem, 'id'>>({
    category: '',
    budgetedAmount: 0,
    actualAmount: 0,
  });

  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddItem = () => {
    if (!newItem.category || newItem.budgetedAmount <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = Math.max(0, ...budgetItems.map(item => item.id)) + 1;
    setBudgetItems([...budgetItems, { ...newItem, id: newId }]);
    setNewItem({ category: '', budgetedAmount: 0, actualAmount: 0 });
    setIsDialogOpen(false);
    toast.success("Budget item added successfully");
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    setBudgetItems(budgetItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
    setIsDialogOpen(false);
    toast.success("Budget item updated successfully");
  };

  const handleDeleteItem = (id: number) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
    toast.success("Budget item deleted successfully");
  };

  const chartData = budgetItems.map(item => ({
    name: item.category,
    budgeted: item.budgetedAmount,
    actual: item.actualAmount,
  }));

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Budget Overview</h1>
            <p className="text-muted-foreground">View and manage your budget.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Budget Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Budget Item' : 'Add New Budget Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Input
                    value={editingItem ? editingItem.category : newItem.category}
                    onChange={(e) => {
                      if (editingItem) {
                        setEditingItem({ ...editingItem, category: e.target.value });
                      } else {
                        setNewItem({ ...newItem, category: e.target.value });
                      }
                    }}
                    placeholder="Enter category"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Budgeted Amount</label>
                  <Input
                    type="number"
                    value={editingItem ? editingItem.budgetedAmount : newItem.budgetedAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (editingItem) {
                        setEditingItem({ ...editingItem, budgetedAmount: value });
                      } else {
                        setNewItem({ ...newItem, budgetedAmount: value });
                      }
                    }}
                    placeholder="Enter budgeted amount"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Actual Amount</label>
                  <Input
                    type="number"
                    value={editingItem ? editingItem.actualAmount : newItem.actualAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (editingItem) {
                        setEditingItem({ ...editingItem, actualAmount: value });
                      } else {
                        setNewItem({ ...newItem, actualAmount: value });
                      }
                    }}
                    placeholder="Enter actual amount"
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={editingItem ? handleEditItem : handleAddItem}
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Category</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Budgeted Amount</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Actual Amount</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Variance</th>
                  <th className="text-right py-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item) => {
                  const variance = item.actualAmount - item.budgetedAmount;
                  const isOverBudget = variance > 0;
                  
                  return (
                    <tr key={item.id} className="border-b border-border">
                      <td className="py-4 text-foreground">{item.category}</td>
                      <td className="py-4 text-right text-foreground">
                        ${item.budgetedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 text-right text-foreground">
                        ${item.actualAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 text-right ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
                        ${variance.toLocaleString('en-US', { minimumFractionDigits: 2, signDisplay: 'always' })}
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Comparison</h2>
          <div className="w-full h-[400px]">
            <BarChart data={chartData} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;
