
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ConversionTools from '@/components/ConversionTools';
import FileUploader from '@/components/FileUploader';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray">
      <Header />
      <main>
        <Hero />
        <Features />
        
        {/* Quick Start Section */}
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Try FileForge Now</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload your files and see the FileForge Suite in action. No account required for basic conversions.
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <FileUploader
                  accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  maxSize={50}
                  maxFiles={5}
                />
              </CardContent>
            </Card>
          </div>
        </section>
        
        <ConversionTools />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
