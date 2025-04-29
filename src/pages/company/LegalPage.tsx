
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Shield, Star, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Legal Information</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important legal information about FileForge Suite, our policies, and your rights.
            </p>
          </div>
          
          {/* Legal Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Legal Documents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Terms of Service",
                  description: "The rules and guidelines for using FileForge Suite services",
                  icon: <Shield className="h-6 w-6 text-fileforge-blue" />,
                  link: "/terms"
                },
                {
                  title: "Privacy Policy",
                  description: "How we collect, use, and protect your data",
                  icon: <Star className="h-6 w-6 text-fileforge-blue" />,
                  link: "/privacy"
                },
                {
                  title: "Cookie Policy",
                  description: "Information about our use of cookies and similar technologies",
                  icon: <AlertTriangle className="h-6 w-6 text-fileforge-blue" />,
                  link: "/cookies"
                }
              ].map((doc, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-blue-50 p-3 rounded-full inline-flex mb-4">
                      {doc.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                    <p className="text-gray-600 mb-4">{doc.description}</p>
                    <Link to={doc.link}>
                      <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white w-full">
                        Read Document
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Compliance */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Compliance
            </h2>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">GDPR Compliance</h3>
                <p className="text-gray-600 mb-4">
                  FileForge Suite is fully compliant with the General Data Protection Regulation (GDPR). We respect your data privacy rights and provide tools for you to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access and download all data associated with your account</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of data processing and analytics</li>
                  <li>Modify your communication preferences</li>
                </ul>
                <div className="mt-4">
                  <Link to="/privacy#gdpr">
                    <Button variant="link" className="text-fileforge-blue p-0 h-auto">
                      Learn more about your GDPR rights
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">CCPA Compliance</h3>
                  <p className="text-gray-600 mb-4">
                    For California residents, we comply with the California Consumer Privacy Act (CCPA). This gives you additional rights regarding your personal information.
                  </p>
                  <Link to="/privacy#ccpa">
                    <Button variant="link" className="text-fileforge-blue p-0 h-auto">
                      California Privacy Rights
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Data Processing Agreements</h3>
                  <p className="text-gray-600 mb-4">
                    For enterprise customers, we offer Data Processing Agreements (DPAs) to ensure GDPR compliance when FileForge processes data on your behalf.
                  </p>
                  <Link to="/contact">
                    <Button variant="link" className="text-fileforge-blue p-0 h-auto">
                      Request a DPA
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Licensing */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Licensing Information
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Software Licensing</h3>
                    <p className="text-gray-600">
                      FileForge Suite is licensed, not sold. Your subscription provides you with a limited, non-exclusive, non-transferable license to use our services according to your selected plan and our Terms of Service.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Third-Party Components</h3>
                    <p className="text-gray-600 mb-4">
                      FileForge Suite incorporates various open-source components, each with its own licensing terms. We acknowledge and appreciate the contributions of the open-source community.
                    </p>
                    <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                      View Third-Party Licenses
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Enterprise Licensing</h3>
                    <p className="text-gray-600 mb-4">
                      For enterprise customers, we offer custom licensing options including volume licensing, extended support, and custom development.
                    </p>
                    <Link to="/contact">
                      <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                        Contact Sales for Enterprise Licensing
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Trademark and Copyright */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Trademark and Copyright
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trademark Information</h3>
                    <p className="text-gray-600">
                      "FileForge Suite" and our logo are trademarks of FileForge, Inc. All other trademarks mentioned are the property of their respective owners.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Copyright Notice</h3>
                    <p className="text-gray-600">
                      © 2020-{new Date().getFullYear()} FileForge, Inc. All rights reserved. The content, design, graphics, and other materials related to FileForge Suite are protected by copyright laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Brand Guidelines</h3>
                    <p className="text-gray-600 mb-4">
                      If you wish to use our logos or other brand assets, please review our brand guidelines to ensure proper usage.
                    </p>
                    <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                      View Brand Guidelines
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Legal Questions */}
          <section className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-8 text-white">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Have Legal Questions?</h2>
                <p className="text-blue-100 mb-4 md:mb-0">
                  Our legal team is here to help. Contact us for any questions related to our legal policies or compliance.
                </p>
              </div>
              <div>
                <Link to="/contact">
                  <Button className="bg-white text-fileforge-blue hover:bg-blue-50 whitespace-nowrap">
                    Contact Legal Team
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

export default LegalPage;
