
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";

interface InvoiceViewerProps {
  invoiceId: string;
  fileUrl?: string;
  fileType: 'pdf' | 'docx';
}

export const InvoiceViewer = ({ invoiceId, fileUrl, fileType }: InvoiceViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    // In a real app, this would download the actual file
    const dummyContent = `This is a sample ${fileType.toUpperCase()} file for invoice ${invoiceId}`;
    const blob = new Blob([dummyContent], { type: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceId}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Eye className="h-4 w-4 mr-2" />
        View
      </Button>
      <Button variant="outline" size="sm" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Invoice {invoiceId}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-muted rounded-lg p-4 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  {fileType === 'pdf' ? 'PDF Viewer' : 'DOCX Viewer'} would be integrated here
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
