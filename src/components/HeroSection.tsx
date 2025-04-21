
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(15, 23, 42, 0.85), rgba(88, 28, 135, 0.85)), url('/lovable-uploads/86e98c92-8dc6-4e3a-b311-11249f01f10b.png')`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-20">
          {/* Left column - Text content */}
          <div className="text-left space-y-6">
            <h1 className={cn(
              "text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white transition-all duration-1000 opacity-0 translate-x-[-50px]",
              isLoaded && "opacity-100 translate-x-0"
            )}>
              DEENGA
            </h1>
            
            <p className={cn(
              "text-xl md:text-2xl text-white/80 max-w-2xl transition-all duration-1000 delay-300 opacity-0 translate-x-[-30px]",
              isLoaded && "opacity-100 translate-x-0"
            )}>
              The vibrant sounds of West Bengal's folk heritage, reimagined for today
            </p>
            
            <div className={cn(
              "flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-500 opacity-0 translate-y-10",
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
              <a 
                href="#shows" 
                className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Upcoming Shows
              </a>
            </div>
          </div>

          {/* Right column - Decorative elements */}
          <div className={cn(
            "relative h-[500px] transition-all duration-1000 delay-700 opacity-0 translate-x-20",
            isLoaded && "opacity-100 translate-x-0"
          )}>
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-32 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 transform hover:scale-105 transition-transform duration-500"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  ></div>
                ))}
              </div>
              <div className="space-y-4 pt-8">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-32 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 transform hover:scale-105 transition-transform duration-500"
                    style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
