
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText, Plus, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: string;
  client: string;
  items: { description: string; quantity: number; price: number }[];
}

const InvoiceDialog = ({ invoice, open, onOpenChange }: { 
  invoice: Invoice | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) => {
  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    toast.success("Invoice PDF downloaded successfully");
  };

  if (!invoice) return null;

  const total = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Invoice {invoice.number}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="w-4 h-4" />
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium">{invoice.client}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{invoice.date}</p>
            </div>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="text-left p-3">Description</th>
                  <th className="text-right p-3">Quantity</th>
                  <th className="text-right p-3">Price</th>
                  <th className="text-right p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-3">{item.description}</td>
                    <td className="text-right p-3">{item.quantity}</td>
                    <td className="text-right p-3">${item.price.toFixed(2)}</td>
                    <td className="text-right p-3">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/50">
                <tr>
                  <td colSpan={3} className="text-right p-3 font-medium">Total</td>
                  <td className="text-right p-3 font-medium">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-end">
            <span className={`px-3 py-1 text-sm rounded-full ${
              invoice.status === "Paid" 
                ? "bg-green-100 text-green-800"
                : invoice.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {invoice.status}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InvoicesList = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const invoices: Invoice[] = [
    { 
      id: 1, 
      number: "INV-001", 
      date: "2024-03-15", 
      amount: 1500, 
      status: "Paid",
      client: "Acme Corp",
      items: [
        { description: "Web Development", quantity: 1, price: 1000 },
        { description: "UI Design", quantity: 5, price: 100 },
      ]
    },
    { 
      id: 2, 
      number: "INV-002", 
      date: "2024-03-18", 
      amount: 2300, 
      status: "Pending",
      client: "TechStart Inc",
      items: [
        { description: "Mobile App Development", quantity: 1, price: 2000 },
        { description: "Testing Services", quantity: 3, price: 100 },
      ]
    },
    { 
      id: 3, 
      number: "INV-003", 
      date: "2024-03-20", 
      amount: 850, 
      status: "Overdue",
      client: "Digital Solutions Ltd",
      items: [
        { description: "Consulting Services", quantity: 5, price: 170 },
      ]
    },
  ];

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card 
            key={invoice.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleInvoiceClick(invoice)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium">{invoice.number}</h3>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  ${invoice.amount.toFixed(2)}
                </span>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  invoice.status === "Paid" 
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <InvoiceDialog 
        invoice={selectedInvoice} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

const Invoices = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Invoices</h1>
            <p className="text-gray-600 mt-1">Manage your invoices and payments</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </Button>
        </div>
        <InvoicesList />
      </div>
    </AppLayout>
  );
};

export default Invoices;
