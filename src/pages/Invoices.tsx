
import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Invoice } from "@/types/invoice";
import InvoicesList from "@/components/invoices/InvoicesList";
import CreateInvoiceDialog from "@/components/invoices/CreateInvoiceDialog";
import FileUploadDialog from "@/components/invoices/FileUploadDialog";

const Invoices = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
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
            <Button onClick={() => setCreateInvoiceOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              <span>New Invoice</span>
            </Button>
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

      <FileUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        title="Upload Invoice Files"
        description="Upload receipts or supporting documents for your invoices"
      />

      <CreateInvoiceDialog
        open={createInvoiceOpen}
        onOpenChange={setCreateInvoiceOpen}
        onCreateInvoice={(newInvoice: Invoice) => {
          // This will be handled by the InvoicesList component
        }}
      />
    </AppLayout>
  );
};

export default Invoices;
