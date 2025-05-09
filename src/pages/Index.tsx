
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
  const [visualizerValues, setVisualizerValues] = useState<number[]>(Array(10).fill(5));

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

    // Create a stable animation flow for cursor glow ONLY (separate from visualizer)
    let cursorAnimationId: number;
    const cursorTime = { current: 0 };
    
    const animateCursor = () => {
      cursorTime.current += 1;
      
      // Ultra-smooth size pulsation with stable oscillation
      const newSize = 18 + Math.sin(cursorTime.current / 100) * 7;
      setGlowSize(newSize);
      
      // Ultra-smooth opacity pulsation with stable oscillation
      const newOpacity = 0.5 + Math.sin(cursorTime.current / 75) * 0.3;
      setGlowOpacity(newOpacity);
      
      cursorAnimationId = requestAnimationFrame(animateCursor);
    };
    
    // Separate animation loop for visualizer (only when music is playing)
    let visualizerAnimationId: number | null = null;
    const visualizerTime = { current: 0 };
    
    const animateVisualizer = () => {
      if (!isMusicPlaying) {
        visualizerAnimationId = null;
        return;
      }
      
      visualizerTime.current += 1;
      
      setVisualizerValues(prev => prev.map((_, i) => {
        // Generate more dynamic random values that simulate audio visualization
        const baseFrequency = 12 + Math.random() * 25;
        const pulseOffset = Math.sin(visualizerTime.current / 50 + i * 0.4) * 8;
        return baseFrequency + pulseOffset;
      }));
      
      visualizerAnimationId = requestAnimationFrame(animateVisualizer);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('message', handleMessage);
    
    // Start the cursor animation loop (always running)
    cursorAnimationId = requestAnimationFrame(animateCursor);
    
    // Update visualizer animation based on music state
    if (isMusicPlaying && !visualizerAnimationId) {
      visualizerAnimationId = requestAnimationFrame(animateVisualizer);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('message', handleMessage);
      cancelAnimationFrame(cursorAnimationId);
      if (visualizerAnimationId) cancelAnimationFrame(visualizerAnimationId);
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
          willChange: 'transform',
          transition: 'width 0.2s ease-out, height 0.2s ease-out',
        }}
      />
      
      {/* Enhanced audio visualizer concentric rings - yellow regardless of music state */}
      {isMusicPlaying && visualizerValues.map((value, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-40"
          style={{
            width: `${value * (index + 1) * 3}px`,
            height: `${value * (index + 1) * 3}px`,
            transform: `translate(${mousePosition.x - (value * (index + 1) * 3)/2}px, ${mousePosition.y - (value * (index + 1) * 3)/2}px)`,
            opacity: 0.3 / (index + 1),
            borderRadius: '50%',
            border: `3px solid rgba(250, 204, 21, ${0.5 / (index + 1)})`, // Yellow border
            background: 'transparent',
            boxShadow: `0 0 ${15 + index * 10}px ${12 + index * 5}px rgba(250, 204, 21, ${0.3 / (index + 1)})`, // Enhanced yellow glow
            willChange: 'transform',
            transition: 'transform 0.1s ease-out',
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
