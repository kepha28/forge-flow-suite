
import React, { useState } from 'react';
import { FileText, FileImage, FileVideo, FileAudio } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import ConversionHistory from '@/components/ConversionHistory';
import { Card, CardContent } from '@/components/ui/card';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import AppLayout from '@/components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';

const ConversionOption = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <Card 
      className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-center p-4 md:p-6 border-b">
        <div className="bg-fileforge-blue/10 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-fileforge-blue" />
        </div>
        <div>
          <h3 className="font-medium text-sm md:text-base">{title}</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <CardContent className="flex justify-end pt-2 md:pt-4 p-3 md:p-6">
        <Button variant="outline" size="sm">Select</Button>
      </CardContent>
    </Card>
  );
};

const ConvertPage = () => {
  const navigate = useNavigate();
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      await processFile(files[0], 'convert');
    }
  };

  const conversionOptions = [
    {
      icon: FileText,
      title: 'Document Conversion',
      description: 'PDF, DOC, DOCX, TXT, RTF and more',
      path: '/convert/document'
    },
    {
      icon: FileImage,
      title: 'Image Conversion',
      description: 'PNG, JPG, WEBP, SVG and more',
      path: '/convert/image'
    },
    {
      icon: FileVideo,
      title: 'Video Conversion',
      description: 'MP4, AVI, MOV, MKV and more',
      path: '/convert/video'
    },
    {
      icon: FileAudio,
      title: 'Audio Conversion',
      description: 'MP3, WAV, OGG, FLAC and more',
      path: '/convert/audio'
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <PageHeader 
        title="Convert Files" 
        description="Convert your files to any format with our powerful conversion tools."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
        {conversionOptions.map((option) => (
          <ConversionOption 
            key={option.title}
            icon={option.icon}
            title={option.title}
            description={option.description}
            onClick={() => navigate(option.path)}
          />
        ))}
      </div>

      <Card className="mb-8">
        <CardContent className="p-4 md:p-6">
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
  );
};

export default function ProtectedConvertPage() {
  return (
    <AppLayout showSidebar={true}>
      <ConvertPage />
    </AppLayout>
  );
}
