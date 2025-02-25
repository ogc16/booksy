
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Plus, Building2, Mail, Phone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Supplier {
  name: string;
  email: string;
  phone: string;
  address: string;
  productsSupplied: string[];
  totalOrders: number;
}

const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{supplier.name}</h3>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {supplier.email}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {supplier.phone}
            </p>
            <p className="text-sm text-gray-500">{supplier.address}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {supplier.productsSupplied.map((product, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {product}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="font-semibold text-lg">{supplier.totalOrders}</p>
      </div>
    </div>
  </Card>
);

const AddSupplierDialog = ({ onAddSupplier }: { onAddSupplier: (supplier: Supplier) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    products: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier = {
      ...formData,
      productsSupplied: formData.products.split(',').map(p => p.trim()),
      totalOrders: 0,
    };
    onAddSupplier(newSupplier);
    toast.success("Supplier added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
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
          <div className="space-y-2">
            <Label htmlFor="products">Products Supplied (comma-separated)</Label>
            <Input
              id="products"
              required
              value={formData.products}
              onChange={(e) => setFormData({ ...formData, products: e.target.value })}
              placeholder="e.g. Electronics, Office Supplies, Furniture"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Supplier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      name: "Global Electronics Inc.",
      email: "sales@globalelectronics.com",
      phone: "(555) 234-5678",
      address: "789 Tech Boulevard, Silicon Valley, CA 94025",
      productsSupplied: ["Laptops", "Monitors", "Keyboards"],
      totalOrders: 45,
    },
    {
      name: "Office Essential Supplies",
      email: "orders@officeessentials.com",
      phone: "(555) 876-5432",
      address: "456 Supply Street, Chicago, IL 60601",
      productsSupplied: ["Paper", "Pens", "Desk Accessories"],
      totalOrders: 87,
    },
    {
      name: "Industrial Hardware Co.",
      email: "sales@industrialhardware.com",
      phone: "(555) 345-6789",
      address: "321 Manufacturing Road, Detroit, MI 48201",
      productsSupplied: ["Tools", "Safety Equipment", "Hardware"],
      totalOrders: 62,
    },
  ]);

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers([...suppliers, newSupplier]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Suppliers</h1>
            <p className="text-gray-600 mt-1">Manage your supplier relationships and orders</p>
          </div>
          <AddSupplierDialog onAddSupplier={handleAddSupplier} />
        </div>

        <div className="grid gap-6">
          {suppliers.map((supplier, index) => (
            <SupplierCard key={index} supplier={supplier} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Suppliers;
