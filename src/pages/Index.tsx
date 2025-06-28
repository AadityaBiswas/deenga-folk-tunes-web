
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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Cursor animation - only when music is NOT playing
  useEffect(() => {
    let cursorAnimationId: number;
    const cursorTime = { current: 0 };
    
    const animateCursor = () => {
      if (isMusicPlaying) {
        cursorAnimationId = requestAnimationFrame(animateCursor);
        return;
      }
      
      cursorTime.current += 1;
      
      const newSize = 18 + Math.sin(cursorTime.current / 100) * 7;
      setGlowSize(newSize);
      
      const newOpacity = 0.5 + Math.sin(cursorTime.current / 75) * 0.3;
      setGlowOpacity(newOpacity);
      
      cursorAnimationId = requestAnimationFrame(animateCursor);
    };
    
    cursorAnimationId = requestAnimationFrame(animateCursor);
    
    return () => {
      cancelAnimationFrame(cursorAnimationId);
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
    <div className="min-h-screen relative overflow-hidden" style={{ cursor: isMusicPlaying ? 'auto' : 'none' }}>
      {/* Cursor glow effect - only when music is NOT playing */}
      {!isMusicPlaying && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            transform: `translate(${mousePosition.x - glowSize/2}px, ${mousePosition.y - glowSize/2}px)`,
            opacity: glowOpacity,
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: `0 0 30px 20px rgba(250, 204, 21, 0.45)`,
            filter: 'blur(3px)',
            willChange: 'transform',
            transition: 'width 0.2s ease-out, height 0.2s ease-out',
          }}
        />
      )}

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
