
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileUp, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-fileforge-blue to-fileforge-teal py-20 text-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Transform your files with power and precision
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              FileForge Suite is your all-in-one solution for converting, compressing, and securing files. Fast, reliable, and built for professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-fileforge-blue hover:bg-gray-100"
              >
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/files">Browse Files</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <FileUp className="h-10 w-10 mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">Convert</h3>
              <p className="text-gray-100">Transform files between formats with precision</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <Zap className="h-10 w-10 mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">Compress</h3>
              <p className="text-gray-100">Reduce file size while preserving quality</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 col-span-2">
              <Shield className="h-10 w-10 mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-100">Protect your files with enterprise-grade encryption</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden z-0">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[140%] rounded-full bg-gradient-to-b from-fileforge-blue/30 to-fileforge-teal/30 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -right-[10%] w-[70%] h-[140%] rounded-full bg-gradient-to-b from-fileforge-blue/30 to-fileforge-teal/30 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
