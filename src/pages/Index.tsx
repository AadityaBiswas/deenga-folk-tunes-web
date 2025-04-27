import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverLink, setIsOverLink] = useState(false);
  const [isAboutFocused, setIsAboutFocused] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if mouse is over any link
      const element = document.elementFromPoint(e.clientX, e.clientY);
      setIsOverLink(!!element?.closest('a'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Handle navigation to about section
    const handleAboutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const aboutLink = target.closest('a[href="#about"]');
      
      if (aboutLink) {
        e.preventDefault();
        setIsAboutFocused(true);
        
        // Scroll to about section smoothly
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Add click event listener for about links
    document.addEventListener('click', handleAboutClick);
    
    return () => {
      document.removeEventListener('click', handleAboutClick);
    };
  }, []);

  // Function to exit about focus mode
  const exitAboutFocus = () => {
    setIsAboutFocused(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deenga-dark/90 to-black text-white relative">
      {/* Background overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Main cursor orb */}
      <div 
        className={`fixed w-8 h-8 rounded-full pointer-events-none mix-blend-screen animate-pulse transition-all duration-300 z-50
          ${isOverLink ? 'bg-deenga-purple/80 blur-md scale-125' : 'bg-deenga-purple/60 blur-sm'}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.05s ease-out'
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar is always visible */}
        <Navbar />
        
        {/* Close button for About section */}
        {isAboutFocused && (
          <button 
            onClick={exitAboutFocus}
            className="fixed top-24 right-8 z-50 bg-deenga-purple/90 text-white p-2 rounded-full hover:bg-deenga-purple transform transition-transform hover:scale-110 animate-fade-in"
            aria-label="Close about section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Hero section - hidden when about is focused */}
        <div className={`transition-all duration-700 ${isAboutFocused ? 'opacity-0 -translate-y-full absolute' : 'opacity-100'}`}>
          <HeroSection />
        </div>
        
        {/* About section */}
        <div 
          className={`transition-all duration-700 ${
            isAboutFocused 
              ? 'opacity-100 scale-100' 
              : 'opacity-100'
          }`}
          style={{
            position: isAboutFocused ? 'relative' : 'relative',
            zIndex: isAboutFocused ? 20 : 10,
          }}
        >
          <AboutSection />
        </div>
        
        {/* Other sections - hidden when about is focused */}
        <div className={`transition-all duration-700 ${
          isAboutFocused 
            ? 'opacity-0 translate-y-full absolute' 
            : 'opacity-100'
        }`}>
          <AlbumSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
