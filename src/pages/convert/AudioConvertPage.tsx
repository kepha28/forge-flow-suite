
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';
import ProcessingStatus from '@/components/ProcessingStatus';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import AppLayout from '@/components/layout/AppLayout';
import FormatSelector from '@/components/FormatSelector';
import { Button } from '@/components/ui/button';
import { Download, Music, Volume2, AudioWaveform } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/PageHeader';
import FeatureCard from '@/components/FeatureCard';

const audioFormats = [
  { value: 'mp3', label: 'MP3 (.mp3)' },
  { value: 'wav', label: 'WAV (.wav)' },
  { value: 'ogg', label: 'OGG (.ogg)' },
  { value: 'flac', label: 'FLAC (.flac)' },
  { value: 'aac', label: 'AAC (.aac)' },
];

const bitrateOptions = [
  { value: '64', label: '64 kbps - Lower quality' },
  { value: '128', label: '128 kbps - Standard quality' },
  { value: '192', label: '192 kbps - High quality' },
  { value: '256', label: '256 kbps - Very high quality' },
  { value: '320', label: '320 kbps - Maximum quality' },
];

const AudioConvertPage = () => {
  const { isProcessing, progress, processFile } = useFileProcessing();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [isConverted, setIsConverted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [bitrate, setBitrate] = useState('128');
  const [volume, setVolume] = useState(100);
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setCurrentFile(files[0]);
      setIsConverted(false);
      
      // Create audio URL for preview
      const url = URL.createObjectURL(files[0]);
      setAudioUrl(url);
      
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
        description: `Your audio has been converted to ${outputFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "There was an error converting your audio.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your converted audio file is being downloaded.",
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <PageHeader 
        title="Convert Audio" 
        description="Convert audio files between formats, extract from video."
      />

      <Card className="mb-8">
        <CardContent className="p-4 md:p-6">
          <FileUploader
            accept="audio/*"
            maxFiles={1}
            onFilesSelected={handleFilesSelected}
            maxSize={100}
          />
          
          {currentFile && audioUrl && !isProcessing && !isConverted && (
            <div className="mt-6 space-y-4 md:space-y-6">
              <div className="p-3 md:p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                <h3 className="text-base md:text-lg font-medium mb-2">Audio Preview</h3>
                <audio controls className="w-full" src={audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormatSelector 
                    label="Output Format"
                    value={outputFormat}
                    options={audioFormats}
                    onChange={setOutputFormat}
                  />
                  
                  <FormatSelector 
                    label="Bitrate"
                    value={bitrate}
                    options={bitrateOptions}
                    onChange={setBitrate}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume" className="flex items-center text-sm">
                      <Volume2 className="h-4 w-4 mr-1" /> Volume: {volume}%
                    </Label>
                  </div>
                  <Slider 
                    id="volume"
                    value={[volume]} 
                    onValueChange={(vals) => setVolume(vals[0])} 
                    min={0} 
                    max={200} 
                    step={5} 
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleConvert} 
                className="w-full bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
              >
                <Music className="mr-2 h-4 w-4" /> Convert to {outputFormat.toUpperCase()}
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
                  Your audio file {currentFile?.name} has been converted to {outputFormat.toUpperCase()}
                </p>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Converted Audio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-100 dark:border-gray-700 mt-6 md:mt-8">
        <h2 className="font-semibold text-base md:text-lg mb-4">Audio Conversion Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FeatureCard
            icon={<AudioWaveform className="h-5 w-5 text-fileforge-blue" />}
            title="Format Conversion"
            description="Convert between popular audio formats like MP3, WAV, OGG, FLAC, and AAC while maintaining audio quality."
          />
          <FeatureCard
            icon={<Volume2 className="h-5 w-5 text-fileforge-blue" />}
            title="Audio Adjustments"
            description="Adjust bitrate, volume, and other audio properties to get the perfect output for your needs."
          />
        </div>
      </div>
    </div>
  );
};

export default function ProtectedAudioConvertPage() {
  return (
    <AppLayout showSidebar={true}>
      <AudioConvertPage />
    </AppLayout>
  );
}
