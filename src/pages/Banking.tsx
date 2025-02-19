
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { LineChart } from "@/components/ui/chart";

const AccountCard = () => (
  <Card className="p-6 bg-primary text-primary-foreground">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm opacity-80">Main Account</p>
        <h3 className="text-2xl font-semibold mt-1">$59,389.00</h3>
        <p className="text-sm mt-4 opacity-80">**** **** **** 4589</p>
      </div>
      <CreditCard className="w-8 h-8" />
    </div>
  </Card>
);

const TransactionList = () => {
  const transactions = [
    { id: 1, description: "Direct Deposit - Salary", date: "2024-03-15", amount: 5000, type: "credit" },
    { id: 2, description: "Office Rent Payment", date: "2024-03-18", amount: 2500, type: "debit" },
    { id: 3, description: "Client Payment", date: "2024-03-20", amount: 1500, type: "credit" },
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
                <p className="text-sm text-gray-500">{transaction.date}</p>
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

const Banking = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Banking</h1>
          <p className="text-gray-600 mt-1">Manage your accounts and transactions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AccountCard />
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Balance History</h3>
            <LineChart
              data={[
                { name: "Jan", value: 45000 },
                { name: "Feb", value: 48000 },
                { name: "Mar", value: 52000 },
                { name: "Apr", value: 49000 },
                { name: "May", value: 55000 },
                { name: "Jun", value: 59000 },
              ]}
            />
          </Card>
        </div>

        <TransactionList />
      </div>
    </AppLayout>
  );
};

export default Banking;
