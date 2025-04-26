import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import EventsSection from "../components/EventsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { Music, Music2, Music3, Music4 } from "lucide-react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverLink, setIsOverLink] = useState(false);
  const [isOverDeenga, setIsOverDeenga] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if mouse is over any link
      const element = document.elementFromPoint(e.clientX, e.clientY);
      setIsOverLink(!!element?.closest('a'));

      // Check if mouse is over DEENGA text
      const isOverDeengaText = !!element?.closest('h1');
      setIsOverDeenga(isOverDeengaText);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deenga-dark/90 to-black text-white relative">
      {/* Background overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Cursor follower */}
      {!isOverDeenga && (
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
      )}

      {/* Musical instruments animation */}
      {isOverDeenga && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40">
          <div className="flex justify-center items-center h-full">
            <div className="flex gap-32 items-center">
              {/* Left side instruments */}
              <div className="flex gap-4 animate-fade-in-slow">
                <Music className="w-8 h-8 text-white animate-float" />
                <Music2 className="w-8 h-8 text-white animate-float delay-100" />
              </div>
              
              {/* Space for DEENGA text */}
              <div className="w-64" /> {/* Adjust width based on your needs */}
              
              {/* Right side instruments */}
              <div className="flex gap-4 animate-fade-in-slow">
                <Music3 className="w-8 h-8 text-white animate-float delay-200" />
                <Music4 className="w-8 h-8 text-white animate-float delay-300" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <AlbumSection />
        <EventsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
