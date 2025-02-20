
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Plus, Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const VendorCard = ({ vendor }: { vendor: {
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
}}) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{vendor.name}</h3>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {vendor.email}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {vendor.phone}
            </p>
            <p className="text-sm text-gray-500">{vendor.address}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Total Spent</p>
        <p className="font-semibold text-lg">${vendor.totalSpent.toLocaleString()}</p>
      </div>
    </div>
  </Card>
);

const Vendors = () => {
  const vendors = [
    {
      name: "Office Supply Co.",
      email: "contact@officesupply.com",
      phone: "(555) 123-4567",
      address: "123 Business Ave, Suite 100, New York, NY 10001",
      totalSpent: 12500,
    },
    {
      name: "Tech Equipment Ltd",
      email: "sales@techequipment.com",
      phone: "(555) 987-6543",
      address: "456 Tech Road, San Francisco, CA 94105",
      totalSpent: 28750,
    },
    {
      name: "Furniture Plus",
      email: "info@furnitureplus.com",
      phone: "(555) 246-8135",
      address: "789 Design Street, Chicago, IL 60601",
      totalSpent: 15300,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Vendors</h1>
            <p className="text-gray-600 mt-1">Manage your vendor relationships</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            <span>Add Vendor</span>
          </Button>
        </div>

        <div className="grid gap-6">
          {vendors.map((vendor, index) => (
            <VendorCard key={index} vendor={vendor} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Vendors;
