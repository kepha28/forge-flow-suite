
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Stamp, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SecurePage = () => {
  const [securityFeature, setSecurityFeature] = useState('password');
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [addMetadata, setAddMetadata] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleSecure = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload files to secure.",
        variant: "destructive",
      });
      return;
    }

    if (securityFeature === 'password' && (!password || password !== confirmPassword)) {
      toast({
        title: "Password error",
        description: password ? "Passwords don't match." : "Please enter a password.",
        variant: "destructive",
      });
      return;
    }

    if (securityFeature === 'watermark' && !watermarkText) {
      toast({
        title: "Watermark error",
        description: "Please enter watermark text.",
        variant: "destructive",
      });
      return;
    }

    let successMessage = "";
    switch (securityFeature) {
      case 'password':
        successMessage = `Password protecting ${files.length} file(s).`;
        break;
      case 'watermark':
        successMessage = `Adding watermark to ${files.length} file(s).`;
        break;
      case 'encryption':
        successMessage = `Encrypting ${files.length} file(s) with AES-256.`;
        break;
    }

    toast({
      title: "Security process started",
      description: successMessage + " This would connect to a real security API in a production environment.",
    });

    // In a real app, this would call an API to process the files
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Secure Your Files</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add passwords, watermarks, and encryption to protect your sensitive documents.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <Tabs 
                defaultValue="password" 
                value={securityFeature}
                onValueChange={setSecurityFeature}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="hidden sm:inline">Password</span>
                  </TabsTrigger>
                  <TabsTrigger value="watermark" className="flex items-center gap-2">
                    <Stamp className="h-4 w-4" />
                    <span className="hidden sm:inline">Watermark</span>
                  </TabsTrigger>
                  <TabsTrigger value="encryption" className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Encryption</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="space-y-6">
                  <FileUploader
                    accept="application/pdf,.doc,.docx,.ppt,.pptx,image/*"
                    maxFiles={5}
                    onFilesSelected={handleFilesSelected}
                    title={`Upload files to secure`}
                    subtitle={`Drag and drop your files here, or click to browse`}
                  />
                  
                  <div className="mt-8 space-y-6">
                    <TabsContent value="password" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <Input
                            type="password"
                            placeholder="Enter a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="watermark" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Watermark Text</label>
                          <Input
                            placeholder="Enter text for your watermark (e.g., 'CONFIDENTIAL')"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="confidential-switch"
                            checked={isConfidential}
                            onCheckedChange={setIsConfidential}
                          />
                          <Label htmlFor="confidential-switch">Add 'CONFIDENTIAL' stamp</Label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="encryption" className="mt-0">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Files will be encrypted using AES-256 encryption, the industry standard for secure file protection.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="metadata-switch"
                            checked={addMetadata}
                            onCheckedChange={setAddMetadata}
                          />
                          <Label htmlFor="metadata-switch">Add security metadata</Label>
                        </div>
                        <p className="text-xs text-gray-500">
                          Adding metadata embeds information about when and who encrypted the file.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <Button 
                      onClick={handleSecure}
                      className="w-full mt-6 bg-gradient-to-r from-fileforge-blue to-fileforge-teal"
                      disabled={files.length === 0}
                    >
                      {securityFeature === 'password' ? "Password Protect" : 
                       securityFeature === 'watermark' ? "Add Watermark" : 
                       "Encrypt Files"}
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="font-semibold text-lg mb-4">File Security Information</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                FileForge Suite provides powerful security features to protect your sensitive documents and ensure they're only accessed by authorized individuals.
              </p>
              <p>
                Our security features include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Password protection with AES-256 encryption</li>
                <li>Custom text and image watermarking</li>
                <li>End-to-end file encryption</li>
                <li>Document permission controls</li>
                <li>Secure file sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurePage;
