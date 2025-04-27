
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  mostPopular?: boolean;
  buttonText: string;
  period: string;
}

const PricingComponent = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for occasional use',
      features: [
        '5 file conversions/day',
        'Files up to 100MB',
        'Basic compression',
        'Ad-supported',
        '24h cloud storage',
      ],
      buttonText: 'Get Started',
      period: 'forever',
    },
    {
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 5 : 50,
      description: 'Perfect for regular users',
      features: [
        '50 file conversions/day',
        'Files up to 500MB',
        'Advanced compression',
        'No ads',
        'Watermarking',
        'Password protection',
        '30-day cloud storage',
      ],
      mostPopular: true,
      buttonText: 'Start Pro Trial',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
    },
    {
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 10 : 100,
      description: 'Best for professionals',
      features: [
        '100 file conversions/day',
        'Files up to 2GB',
        'Premium compression',
        'AI optimization tools',
        'Priority processing',
        'Batch operations',
        '90-day cloud storage',
      ],
      buttonText: 'Start Premium Trial',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
          
          <div className="flex items-center justify-center mt-6 mb-8 bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-fileforge-blue shadow-sm'
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-fileforge-blue shadow-sm'
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="text-xs text-fileforge-teal">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`${
                plan.mostPopular 
                  ? 'border-fileforge-blue shadow-lg shadow-fileforge-blue/10 relative' 
                  : ''
              }`}
            >
              {plan.mostPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-fileforge-blue text-white text-xs font-semibold py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-fileforge-teal mr-2 shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.mostPopular
                      ? 'bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white'
                      : plan.name === 'Free' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : ''
                  }`}
                  variant={plan.mostPopular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-gray-600 mb-6">
            We offer enterprise plans and white-label solutions for businesses with specific requirements.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingComponent;
