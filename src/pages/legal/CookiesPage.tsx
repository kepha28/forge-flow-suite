
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Cookie size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding how cookies are used on FileForge Suite to enhance your experience.
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
              </p>
              <p className="text-gray-600">
                Cookies allow websites to remember your preferences, understand how you navigate through the site, and recognize you when you return. This helps us improve our services and provide you with a better experience.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot disable these cookies in our system.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Functionality Cookies</h3>
                  <p className="text-gray-600">
                    These cookies allow us to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Performance & Analytics Cookies</h3>
                  <p className="text-gray-600">
                    These cookies collect information about how visitors use our website, which pages they visit, and if they experience any errors. They help us improve our website's performance and understand how users interact with it.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Targeting Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Cookie Management</h2>
              <p className="text-gray-600 mb-4">
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
              </p>
              
              <p className="text-gray-600 mb-4">
                You can delete all cookies that are already on your device by clearing the browsing history of your browser. This will remove all cookies from all websites you have visited.
              </p>
              
              <p className="text-gray-600">
                Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in disabling certain functionality and features of this site.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
              </p>
              
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>This site uses Google Analytics, one of the most widespread and trusted analytics solutions, to help us understand how you use the site and ways to improve your experience.</li>
                <li>We may also use Facebook Pixel to help us better understand our audience and ensure we're showing relevant advertisements.</li>
                <li>For payment processing, cookies from our payment providers may be used to ensure secure transactions.</li>
              </ul>
            </section>
            
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
              <p className="text-gray-600 mb-4">
                When you first visit FileForge Suite, you'll be presented with a cookie banner that allows you to select which non-essential cookies you want to accept. You can change your preferences at any time by using our cookie settings panel.
              </p>
              <div className="mt-6">
                <button className="bg-fileforge-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out">
                  Open Cookie Settings
                </button>
              </div>
            </section>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-fileforge-blue p-4 rounded">
            <p className="text-sm text-gray-600">
              Last updated: April 2025. If you have any questions about our cookie policy, please <Link to="/contact" className="text-fileforge-blue hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;
