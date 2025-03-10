
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InvoiceProps {
  invoice: {
    id: number;
    number: string;
    date: string;
    amount: number;
    status: string;
    client: string;
  };
  onClick: () => void;
}

const InvoiceItem = ({ invoice, onClick }: InvoiceProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
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
  );
};

export default InvoiceItem;
