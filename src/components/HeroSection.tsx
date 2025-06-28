import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Music, VolumeX } from "lucide-react";
import { dispatchMusicToggleEvent } from "../utils/eventBus";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLIFrameElement | null>(null);
  const [iconTransition, setIconTransition] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleScrollToMusic = (e: React.MouseEvent) => {
    e.preventDefault();
    const musicSection = document.getElementById("music");
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleMusic = () => {
    setIconTransition(true);
    
    const newMusicState = !isMusicPlaying;
    
    if (!isMusicPlaying) {
      setContentVisible(false);
    } else {
      setContentVisible(true);
    }
    
    setTimeout(() => {
      setIsMusicPlaying(newMusicState);
      
      if (videoRef) {
        const command = isMusicPlaying ? 'mute' : 'unMute';
        videoRef.contentWindow?.postMessage(JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }), '*');
      }
      
      dispatchMusicToggleEvent(newMusicState);
      
      setTimeout(() => setIconTransition(false), 300);
    }, 300);
  };

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ width: '100vw', margin: 0, padding: 0 }}
    >
      {/* Video Background with full section coverage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Black tint overlay with fade-out animation when music is playing */}
        <div className={cn(
          "absolute inset-0 bg-black/65 z-10 transition-opacity duration-1000",
          !contentVisible && "opacity-0"
        )} />
        
        {/* Video container sized to cover the entire viewport */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            ref={setVideoRef}
            src="https://www.youtube.com/embed/dq2bBjBMUNI?autoplay=1&mute=1&controls=0&loop=1&playlist=dq2bBjBMUNI&playsinline=1&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&hd=1&vq=hd1080"
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'max(100vw, 177.78vh)', // Ensure minimum coverage
              height: 'max(100vh, 56.25vw)', // Ensure minimum coverage
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              border: 'none',
              objectFit: 'cover'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Background video"
            frameBorder="0"
          />
        </div>
      </div>
      
      <div className={cn(
        "container mx-auto px-4 relative z-20 transition-opacity duration-1000",
        !contentVisible && "opacity-0 pointer-events-none"
      )}>
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-white via-white/90 to-deenga-yellow/80 bg-clip-text text-transparent transition-all duration-1000 opacity-0 scale-95",
            isLoaded && "opacity-100 scale-100"
          )}>
            DEENGA
          </h1>
          
          <p className={cn(
            "text-sm md:text-base text-white/80 max-w-lg mx-auto transition-all duration-1000 delay-300 opacity-0 translate-y-4",
            isLoaded && "opacity-100 translate-y-0"
          )}>
            The vibrant sounds of West Bengal's folk heritage, reimagined for today
          </p>
          
          <div className={cn(
            "flex justify-center transition-all duration-1000 opacity-0 translate-y-4",
            isLoaded && "opacity-100 translate-y-0 delay-[2000ms]"
          )}>
            <a 
              href="#music" 
              onClick={handleScrollToMusic}
              className="group relative px-5 py-2 bg-transparent text-xs sm:text-sm rounded-full overflow-hidden hover:bg-white/10 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-1 text-white">
                Listen Now
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Music control button */}
      <button 
        onClick={toggleMusic}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 p-4 rounded-full bg-transparent hover:bg-white/10 transition-all duration-500 border border-white/20"
        aria-label={isMusicPlaying ? "Turn music off" : "Turn music on"}
      >
        <div className="relative">
          {/* Icon container with transition animation */}
          <div className={`relative transition-transform duration-500 ${iconTransition ? 'scale-0' : 'scale-100'}`}>
            {isMusicPlaying ? (
              <Music className="w-6 h-6 text-white transition-all duration-300" />
            ) : (
              <VolumeX className="w-6 h-6 text-white transition-all duration-300" />
            )}
          </div>
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
