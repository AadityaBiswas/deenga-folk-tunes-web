import { cn } from "@/lib/utils";

const BandMembersSection = () => {
  const bandMembers = [
    {
      name: "Subhamoy Dey Sarkar",
      role: "Vocalist",
      image: "/lovable-uploads/a928a39d-6958-40bb-b9cb-88dc6f35298c.png"
    },
    {
      name: "Rakesh Debnath",
      role: "Guitarist",
      image: "/lovable-uploads/dc8858c9-cd9a-4980-b123-1017a4ea7367.png"
    },
    {
      name: "Sujoy Mitra",
      role: "Bassist",
      image: "/lovable-uploads/d4508a78-4d87-4a22-9798-f76c60712455.png"
    },
    {
      name: "Biswadeep Biswas",
      role: "Violinist",
      image: "/lovable-uploads/3cb0194f-0ff1-4a7e-98e1-6c61d679c9a2.png"
    },
    {
      name: "Indrajit Moitra",
      role: "Drummer",
      image: "/lovable-uploads/202d70d9-adab-4ec2-9cea-007075b39807.png"
    },
    {
      name: "Chirantan Mitra",
      role: "Guitarist",
      image: "/lovable-uploads/49481c08-cae3-4fbc-aec6-bf64f6d855ee.png"
    }
  ];

  return (
    <section id="band" className="section-padding bg-gradient-to-b from-black to-[#141824] relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white mb-16">
          Meet the <span className="text-deenga-purple">Band</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {bandMembers.map((member, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-t from-black/80 to-transparent"
            >
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {member.name}
                </h3>
                <p className="text-deenga-yellow font-medium text-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BandMembersSection;