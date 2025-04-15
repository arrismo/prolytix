
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
      <div className="text-center space-y-6 max-w-md p-6">
        <div className="h-24 w-24 rounded-full bg-muted mx-auto flex items-center justify-center">
          <span className="text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
