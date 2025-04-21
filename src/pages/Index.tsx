
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import EventsSection from "../components/EventsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deenga-dark via-black to-deenga-purple/30 text-white">
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-deenga-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-deenga-pink/10 rounded-full blur-2xl animate-float"></div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
            }}
          ></div>

          {/* Diagonal lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-45"
                style={{
                  top: `${i * 20}%`,
                  left: '-50%',
                  width: '200%',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <AlbumSection />
          <EventsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
