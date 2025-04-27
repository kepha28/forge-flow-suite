
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  fileName: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status, progress, fileName }) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed!';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm truncate max-w-[200px]">{fileName}</span>
        <span className="text-sm text-gray-500">{getStatusMessage()}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProcessingStatus;
