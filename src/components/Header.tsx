
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Lock, Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-2">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-fileforge-blue to-fileforge-teal inline-block text-transparent bg-clip-text">FileForge Suite</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/convert" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Convert</Link>
          <Link to="/compress" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Compress</Link>
          <Link to="/secure" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Secure</Link>
          <Link to="/pricing" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex">Log in</Button>
          <Button className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal hover:from-fileforge-blue/90 hover:to-fileforge-teal/90 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
