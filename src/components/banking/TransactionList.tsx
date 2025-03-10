
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number;
  type: string;
  bank: string;
}

const TransactionList = () => {
  const transactions = [
    { id: 1, description: "Direct Deposit - Salary", date: "2024-03-15", amount: 5000, type: "credit", bank: "Chase" },
    { id: 2, description: "Office Rent Payment", date: "2024-03-18", amount: 2500, type: "debit", bank: "Bank of America" },
    { id: 3, description: "Client Payment", date: "2024-03-20", amount: 1500, type: "credit", bank: "Chase" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
            <div className="flex items-center gap-3">
              {transaction.type === "credit" ? (
                <div className="p-2 rounded-full bg-green-100">
                  <ArrowDownLeft className="w-4 h-4 text-green-600" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-red-100">
                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                </div>
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{transaction.date}</span>
                  <span className="text-primary">• {transaction.bank}</span>
                </div>
              </div>
            </div>
            <span className={`font-semibold ${
              transaction.type === "credit" ? "text-green-600" : "text-red-600"
            }`}>
              {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionList;
