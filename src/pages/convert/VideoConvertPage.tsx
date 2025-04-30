
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

const VideoConvertPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      await processFile(files[0], 'convert');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Convert Videos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert videos to different formats, resize and compress.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileUploader
            accept="video/*"
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
    </div>
  );
};

export default function ProtectedVideoConvertPage() {
  return (
    <ProtectedRoute>
      <VideoConvertPage />
    </ProtectedRoute>
  );
}
