
import React, { useState } from 'react';
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Truck, Package, Building, Users, Phone, Mail, Edit, Trash, FilePlus, Map } from "lucide-react";
import { toast } from "sonner";

// Sample supplier data
const initialSuppliers = [
  {
    id: "SUP-001",
    name: "Beauty Wholesale Ltd",
    contact: "John Smith",
    email: "john@beautywholesale.com",
    phone: "+254-700-123-456",
    address: "123 Industrial Area, Nairobi",
    status: "active",
    products: ["Headbands", "Makeup Brushes"],
    lastOrder: "2024-03-15"
  },
  {
    id: "SUP-002",
    name: "Makeup Supplies Co",
    contact: "Mary Johnson",
    email: "mary@makeupsupplies.com",
    phone: "+254-722-789-012",
    address: "456 Business Park, Mombasa",
    status: "active",
    products: ["Highlighters", "Eyeshadow Palettes"],
    lastOrder: "2024-02-20"
  },
  {
    id: "SUP-003",
    name: "Cosmetics Imports Ltd",
    contact: "Robert Brown",
    email: "robert@cosmeticsimports.com",
    phone: "+254-733-345-678",
    address: "789 Trade Center, Kisumu",
    status: "inactive",
    products: ["Premium Makeup Kits", "Mascara"],
    lastOrder: "2023-11-05"
  }
];

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  products: string[];
  lastOrder: string;
}

interface FormData {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: string;
  status: string;
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    products: '',
    status: 'active',
  });

  const handleOpenDialog = (edit: boolean = false, supplier: Supplier | null = null) => {
    if (edit && supplier) {
      setIsEditing(true);
      setSelectedSupplier(supplier);
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        products: supplier.products.join(", "),
        status: supplier.status,
      });
    } else {
      setIsEditing(false);
      setSelectedSupplier(null);
      setFormData({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        products: '',
        status: 'active',
      });
    }
    setDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedSupplier) {
      // Update existing supplier
      const updatedSuppliers = suppliers.map(sup => 
        sup.id === selectedSupplier.id 
          ? {
              ...sup,
              name: formData.name,
              contact: formData.contact,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              products: formData.products.split(',').map(p => p.trim()),
              status: formData.status,
            }
          : sup
      );
      setSuppliers(updatedSuppliers);
      toast.success(`Supplier ${formData.name} updated successfully`);
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        products: formData.products.split(',').map(p => p.trim()),
        status: formData.status,
        lastOrder: 'N/A',
      };
      setSuppliers([...suppliers, newSupplier]);
      toast.success(`Supplier ${formData.name} added successfully`);
    }
    
    setDialogOpen(false);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSupplier) {
      const updatedSuppliers = suppliers.filter(sup => sup.id !== selectedSupplier.id);
      setSuppliers(updatedSuppliers);
      toast.success(`Supplier ${selectedSupplier.name} deleted successfully`);
      setConfirmDialogOpen(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Supplier Management</h1>
            <p className="text-muted-foreground">Manage your product suppliers and vendors</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{suppliers.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {suppliers.filter(s => s.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Product Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(suppliers.flatMap(s => s.products)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suppliers List</CardTitle>
            <CardDescription>
              Manage all your product suppliers and their information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>
                        <div>{supplier.contact}</div>
                        <div className="text-xs text-muted-foreground">{supplier.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.map((product, idx) => (
                            <Badge key={idx} variant="outline">{product}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={supplier.status === 'active' ? 'default' : 'secondary'}
                        >
                          {supplier.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{supplier.lastOrder}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleOpenDialog(true, supplier)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteClick(supplier)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Supplier Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? `Edit Supplier: ${selectedSupplier?.name}` : 'Add New Supplier'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the supplier information below' 
                : 'Fill in the details to add a new supplier'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Supplier Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Person</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="products">Products (comma separated)</Label>
              <Textarea
                id="products"
                name="products"
                value={formData.products}
                onChange={handleInputChange}
                placeholder="Headbands, Makeup Brushes, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange as any}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending Approval</option>
              </select>
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {isEditing ? 'Update Supplier' : 'Add Supplier'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete supplier "{selectedSupplier?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Suppliers;
