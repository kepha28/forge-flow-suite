
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
import PageHeader from '@/components/PageHeader';
import FeatureCard from '@/components/FeatureCard';

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
    <div className="container mx-auto px-4 max-w-4xl">
      <PageHeader 
        title="Convert Images" 
        description="Convert images between formats with options to resize and optimize."
      />

      <Card className="mb-8">
        <CardContent className="p-4 md:p-6">
          <FileUploader
            accept="image/*"
            maxFiles={1}
            onFilesSelected={handleFilesSelected}
            maxSize={100}
          />
          
          {currentFile && previewUrl && !isProcessing && !isConverted && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <h3 className="text-base md:text-lg font-medium mb-2">Preview</h3>
                  <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[150px]">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-auto max-h-64 object-contain" 
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <FormatSelector 
                    label="Output Format"
                    value={outputFormat}
                    options={imageFormats}
                    onChange={setOutputFormat}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">Quality: {quality}%</Label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
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
                    <Label htmlFor="maintain-size" className="text-sm">Maintain original dimensions</Label>
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
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-900">
                <p className="text-green-700 dark:text-green-400 font-medium">Conversion completed successfully</p>
                <p className="text-sm text-green-600 dark:text-green-500">
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
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-100 dark:border-gray-700 mt-6 md:mt-8">
        <h2 className="font-semibold text-base md:text-lg mb-4">Supported Image Formats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {[
            { format: '.png', desc: 'Lossless compression with transparency' },
            { format: '.jpg', desc: 'Smaller size, good for photos' },
            { format: '.webp', desc: 'Modern format with better compression' },
            { format: '.svg', desc: 'Vector graphics format' },
            { format: '.gif', desc: 'Supports animation' },
            { format: '.bmp', desc: 'Uncompressed bitmap format' }
          ].map((item, index) => (
            <div key={index} className="p-3 md:p-4 border rounded-md hover:border-fileforge-blue/50 hover:shadow-sm transition-all">
              <p className="font-medium text-sm md:text-base">{item.format}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
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
