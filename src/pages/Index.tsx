
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
  const [glowSize, setGlowSize] = useState(18);
  const [glowOpacity, setGlowOpacity] = useState(0.5);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [visualizerValues, setVisualizerValues] = useState<number[]>(Array(10).fill(5)); // Increased array size for more rings

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Listen for music state changes
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.type === 'musicStateChange') {
            setIsMusicPlaying(data.playing);
          }
        }
      } catch (e) {
        // Silently ignore parsing errors
      }
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

      // If music is playing, animate the visualizer with more dynamic values
      if (isMusicPlaying) {
        setVisualizerValues(prev => prev.map((_, i) => {
          // Generate more dynamic random values that simulate audio visualization
          const baseFrequency = 12 + Math.random() * 25; // Increased range for more visual impact
          const pulseOffset = Math.sin(Date.now() / (200 + i * 40)) * 8; // More prominent timing for each ring
          return baseFrequency + pulseOffset;
        }));
      }
    }, 5); // Update at 200fps for extremely smooth animation

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('message', handleMessage);
      clearInterval(pulseInterval);
    };
  }, [isMusicPlaying]);

  // Listen for music toggle from HeroSection
  useEffect(() => {
    const handleMusicToggle = (event: CustomEvent<{playing: boolean}>) => {
      setIsMusicPlaying(event.detail.playing);
    };
    
    window.addEventListener('musicToggled' as any, handleMusicToggle);
    
    return () => {
      window.removeEventListener('musicToggled' as any, handleMusicToggle);
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
      {/* Ultra-smooth cursor glow effect - fixed for proper display */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: isMusicPlaying 
            ? `0 0 30px 20px rgba(255, 255, 255, ${glowOpacity})` 
            : `0 0 28px 16px rgba(250, 204, 21, 0.35)`,
          filter: 'blur(3px)',
          willChange: 'transform, opacity, width, height',
          transition: 'transform 0.005s linear, width 0.05s ease-out, height 0.05s ease-out, opacity 0.05s ease-out, background 0.3s ease',
        }}
      />
      
      {/* Enhanced audio visualizer concentric rings - more prominent with thicker borders and brighter colors */}
      {isMusicPlaying && visualizerValues.map((value, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-50"
          style={{
            width: `${glowSize + value * (index + 1) * 1.8}px`, // Increased scaling factor
            height: `${glowSize + value * (index + 1) * 1.8}px`, // Increased scaling factor
            transform: `translate(${mousePosition.x - (glowSize + value * (index + 1) * 1.8)/2}px, ${mousePosition.y - (glowSize + value * (index + 1) * 1.8)/2}px)`,
            opacity: 0.4 + (0.9 / (index + 2)), // Higher opacity
            borderRadius: '50%',
            border: `3px solid rgba(255, 255, 255, ${0.8 / (index + 1)})`, // Thicker border and brighter
            background: 'transparent',
            boxShadow: `0 0 ${12 + index * 8}px ${10 + index * 4}px rgba(255, 255, 255, ${0.5 / (index + 1)})`, // Enhanced glow
            willChange: 'transform, width, height',
            transition: 'transform 0.005s linear, width 0.1s ease-out, height 0.1s ease-out', // Smoother transitions
          }}
        />
      ))}

      {/* Scroll to top button - visible only when NOT playing music */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full bg-deenga-yellow/80 text-black z-50 shadow-lg hover:bg-deenga-yellow transition-all duration-300 transform",
          showScrollTop && !isMusicPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
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
