
import React from 'react';
import { FileConvert, FileDown, Lock, Wand2, Repeat, Cloud } from "lucide-react";

const features = [
  {
    icon: <FileConvert className="w-6 h-6 text-fileforge-blue" />,
    title: 'Multi-Format Conversion',
    description: 'Convert between DOC, PDF, PNG, JPG, WebP, MP4, AVI, MOV, MP3, WAV and more with ease.'
  },
  {
    icon: <FileDown className="w-6 h-6 text-fileforge-blue" />,
    title: 'Smart Compression',
    description: 'Reduce file size by up to 70% without visible quality loss using our AI-powered algorithms.'
  },
  {
    icon: <Lock className="w-6 h-6 text-fileforge-blue" />,
    title: 'Security Tools',
    description: 'Password protect your files with AES-256 encryption and add custom watermarks to protect your content.'
  },
  {
    icon: <Wand2 className="w-6 h-6 text-fileforge-blue" />,
    title: 'AI Tools',
    description: 'Upscale low-resolution images, auto-caption videos, and extract text from scanned PDFs.'
  },
  {
    icon: <Repeat className="w-6 h-6 text-fileforge-blue" />,
    title: 'Batch Processing',
    description: 'Convert and process multiple files simultaneously with preset configurations.'
  },
  {
    icon: <Cloud className="w-6 h-6 text-fileforge-blue" />,
    title: 'Cloud Sync',
    description: 'Access your files from any device with integrations for Google Drive, Dropbox, and OneDrive.'
  }
];

const Features = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for All Your File Needs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            FileForge Suite offers a comprehensive set of tools to handle any file transformation requirement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-fileforge-blue/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
