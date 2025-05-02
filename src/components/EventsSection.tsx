
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  date: string;
  venue: string;
  location: string;
  ticketLink?: string;
  isHighlighted?: boolean;
}

const EventsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const upcomingEvents: Event[] = [
    {
      id: "e1",
      date: "June 18, 2025",
      venue: "Kolkata Music Festival",
      location: "Science City Auditorium, Kolkata",
      ticketLink: "#",
      isHighlighted: true
    },
    {
      id: "e2",
      date: "July 5, 2025",
      venue: "Summer Folk Fusion",
      location: "Rabindra Sadan, Kolkata",
      ticketLink: "#"
    },
    {
      id: "e3",
      date: "July 25, 2025",
      venue: "Bengal Cultural Night",
      location: "Nazrul Mancha, Kolkata"
    },
    {
      id: "e4",
      date: "August 12, 2025",
      venue: "Monsoon Music Retreat",
      location: "Phoenix MarketCity, Bangalore"
    },
    {
      id: "e5",
      date: "September 3, 2025",
      venue: "Folk Roots Festival",
      location: "Kamani Auditorium, New Delhi",
      ticketLink: "#"
    }
  ];
  
  // Only show first 3 events initially
  const visibleEvents = isExpanded ? upcomingEvents : upcomingEvents.slice(0, 3);

  return (
    <section 
      id="shows" 
      className="section-padding relative bg-gradient-to-b from-[#172032] to-[#191E2B]"
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/046893b7-e5e5-4e6b-b51c-a376b03b0b22.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      {/* Gradient overlay for transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#161A26] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white">Upcoming <span className="text-deenga-yellow">Shows</span></h2>
        
        <div className="grid gap-6 max-w-4xl mx-auto">
          {visibleEvents.map((event) => (
            <div 
              key={event.id}
              className={cn(
                "bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 group hover:bg-white/10 transition-colors duration-300",
                event.isHighlighted && "bg-deenga-purple/10 border-deenga-purple/30"
              )}
            >
              <div className="md:flex items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className={cn(
                    "text-xl font-medium text-white mb-1",
                    event.isHighlighted && "text-deenga-yellow"
                  )}>
                    {event.date}
                  </p>
                  <h3 className="text-2xl font-serif font-bold text-white">{event.venue}</h3>
                  <p className="text-white/70">{event.location}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {event.ticketLink && (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-deenga-purple text-white rounded-full hover:bg-deenga-pink transition-colors duration-300 flex-shrink-0"
                    >
                      Get Tickets
                    </a>
                  )}
                  {!event.ticketLink && (
                    <span className="text-white/50 text-sm">Tickets coming soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {upcomingEvents.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-5 py-2.5 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300"
            >
              {isExpanded ? "Show Less" : `View All Shows (${upcomingEvents.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
