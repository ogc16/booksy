
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Plus, Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Vendor {
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
}

const VendorCard = ({ vendor }: { vendor: Vendor }) => (
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

const AddVendorDialog = ({ onAddVendor }: { onAddVendor: (vendor: Vendor) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVendor = {
      ...formData,
      totalSpent: 0, // New vendors start with 0 spent
    };
    onAddVendor(newVendor);
    toast.success("Vendor added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Vendor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
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
  ]);

  const handleAddVendor = (newVendor: Vendor) => {
    setVendors([...vendors, newVendor]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Vendors</h1>
            <p className="text-gray-600 mt-1">Manage your vendor relationships</p>
          </div>
          <AddVendorDialog onAddVendor={handleAddVendor} />
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
