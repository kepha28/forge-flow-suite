
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn how we handle, process, and protect your data when you use FileForge Suite.
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">1. Data We Collect</h2>
              <p className="text-gray-600 mb-3">We collect several types of information when you use FileForge Suite:</p>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">1.1 Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-3">
                <li>Email address (for account creation)</li>
                <li>Name (optional, for personalized experience)</li>
                <li>Payment information (processed securely by our payment provider)</li>
              </ul>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">1.2 Usage Data</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-3">
                <li>File metadata (type, size, name)</li>
                <li>Conversion/compression statistics</li>
                <li>Features used and processing times</li>
                <li>IP address and device information</li>
              </ul>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">1.3 Your Files</h3>
              <p className="text-gray-600">
                We temporarily process your files to perform conversions, compressions, or security operations. All files are encrypted at rest using AES-256 encryption.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Data</h2>
              <p className="text-gray-600 mb-3">Your data is used for the following purposes:</p>
              
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Providing and maintaining our file processing services</li>
                <li>Processing your transactions and managing your account</li>
                <li>Improving our services based on usage patterns</li>
                <li>Sending service notifications and updates</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Preventing fraudulent use of our services</li>
              </ul>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">3. Data Retention</h2>
              <p className="text-gray-600 mb-3">
                For non-authenticated users, files are automatically deleted after 24 hours from our servers.
              </p>
              <p className="text-gray-600 mb-3">
                For authenticated users, we retain your files according to your subscription plan:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Free tier:</strong> Files deleted after 3 days</li>
                <li><strong>Pro tier:</strong> Files deleted after 7 days</li>
                <li><strong>Premium tier:</strong> Files deleted after 30 days</li>
                <li><strong>Enterprise tier:</strong> Custom retention policy</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Account information is retained until you delete your account or request data removal.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">4. Your Rights</h2>
              <p className="text-gray-600 mb-3">
                Depending on your jurisdiction, you may have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate information</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p className="text-gray-600 mt-3">
                To exercise these rights, please contact us through our <Link to="/contact" className="text-fileforge-blue hover:underline">Contact Page</Link>.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">5. Security Measures</h2>
              <p className="text-gray-600 mb-3">
                We implement robust security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Files encrypted at rest using AES-256 encryption</li>
                <li>Secure HTTPS transmission of all data</li>
                <li>Regular security audits and vulnerability testing</li>
                <li>Automatic deletion of temporary files after processing</li>
                <li>Strict access controls for employee access to systems</li>
              </ul>
            </section>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-fileforge-blue p-4 rounded">
            <p className="text-sm text-gray-600">
              Last updated: April 2025. If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-fileforge-blue hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
