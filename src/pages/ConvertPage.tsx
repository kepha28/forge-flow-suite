
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, FileVideo, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const ConvertPage = () => {
  const [conversionType, setConversionType] = useState('document');
  const [targetFormat, setTargetFormat] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload files to convert.",
        variant: "destructive",
      });
      return;
    }

    if (!targetFormat) {
      toast({
        title: "No target format selected",
        description: "Please select a format to convert to.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Conversion started",
      description: `Converting ${files.length} file(s) to ${targetFormat.toUpperCase()}. This would connect to a real conversion API in a production environment.`,
    });

    // In a real app, this would call an API to process the files
  };

  const getAcceptedFileTypes = () => {
    switch (conversionType) {
      case 'document':
        return '.pdf,.doc,.docx,.txt,.rtf,.odt,.ppt,.pptx,.xls,.xlsx';
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      default:
        return '*/*';
    }
  };

  const getFormatOptions = () => {
    switch (conversionType) {
      case 'document':
        return ['pdf', 'docx', 'txt', 'rtf', 'odt', 'epub'];
      case 'image':
        return ['jpg', 'png', 'webp', 'gif', 'svg', 'tiff'];
      case 'video':
        return ['mp4', 'avi', 'mov', 'mkv', 'webm'];
      case 'audio':
        return ['mp3', 'wav', 'aac', 'flac', 'ogg'];
      default:
        return [];
    }
  };

  const getIcon = () => {
    switch (conversionType) {
      case 'document':
        return <FileText className="h-6 w-6" />;
      case 'image':
        return <Image className="h-6 w-6" />;
      case 'video':
        return <FileVideo className="h-6 w-6" />;
      case 'audio':
        return <FileAudio className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getTitle = () => {
    switch (conversionType) {
      case 'document':
        return 'Convert Documents';
      case 'image':
        return 'Convert Images';
      case 'video':
        return 'Convert Videos';
      case 'audio':
        return 'Convert Audio Files';
      default:
        return 'Convert Files';
    }
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your files and convert them to different formats with high quality results.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <Tabs 
                defaultValue="document" 
                value={conversionType}
                onValueChange={setConversionType}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-6">
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
                  <TabsTrigger value="audio" className="flex items-center gap-2">
                    <FileAudio className="h-4 w-4" />
                    <span className="hidden sm:inline">Audio</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <FileUploader
                        accept={getAcceptedFileTypes()}
                        maxFiles={5}
                        onFilesSelected={handleFilesSelected}
                        title={`Upload your ${conversionType} files`}
                        subtitle={`Drag and drop your ${conversionType} files here, or click to browse`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
                    <div className="w-full sm:w-72">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Convert to:
                      </label>
                      <Select value={targetFormat} onValueChange={setTargetFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select target format`} />
                        </SelectTrigger>
                        <SelectContent>
                          {getFormatOptions().map((format) => (
                            <SelectItem key={format} value={format}>
                              {format.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleConvert}
                      className="w-full sm:w-auto mt-4 sm:mt-auto bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
                      disabled={files.length === 0 || !targetFormat}
                    >
                      Convert Now
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="font-semibold text-lg mb-4">About {getTitle()}</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                FileForge Suite offers powerful {conversionType} conversion tools that maintain the highest quality. Whether you're converting for compatibility, optimization, or specific requirements, our technology ensures the best results.
              </p>
              <p>
                Features of our {conversionType} conversion:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High-quality conversion algorithm</li>
                <li>Batch processing for multiple files</li>
                <li>Custom conversion settings</li>
                <li>Cloud storage for converted files</li>
                <li>Secure and private processing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConvertPage;
