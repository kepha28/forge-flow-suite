
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Upload, Lock, Zap, LogOut, User, Moon, Sun, Menu } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/context/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { darkMode, setDarkMode, toggleSidebar, userProfile } = useAppContext();

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

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="mr-2 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-2">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-fileforge-blue to-fileforge-teal inline-block text-transparent bg-clip-text">
              FileForge Suite
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {user && (
            <>
              <Link to="/convert" className="text-fileforge-dark hover:text-fileforge-blue dark:text-gray-200 dark:hover:text-fileforge-blue transition-colors font-medium">Convert</Link>
              <Link to="/compress" className="text-fileforge-dark hover:text-fileforge-blue dark:text-gray-200 dark:hover:text-fileforge-blue transition-colors font-medium">Compress</Link>
              <Link to="/secure" className="text-fileforge-dark hover:text-fileforge-blue dark:text-gray-200 dark:hover:text-fileforge-blue transition-colors font-medium">Secure</Link>
            </>
          )}
          <Link to="/pricing" className="text-fileforge-dark hover:text-fileforge-blue dark:text-gray-200 dark:hover:text-fileforge-blue transition-colors font-medium">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-fileforge-blue text-white">
                      {getInitials(userProfile?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between items-center">
                  <span>Plan</span>
                  <Badge variant={userProfile?.tier === 'free' ? 'outline' : 'default'}>
                    {userProfile?.tier === 'free' ? 'Free' : 
                     userProfile?.tier === 'pro' ? 'Pro' : 'Premium'}
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
