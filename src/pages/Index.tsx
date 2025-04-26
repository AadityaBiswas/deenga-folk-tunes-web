
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
        <Navbar />
        <HeroSection />
        <AboutSection />
        <AlbumSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
