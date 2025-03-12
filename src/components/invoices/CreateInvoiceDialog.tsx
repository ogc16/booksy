import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Invoice, InvoiceItem } from "@/types/invoice";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInvoice: (invoice: Invoice) => void;
}

interface InvoiceFormItem {
  description: string;
  quantity: number;
  price: number;
}

const CreateInvoiceDialog = ({ 
  open, 
  onOpenChange,
  onCreateInvoice 
}: CreateInvoiceDialogProps) => {
  // Form state
  const [client, setClient] = useState("");
  const [items, setItems] = useState<InvoiceFormItem[]>([{ description: "", quantity: 1, price: 0 }]);
  const [dueDate, setDueDate] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("Draft");
  
  // Get currency and VAT settings from localStorage
  const [currency, setCurrency] = useState("$");
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatRate, setVatRate] = useState(0);
  
  useEffect(() => {
    // Load currency and VAT settings from localStorage
    try {
      const storedCurrencySymbol = localStorage.getItem('app-currency-symbol');
      if (storedCurrencySymbol) {
        setCurrency(JSON.parse(storedCurrencySymbol));
      }
      
      const storedVatEnabled = localStorage.getItem('app-vat-enabled');
      if (storedVatEnabled) {
        setVatEnabled(JSON.parse(storedVatEnabled));
      }
      
      const storedVatRate = localStorage.getItem('app-vat-rate');
      if (storedVatRate) {
        setVatRate(Number(JSON.parse(storedVatRate)));
      }
    } catch (error) {
      console.error("Error loading settings from localStorage:", error);
    }
  }, []);
  
  // Calculate totals whenever items or VAT changes
  useEffect(() => {
    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.price, 
      0
    );
    setSubtotal(calculatedSubtotal);
    
    let calculatedTotal = calculatedSubtotal;
    if (vatEnabled && vatRate > 0) {
      calculatedTotal += calculatedSubtotal * (vatRate / 100);
    }
    setTotal(calculatedTotal);
  }, [items, vatEnabled, vatRate]);

  // Handle adding a new item
  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  // Handle updating an item
  const handleItemChange = (index: number, field: "description" | "quantity" | "price", value: string | number) => {
    const updatedItems = [...items];
    if (field === "description") {
      updatedItems[index].description = value as string;
    } else if (field === "quantity") {
      updatedItems[index].quantity = Number(value);
    } else if (field === "price") {
      updatedItems[index].price = Number(value);
    }
    setItems(updatedItems);
  };

  // Handle removing an item
  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client) {
      toast.error("Please enter a client name");
      return;
    }
    
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }
    
    if (items.some(item => !item.description)) {
      toast.error("All items must have a description");
      return;
    }
    
    // Create new invoice
    const newInvoice: Invoice = {
      id: uuidv4(),
      number: `INV-${Math.floor(Math.random() * 10000)}`,
      client,
      date: new Date().toISOString().split('T')[0],
      dueDate,
      items,
      subtotal,
      vatRate: vatEnabled ? vatRate : 0,
      total,
      status,
      paymentStatus: "Unpaid"
    };
    
    onCreateInvoice(newInvoice);
    toast.success("Invoice created successfully");
    
    // Reset form
    setClient("");
    setItems([{ description: "", quantity: 1, price: 0 }]);
    setDueDate("");
    setStatus("Draft");
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for your client.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client or Company Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`description-${index}`} className="sr-only">Description</Label>
                    <Input
                      id={`description-${index}`}
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  
                  <div className="w-20">
                    <Label htmlFor={`quantity-${index}`} className="sr-only">Qty</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                      placeholder="Qty"
                    />
                  </div>
                  
                  <div className="w-24">
                    <Label htmlFor={`price-${index}`} className="sr-only">Price</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
                      placeholder="Price"
                    />
                  </div>
                  
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span>Subtotal:</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            
            {vatEnabled && (
              <div className="flex justify-between items-center">
                <span>VAT ({vatRate}%):</span>
                <span>{currency}{(subtotal * vatRate / 100).toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Invoice Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="submit">Create Invoice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
