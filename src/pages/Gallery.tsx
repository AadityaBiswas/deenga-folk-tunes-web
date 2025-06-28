import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowSize, setGlowSize] = useState(18);
  const [glowOpacity, setGlowOpacity] = useState(0.5);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Mouse position tracking
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Listen for music state changes
  useEffect(() => {
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

    const handleMusicToggle = (event: CustomEvent<{playing: boolean}>) => {
      setIsMusicPlaying(event.detail.playing);
    };
    
    window.addEventListener('message', handleMessage);
    window.addEventListener('musicToggled' as any, handleMusicToggle);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('musicToggled' as any, handleMusicToggle);
    };
  }, []);

  // Cursor glow animation - only when music is NOT playing
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

  const performanceImages = [
    {
      src: "/lovable-uploads/ee93ed3c-5a3d-4d50-a8d9-ddd3bc078b64.png",
      alt: "DEENGA performer with guitar on stage",
      title: "Live Performance"
    },
    {
      src: "/lovable-uploads/b035c85d-4482-4fcb-9476-3ecd769bb99c.png",
      alt: "DEENGA performer singing under blue stage lights",
      title: "Vocal Performance"
    },
    {
      src: "/lovable-uploads/dc8858c9-cd9a-4980-b123-1017a4ea7367.png",
      alt: "DEENGA guitarist performing on stage",
      title: "Guitar Solo"
    },
    {
      src: "/lovable-uploads/d4508a78-4d87-4a22-9798-f76c60712455.png",
      alt: "DEENGA bassist performing live",
      title: "Bass Performance"
    },
    {
      src: "/lovable-uploads/3cb0194f-0ff1-4a7e-98e1-6c61d679c9a2.png",
      alt: "DEENGA violinist on stage",
      title: "Violin Performance"
    },
    {
      src: "/lovable-uploads/202d70d9-adab-4ec2-9cea-007075b39807.png",
      alt: "DEENGA drummer performing live",
      title: "Drum Performance"
    },
    {
      src: "/lovable-uploads/a928a39d-6958-40bb-b9cb-88dc6f35298c.png",
      alt: "DEENGA lead vocalist performing",
      title: "Lead Vocals"
    },
    {
      src: "/lovable-uploads/6a4e217b-b065-4423-800a-0966e9fc60a2.png",
      alt: "DEENGA band member portrait",
      title: "Band Portrait"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ cursor: isMusicPlaying ? 'auto' : 'none' }}>
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

      <Navbar />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-white via-white/90 to-deenga-yellow/80 bg-clip-text text-transparent mb-6">
              Performance Gallery
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Capturing the energy and spirit of DEENGA's live performances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {performanceImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-deenga-yellow transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Selected performance"
            className="max-w-full max-h-full object-contain"
            onClick={() => setSelectedImage(null)}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
