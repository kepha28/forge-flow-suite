
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, FileVideo, FileAudio, Trash2, Download, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FilesPage = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const { toast } = useToast();

  // Placeholder for file management functionality
  const handleDeleteFile = () => {
    toast({
      title: "File deleted",
      description: "The file has been removed from your account."
    });
  };

  const handleDownloadFile = () => {
    toast({
      title: "Download started",
      description: "Your file is being prepared for download."
    });
  };

  // Mock file list for UI display
  const mockFiles = [
    { id: 1, name: "Project Proposal.pdf", type: "document", size: "2.4 MB", date: "Apr 28, 2025" },
    { id: 2, name: "Presentation.pptx", type: "document", size: "5.8 MB", date: "Apr 27, 2025" },
    { id: 3, name: "Marketing Image.jpg", type: "image", size: "1.2 MB", date: "Apr 26, 2025" },
    { id: 4, name: "Product Demo.mp4", type: "video", size: "18.5 MB", date: "Apr 25, 2025" },
    { id: 5, name: "Interview Recording.mp3", type: "audio", size: "3.7 MB", date: "Apr 24, 2025" }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="text-blue-500" />;
      case 'image':
        return <Image className="text-green-500" />;
      case 'video':
        return <FileVideo className="text-purple-500" />;
      case 'audio':
        return <FileAudio className="text-orange-500" />;
      default:
        return <FileText />;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Files</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Files</CardTitle>
              <Button className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal">Upload New File</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-6">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="all">All Files</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
              
              <TabsContent value={currentTab} className="border rounded-md">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockFiles
                      .filter(file => currentTab === 'all' || file.type === currentTab.slice(0, -1))
                      .map((file) => (
                        <tr key={file.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                                {getFileIcon(file.type)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                <div className="text-sm text-gray-500 capitalize">{file.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{file.size}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <div className="text-sm text-gray-900">{file.date}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center"
                                onClick={handleDownloadFile}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Download</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center text-red-500 hover:text-red-600"
                                onClick={handleDeleteFile}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FilesPage;
