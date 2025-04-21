import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import EventsSection from "../components/EventsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deenga-dark to-black text-white">
      {/* Cursor follower */}
      <div 
        className="fixed w-8 h-8 bg-deenga-purple/60 rounded-full blur-sm pointer-events-none mix-blend-screen animate-pulse"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.05s ease-out'
        }}
      />
      
      {/* Main content */}
      <div className="relative">
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
