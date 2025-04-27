
import React from 'react';
import { useFileConversions } from '@/hooks/useFileConversions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Check, X, Clock } from "lucide-react";

const ConversionHistory = () => {
  const { conversions, loading } = useFileConversions();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversions.map((conversion) => (
            <div 
              key={conversion.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{conversion.input_file_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(conversion.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {conversion.status === 'completed' && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {conversion.status === 'error' && (
                  <X className="h-5 w-5 text-red-500" />
                )}
                {conversion.status === 'processing' && (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                <span className="text-sm capitalize">{conversion.status}</span>
              </div>
            </div>
          ))}
          {conversions.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No conversions yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionHistory;
