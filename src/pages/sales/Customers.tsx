import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Filter, Edit, Trash, Mail, Phone, UserPlus } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  dateAdded: string;
  notes: string;
  address: string;
}

const CustomerForm = ({
  customer,
  onChange,
}: {
  customer: Customer;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input
        id="name"
        value={customer.name}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="email" className="text-right">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        value={customer.email}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="phone" className="text-right">
        Phone
      </Label>
      <Input
        id="phone"
        value={customer.phone}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="address" className="text-right">
        Address
      </Label>
      <Input
        id="address"
        value={customer.address}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="notes" className="text-right">
        Notes
      </Label>
      <Input
        id="notes"
        value={customer.notes}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
  </div>
);

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "C001", name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567", status: "Active", dateAdded: "2023-10-15",
      notes: "",
      address: ""
    },
    {
      id: "C002", name: "Bob Smith", email: "bob@example.com", phone: "555-234-5678", status: "Active", dateAdded: "2023-10-18",
      notes: "",
      address: ""
    },
    {
      id: "C003", name: "Carol Williams", email: "carol@example.com", phone: "555-345-6789", status: "Inactive", dateAdded: "2023-11-05",
      notes: "",
      address: ""
    },
    {
      id: "C004", name: "David Brown", email: "david@example.com", phone: "555-456-7890", status: "Active", dateAdded: "2023-11-12",
      notes: "",
      address: ""
    },
  ]);

  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "Active",
    dateAdded: "",
    notes: "",
    address: "",
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleAddCustomer = () => {
    const customer: Customer = {
      ...newCustomer,
      id: `C${(customers.length + 1).toString().padStart(3, '0')}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      id: "",
      name: "",
      email: "",
      phone: "",
      status: "Active",
      dateAdded: "",
      notes: "",
      address: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => (c.id === editingCustomer.id ? editingCustomer : c)));
      setIsEditDialogOpen(false);
      setEditingCustomer(null);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your customer relationships</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter customer details to create a new profile.
                </DialogDescription>
              </DialogHeader>
              <CustomerForm
                customer={newCustomer}
                onChange={(e) => setNewCustomer({ ...newCustomer, [e.target.id]: e.target.value })}
              />
              <DialogFooter>
                <Button type="submit" onClick={handleAddCustomer}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" title="Filter">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell>{customer.dateAdded}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingCustomer(customer);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Customer Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Update customer information.
              </DialogDescription>
            </DialogHeader>
            {editingCustomer && (
              <CustomerForm
                customer={editingCustomer}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, [e.target.id]: e.target.value })}
              />
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleEditCustomer}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Customers;
