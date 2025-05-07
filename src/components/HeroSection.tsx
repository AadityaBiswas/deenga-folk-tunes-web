
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000); // Set 5 second delay for initial fade-in

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

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ width: '100vw', margin: 0, padding: 0 }}
    >
      {/* Video Background with maximum coverage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Black tint overlay */}
        <div className="absolute inset-0 bg-black/65 z-10" />
        
        {/* Video container with enhanced positioning */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/dq2bBjBMUNI?autoplay=1&mute=1&controls=0&loop=1&playlist=dq2bBjBMUNI&playsinline=1&showinfo=0&rel=0&modestbranding=1"
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120vw', /* Increased from 100vw to 120vw */
              height: '120vh', /* Increased from 100vh to 120vh */
              transform: 'translate(-50%, -50%) scale(1.2)', /* Increased scale from 1.05 to 1.2 */
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
      
      <div className="container mx-auto px-4 relative z-20">
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
            isLoaded && "opacity-100 translate-y-0 delay-[2000ms]" // 7 seconds total (5s initial delay + 2s additional delay)
          )}>
            <a 
              href="#music" 
              onClick={handleScrollToMusic}
              className="group relative px-5 py-2 bg-white/10 backdrop-blur-sm text-xs sm:text-sm rounded-full overflow-hidden hover:bg-white/20 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-1 text-white">
                Listen Now
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

