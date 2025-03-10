
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, FileText, Package, ShoppingCart } from "lucide-react";

const PurchaseMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Open Orders</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Items to Receive</p>
            <h3 className="text-2xl font-bold">48</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bills to Pay</p>
            <h3 className="text-2xl font-bold">7</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
            <h3 className="text-2xl font-bold">$9,450.75</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseMetricsCards;
