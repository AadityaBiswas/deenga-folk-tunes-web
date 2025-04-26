
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { Music } from "lucide-react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverLink, setIsOverLink] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if mouse is over any link
      const element = document.elementFromPoint(e.clientX, e.clientY);
      setIsOverLink(!!element?.closest('a'));

      // Add new trail point
      setTrail(prevTrail => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prevTrail.slice(0, 5) // Keep only last 5 trail points
        ];
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prevTrail => prevTrail.slice(0, -1));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deenga-dark/90 to-black text-white relative">
      {/* Background overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Trail and cursor follower */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - (index * 0.2)
          }}
        >
          <Music 
            className="w-4 h-4 text-deenga-purple/60 animate-pulse"
            style={{
              transform: `rotate(${index * 45}deg)`
            }}
          />
        </div>
      ))}

      {/* Main cursor orb */}
      <div 
        className={`fixed w-8 h-8 rounded-full pointer-events-none mix-blend-screen animate-pulse transition-all duration-300 z-50
          ${isOverLink ? 'bg-deenga-purple/80 blur-md scale-125' : 'bg-deenga-purple/60 blur-sm'}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.05s ease-out'
        }}
      />
      
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
