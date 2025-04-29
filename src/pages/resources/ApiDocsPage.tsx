
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Copy, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ApiDocsPage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  // Sample endpoint data
  const endpoints = [
    {
      name: "Convert File",
      method: "POST",
      path: "/api/convert",
      description: "Convert a file from one format to another",
      parameters: [
        { name: "file", type: "File", required: true, description: "The file to be converted" },
        { name: "output_format", type: "string", required: true, description: "The desired output format" },
        { name: "quality", type: "number", required: false, description: "Output quality (1-100)" }
      ],
      responses: [
        { code: "200", description: "File converted successfully", example: '{ "success": true, "download_url": "https://api.fileforge.com/files/abc123.pdf" }' },
        { code: "400", description: "Invalid request parameters", example: '{ "error": "Invalid output format" }' },
        { code: "413", description: "File too large", example: '{ "error": "File exceeds size limit" }' }
      ]
    },
    {
      name: "Compress File",
      method: "POST",
      path: "/api/compress",
      description: "Compress a file to reduce its size",
      parameters: [
        { name: "file", type: "File", required: true, description: "The file to be compressed" },
        { name: "compression_level", type: "string", required: false, description: "Compression level (low, medium, high)" }
      ],
      responses: [
        { code: "200", description: "File compressed successfully", example: '{ "success": true, "download_url": "https://api.fileforge.com/files/def456.zip", "compression_ratio": 0.65 }' },
        { code: "400", description: "Invalid request parameters", example: '{ "error": "Invalid compression level" }' }
      ]
    },
    {
      name: "Get File Info",
      method: "GET",
      path: "/api/files/{file_id}",
      description: "Get information about a specific file",
      parameters: [
        { name: "file_id", type: "string", required: true, description: "ID of the file" }
      ],
      responses: [
        { code: "200", description: "File information retrieved successfully", example: '{ "id": "abc123", "name": "document.pdf", "size": 1024567, "format": "pdf", "created_at": "2025-04-28T12:34:56Z" }' },
        { code: "404", description: "File not found", example: '{ "error": "File not found" }' }
      ]
    }
  ];

  const codeExamples = {
    curl: `curl -X POST \\
  https://api.fileforge.com/api/convert \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: multipart/form-data' \\
  -F 'file=@/path/to/your/file.docx' \\
  -F 'output_format=pdf'`,
    
    javascript: `const data = new FormData();
data.append('file', fileInput.files[0]);
data.append('output_format', 'pdf');

fetch('https://api.fileforge.com/api/convert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: data
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  window.location.href = data.download_url;
})
.catch(error => {
  console.error('Error:', error);
});`,
    
    python: `import requests

url = "https://api.fileforge.com/api/convert"
payload = {'output_format': 'pdf'}
files = [('file', ('file.docx', open('/path/to/your/file.docx', 'rb'), 'application/octet-stream'))]
headers = {
  'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, headers=headers, data=payload, files=files)
data = response.json()

if response.status_code == 200:
    print("Download URL:", data["download_url"])
else:
    print("Error:", data["error"])`,
    
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.fileforge.com/api/convert',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array(
    'file' => new CURLFILE('/path/to/your/file.docx'),
    'output_format' => 'pdf'
  ),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
echo $data['download_url'];
?>`
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Integrate FileForge Suite's file conversion, compression, and security features into your applications.
            </p>
          </div>
          
          {/* API Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Overview
            </h2>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The FileForge API allows you to integrate our file processing capabilities directly into your applications. You can convert, compress, and secure files programmatically using our simple REST API.
                  </p>
                  
                  <h3 className="text-lg font-semibold">Base URL</h3>
                  <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                    <code className="text-fileforge-blue">https://api.fileforge.com/api</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard("https://api.fileforge.com/api")}
                      className="text-gray-500 hover:text-fileforge-blue"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-semibold">Authentication</h3>
                  <p className="text-gray-600">
                    All API requests require authentication using an API key. You can obtain your API key from your account settings. Include the API key in all requests by adding an Authorization header:
                  </p>
                  
                  <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                    <code className="text-fileforge-blue">Authorization: Bearer YOUR_API_KEY</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY")}
                      className="text-gray-500 hover:text-fileforge-blue"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-semibold">Rate Limits</h3>
                  <p className="text-gray-600">
                    Free tier accounts are limited to 100 requests per hour. Pro and Premium tiers have higher rate limits. Check your account settings for your specific limits.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Get API Key */}
            <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-6 text-white">
              <div className="md:flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Started with the API</h3>
                  <p className="text-blue-100 mb-4 md:mb-0">Sign up for a FileForge account to obtain your API key.</p>
                </div>
                <div>
                  <Button variant="secondary" className="bg-white text-fileforge-blue hover:bg-blue-50">
                    Get API Key
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Example Usage */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Example Usage
            </h2>
            
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="curl">
                  <div className="border-b">
                    <TabsList className="w-full justify-start rounded-none p-0">
                      <TabsTrigger value="curl" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-fileforge-blue">
                        cURL
                      </TabsTrigger>
                      <TabsTrigger value="javascript" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-fileforge-blue">
                        JavaScript
                      </TabsTrigger>
                      <TabsTrigger value="python" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-fileforge-blue">
                        Python
                      </TabsTrigger>
                      <TabsTrigger value="php" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-fileforge-blue">
                        PHP
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="mt-0">
                      <div className="p-4 bg-gray-900 text-white rounded-b-lg relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(code)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                          <Copy size={16} />
                        </Button>
                        <pre className="overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </section>
          
          {/* API Endpoints */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              API Endpoints
            </h2>
            
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="mb-8">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-md ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-gray-900 font-semibold">{endpoint.path}</code>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </div>
                  
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold mb-4">Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="text-left text-sm font-semibold text-gray-500 pb-3">Name</th>
                            <th className="text-left text-sm font-semibold text-gray-500 pb-3">Type</th>
                            <th className="text-left text-sm font-semibold text-gray-500 pb-3">Required</th>
                            <th className="text-left text-sm font-semibold text-gray-500 pb-3">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param, i) => (
                            <tr key={i} className={i !== endpoint.parameters.length - 1 ? "border-b border-gray-100" : ""}>
                              <td className="py-3 pr-4 align-top">
                                <code className="font-mono text-fileforge-blue">{param.name}</code>
                              </td>
                              <td className="py-3 pr-4 align-top">
                                <span className="text-gray-600 text-sm">{param.type}</span>
                              </td>
                              <td className="py-3 pr-4 align-top">
                                <span className={`text-sm ${param.required ? 'text-red-500' : 'text-gray-500'}`}>
                                  {param.required ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="py-3 text-gray-600 text-sm align-top">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Responses</h3>
                    <div className="space-y-4">
                      {endpoint.responses.map((response, i) => (
                        <div key={i} className={i !== endpoint.responses.length - 1 ? "pb-4 border-b border-gray-100" : ""}>
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-md mr-3 ${response.code.startsWith('2') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {response.code}
                            </span>
                            <span className="text-gray-700">{response.description}</span>
                          </div>
                          <div className="bg-gray-100 p-3 rounded-md relative">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => copyToClipboard(response.example)}
                              className="absolute top-2 right-2 text-gray-500 hover:text-fileforge-blue"
                            >
                              <Copy size={14} />
                            </Button>
                            <pre className="text-xs overflow-x-auto">
                              <code>{response.example}</code>
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
          
          {/* Support */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Need API Support?</h2>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Our developer team is ready to help with any API integration questions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button variant="default" className="bg-fileforge-blue hover:bg-blue-700">
                  Join Developer Community
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white w-full sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocsPage;
