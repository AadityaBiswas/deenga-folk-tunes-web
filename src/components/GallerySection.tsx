const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/lovable-uploads/fadb19dd-8872-4dfe-a4cd-a00461e135c6.png",
      alt: "Concert venue with warm lighting and stage setup"
    },
    {
      id: 2,
      src: "/lovable-uploads/337128e9-8929-4890-9509-fef162810671.png",
      alt: "Concert performance with yellow stage lights"
    },
    {
      id: 3,
      src: "/lovable-uploads/1ee88e67-335c-47b1-a400-95b06fcb6676.png",
      alt: "Full band performance with stage setup"
    },
    {
      id: 4,
      src: "/lovable-uploads/e7f751cb-d856-409e-a134-a1c7fff565d2.png",
      alt: "Live performance with dramatic blue and purple lighting"
    },
    {
      id: 5,
      src: "/lovable-uploads/4f6fe093-e996-460c-93d9-c05cae804d00.png",
      alt: "Live performance with dramatic red and blue lights"
    },
    {
      id: 6,
      src: "/lovable-uploads/a12b8d7b-e380-4ba6-a786-ac57ad38c7bb.png",
      alt: "Band performing on stage with backdrop"
    },
    {
      id: 7,
      src: "/lovable-uploads/e73f8227-5c6f-4f11-a4ee-7e51231d1762.png",
      alt: "Concert performance with crowd and colorful stage lighting"
    },
    {
      id: 8,
      src: "/lovable-uploads/7220017e-7549-4813-bae9-78f494efab37.png",
      alt: "Full band performance with blue backdrop and crowd"
    },
    {
      id: 9,
      src: "/lovable-uploads/e3a086b0-c296-49b7-8f54-30d88a423bbf.png",
      alt: "Deenga band group photo with awards and recognition"
    }
  ];

  return (
    <section id="gallery" className="section-padding relative bg-gradient-to-b from-[#172032] to-[#141824]">
      {/* Gradient overlay for transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#141824] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white">
          Live <span className="text-deenga-purple">Gallery</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-2xl bg-[#14141c]/50 backdrop-blur-sm border border-gray-800 hover:border-deenga-purple/50 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;