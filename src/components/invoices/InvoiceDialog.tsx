
import { useState, useEffect } from "react";
import { Download, X, Pencil, FilePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileUpload } from "@/components/file-upload/FileUpload";
import { useAuth } from "@/contexts/AuthContext";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: string;
  client: string;
  items: InvoiceItem[];
  attachments?: File[];
}

interface InvoiceDialogProps {
  invoice: Invoice | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}

const InvoiceDialog = ({ invoice, open, onOpenChange }: InvoiceDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const { hasPermission } = useAuth();

  // Initialize edited invoice when dialog opens
  useEffect(() => {
    if (invoice) {
      setEditedInvoice(invoice);
    }
  }, [invoice]);

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

export default InvoiceDialog;
