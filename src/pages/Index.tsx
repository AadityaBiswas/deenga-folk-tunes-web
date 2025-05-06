
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
  const [glowSize, setGlowSize] = useState(32);
  const [glowOpacity, setGlowOpacity] = useState(0.7);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Create a more prominent pulsating animation effect for the glow
    const pulseInterval = setInterval(() => {
      setGlowSize(prevSize => {
        // More noticeable size pulsation between 28px and 36px
        return Math.sin(Date.now() / 800) * 4 + 32;
      });
      
      setGlowOpacity(prevOpacity => {
        // More pronounced opacity pulsation between 0.55 and 0.85
        return 0.55 + Math.sin(Date.now() / 600) * 0.15 + 0.15;
      });
    }, 30); // Update more frequently for smoother animation

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
      {/* Custom cursor glow effect with more prominent animation */}
      <div
        className="fixed rounded-full pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          boxShadow: `0 0 20px 5px rgba(250, 204, 21, 0.7)`, 
          background: 'radial-gradient(circle, rgba(250,204,21,0.5) 0%, rgba(250,204,21,0.3) 60%, rgba(250,204,21,0) 100%)',
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
