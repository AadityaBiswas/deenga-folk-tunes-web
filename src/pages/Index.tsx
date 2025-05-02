
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
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Create flickering effect for the glow
    const flickerInterval = setInterval(() => {
      setGlowOpacity(prevOpacity => {
        // Random opacity between 0.3 and 0.7
        return 0.3 + Math.random() * 0.4;
      });
    }, 700); // Change opacity every 700ms

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(flickerInterval);
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
      {/* Custom cursor glow effect */}
      <div
        className="fixed w-32 h-32 rounded-full bg-deenga-yellow/20 backdrop-blur-sm pointer-events-none z-50 transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x - 64}px, ${mousePosition.y - 64}px)`,
          opacity: glowOpacity,
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
