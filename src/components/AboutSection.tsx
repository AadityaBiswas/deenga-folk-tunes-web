
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const bandMembers = [
    { name: "Subhamoy Dey Sarkar", role: "Vocal" },
    { name: "Biswadeep Biswas", role: "Violin" },
    { name: "Indrajit Maitra", role: "Drums" },
    { name: "Sujoy Maitra", role: "Bass" },
    { name: "Rakesh Debnath", role: "Guitar" },
    { name: "Chirantan Mitra", role: "Guitar" },
    { name: "Sarthak Bhattacharjee", role: "Sound Engineer" },
  ];

  return (
    <section id="about" className="section-padding bg-[#1A1F2C] relative">
      {/* Gradient overlay at the top for a smooth transition from the hero section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-0"></div>
      
      {/* Gradient overlay for transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#141824] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white">About <span className="text-deenga-purple">Deenga</span></h2>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/915086b4-9bb5-44af-b62e-4246d93603d8.png" 
                alt="Deenga performing on stage" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-deenga-blue/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-deenga-purple/10 rounded-full -z-10"></div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-300">
              With over <span className="font-medium text-white">23 years of experience</span> in performing live concerts, 
              Deenga has established itself as a pioneering folk band in India. Our music is a vibrant 
              representation of rural West Bengal's rich cultural heritage, blended with contemporary elements.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              We've released two acclaimed albums that showcase our musical journey:
            </p>
            <ul className="space-y-2 pl-5">
              <li className="text-lg text-gray-300 flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-deenga-purple mt-2 mr-2"></span>
                <span><strong>"Doob Satar"</strong> (2013) - featuring 6 rural folk numbers blended with modern elements (Universal Music India)</span>
              </li>
              <li className="text-lg text-gray-300 flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-deenga-purple mt-2 mr-2"></span>
                <span><strong>"Ghum Bhangche"</strong> (2023) - our latest album showcasing our growth and versatility</span>
              </li>
            </ul>
            <div className="pt-4">
              <h3 className="font-serif text-xl font-semibold text-white mb-4">The Band</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {bandMembers.map((member) => (
                  <div key={member.name} className="group">
                    <p className="font-medium text-white group-hover:text-deenga-purple transition-colors">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
