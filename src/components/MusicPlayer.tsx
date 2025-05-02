
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerProps {
  title: string;
  artistName?: string;
  coverImage: string;
  audioSrc?: string;
  spotifyUrl: string;
}

const MusicPlayer = ({ title, artistName, coverImage, audioSrc, spotifyUrl }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioSrc) return;
    
    audioRef.current = new Audio(audioSrc);
    
    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    };
    
    const handleAudioEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleAudioEnd);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current && !audioSrc) {
      // If no audio source, redirect to Spotify
      window.open(spotifyUrl, '_blank');
      return;
    }
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col bg-[#14141c] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative aspect-square overflow-hidden group">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={cn(
          "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isPlaying && "opacity-100"
        )}>
          <button 
            onClick={togglePlay} 
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm music-button"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </button>
        </div>
        {audioSrc && isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/30">
            <div 
              className="h-full bg-deenga-purple" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-lg text-white">{title}</h3>
          {artistName && <p className="text-sm text-gray-400">{artistName}</p>}
        </div>
        <a 
          href={spotifyUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center mt-4 text-sm font-medium text-deenga-purple hover:underline"
        >
          <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Listen on Spotify
        </a>
      </div>
    </div>
  );
};

export default MusicPlayer;
