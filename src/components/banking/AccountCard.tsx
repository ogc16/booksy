
import { Building, CreditCard, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AccountCardProps {
  bank: string;
  balance: string;
  accountNumber: string;
  onDelete: () => void;
}

const AccountCard = ({ bank, balance, accountNumber, onDelete }: AccountCardProps) => {
  return (
    <div className="relative">
      <Card className="p-6 bg-primary text-primary-foreground">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 opacity-80" />
              <p className="text-sm opacity-80">{bank}</p>
            </div>
            <h3 className="text-2xl font-semibold mt-1">{balance}</h3>
            <p className="text-sm mt-4 opacity-80">**** **** **** {accountNumber}</p>
          </div>
          <CreditCard className="w-8 h-8" />
        </div>
      </Card>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bank Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bank account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountCard;
