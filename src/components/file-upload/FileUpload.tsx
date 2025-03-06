
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  buttonText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = "image/*,application/pdf",
  multiple = false,
  maxSize = 5, // 5MB default
  buttonText = "Upload Files",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const validFiles: File[] = [];
    const maxSizeBytes = maxSize * 1024 * 1024;

    newFiles.forEach(file => {
      if (file.size > maxSizeBytes) {
        toast.error(`File "${file.name}" exceeds the maximum size of ${maxSize}MB`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onUpload(updatedFiles);
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    // Update parent component with new files
    onUpload(files.filter((_, index) => index !== indexToRemove));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <img 
        src={URL.createObjectURL(files.find(f => f.name === fileName) as File)} 
        className="w-10 h-10 object-cover rounded" 
        alt="Preview" 
      />;
    }
    
    return <File className="w-10 h-10 text-primary" />;
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
          multiple={multiple}
        />
        
        <Upload className="w-10 h-10 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {multiple ? "Upload multiple files" : "Upload a single file"} (Max size: {maxSize}MB)
        </p>
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>

      {files.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 font-medium text-sm">Uploaded Files</div>
          <div className="divide-y">
            {files.map((file, index) => (
              <div key={index} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="font-medium text-sm truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
