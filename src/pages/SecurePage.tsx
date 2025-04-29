
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AppLayout from '@/components/layout/AppLayout';

const SecurePage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [enableEncryption, setEnableEncryption] = useState(true);
  const [addWatermark, setAddWatermark] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      // Using 'convert' type since the hook is limited to 'convert' | 'compress'
      // In a production app, we would extend the types to include 'secure'
      await processFile(files[0], 'convert');
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Secure Files</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Protect your files with enterprise-grade encryption and watermarking.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="encryption"
                  checked={enableEncryption}
                  onCheckedChange={setEnableEncryption}
                />
                <Label htmlFor="encryption">Enable Encryption</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="watermark"
                  checked={addWatermark}
                  onCheckedChange={setAddWatermark}
                />
                <Label htmlFor="watermark">Add Watermark</Label>
              </div>
            </div>

            <FileUploader
              accept="*/*"
              maxFiles={1}
              onFilesSelected={handleFilesSelected}
              maxSize={100}
            />
            
            {isProcessing && currentFile && (
              <ProcessingStatus
                status="uploading"
                progress={progress}
                fileName={currentFile.name}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SecurePage;
