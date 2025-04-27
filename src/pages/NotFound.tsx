
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-full p-4 mb-6">
        <FileText className="h-12 w-12 text-white" />
      </div>
      <h1 className="text-6xl font-bold text-fileforge-dark mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6 max-w-md">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Button asChild className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal hover:from-fileforge-blue/90 hover:to-fileforge-teal/90">
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
