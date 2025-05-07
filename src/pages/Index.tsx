
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
  const [glowSize, setGlowSize] = useState(18); // Even smaller starting size
  const [glowOpacity, setGlowOpacity] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Create an ultra-smooth and more prominent pulsating animation effect for the glow
    const pulseInterval = setInterval(() => {
      setGlowSize(prevSize => {
        // Ultra-smooth size pulsation
        return 18 + Math.sin(Date.now() / 400) * 7;
      });
      
      setGlowOpacity(prevOpacity => {
        // Ultra-smooth opacity pulsation
        return 0.5 + Math.sin(Date.now() / 300) * 0.3;
      });
    }, 5); // Update at 200fps for extremely smooth animation

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-smooth cursor glow effect with more natural look */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          borderRadius: '50%',
          background: 'rgba(250, 204, 21, 0.12)',
          boxShadow: `0 0 28px 16px rgba(250, 204, 21, 0.35)`,
          filter: 'blur(3px)',
          willChange: 'transform, opacity, width, height',
          transition: 'transform 0.005s linear, width 0.05s ease-out, height 0.05s ease-out, opacity 0.05s ease-out',
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

