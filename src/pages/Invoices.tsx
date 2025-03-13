import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Plus, Eye, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Invoice } from "@/types/invoice";
import CreateInvoiceDialog from "@/components/invoices/CreateInvoiceDialog";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Invoices = () => {
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const { hasPermission } = useAuth();
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "John Doe", date: "2025-03-10", amount: 100, status: "Pending" },
    { id: 2, customer: "Jane Smith", date: "2025-03-12", amount: 200, status: "Paid" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const searchMatch =
      invoice.id.toString().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.amount.toString().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Invoices</h1>
            <p className="text-gray-600 mt-1">Manage your invoices and payments</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search by customer, id or amount..."
            className="w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setCreateInvoiceOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            <span>New Invoice</span>
          </Button>
        </div>

        <Table>
          <TableCaption>A list of your invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost"><Eye className="inline-block h-4 w-4" /></Button>
                  <Button variant="ghost" className="ml-2"><Edit className="inline-block h-4 w-4" /></Button>
                  <Button variant="ghost" className="ml-2"><Download className="inline-block h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateInvoiceDialog
        open={createInvoiceOpen}
        onOpenChange={setCreateInvoiceOpen}
        onCreateInvoice={(newInvoice: Invoice) => {
          // This will be handled by the InvoicesList component
        }}
      />
    </AppLayout>
  );
};

export default Invoices;
