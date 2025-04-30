
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ConversionHistory from '@/components/ConversionHistory';

const HistoryPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Conversion History</h1>
        <ConversionHistory />
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
