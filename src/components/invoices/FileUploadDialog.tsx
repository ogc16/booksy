
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload/FileUpload";
import { toast } from "sonner";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

const FileUploadDialog = ({ open, onOpenChange, title, description }: FileUploadDialogProps) => {
  const handleUploadFiles = (files: File[]) => {
    toast.success(`${files.length} file(s) uploaded successfully`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <FileUpload 
          onUpload={handleUploadFiles} 
          accept=".pdf,.jpg,.jpeg,.png"
          multiple={true}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
