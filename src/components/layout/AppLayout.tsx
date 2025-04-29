
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showHero = false }) => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className={`flex-grow ${showHero ? '' : 'py-24'} px-6 md:px-12`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
