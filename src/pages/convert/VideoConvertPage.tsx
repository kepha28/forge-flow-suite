
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import AppLayout from '@/components/layout/AppLayout';
import FormatSelector from '@/components/FormatSelector';
import { Button } from '@/components/ui/button';
import { Download, Film, Scissors, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const videoFormats = [
  { value: 'mp4', label: 'MP4 (.mp4)' },
  { value: 'avi', label: 'AVI (.avi)' },
  { value: 'mov', label: 'MOV (.mov)' },
  { value: 'mkv', label: 'MKV (.mkv)' },
  { value: 'webm', label: 'WebM (.webm)' },
];

const resolutionOptions = [
  { value: 'original', label: 'Original Resolution' },
  { value: '720p', label: '720p (HD)' },
  { value: '1080p', label: '1080p (Full HD)' },
  { value: '480p', label: '480p (SD)' },
  { value: '360p', label: '360p (Low)' },
];

const VideoConvertPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [isConverted, setIsConverted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [resolution, setResolution] = useState('original');
  const [quality, setQuality] = useState(80);
  const [enableTrim, setEnableTrim] = useState(false);
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:01:00');
  const [activeTab, setActiveTab] = useState('convert');
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      setIsConverted(false);
      
      // Create video URL for preview
      const url = URL.createObjectURL(files[0]);
      setVideoUrl(url);
      
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
        description: `Your video has been converted to ${outputFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "There was an error converting your video.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your converted video is being downloaded.",
    });
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
          
          {currentFile && videoUrl && !isProcessing && !isConverted && (
            <div className="mt-6 space-y-6">
              <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
                <video 
                  controls 
                  className="w-full max-h-[300px]" 
                  src={videoUrl}
                >
                  Your browser does not support the video element.
                </video>
              </div>
              
              <Tabs defaultValue="convert" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="convert">Convert</TabsTrigger>
                  <TabsTrigger value="trim">Trim & Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="convert" className="space-y-4 mt-4">
                  <FormatSelector 
                    label="Output Format"
                    value={outputFormat}
                    options={videoFormats}
                    onChange={setOutputFormat}
                  />
                  
                  <FormatSelector 
                    label="Resolution"
                    value={resolution}
                    options={resolutionOptions}
                    onChange={setResolution}
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
                </TabsContent>
                <TabsContent value="trim" className="space-y-4 mt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch 
                      id="trim-video" 
                      checked={enableTrim} 
                      onCheckedChange={setEnableTrim} 
                    />
                    <Label htmlFor="trim-video">Trim video</Label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time (hh:mm:ss)</Label>
                      <Input
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={!enableTrim}
                        placeholder="00:00:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time (hh:mm:ss)</Label>
                      <Input
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={!enableTrim}
                        placeholder="00:01:00"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button 
                onClick={handleConvert} 
                className="w-full bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
              >
                <Film className="mr-2 h-4 w-4" /> Convert to {outputFormat.toUpperCase()}
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
                  Your video {currentFile?.name} has been converted to {outputFormat.toUpperCase()}
                </p>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Converted Video
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 mt-8">
        <h2 className="font-semibold text-lg mb-4">Video Conversion Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <Video className="h-5 w-5 mr-2 text-fileforge-blue" />
              <h3 className="font-medium">Format Conversion</h3>
            </div>
            <p className="text-sm text-gray-500">
              Convert videos between popular formats like MP4, AVI, MOV, MKV, and WebM with customizable settings.
            </p>
          </div>
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <Scissors className="h-5 w-5 mr-2 text-fileforge-blue" />
              <h3 className="font-medium">Trim & Edit</h3>
            </div>
            <p className="text-sm text-gray-500">
              Trim videos to specific sections, adjust resolution, and control quality settings for the perfect output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProtectedVideoConvertPage() {
  return (
    <AppLayout showSidebar={true}>
      <VideoConvertPage />
    </AppLayout>
  );
}
