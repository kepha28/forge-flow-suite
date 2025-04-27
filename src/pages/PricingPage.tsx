
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
