
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

    // Create a stable animation flow with requestAnimationFrame for smooth cursor glow
    let animationFrameId: number;
    const time = { current: 0 };
    
    const animateCursor = () => {
      time.current += 1;
      
      // Ultra-smooth size pulsation with stable oscillation
      const newSize = 18 + Math.sin(time.current / 100) * 7;
      setGlowSize(newSize);
      
      // Ultra-smooth opacity pulsation with stable oscillation
      const newOpacity = 0.5 + Math.sin(time.current / 75) * 0.3;
      setGlowOpacity(newOpacity);

      // If music is playing, animate the visualizer with more dynamic values
      if (isMusicPlaying) {
        setVisualizerValues(prev => prev.map((_, i) => {
          // Generate more dynamic random values that simulate audio visualization
          const baseFrequency = 12 + Math.random() * 25;
          const pulseOffset = Math.sin(time.current / 50 + i * 0.4) * 8;
          return baseFrequency + pulseOffset;
        }));
      }
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('message', handleMessage);
    
    // Start the animation loop
    animationFrameId = requestAnimationFrame(animateCursor);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('message', handleMessage);
      cancelAnimationFrame(animationFrameId);
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
      {/* Fixed cursor glow effect - always yellow regardless of music state */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
          opacity: glowOpacity,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: `0 0 30px 20px rgba(250, 204, 21, 0.45)`, // Always yellow glow
          filter: 'blur(3px)',
          willChange: 'transform, opacity',
          transition: 'width 0.05s linear, height 0.05s linear, opacity 0.05s linear',
        }}
      />
      
      {/* Enhanced audio visualizer concentric rings - yellow regardless of music state */}
      {isMusicPlaying && visualizerValues.map((value, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-50"
          style={{
            width: `${glowSize + value * (index + 1) * 2}px`,
            height: `${glowSize + value * (index + 1) * 2}px`,
            transform: `translate(${mousePosition.x - (glowSize + value * (index + 1) * 2)/2}px, ${mousePosition.y - (glowSize + value * (index + 1) * 2)/2}px)`,
            opacity: 0.5 + (0.9 / (index + 2)), // Higher opacity
            borderRadius: '50%',
            border: `3px solid rgba(250, 204, 21, ${0.8 / (index + 1)})`, // Yellow border
            background: 'transparent',
            boxShadow: `0 0 ${15 + index * 10}px ${12 + index * 5}px rgba(250, 204, 21, ${0.5 / (index + 1)})`, // Enhanced yellow glow
            willChange: 'transform',
            transition: 'transform 0.005s linear',
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
