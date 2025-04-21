
import { Facebook, Instagram, Youtube, Music } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-deenga-dark py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-serif font-bold">DEENGA</h3>
            <p className="text-white/60 mt-1">Folk Rock | Kolkata, India</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/official.deenga"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://www.instagram.com/deengaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://youtube.com/@deengaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a 
              href="https://open.spotify.com/artist/1zx7gKZWy8NJWCSYtMmdTD"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Spotify"
            >
              <Music className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>© {currentYear} Deenga Folk Band. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Contact: deengamusicoffical@gmail.com | +91 9748556483</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
