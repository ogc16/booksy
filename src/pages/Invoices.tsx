
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvoicesList = () => {
  const invoices = [
    { id: 1, number: "INV-001", date: "2024-03-15", amount: 1500, status: "Paid" },
    { id: 2, number: "INV-002", date: "2024-03-18", amount: 2300, status: "Pending" },
    { id: 3, number: "INV-003", date: "2024-03-20", amount: 850, status: "Overdue" },
  ];

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="p-4">
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
