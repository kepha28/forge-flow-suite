
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Careers at FileForge</h1>
            <p className="text-gray-600">
              Join our team and help build the future of file processing.
            </p>
          </div>
          <div className="text-center text-gray-600">
            No open positions at the moment. Check back soon for opportunities!
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
