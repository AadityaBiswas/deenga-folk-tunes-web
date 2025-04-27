
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with premium gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(15, 23, 42, 0.9), rgba(88, 28, 135, 0.9)), url('/lovable-uploads/86e98c92-8dc6-4e3a-b311-11249f01f10b.png')`
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className={cn(
            "text-7xl md:text-8xl lg:text-9xl font-serif font-bold bg-gradient-to-r from-white via-white/90 to-deenga-yellow/80 bg-clip-text text-transparent transition-all duration-1000 opacity-0 scale-95",
            isLoaded && "opacity-100 scale-100"
          )}>
            DEENGA
          </h1>
          
          <p className={cn(
            "text-xl md:text-2xl text-white/80 max-w-2xl mx-auto transition-all duration-1000 delay-300 opacity-0 translate-y-4",
            isLoaded && "opacity-100 translate-y-0"
          )}>
            The vibrant sounds of West Bengal's folk heritage, reimagined for today
          </p>
          
          <div className={cn(
            "flex justify-center transition-all duration-1000 delay-500 opacity-0 translate-y-4",
            isLoaded && "opacity-100 translate-y-0"
          )}>
            <a 
              href="#music" 
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden hover:bg-white/20 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                Listen Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
