
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import AppLayout from '@/components/layout/AppLayout';
import FormatSelector from '@/components/FormatSelector';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const documentFormats = [
  { value: 'pdf', label: 'PDF (.pdf)' },
  { value: 'docx', label: 'Word Document (.docx)' },
  { value: 'doc', label: 'Word 97-2003 (.doc)' },
  { value: 'rtf', label: 'Rich Text Format (.rtf)' },
  { value: 'txt', label: 'Plain Text (.txt)' },
];

const DocumentConvertPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isConverted, setIsConverted] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      setIsConverted(false);
    }
  };

  const handleConvert = async () => {
    if (!currentFile) return;
    
    try {
      await processFile(currentFile, 'convert');
      setIsConverted(true);
      toast({
        title: "Conversion complete",
        description: `Your file has been converted to ${outputFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "There was an error converting your file.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your converted file is being downloaded.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Convert Documents</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert between document formats while preserving formatting and layout.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileUploader
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
            maxFiles={1}
            onFilesSelected={handleFilesSelected}
            maxSize={100}
          />
          
          {currentFile && !isProcessing && !isConverted && (
            <div className="mt-6 space-y-6">
              <FormatSelector 
                label="Output Format"
                value={outputFormat}
                options={documentFormats}
                onChange={setOutputFormat}
              />
              
              <Button 
                onClick={handleConvert} 
                className="w-full bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
              >
                <FileText className="mr-2 h-4 w-4" /> Convert to {outputFormat.toUpperCase()}
              </Button>
            </div>
          )}
          
          {isProcessing && currentFile && (
            <div className="mt-6">
              <ProcessingStatus
                status="uploading"
                progress={progress}
                fileName={currentFile.name}
              />
            </div>
          )}
          
          {isConverted && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">Conversion completed successfully</p>
                <p className="text-sm text-green-600">
                  Your file {currentFile?.name} has been converted to {outputFormat.toUpperCase()}
                </p>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Converted File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 mt-8">
        <h2 className="font-semibold text-lg mb-4">Supported Document Formats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <p className="font-medium">.pdf</p>
            <p className="text-sm text-gray-500">Adobe PDF Document</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.docx</p>
            <p className="text-sm text-gray-500">Microsoft Word</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.doc</p>
            <p className="text-sm text-gray-500">Word 97-2003</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.rtf</p>
            <p className="text-sm text-gray-500">Rich Text Format</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.txt</p>
            <p className="text-sm text-gray-500">Plain Text</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.odt</p>
            <p className="text-sm text-gray-500">OpenDocument Text</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProtectedDocumentConvertPage() {
  return (
    <AppLayout showSidebar={true}>
      <DocumentConvertPage />
    </AppLayout>
  );
}
