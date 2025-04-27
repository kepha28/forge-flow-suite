
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Upload, Lock, Zap, LogOut } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      });
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-2">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-fileforge-blue to-fileforge-teal inline-block text-transparent bg-clip-text">
            FileForge Suite
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {user && (
            <>
              <Link to="/convert" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Convert</Link>
              <Link to="/compress" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Compress</Link>
              <Link to="/secure" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Secure</Link>
            </>
          )}
          <Link to="/pricing" className="text-fileforge-dark hover:text-fileforge-blue transition-colors font-medium">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/auth">Log in</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal hover:from-fileforge-blue/90 hover:to-fileforge-teal/90 text-white"
                asChild
              >
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
