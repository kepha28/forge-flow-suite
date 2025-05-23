
import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, FileVideo, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import ProcessingStatus from '@/components/ProcessingStatus';
import AppLayout from '@/components/layout/AppLayout';

const CompressPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState('document');
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [qualityMode, setQualityMode] = useState('balanced');
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      await processFile(files[0], 'compress');
    }
  };

  const getAcceptedFileTypes = () => {
    switch (fileType) {
      case 'document':
        return '.pdf,.doc,.docx,.ppt,.pptx';
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      default:
        return '*/*';
    }
  };

  const getTitle = () => {
    switch (fileType) {
      case 'document':
        return 'Compress Documents';
      case 'image':
        return 'Compress Images';
      case 'video':
        return 'Compress Videos';
      default:
        return 'Compress Files';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{getTitle()}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reduce file size while maintaining quality with our smart compression tools.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Tabs 
              defaultValue="document" 
              value={fileType}
              onValueChange={setFileType}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="document" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Document</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Image</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <FileVideo className="h-4 w-4" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="space-y-6">
                <FileUploader
                  accept={getAcceptedFileTypes()}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  title={`Upload your ${fileType} files`}
                  subtitle={`Drag and drop your ${fileType} files here, or click to browse`}
                />
                
                <div className="mt-8 space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Compression Level: {compressionLevel}%
                      </label>
                      <span className="text-sm text-gray-500">
                        {compressionLevel < 30 ? 'Light' : compressionLevel < 70 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                    <Slider 
                      value={[compressionLevel]} 
                      onValueChange={(value) => setCompressionLevel(value[0])} 
                      min={10} 
                      max={90} 
                      step={10}
                      className="mb-6"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Quality Mode</h3>
                    <RadioGroup 
                      value={qualityMode} 
                      onValueChange={setQualityMode}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="cursor-pointer">
                          High Quality (larger file size)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced" className="cursor-pointer">
                          Balanced (recommended)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small" className="cursor-pointer">
                          Small Size (lower quality)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    onClick={() => currentFile && processFile(currentFile, 'compress')}
                    className="w-full mt-4 bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
                    disabled={!currentFile}
                  >
                    Compress Files
                  </Button>
                </div>
                {isProcessing && currentFile && (
                  <ProcessingStatus
                    status="uploading"
                    progress={progress}
                    fileName={currentFile.name}
                  />
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <h2 className="font-semibold text-lg mb-4">About {getTitle()}</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              FileForge Suite uses advanced AI-powered algorithms to intelligently compress your {fileType}s, reducing file size while maintaining visual quality.
            </p>
            <p>
              Benefits of our compression technology:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reduce file size by up to 70% without visible quality loss</li>
              <li>Faster upload and download times</li>
              <li>Save storage space</li>
              <li>Optimized for web and mobile use</li>
              <li>Batch processing for multiple files</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CompressPage;
