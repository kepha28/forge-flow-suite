
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ConversionToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  formats: string[];
  to: string;
  color: string;
}

const ConversionToolCard: React.FC<ConversionToolCardProps> = ({
  icon,
  title,
  description,
  formats,
  to,
  color
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className={`h-2 ${color}`} />
      <CardContent className="p-6">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Supported formats</div>
          <div className="flex flex-wrap gap-1">
            {formats.map((format, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          variant="ghost"
          className="w-full justify-between text-fileforge-blue hover:text-fileforge-blue hover:bg-fileforge-blue/10"
          asChild
        >
          <a href={to}>
            Try now <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConversionToolCard;
