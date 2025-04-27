
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Lock, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-hero-pattern text-white pt-28 pb-16 px-6 md:px-12">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Files with <span className="text-fileforge-teal">FileForge Suite</span>
          </h1>
          <p className="text-lg mb-8 text-gray-100">
            Convert, compress, secure, and optimize your documents, images, videos, and audio files with our all-in-one file management solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-fileforge-blue hover:bg-gray-100">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              View Pricing
            </Button>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gray-300 border-2 border-fileforge-blue`}></div>
              ))}
            </div>
            <p className="ml-4 text-sm">Trusted by 10,000+ users worldwide</p>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/20 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm">FileForge.app</div>
            </div>
            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
              <FileText className="h-12 w-12 mb-4 text-fileforge-teal" />
              <p className="text-center">Drag & drop your files here</p>
              <p className="text-sm text-gray-300 mt-1">or</p>
              <Button variant="secondary" className="mt-4 bg-white text-fileforge-blue hover:bg-gray-100">
                Browse Files
              </Button>
            </div>
            <div className="mt-6 bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">file.pdf</span>
                <span className="text-xs bg-fileforge-teal/20 text-fileforge-teal py-1 px-2 rounded">Converting...</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-fileforge-teal animate-pulse-slow h-2 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
