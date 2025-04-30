
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
  showSidebar?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showHero = false,
  showSidebar = false,
  fullWidth = false,
  className = ''
}) => {
  const { isSidebarOpen, setSidebarOpen } = useAppContext();
  const { user } = useAuth();

  // Hide sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSidebarOpen]);

  return (
    <div className="min-h-screen bg-fileforge-gray dark:bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex flex-grow">
        {showSidebar && user && (
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'w-64' : 'w-0'
            } overflow-hidden fixed md:relative h-[calc(100vh-64px)] top-16 z-40`}
          >
            <Sidebar />
          </div>
        )}
        
        <main 
          className={`
            flex-grow 
            ${showHero ? '' : 'pt-24 pb-12'} 
            px-4 sm:px-6 md:px-12 
            ${fullWidth ? 'max-w-none' : 'container mx-auto'} 
            ${showSidebar && isSidebarOpen ? 'md:ml-64' : ''}
            transition-all duration-300
            ${className}
          `}
        >
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
