
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LPOItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface LocalPurchaseOrder {
  id: string;
  vendor: string;
  date: string;
  items: LPOItem[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

const LPO = () => {
  const [lpos, setLpos] = useState<LocalPurchaseOrder[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newLpo, setNewLpo] = useState<Omit<LocalPurchaseOrder, 'id'>>({
    vendor: '',
    date: new Date().toISOString().split('T')[0],
    items: [{ id: '1', description: '', quantity: 1, price: 0 }],
    status: 'draft'
  });

  const handleCreateLpo = () => {
    const lpo: LocalPurchaseOrder = {
      ...newLpo,
      id: `LPO-${String(Date.now()).slice(-4)}`
    };
    setLpos([...lpos, lpo]);
    setIsCreateDialogOpen(false);
    toast.success('LPO created successfully');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Local Purchase Orders</h1>
            <p className="text-gray-600 mt-1">Create and manage local purchase orders</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create LPO
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All LPOs</CardTitle>
            <CardDescription>View and manage your local purchase orders</CardDescription>
          </CardHeader>
          <CardContent>
            {lpos.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No LPOs created yet</p>
                <p className="text-sm text-muted-foreground">Create your first LPO to get started</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LPO #</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lpos.map((lpo) => (
                    <TableRow key={lpo.id}>
                      <TableCell>{lpo.id}</TableCell>
                      <TableCell>{lpo.vendor}</TableCell>
                      <TableCell>{lpo.date}</TableCell>
                      <TableCell className="capitalize">{lpo.status}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create Local Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={newLpo.vendor}
                    onChange={(e) => setNewLpo({ ...newLpo, vendor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newLpo.date}
                    onChange={(e) => setNewLpo({ ...newLpo, date: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label>Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newLpo.items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => {
                              const items = [...newLpo.items];
                              items[index].description = e.target.value;
                              setNewLpo({ ...newLpo, items });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const items = [...newLpo.items];
                              items[index].quantity = parseInt(e.target.value) || 0;
                              setNewLpo({ ...newLpo, items });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const items = [...newLpo.items];
                              items[index].price = parseFloat(e.target.value) || 0;
                              setNewLpo({ ...newLpo, items });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          ${(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setNewLpo({
                      ...newLpo,
                      items: [
                        ...newLpo.items,
                        { id: String(newLpo.items.length + 1), description: '', quantity: 1, price: 0 }
                      ]
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLpo}>Create LPO</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default LPO;
