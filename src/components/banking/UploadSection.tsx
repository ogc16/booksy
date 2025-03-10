
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      toast.success("Bank statement uploaded successfully!");
    }
  };

  const handleDownloadSample = () => {
    // Create sample CSV content
    const csvContent = `Date,Description,Amount,Type
2024-03-15,Direct Deposit - Salary,5000.00,credit
2024-03-18,Office Rent Payment,-2500.00,debit
2024-03-20,Client Payment,1500.00,credit
2024-03-22,Utilities Bill,-350.00,debit
2024-03-25,Software Subscription,-99.99,debit`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_bank_statement.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Upload Bank Statement</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="flex-1"
          />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        {selectedFile && (
          <p className="text-sm text-gray-500">
            Selected file: {selectedFile.name}
          </p>
        )}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">
            Download our sample CSV template to ensure your bank statement is in the correct format.
          </p>
          <Button variant="outline" onClick={handleDownloadSample}>
            Download Sample CSV
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UploadSection;
