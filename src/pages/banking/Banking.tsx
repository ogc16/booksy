
import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { toast } from "sonner";

// Import refactored components
import AccountCard from "@/components/banking/AccountCard";
import TransactionList from "@/components/banking/TransactionList";
import UploadSection from "@/components/banking/UploadSection";
import CreateBankDialog from "@/components/banking/CreateBankDialog";
import BalanceHistoryChart from "@/components/banking/BalanceHistoryChart";

interface BankAccount {
  bank: string;
  balance: string;
  accountNumber: string;
}

const Banking = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { bank: "Chase", balance: "$32,145.00", accountNumber: "4589" },
    { bank: "Bank of America", balance: "$27,244.00", accountNumber: "7832" },
  ]);

  const handleBankCreated = (newBank: BankAccount) => {
    setAccounts([...accounts, newBank]);
  };

  const handleDeleteBank = (bankIndex: number) => {
    const newAccounts = accounts.filter((_, index) => index !== bankIndex);
    setAccounts(newAccounts);
    toast.success("Bank account deleted successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Banking</h1>
            <p className="text-gray-600 mt-1">Manage your accounts and transactions</p>
          </div>
          <CreateBankDialog onBankCreated={handleBankCreated} />
        </div>
        
        <UploadSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => (
            <AccountCard
              key={index}
              bank={account.bank}
              balance={account.balance}
              accountNumber={account.accountNumber}
              onDelete={() => handleDeleteBank(index)}
            />
          ))}
          <BalanceHistoryChart />
        </div>

        <TransactionList />
      </div>
    </AppLayout>
  );
};

export default Banking;
