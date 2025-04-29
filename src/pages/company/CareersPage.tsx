
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, CheckCircle, Coffee, Heart, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CareersPage = () => {
  // Benefits data
  const benefits = [
    {
      title: "Flexible Work Environment",
      description: "Work from anywhere with flexible hours that fit your lifestyle.",
      icon: <Coffee className="h-6 w-6 text-fileforge-blue" />
    },
    {
      title: "Competitive Compensation",
      description: "Generous salaries, equity options, and performance bonuses.",
      icon: <Award className="h-6 w-6 text-fileforge-blue" />
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health resources, and wellness programs.",
      icon: <Heart className="h-6 w-6 text-fileforge-blue" />
    },
    {
      title: "Growth Opportunities",
      description: "Continuous learning, career development, and mentorship programs.",
      icon: <CheckCircle className="h-6 w-6 text-fileforge-blue" />
    }
  ];
  
  // Open positions data
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Technical Support Specialist",
      department: "Customer Success",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract"
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
              <Briefcase size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl max-w-2xl mx-auto text-blue-100 mb-8">
              Help us build the future of file processing and management. We're looking for talented individuals passionate about creating intuitive software.
            </p>
            <Button className="bg-white text-fileforge-blue hover:bg-blue-50 font-medium px-6 py-3 text-lg">
              View Open Positions
            </Button>
          </div>
        </section>
        
        {/* Our Culture */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Culture</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbSUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Team collaboration"
                  className="rounded-lg shadow-sm w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-4">Collaborative & Innovative</h3>
                <p className="text-gray-600 mb-4">
                  At FileForge, we foster a culture of collaboration and innovation. Our team works together to solve complex problems and push the boundaries of file processing technology.
                </p>
                <p className="text-gray-600">
                  We believe in giving team members autonomy to make decisions and contribute their unique perspectives. Our flat organizational structure encourages everyone to share ideas, regardless of role or experience level.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-xl font-semibold mb-4">Diverse & Inclusive</h3>
                <p className="text-gray-600 mb-4">
                  We're committed to building a diverse and inclusive team. We believe that bringing together people with different backgrounds, experiences, and perspectives leads to better products and a stronger company.
                </p>
                <p className="text-gray-600">
                  Our remote-first approach allows us to hire talent from around the world, creating a truly global team united by our mission to simplify file management for everyone.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGl2ZXJzZSUyMHRlYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Diverse team"
                  className="rounded-lg shadow-sm w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex">
                      <div className="mr-4 bg-blue-50 p-3 rounded-full">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-8 text-white">
              <div className="md:flex items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">We're Growing Fast</h3>
                  <p className="text-blue-100">
                    FileForge has doubled in size over the past year, and we're continuing to expand our team to meet the growing demand for our products.
                  </p>
                </div>
                <Button className="bg-white text-fileforge-blue hover:bg-blue-50 whitespace-nowrap">
                  Learn About Our Growth
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Open Positions</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Join our team of passionate individuals working to simplify file management for millions of users worldwide.
            </p>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-lg">{position.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-blue-100 text-fileforge-blue text-xs font-semibold px-2.5 py-0.5 rounded">
                            {position.department}
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {position.location}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-fileforge-blue hover:bg-blue-700 flex items-center">
                        View Details <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Don't see a position that matches your skills? We're always looking for talented individuals.
              </p>
              <Button variant="outline" className="border-fileforge-blue text-fileforge-blue hover:bg-fileforge-blue hover:text-white">
                Send General Application
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Team Says</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Working at FileForge has been the highlight of my career. The team is incredibly supportive, and I've had the opportunity to work on challenging projects that have helped me grow as a developer.",
                  name: "Alex Martinez",
                  title: "Senior Software Engineer",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                },
                {
                  quote: "The flexibility and trust at FileForge has changed my life. I can structure my work around my family commitments while still feeling connected to an amazing team that's making an impact.",
                  name: "Priya Sharma",
                  title: "Product Manager",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Hiring Process</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Application Review",
                  description: "Our team reviews your resume and cover letter. We look for relevant skills and experience, but also for alignment with our values and culture."
                },
                {
                  step: "2",
                  title: "Initial Interview",
                  description: "A 30-minute video call with our recruiting team to discuss your background, experience, and interest in FileForge."
                },
                {
                  step: "3",
                  title: "Technical Assessment",
                  description: "Depending on the role, you may be asked to complete a skills assessment or technical challenge related to the position."
                },
                {
                  step: "4",
                  title: "Team Interviews",
                  description: "Meet with potential teammates and cross-functional colleagues to discuss your experience and how you'd contribute to our team."
                },
                {
                  step: "5",
                  title: "Offer & Welcome",
                  description: "If there's a mutual fit, we'll extend an offer and welcome you to the FileForge team!"
                }
              ].map((process, index) => (
                <div key={index} className="flex">
                  <div className="mr-6">
                    <div className="w-12 h-12 rounded-full bg-fileforge-blue text-white flex items-center justify-center font-bold text-lg">
                      {process.step}
                    </div>
                    {index !== 4 && (
                      <div className="w-0.5 h-16 bg-gray-200 mx-auto my-2"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore our open positions and take the first step towards a rewarding career at FileForge.
            </p>
            <Button className="bg-white text-fileforge-blue hover:bg-blue-50 font-medium px-6 py-3 text-lg">
              View Open Positions
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
