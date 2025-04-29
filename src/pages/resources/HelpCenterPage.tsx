
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, Search, FileText, Image, Video, Music, Lock, PieChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HelpCenterPage = () => {
  // FAQ data
  const faqs = [
    {
      question: "How do I convert a file?",
      answer: "To convert a file, navigate to the Convert page, select your file type, upload your file, choose the output format, and click Convert. Your file will be processed and available for download when complete."
    },
    {
      question: "What file types are supported?",
      answer: "FileForge supports a wide range of formats including documents (DOC, PDF), images (PNG, JPG, WebP), videos (MP4, AVI, MOV), and audio files (MP3, WAV). Check the specific conversion page for detailed format support."
    },
    {
      question: "How large can my files be?",
      answer: "Free users can upload files up to 100MB, Pro users up to 500MB, and Premium users up to 2GB. Enterprise accounts have custom file size limits."
    },
    {
      question: "How long are my files stored?",
      answer: "For non-authenticated users, files are automatically deleted after 24 hours. For authenticated users, storage time depends on your subscription plan."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all files are encrypted at rest using AES-256 encryption. We implement strict access controls and automatically delete temporary files after processing."
    }
  ];

  // Categories
  const categories = [
    { name: "Document Conversion", icon: FileText, count: 15 },
    { name: "Image Processing", icon: Image, count: 12 },
    { name: "Video Conversion", icon: Video, count: 8 },
    { name: "Audio Processing", icon: Music, count: 6 },
    { name: "Security Features", icon: Lock, count: 10 },
    { name: "Account & Billing", icon: PieChart, count: 9 }
  ];

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Help Center</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and learn how to get the most out of FileForge Suite.
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for help..."
                className="pl-10 py-6 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-fileforge-blue hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
          
          {/* Popular Categories */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 p-3 rounded-full mr-4">
                        <IconComponent className="h-6 w-6 text-fileforge-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} articles</p>
                      </div>
                    </div>
                    <Link to="#" className="text-fileforge-blue hover:underline flex items-center text-sm font-medium">
                      Browse Articles <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* Frequently Asked Questions */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Frequently Asked Questions
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-fileforge-blue mr-2">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                View All FAQs
              </Button>
            </div>
          </section>
          
          {/* Getting Started Guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Getting Started Guides
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Converting Your First File",
                  desc: "Learn how to convert files between different formats quickly and easily."
                },
                {
                  title: "Compressing Files for Web",
                  desc: "Optimize your files for web use with our compression tools."
                },
                {
                  title: "Securing Your Documents",
                  desc: "Protect sensitive information with our security features."
                }
              ].map((guide, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-fileforge-blue to-fileforge-teal"></div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.desc}</p>
                    <Link to="#" className="text-fileforge-blue hover:underline flex items-center text-sm font-medium">
                      Read Guide <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Still Need Help */}
          <section className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-8 text-white">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
                <p className="text-blue-100 mb-4 md:mb-0">Our support team is ready to assist you with any questions.</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="secondary" className="bg-white text-fileforge-blue hover:bg-blue-50">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Submit a Ticket
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenterPage;
