
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Youtube, Music } from "lucide-react";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center text-white">Get in <span className="text-deenga-purple">Touch</span></h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-lg font-medium text-white">Email</p>
                <a 
                  href="mailto:deengamusicoffical@gmail.com" 
                  className="text-gray-300 hover:text-deenga-purple transition-colors duration-200"
                >
                  deengamusicoffical@gmail.com
                </a>
              </div>
              
              <div>
                <p className="text-lg font-medium text-white">Phone</p>
                <a 
                  href="tel:+919748556483" 
                  className="text-gray-300 hover:text-deenga-purple transition-colors duration-200"
                >
                  +91 9748556483
                </a>
              </div>
              
              <div>
                <p className="text-lg font-medium text-white">Location</p>
                <p className="text-gray-300">Kolkata, India</p>
              </div>
              
              <div>
                <p className="text-lg font-medium text-white mb-3">Follow Us</p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/official.deenga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-deenga-dark flex items-center justify-center hover:bg-deenga-purple transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/deengaofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-deenga-dark flex items-center justify-center hover:bg-deenga-purple transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://youtube.com/@deengaofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-deenga-dark flex items-center justify-center hover:bg-deenga-purple transition-colors duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://open.spotify.com/artist/1zx7gKZWy8NJWCSYtMmdTD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-deenga-dark flex items-center justify-center hover:bg-deenga-purple transition-colors duration-300"
                    aria-label="Spotify"
                  >
                    <Music className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-6">Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-medium text-white mb-2">Message Sent!</h4>
                <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 text-deenga-purple hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-deenga-purple/50 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-deenga-purple/50 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-deenga-purple/50 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-deenga-purple/50 text-white"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full md:w-auto px-6 py-3 bg-gradient-to-r from-deenga-purple to-deenga-pink text-white font-medium rounded-full hover:shadow-lg hover:shadow-deenga-purple/30 transition-all duration-300 flex items-center justify-center",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
