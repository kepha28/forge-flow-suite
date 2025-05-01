
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-4 border rounded-md hover:border-fileforge-blue/50 hover:shadow-sm transition-all">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-medium ml-2">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
