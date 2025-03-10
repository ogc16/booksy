
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: string;
  client: string;
  items: InvoiceItem[];
  attachments?: File[];
}

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInvoice: (invoice: Invoice) => void;
}

const CreateInvoiceDialog = ({ 
  open, 
  onOpenChange, 
  onCreateInvoice 
}: CreateInvoiceDialogProps) => {
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id'>>({
    number: `INV-${String(Date.now()).slice(-4)}`,
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    status: 'Draft',
    client: '',
    items: [{ description: '', quantity: 1, price: 0 }]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleItemChange = (index: number, field: 'description' | 'quantity' | 'price', value: string | number) => {
    const newItems = [...newInvoice.items];
    if (field === 'description') {
      newItems[index] = { ...newItems[index], description: value as string };
    } else {
      newItems[index] = { ...newItems[index], [field]: Number(value) || 0 };
    }

    // Calculate total amount
    const totalAmount = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    setNewInvoice({ 
      ...newInvoice, 
      items: newItems,
      amount: totalAmount
    });
  };

  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (newInvoice.items.length === 1) {
      return; // Keep at least one item
    }
    
    const newItems = newInvoice.items.filter((_, i) => i !== index);
    
    // Recalculate total
    const totalAmount = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    setNewInvoice({
      ...newInvoice,
      items: newItems,
      amount: totalAmount
    });
  };

  const handleSubmit = () => {
    if (!newInvoice.client) {
      toast.error("Please enter a client name");
      return;
    }

    if (!newInvoice.items.some(item => item.description && item.price > 0)) {
      toast.error("Please add at least one item with description and price");
      return;
    }

    // Generate a random ID (in a real app, this would come from the backend)
    const invoiceWithId: Invoice = {
      ...newInvoice,
      id: Math.floor(Math.random() * 10000)
    };

    onCreateInvoice(invoiceWithId);
    toast.success("Invoice created successfully");
    onOpenChange(false);

    // Reset form
    setNewInvoice({
      number: `INV-${String(Date.now()).slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'Draft',
      client: '',
      items: [{ description: '', quantity: 1, price: 0 }]
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for your client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input 
                id="client"
                name="client"
                value={newInvoice.client}
                onChange={handleInputChange}
                placeholder="Enter client name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="number">Invoice Number</Label>
              <Input 
                id="number"
                name="number"
                value={newInvoice.number}
                onChange={handleInputChange}
                placeholder="INV-0001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Input 
                  id="date"
                  type="date"
                  name="date"
                  value={newInvoice.date}
                  onChange={handleInputChange}
                />
                <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status"
                name="status"
                value={newInvoice.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newInvoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(index)}
                        disabled={newInvoice.items.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm">Total Amount</div>
              <div className="text-xl font-bold">
                ${newInvoice.amount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Create Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
