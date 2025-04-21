
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right bottom, rgba(15, 23, 42, 0.85), rgba(88, 28, 135, 0.85)), url('/lovable-uploads/86e98c92-8dc6-4e3a-b311-11249f01f10b.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center pt-20">
        <h1 className={cn(
          "text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 transition-all duration-1000 opacity-0 translate-y-4",
          isLoaded && "opacity-100 translate-y-0"
        )}>
          <span className="block">DEENGA</span>
        </h1>
        
        <p className={cn(
          "text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 opacity-0 translate-y-4",
          isLoaded && "opacity-100 translate-y-0"
        )}>
          The vibrant sounds of West Bengal's folk heritage, reimagined for today
        </p>
        
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 opacity-0 translate-y-4",
          isLoaded && "opacity-100 translate-y-0"
        )}>
          <a 
            href="#music" 
            className="px-6 py-3 bg-gradient-to-r from-deenga-purple to-deenga-pink text-white font-medium rounded-full hover:shadow-lg hover:shadow-deenga-purple/30 transition-all duration-300"
          >
            Listen Now
          </a>
          <a 
            href="#shows" 
            className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Upcoming Shows
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
