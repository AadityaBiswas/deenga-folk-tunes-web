
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
  const [glowSize, setGlowSize] = useState(28); // Starting with a smaller size
  const [glowOpacity, setGlowOpacity] = useState(0.65);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Create a smoother and more prominent pulsating animation effect for the glow
    const pulseInterval = setInterval(() => {
      setGlowSize(prevSize => {
        // Smoother size pulsation between 24px and 32px
        return 28 + Math.sin(Date.now() / 800) * 4;
      });
      
      setGlowOpacity(prevOpacity => {
        // Smoother opacity pulsation between 0.5 and 0.8
        return 0.65 + Math.sin(Date.now() / 700) * 0.15;
      });
    }, 16); // Update at 60fps for smoother animation

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
      {/* Smoother, more prominent cursor glow effect */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          borderRadius: '50%',
          background: 'rgba(250, 204, 21, 0.25)',
          boxShadow: `0 0 20px 10px rgba(250, 204, 21, 0.4)`,
          filter: 'blur(6px)',
          willChange: 'transform, opacity, width, height',
          transition: 'width 0.05s ease-out, height 0.05s ease-out, opacity 0.05s ease-out',
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
