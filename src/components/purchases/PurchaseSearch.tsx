
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface PurchaseSearchProps {
  activeTab: string;
}

const PurchaseSearch = ({ activeTab }: PurchaseSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder={`Search ${activeTab === "orders" ? "purchase orders" : 
            activeTab === "bills" ? "bills" :
            activeTab === "items" ? "received items" : 
            activeTab === "expenses" ? "expenses" : "vendors"}...`} 
          className="pl-10"
        />
      </div>
      <Button variant="outline" size="icon" title="Filter">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PurchaseSearch;
