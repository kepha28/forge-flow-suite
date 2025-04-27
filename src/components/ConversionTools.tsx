
import React from 'react';
import ConversionToolCard from './ConversionToolCard';
import { FileText, Image, FileVideo, FileAudio } from 'lucide-react';

const conversionTools = [
  {
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    title: 'Document Conversion',
    description: 'Convert between document formats while preserving formatting and layout',
    formats: ['PDF', 'DOCX', 'PPT', 'XLS', 'TXT'],
    to: '/convert/document',
    color: 'bg-blue-600'
  },
  {
    icon: <Image className="h-10 w-10 text-green-600" />,
    title: 'Image Conversion',
    description: 'Convert images between formats with options to resize and optimize',
    formats: ['JPG', 'PNG', 'WEBP', 'SVG', 'GIF'],
    to: '/convert/image',
    color: 'bg-green-600'
  },
  {
    icon: <FileVideo className="h-10 w-10 text-purple-600" />,
    title: 'Video Conversion',
    description: 'Convert videos to different formats, resize and compress',
    formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WEBM'],
    to: '/convert/video',
    color: 'bg-purple-600'
  },
  {
    icon: <FileAudio className="h-10 w-10 text-orange-600" />,
    title: 'Audio Conversion',
    description: 'Convert audio files between formats, extract from video',
    formats: ['MP3', 'WAV', 'AAC', 'FLAC', 'M4A'],
    to: '/convert/audio',
    color: 'bg-orange-600'
  }
];

const ConversionTools = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Conversion Tools</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert between multiple formats with ease using our specialized tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conversionTools.map((tool, index) => (
            <ConversionToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversionTools;
