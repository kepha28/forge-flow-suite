
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  // Sample blog posts data
  const featuredPost = {
    id: 1,
    title: "5 Ways to Optimize Your PDF Files for Web",
    excerpt: "Learn the best practices for optimizing your PDF files to ensure fast loading times and better user experience on websites.",
    date: "April 25, 2025",
    author: "Emma Johnson",
    category: "Optimization",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  };
  
  const recentPosts = [
    {
      id: 2,
      title: "Understanding WebP: The Modern Image Format",
      excerpt: "WebP offers superior compression and quality characteristics compared to traditional formats. Here's why you should use it.",
      date: "April 20, 2025",
      author: "Michael Chen",
      category: "File Formats"
    },
    {
      id: 3,
      title: "How to Secure Your PDF Documents with Encryption",
      excerpt: "Protect sensitive information in your PDFs with these encryption methods and best practices.",
      date: "April 15, 2025",
      author: "Sarah Williams",
      category: "Security"
    },
    {
      id: 4,
      title: "Batch Processing: Convert Multiple Files at Once",
      excerpt: "Save time by processing multiple files simultaneously with these efficient batch conversion techniques.",
      date: "April 10, 2025",
      author: "David Miller",
      category: "Productivity"
    }
  ];
  
  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">FileForge Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest file processing tips, tutorials, and best practices.
            </p>
          </div>
          
          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              Featured Article
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-fileforge-blue text-xs font-semibold px-2.5 py-0.5 rounded">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center ml-4 text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {featuredPost.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {featuredPost.author}</span>
                    <Button variant="outline" className="text-fileforge-blue border-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Posts */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Recent Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-fileforge-blue text-xs font-semibold px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center ml-4 text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">By {post.author}</span>
                      <Link to="#" className="text-fileforge-blue hover:underline font-medium flex items-center">
                        Read More <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Explore Topics
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['File Conversion', 'Compression', 'Security', 'PDF Tools', 'Image Editing', 'Video Processing', 'Productivity', 'Tutorials'].map((category, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Link to="#" className="text-fileforge-blue hover:underline font-medium">
                    {category}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-8 text-white">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
                <p className="text-blue-100">Get the latest tips, tutorials, and updates delivered to your inbox.</p>
              </div>
              <div className="md:w-1/3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow rounded-l-lg px-4 py-3 focus:outline-none text-gray-900"
                  />
                  <button className="bg-white text-fileforge-blue font-medium px-4 py-3 rounded-r-lg hover:bg-blue-50 transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
