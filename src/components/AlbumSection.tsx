
import MusicPlayer from "./MusicPlayer";

const AlbumSection = () => {
  const albums = [
    {
      id: "doob-satar",
      title: "Doob Satar",
      year: 2013,
      coverImage: "/lovable-uploads/172d8d49-81eb-4d02-9455-5458576680d1.png",
      spotifyUrl: "https://open.spotify.com/album/6j3BmgWzmvIkhoJYi6J7HT?si=PLADhTGjTjuZ_-n15t6ciw",
      tracks: [
        { title: "Jhiri Jhiri Bristi" },
        { title: "Khaja Baba" },
        { title: "Bhoot" },
        { title: "Rai" },
        { title: "Tomari naam e" },
        { title: "Ami Dekhechi" }
      ]
    },
    {
      id: "ghum-bhangche",
      title: "Ghum Bhangche",
      year: 2023,
      coverImage: "/lovable-uploads/428af1d2-fbf9-4eec-b2cd-1c2c568ac443.png",
      spotifyUrl: "https://open.spotify.com/artist/1zx7gKZWy8NJWCSYtMmdTD?si=gLOjoEv0Q8G4axJ7NdGOnQ",
      tracks: [
        { title: "Radha Radha" },
        { title: "Dine Dine" },
        { title: "Ghum Bhangche" },
        { title: "Khejur" },
        { title: "Khaja Baba" },
        { title: "Pagol" }
      ]
    }
  ];
  
  const featuredSongs = [
    {
      title: "Ghum Bhangche",
      artistName: "Deenga",
      coverImage: "/lovable-uploads/3658bc2e-7c49-4de7-8972-d7cbd605390e.png",
      spotifyUrl: "https://open.spotify.com/track/5PYCXXIEV4btw6kkJr9XGH?si=mOGDfOX5Qo6vXWE7NU5pEw"
    },
    {
      title: "Radhabhabi",
      artistName: "Deenga",
      coverImage: "/lovable-uploads/5964242e-f830-4719-a1fe-09dd6e1ece60.png",
      spotifyUrl: "https://open.spotify.com/track/7EBOwk8UKEVMzUTBaetiZN?si=XKe-h0BgSleCypUMBmI4wA"
    }
  ];

  return (
    <section id="music" className="section-padding relative bg-gradient-to-b from-[#141824] to-[#1A1F2C]">
      {/* Gradient overlay for transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#172032] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center text-white">Our <span className="text-deenga-purple">Music</span></h2>
        
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8 text-white">Featured Songs</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredSongs.map((song) => (
              <div key={song.title} className="bg-[#14141c]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 overflow-hidden">
                <MusicPlayer
                  key={song.title}
                  title={song.title}
                  artistName={song.artistName}
                  coverImage={song.coverImage}
                  spotifyUrl={song.spotifyUrl}
                />
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8 text-white">Albums</h3>
        
        <div className="space-y-16">
          {albums.map((album) => (
            <div key={album.id} className="bg-[#14141c]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 shadow-md">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div>
                  <div className="relative w-full max-w-xs mx-auto md:mx-0">
                    <img 
                      src={album.coverImage} 
                      alt={`${album.title} album cover`} 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-deenga-purple/10 w-full h-full rounded-lg -z-10"></div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-white">
                      {album.title}
                    </h4>
                    <span className="text-deenga-purple font-medium">{album.year}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-medium text-gray-300 mb-3">Tracklist:</h5>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {album.tracks.map((track, index) => (
                        <div key={track.title} className="flex items-center group">
                          <span className="w-6 text-deenga-purple font-medium">{index + 1}</span>
                          <span className="text-gray-300 group-hover:text-deenga-purple transition-colors">
                            {track.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href={album.spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f1219] text-white rounded-full hover:bg-deenga-purple transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Stream on Spotify
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlbumSection;
