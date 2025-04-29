
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using FileForge Suite services.
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using FileForge Suite services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
              <p className="text-gray-600">
                We reserve the right to update or change these Terms of Service at any time without notice. Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">2. Usage Limitations</h2>
              <p className="text-gray-600 mb-4">
                Free users are limited to 5 file conversions per day with a maximum file size of 100MB. Pro users can process up to 50 conversions daily with files up to 500MB. Premium users enjoy 100 daily conversions with a 2GB file size limit.
              </p>
              <p className="text-gray-600">
                All file operations are limited to 300 seconds of processing time. We reserve the right to terminate any operation that exceeds this limit.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must immediately notify FileForge Suite of any unauthorized use of your account or any other breach of security.
              </p>
              <p className="text-gray-600 mb-4">
                You agree not to upload, share, or process any content that:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Violates any applicable laws or regulations</li>
                <li>Infringes on intellectual property rights of others</li>
                <li>Contains malicious software or harmful code</li>
                <li>Contains explicit, offensive, or inappropriate content</li>
              </ul>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">4. Data Retention and Privacy</h2>
              <p className="text-gray-600 mb-4">
                Non-authenticated users' files are automatically deleted after 24 hours. For authenticated users, files are retained according to your subscription plan unless manually deleted.
              </p>
              <p className="text-gray-600">
                Please refer to our <Link to="/privacy" className="text-fileforge-blue hover:underline">Privacy Policy</Link> for complete information on how we collect, use, and protect your data.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
              <p className="text-gray-600">
                FileForge Suite reserves the right to suspend or terminate your account at any time for violation of these terms or for any other reason deemed appropriate by our team. Upon termination, your right to access and use the services will immediately cease.
              </p>
            </section>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-fileforge-blue p-4 rounded">
            <p className="text-sm text-gray-600">
              Last updated: April 2025. If you have any questions regarding these Terms of Service, please <Link to="/contact" className="text-fileforge-blue hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
