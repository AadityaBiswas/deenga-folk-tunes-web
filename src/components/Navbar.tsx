
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  // Remove "Home" from the navItems array
  const navItems = ["About", "Music", "Contact"];

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-white/10 py-3"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <img 
            src="/lovable-uploads/8d92703c-a15e-44c9-978f-fcc99a12c571.png"
            alt="Deenga Logo"
            className="h-12 md:h-14 transition-transform duration-300"
          />
          <span className="hidden md:block text-white/60 ml-3 text-sm">
            Folk Rock | Kolkata, India
          </span>
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
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-white/80 hover:text-deenga-yellow transition-all duration-300 text-sm uppercase tracking-wider font-medium relative group"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-deenga-yellow transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </div>
      
      <nav className={cn(
        "md:hidden absolute w-full transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-md border-t border-white/10",
        isMenuOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-white/80 hover:text-deenga-yellow py-2 transition-colors duration-300 text-base uppercase tracking-wide font-medium"
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
