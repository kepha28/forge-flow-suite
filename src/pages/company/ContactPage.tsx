
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600">
              Get in touch with our team for support or inquiries.
            </p>
          </div>
          <div className="text-center text-gray-600">
            Contact form coming soon. For now, please reach out through our social media channels.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
