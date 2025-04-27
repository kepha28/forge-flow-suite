
import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "FileForge Suite transformed how I handle client documents. The batch conversion feature saves me hours every week.",
    author: "Sarah Johnson",
    role: "Graphic Designer",
    stars: 5
  },
  {
    quote: "The compression algorithm is incredible. My website loads twice as fast after optimizing all images with FileForge.",
    author: "Michael Chen",
    role: "Web Developer",
    stars: 5
  },
  {
    quote: "As a legal professional, document security is critical. The encryption tools give me peace of mind when sharing confidential files.",
    author: "James Wilson",
    role: "Corporate Attorney",
    stars: 4
  },
  {
    quote: "I've tried many file conversion tools, but FileForge stands out with its clean interface and reliable results.",
    author: "Emma Rodriguez",
    role: "Marketing Manager",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our users have to say about FileForge Suite.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
