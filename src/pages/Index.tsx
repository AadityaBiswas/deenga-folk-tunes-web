
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowSize, setGlowSize] = useState(24);
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Create a pulsating animation effect for the glow
    const pulseInterval = setInterval(() => {
      setGlowSize(prevSize => {
        // Subtle size pulsation between 22px and 26px
        return Math.sin(Date.now() / 1000) * 2 + 24;
      });
      
      setGlowOpacity(prevOpacity => {
        // Subtle opacity pulsation between 0.45 and 0.65
        return 0.45 + Math.sin(Date.now() / 800) * 0.1 + 0.1;
      });
    }, 50); // Update more frequently for smoother animation

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(pulseInterval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Custom cursor glow effect with animation */}
      <div
        className="fixed rounded-full pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          boxShadow: `0 0 15px 2px rgba(250, 204, 21, 0.6)`, 
          background: 'radial-gradient(circle, rgba(250,204,21,0.4) 0%, rgba(250,204,21,0.2) 60%, rgba(250,204,21,0) 100%)',
          transition: 'box-shadow 0.3s ease',
          willChange: 'transform, opacity, width, height',
        }}
      />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full bg-deenga-yellow/80 text-black z-50 shadow-lg hover:bg-deenga-yellow transition-all duration-300 transform",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      
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
