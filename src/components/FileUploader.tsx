
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  title?: string;
  subtitle?: string;
  onFilesSelected?: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = "*/*",
  maxSize = 100, // Default 100MB
  maxFiles = 10,
  title = "Upload your files",
  subtitle = "Drag and drop your files here, or click to browse",
  onFilesSelected,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    // Check if adding these files would exceed the max file count
    if (files.length + newFiles.length > maxFiles) {
      toast({
        variant: "destructive",
        title: `Maximum ${maxFiles} files allowed`,
        description: `Please select fewer files.`,
      });
      return;
    }
    
    const validFiles = newFiles.filter(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `${file.name} exceeds the ${maxSize}MB limit.`,
        });
        return false;
      }
      
      // Check if file is already in the list
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        toast({
          variant: "destructive",
          title: "Duplicate file",
          description: `${file.name} has already been added.`,
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      
      if (onFilesSelected) {
        onFilesSelected(updatedFiles);
      }
      
      toast({
        title: "Files added successfully",
        description: `${validFiles.length} file(s) have been added.`,
      });
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    
    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {files.length === 0 ? (
        <Card
          className={`p-8 border-2 border-dashed ${
            isDragging ? 'border-fileforge-blue bg-fileforge-blue/5' : 'border-gray-200'
          } rounded-lg cursor-pointer transition-all`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload 
              className={`w-12 h-12 mb-4 ${isDragging ? 'text-fileforge-blue' : 'text-gray-400'}`} 
            />
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
            <Button variant="outline" type="button">
              Select Files
            </Button>
            <p className="mt-4 text-xs text-gray-400">
              Max. {maxFiles} files, up to {maxSize}MB each
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Uploaded Files ({files.length}/{maxFiles})</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-fileforge-blue"
              onClick={() => fileInputRef.current?.click()}
            >
              Add More
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center overflow-hidden">
                  <div className="min-w-[40px] h-10 bg-fileforge-blue/10 rounded flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-fileforge-blue uppercase">
                      {file.name.split('.').pop() || 'file'}
                    </span>
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white"
          >
            Process {files.length} {files.length === 1 ? 'File' : 'Files'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
