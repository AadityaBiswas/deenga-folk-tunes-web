
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-blur py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-white font-serif text-2xl md:text-3xl font-bold">DEENGA</span>
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1">
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            )}></span>
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMenuOpen ? "opacity-0" : "opacity-100"
            )}></span>
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            )}></span>
          </div>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Music", "Shows", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-deenga-yellow transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <nav className={cn(
        "md:hidden bg-deenga-dark/95 absolute w-full transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {["Home", "About", "Music", "Shows", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-deenga-yellow py-2 transition-colors duration-200 font-medium text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
