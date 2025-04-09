
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cf-orange bg-clip-text text-transparent">
                Actor Kit
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-foreground ml-2">
                Beta
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link to="/examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </Link>
            <Link to="/community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/jonmumm/actor-kit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-blue-600 to-cf-orange text-white hover:opacity-90"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
