
import React from 'react';
import Pricing from '@/components/Pricing';
import AppLayout from '@/components/layout/AppLayout';

const PricingPage = () => {
  return (
    <AppLayout showSidebar={false}>
      <div className="container mx-auto py-8">
        <Pricing />
      </div>
    </AppLayout>
  );
};

export default PricingPage;
