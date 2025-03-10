
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface BankAccount {
  bank: string;
  balance: string;
  accountNumber: string;
}

interface CreateBankDialogProps {
  onBankCreated: (bank: BankAccount) => void;
}

const CreateBankDialog = ({ onBankCreated }: CreateBankDialogProps) => {
  const [bankName, setBankName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!bankName || !initialBalance || !accountNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    // Format the balance with dollar sign and commas
    const formattedBalance = `$${parseFloat(initialBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

    // Format account number to only show last 4 digits
    const lastFourDigits = accountNumber.slice(-4);
    
    // Create the new bank object
    const newBank = {
      bank: bankName,
      balance: formattedBalance,
      accountNumber: lastFourDigits,
    };
    
    // Pass the new bank to the parent component
    onBankCreated(newBank);
    
    // Reset form and close dialog
    setBankName("");
    setInitialBalance("");
    setAccountNumber("");
    setOpen(false);
    
    // Show success message
    toast.success(`${bankName} account added successfully!`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Plus className="w-4 h-4" />
          Add Bank Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Bank Account</DialogTitle>
            <DialogDescription>
              Enter your bank account details below to add it to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input
                id="bank-name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Chase, Bank of America"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="initial-balance">Initial Balance</Label>
              <Input
                id="initial-balance"
                type="number"
                step="0.01"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Last 4 digits will be displayed"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Bank Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBankDialog;
