
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SecurePage = () => {
  const { user } = useAuth();
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [enableEncryption, setEnableEncryption] = useState(true);
  const [addWatermark, setAddWatermark] = useState(false);

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      // Changed from "secure" to "convert" as the type is limited to 'convert' | 'compress'
      await processFile(files[0], 'convert');
    }
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
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
      </main>
      <Footer />
    </div>
  );
};

export default SecurePage;
