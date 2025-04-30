
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, FileImage, FileAudio, FileVideo, 
  Folder, Settings, HelpCircle, BarChart, 
  History, Zap, Lock, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppContext } from '@/context/AppContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active, onClick }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
        active 
          ? "bg-fileforge-blue/10 text-fileforge-blue dark:bg-fileforge-blue/20" 
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { setSidebarOpen } = useAppContext();
  
  // Close sidebar on navigation on mobile devices
  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800">
      <ScrollArea className="h-full">
        <div className="py-2 px-1">
          <SidebarSection title="File Conversions">
            <SidebarItem 
              icon={<FileText className="h-5 w-5" />} 
              label="Documents" 
              to="/convert/document" 
              active={location.pathname === '/convert/document'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<FileImage className="h-5 w-5" />} 
              label="Images" 
              to="/convert/image" 
              active={location.pathname === '/convert/image'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<FileVideo className="h-5 w-5" />} 
              label="Videos" 
              to="/convert/video" 
              active={location.pathname === '/convert/video'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<FileAudio className="h-5 w-5" />} 
              label="Audio" 
              to="/convert/audio" 
              active={location.pathname === '/convert/audio'}
              onClick={handleItemClick}
            />
          </SidebarSection>
          
          <SidebarSection title="Tools">
            <SidebarItem 
              icon={<Zap className="h-5 w-5" />} 
              label="Compress" 
              to="/compress" 
              active={location.pathname === '/compress'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<Lock className="h-5 w-5" />} 
              label="Secure" 
              to="/secure" 
              active={location.pathname === '/secure'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<History className="h-5 w-5" />} 
              label="Conversion History" 
              to="/history" 
              active={location.pathname === '/history'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<Folder className="h-5 w-5" />} 
              label="My Files" 
              to="/files" 
              active={location.pathname === '/files'}
              onClick={handleItemClick}
            />
          </SidebarSection>
          
          <SidebarSection title="Account">
            <SidebarItem 
              icon={<BarChart className="h-5 w-5" />} 
              label="Usage & Stats" 
              to="/stats" 
              active={location.pathname === '/stats'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label="Settings" 
              to="/settings" 
              active={location.pathname === '/settings'}
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={<HelpCircle className="h-5 w-5" />} 
              label="Help & Support" 
              to="/help" 
              active={location.pathname === '/help'}
              onClick={handleItemClick}
            />
          </SidebarSection>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
