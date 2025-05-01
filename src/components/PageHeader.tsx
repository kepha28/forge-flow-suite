
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
