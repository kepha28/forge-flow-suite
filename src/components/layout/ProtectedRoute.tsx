
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from './AppLayout';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, showSidebar = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-fileforge-blue" />
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Render children inside the app layout with sidebar if authenticated
  return (
    <AppLayout showSidebar={showSidebar}>
      {children}
    </AppLayout>
  );
};

export default ProtectedRoute;
