
import { AppLayout } from "@/layouts/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText, Plus, Download, X, Pencil, Upload, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/file-upload/FileUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: string;
  client: string;
  items: { description: string; quantity: number; price: number }[];
  attachments?: File[];
}

const InvoiceDialog = ({ invoice, open, onOpenChange }: { 
  invoice: Invoice | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const { hasPermission } = useAuth();

  // Initialize edited invoice when dialog opens
  useState(() => {
    if (invoice) {
      setEditedInvoice(invoice);
    }
  });

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    toast.success("Invoice PDF downloaded successfully");
  };

  const handleSave = () => {
    // In a real application, this would save to a database
    toast.success("Invoice updated successfully");
    setIsEditing(false);
  };

  const handleItemChange = (index: number, field: 'description' | 'quantity' | 'price', value: string | number) => {
    if (!editedInvoice) return;

    const newItems = [...editedInvoice.items];
    if (field === 'description') {
      newItems[index] = { ...newItems[index], description: value as string };
    } else {
      newItems[index] = { ...newItems[index], [field]: Number(value) || 0 };
    }

    setEditedInvoice({ ...editedInvoice, items: newItems });
  };

  const handleFileUpload = (files: File[]) => {
    if (!editedInvoice) return;
    setEditedInvoice({ ...editedInvoice, attachments: files });
  };

  if (!invoice || !editedInvoice) return null;

  const total = editedInvoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Invoice {invoice.number}</DialogTitle>
            <div className="flex items-center gap-2">
              {!isEditing && hasPermission("user") && (
                <>
                  <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                </>
              )}
              {isEditing && (
                <Button variant="default" onClick={handleSave}>
                  Save Changes
                </Button>
              )}
              <DialogClose asChild>
                <Button variant="outline" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                {isEditing ? (
                  <Input 
                    value={editedInvoice.client} 
                    onChange={(e) => setEditedInvoice({ ...editedInvoice, client: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-medium">{editedInvoice.client}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Date</p>
                {isEditing ? (
                  <Input 
                    type="date" 
                    value={editedInvoice.date} 
                    onChange={(e) => setEditedInvoice({ ...editedInvoice, date: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-medium">{editedInvoice.date}</p>
                )}
              </div>
            </div>

            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="text-left p-3">Description</th>
                    <th className="text-right p-3">Quantity</th>
                    <th className="text-right p-3">Price</th>
                    <th className="text-right p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {editedInvoice.items.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-3">
                        {isEditing ? (
                          <Input 
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          />
                        ) : (
                          item.description
                        )}
                      </td>
                      <td className="text-right p-3">
                        {isEditing ? (
                          <Input 
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            className="w-24 ml-auto"
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="text-right p-3">
                        {isEditing ? (
                          <Input 
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            className="w-24 ml-auto"
                          />
                        ) : (
                          `$${item.price.toFixed(2)}`
                        )}
                      </td>
                      <td className="text-right p-3">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/50">
                  <tr>
                    <td colSpan={3} className="text-right p-3 font-medium">Total</td>
                    <td className="text-right p-3 font-medium">${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end">
              {isEditing ? (
                <select 
                  value={editedInvoice.status}
                  onChange={(e) => setEditedInvoice({ ...editedInvoice, status: e.target.value })}
                  className="px-3 py-1 text-sm rounded-full border"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              ) : (
                <span className={`px-3 py-1 text-sm rounded-full ${
                  editedInvoice.status === "Paid" 
                    ? "bg-green-100 text-green-800"
                    : editedInvoice.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {editedInvoice.status}
                </span>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="attachments">
            <div className="space-y-4">
              <FileUpload 
                onUpload={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                multiple={true}
                maxSize={10}
                buttonText="Add Receipt or Document"
              />
              
              {(!editedInvoice.attachments || editedInvoice.attachments.length === 0) && (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                  <FilePlus className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No attachments yet</p>
                  <p className="text-sm text-gray-400">
                    Upload receipts, supporting documents, or any relevant files
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const InvoicesList = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { user, hasPermission } = useAuth();

  const invoices: Invoice[] = [
    { 
      id: 1, 
      number: "INV-001", 
      date: "2024-03-15", 
      amount: 1500, 
      status: "Paid",
      client: "Acme Corp",
      items: [
        { description: "Web Development", quantity: 1, price: 1000 },
        { description: "UI Design", quantity: 5, price: 100 },
      ]
    },
    { 
      id: 2, 
      number: "INV-002", 
      date: "2024-03-18", 
      amount: 2300, 
      status: "Pending",
      client: "TechStart Inc",
      items: [
        { description: "Mobile App Development", quantity: 1, price: 2000 },
        { description: "Testing Services", quantity: 3, price: 100 },
      ]
    },
    { 
      id: 3, 
      number: "INV-003", 
      date: "2024-03-20", 
      amount: 850, 
      status: "Overdue",
      client: "Digital Solutions Ltd",
      items: [
        { description: "Consulting Services", quantity: 5, price: 170 },
      ]
    },
  ];

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  const handleUploadFiles = (files: File[]) => {
    toast.success(`${files.length} file(s) uploaded successfully`);
    setUploadDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card 
            key={invoice.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleInvoiceClick(invoice)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium">{invoice.number}</h3>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  ${invoice.amount.toFixed(2)}
                </span>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  invoice.status === "Paid" 
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <InvoiceDialog 
        invoice={selectedInvoice} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload receipts or supporting documents for your expenses
            </DialogDescription>
          </DialogHeader>
          
          <FileUpload 
            onUpload={handleUploadFiles} 
            accept=".pdf,.jpg,.jpeg,.png"
            multiple={true}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Invoices = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { hasPermission } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Invoices</h1>
            <p className="text-gray-600 mt-1">Manage your invoices and payments</p>
          </div>
          <div className="flex gap-2">
            {hasPermission(["manager", "admin"]) && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                <span>New Invoice</span>
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setUploadDialogOpen(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              <span>Upload</span>
            </Button>
          </div>
        </div>
        <InvoicesList />
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Invoice Files</DialogTitle>
            <DialogDescription>
              Upload receipts or supporting documents for your invoices
            </DialogDescription>
          </DialogHeader>
          
          <FileUpload 
            onUpload={(files) => {
              toast.success(`${files.length} file(s) uploaded successfully`);
              setUploadDialogOpen(false);
            }} 
            accept=".pdf,.jpg,.jpeg,.png"
            multiple={true}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Invoices;
