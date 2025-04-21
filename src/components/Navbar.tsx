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
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <img 
            src="/lovable-uploads/8d92703c-a15e-44c9-978f-fcc99a12c571.png"
            alt="Deenga Logo"
            className={cn(
              "h-12 md:h-14 transition-transform duration-300",
              isScrolled ? "scale-90" : "scale-100"
            )}
          />
          {!isScrolled && (
            <span className="hidden md:block text-white/60 ml-3 text-sm">
              Folk Rock | Kolkata, India
            </span>
          )}
        </a>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
        
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Music", "Shows", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-deenga-yellow transition-colors duration-300 text-sm uppercase tracking-wider font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-deenga-yellow after:left-0 after:-bottom-1 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      <nav className={cn(
        "md:hidden absolute w-full transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-md border-t border-white/10",
        isMenuOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {["Home", "About", "Music", "Shows", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-deenga-yellow py-2 transition-colors duration-300 text-base uppercase tracking-wide font-medium"
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
