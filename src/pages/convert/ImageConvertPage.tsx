
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import AppLayout from '@/components/layout/AppLayout';
import FormatSelector from '@/components/FormatSelector';
import { Button } from '@/components/ui/button';
import { Download, Image, Sliders } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const imageFormats = [
  { value: 'png', label: 'PNG (.png)' },
  { value: 'jpg', label: 'JPEG (.jpg)' },
  { value: 'webp', label: 'WebP (.webp)' },
  { value: 'svg', label: 'SVG (.svg)' },
  { value: 'gif', label: 'GIF (.gif)' },
];

const ImageConvertPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [isConverted, setIsConverted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [maintainSize, setMaintainSize] = useState(true);
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      setIsConverted(false);
      
      // Create preview URL
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      
      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleConvert = async () => {
    if (!currentFile) return;
    
    try {
      await processFile(currentFile, 'convert');
      setIsConverted(true);
      toast({
        title: "Conversion complete",
        description: `Your image has been converted to ${outputFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "There was an error converting your image.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your converted image is being downloaded.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Convert Images</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert images between formats with options to resize and optimize.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileUploader
            accept="image/*"
            maxFiles={1}
            onFilesSelected={handleFilesSelected}
            maxSize={100}
          />
          
          {currentFile && previewUrl && !isProcessing && !isConverted && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-auto max-h-64 mx-auto" 
                    />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <FormatSelector 
                    label="Output Format"
                    value={outputFormat}
                    options={imageFormats}
                    onChange={setOutputFormat}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Quality: {quality}%</Label>
                      <span className="text-xs text-gray-500">
                        {quality < 50 ? 'Lower quality, smaller file' : 'Higher quality, larger file'}
                      </span>
                    </div>
                    <Slider 
                      value={[quality]} 
                      onValueChange={(vals) => setQuality(vals[0])} 
                      min={10} 
                      max={100} 
                      step={5} 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="maintain-size" 
                      checked={maintainSize} 
                      onCheckedChange={setMaintainSize} 
                    />
                    <Label htmlFor="maintain-size">Maintain original dimensions</Label>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleConvert} 
                className="w-full bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
              >
                <Image className="mr-2 h-4 w-4" /> Convert to {outputFormat.toUpperCase()}
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
                  Your image {currentFile?.name} has been converted to {outputFormat.toUpperCase()}
                </p>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Converted Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 mt-8">
        <h2 className="font-semibold text-lg mb-4">Supported Image Formats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <p className="font-medium">.png</p>
            <p className="text-sm text-gray-500">Lossless compression with transparency</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.jpg</p>
            <p className="text-sm text-gray-500">Smaller size, good for photos</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.webp</p>
            <p className="text-sm text-gray-500">Modern format with better compression</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.svg</p>
            <p className="text-sm text-gray-500">Vector graphics format</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.gif</p>
            <p className="text-sm text-gray-500">Supports animation</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="font-medium">.bmp</p>
            <p className="text-sm text-gray-500">Uncompressed bitmap format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProtectedImageConvertPage() {
  return (
    <AppLayout showSidebar={true}>
      <ImageConvertPage />
    </AppLayout>
  );
}
