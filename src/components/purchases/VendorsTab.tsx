
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ShoppingBag } from "lucide-react";

const VendorsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendors</CardTitle>
        <CardDescription>Manage your suppliers and vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No vendors added yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Add vendors to keep track of your suppliers</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorsTab;
