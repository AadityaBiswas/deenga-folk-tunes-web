
import { cn } from "@/lib/utils";

const AboutSection = () => {

  return (
    <section id="about" className="section-padding bg-black relative">
      {/* Seamless connection to hero section - no gradient, same color */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-black z-0"></div>
      
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
              In rural Bengal amongst the numerous estuaries and aqueducts, the most available mode of transport is a 'dingee' or 'nouko' or 'Deenga' which colloquially means a small boat in Bengali. These small boats float very lucidly amongst the bouncy waves of the branches created by the River Ganges. When u see and observe these boats from the banks, its seems that they are enjoying the tremulous waves of the river coming at them and singing a song to themselves with the boatman joining in at times. Thus, our Deenga is almost the same compared to the 'small boats' of the Ganges, Brahmaputra, Padma or any other rivers of India and Bangladesh. These boats have a great importance in the folklore and folk music of Bengal. The boatmen themselves have a song of their own which is like the rhythmic bounce of the boat and the form is known as 'Bhatiali'. These boats have ferried many songs on their back, be it Chatka, Jhumur, Bhavaiyyaand for that matter Lalon Fakir and Rabindranath Tagore too. So we as Deenga also try to ferry these songs as well as Lalon Fakir and Rabindranath Tagore on the backs of 5 boatmen. Deenga started his journey from 10th January 2002. We as Deenga try and keep the essence of rural Bengal and Bangladesh in the tunes we produce using modern instruments as our oars.
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
