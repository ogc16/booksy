
import { useState } from "react";
import { toast } from "sonner";
import InvoiceItem from "./InvoiceItem";
import InvoiceDialog from "./InvoiceDialog";

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

const InvoicesList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
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
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  const handleCreateInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  return (
    <>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <InvoiceItem 
            key={invoice.id} 
            invoice={invoice}
            onClick={() => handleInvoiceClick(invoice)}
          />
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

export default InvoicesList;
