
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Info, CheckCircle, Users, GraduationCap } from "lucide-react";

const AboutPage = () => {
  // Team data
  const teamMembers = [
    {
      name: "Sarah Chen",
      title: "CEO & Founder",
      bio: "Former software engineer at Google with expertise in file compression algorithms. Founded FileForge with a mission to make file management simple and accessible.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Michael Rodriguez",
      title: "CTO",
      bio: "Expert in cloud infrastructure with 15 years of experience. Previously led engineering teams at Microsoft and Dropbox.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "David Kim",
      title: "Head of Product",
      bio: "Passionate about creating user-friendly products. Previously product manager at Adobe, focusing on document management solutions.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Lisa Johnson",
      title: "Lead Engineer",
      bio: "Specializes in multimedia processing and compression algorithms. Has contributed to several open-source projects in the file processing space.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Our values
  const values = [
    {
      title: "Simplicity",
      description: "We believe file management should be simple and accessible to everyone, regardless of technical expertise.",
      icon: <CheckCircle className="h-8 w-8 text-fileforge-blue" />
    },
    {
      title: "Security",
      description: "Your files' security is our top priority. All processing happens with industry-leading encryption standards.",
      icon: <CheckCircle className="h-8 w-8 text-fileforge-blue" />
    },
    {
      title: "Innovation",
      description: "We continuously push the boundaries of file processing technology to deliver the best tools for our users.",
      icon: <CheckCircle className="h-8 w-8 text-fileforge-blue" />
    },
    {
      title: "Reliability",
      description: "Our services are built to be dependable and consistent, with robust infrastructure that you can count on.",
      icon: <CheckCircle className="h-8 w-8 text-fileforge-blue" />
    }
  ];
  
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white py-24 px-6">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Info size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FileForge Suite</h1>
            <p className="text-xl max-w-2xl mx-auto text-blue-100">
              We're on a mission to simplify file management and empower users with powerful yet easy-to-use tools.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Story</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <p className="text-gray-600 mb-6 leading-relaxed">
                FileForge Suite began in 2020 when our founder, Sarah Chen, was working on a project that required processing thousands of files in different formats. Frustrated by the limitations and complexity of existing tools, she set out to create a solution that would make file conversion and management simple and accessible to everyone.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What started as a simple file conversion tool quickly grew into a comprehensive suite of file management solutions. We assembled a team of talented engineers, designers, and file processing experts who shared our vision of simplifying digital workflows.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, FileForge Suite serves over 500,000 users worldwide, from individual freelancers to enterprise teams. We're proud to have built a platform that saves our users countless hours of work while maintaining the highest standards of security and reliability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-full mb-6">
                  <Users className="h-8 w-8 text-fileforge-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To simplify complex file operations and empower users with intuitive tools that enhance productivity and creativity.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-full mb-6">
                  <GraduationCap className="h-8 w-8 text-fileforge-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the world's most trusted platform for file processing, known for our simplicity, security, and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-fileforge-blue text-sm mb-3">{member.title}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team is comprised of experts in file processing, cloud infrastructure, security, and user experience. We're passionate about creating tools that make your digital life easier.
              </p>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Users Worldwide", value: "500,000+" },
                { label: "Files Processed", value: "50M+" },
                { label: "Countries", value: "180+" },
                { label: "Uptime", value: "99.9%" }
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-6">Want to Learn More?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions about our products, need support, or are interested in joining our team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/contact" className="bg-fileforge-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition duration-150 ease-in-out">
                Contact Us
              </a>
              <a href="/careers" className="border border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white font-medium py-3 px-6 rounded transition duration-150 ease-in-out">
                Join Our Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
