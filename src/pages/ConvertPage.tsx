
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import ConversionHistory from '@/components/ConversionHistory';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ConvertPage = () => {
  const { user } = useAuth();
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      await processFile(files[0], 'convert');
    }
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Convert Files</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Convert your files to any format with our powerful conversion tools.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <FileUploader
                accept="*/*"
                maxFiles={1}
                onFilesSelected={handleFilesSelected}
                maxSize={100}
              />
              {isProcessing && currentFile && (
                <div className="mt-6">
                  <ProcessingStatus
                    status="uploading"
                    progress={progress}
                    fileName={currentFile.name}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <ConversionHistory />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConvertPage;
