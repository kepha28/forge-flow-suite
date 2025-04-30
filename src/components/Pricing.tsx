
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  popular = false 
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular?: boolean;
}) => (
  <div className={`
    flex flex-col p-6 sm:p-8 
    rounded-2xl shadow-lg bg-white dark:bg-gray-800
    border
    ${popular ? 'border-fileforge-blue' : 'border-gray-200 dark:border-gray-700'}
    relative
  `}>
    {popular && (
      <div className="absolute -top-5 left-0 right-0 mx-auto w-fit px-4 py-1 bg-fileforge-blue text-white text-sm font-semibold rounded-full">
        Most Popular
      </div>
    )}
    
    <div className="mb-5">
      <h3 className="text-2xl font-bold mb-1">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
    
    <div className="mb-6">
      <span className="text-4xl font-bold">{price}</span>
      {price !== 'Custom' && <span className="text-gray-600 dark:text-gray-300">/month</span>}
    </div>
    
    <ul className="mb-8 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-500" />
          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-auto">
      <Button 
        asChild
        className={`w-full ${
          popular 
            ? 'bg-gradient-to-r from-fileforge-blue to-fileforge-teal hover:opacity-90 text-white' 
            : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white'
        }`}
      >
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  </div>
);

const Pricing = () => {
  return (
    <section className="py-16 px-6 md:px-12" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include core features with different usage limits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier 
            name="Free" 
            price="$0"
            description="For casual users"
            features={[
              "3 conversions per day",
              "Files up to 100MB",
              "Basic formats support",
              "24-hour file retention",
              "Email support"
            ]}
            buttonText="Get Started"
            buttonLink="/auth"
          />
          
          <PricingTier 
            name="Pro" 
            price="$9.99"
            description="For regular users"
            features={[
              "Unlimited conversions",
              "Files up to 500MB",
              "All formats supported",
              "Advanced compression",
              "30-day file retention",
              "Priority support"
            ]}
            buttonText="Go Pro"
            buttonLink="/pricing"
            popular={true}
          />
          
          <PricingTier 
            name="Enterprise" 
            price="Custom"
            description="For teams & businesses"
            features={[
              "Unlimited everything",
              "Files up to 2GB",
              "Custom branding",
              "Admin controls",
              "API access",
              "Dedicated support",
              "SSO & team management"
            ]}
            buttonText="Contact Sales"
            buttonLink="/contact"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
