
import { Facebook, Instagram, Youtube, Music, Twitter } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative bg-gradient-to-b from-[#172032] to-[#13151D]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-deenga-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-deenga-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-deenga-purple/5 to-deenga-pink/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white mb-16">Get in <span className="text-deenga-purple">Touch</span></h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Contact Information Card */}
          <div className="bg-gradient-to-br from-[#14141c]/80 to-[#0f1219]/80 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-semibold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-300 text-lg">Reach out to us for collaborations, bookings, or just to say hello!</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Email */}
              <div className="group">
                <div className="bg-[#0f1219]/50 border border-gray-700/50 rounded-2xl p-6 hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-deenga-purple to-deenga-pink rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-white">Email</p>
                  </div>
                  <a 
                    href="mailto:deengamusicoffical@gmail.com" 
                    className="text-gray-300 hover:text-deenga-purple transition-colors duration-200 text-sm"
                  >
                    deengamusicoffical@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <div className="bg-[#0f1219]/50 border border-gray-700/50 rounded-2xl p-6 hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-deenga-purple to-deenga-pink rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-white">Phone</p>
                  </div>
                  <a 
                    href="tel:+919748556483" 
                    className="text-gray-300 hover:text-deenga-purple transition-colors duration-200"
                  >
                    +91 9748556483
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="group md:col-span-2">
                <div className="bg-[#0f1219]/50 border border-gray-700/50 rounded-2xl p-6 hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-deenga-purple to-deenga-pink rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-white">Location</p>
                  </div>
                  <p className="text-gray-300">Kolkata, India</p>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="text-center">
              <p className="text-xl font-medium text-white mb-6">Follow Our Journey</p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="https://www.facebook.com/official.deenga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0f1219] to-[#14141c] border border-gray-700/50 flex items-center justify-center hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-deenga-purple/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-white group-hover:text-deenga-purple transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.instagram.com/deengaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0f1219] to-[#14141c] border border-gray-700/50 flex items-center justify-center hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-deenga-purple/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-white group-hover:text-deenga-purple transition-colors duration-300" />
                </a>
                <a 
                  href="https://x.com/deenga_official?s=11&t=vuhyk1TdBLUChKuy6Wr0bQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0f1219] to-[#14141c] border border-gray-700/50 flex items-center justify-center hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-deenga-purple/20"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="h-6 w-6 text-white group-hover:text-deenga-purple transition-colors duration-300" />
                </a>
                <a 
                  href="https://youtube.com/@deengaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0f1219] to-[#14141c] border border-gray-700/50 flex items-center justify-center hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-deenga-purple/20"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6 text-white group-hover:text-deenga-purple transition-colors duration-300" />
                </a>
                <a 
                  href="https://open.spotify.com/artist/1zx7gKZWy8NJWCSYtMmdTD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0f1219] to-[#14141c] border border-gray-700/50 flex items-center justify-center hover:border-deenga-purple/50 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg hover:shadow-deenga-purple/20"
                  aria-label="Spotify"
                >
                  <Music className="h-6 w-6 text-white group-hover:text-deenga-purple transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
