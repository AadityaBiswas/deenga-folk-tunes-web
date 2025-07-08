import { useEffect, useState, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface MusicNote {
  id: number;
  x: number;
  y: number;
  symbol: string;
  life: number;
  maxLife: number;
  color: string;
}

const EnhancedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'image' | 'text' | 'default'>('default');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [musicNotes, setMusicNotes] = useState<MusicNote[]>([]);
  
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);
  const noteIdRef = useRef(0);
  const colorIndexRef = useRef(0);
  
  const brandColors = [
    'rgba(250, 204, 21, 0.8)', // yellow
    'rgba(139, 92, 246, 0.8)', // purple
    'rgba(236, 72, 153, 0.8)', // pink
    'rgba(56, 178, 172, 0.8)', // teal
  ];
  
  const musicSymbols = ['♪', '♫', '♬', '♭', '♯', '𝄞'];

  const getCurrentColor = useCallback(() => {
    const time = Date.now() * 0.001;
    const index = Math.floor(time * 0.5) % brandColors.length;
    return brandColors[index];
  }, []);

  const createParticle = useCallback((x: number, y: number) => {
    return {
      id: particleIdRef.current++,
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 60,
      maxLife: 60,
      color: getCurrentColor(),
    };
  }, [getCurrentColor]);

  const createMusicNote = useCallback((x: number, y: number) => {
    return {
      id: noteIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      symbol: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
      life: 120,
      maxLife: 120,
      color: getCurrentColor(),
    };
  }, [getCurrentColor]);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Spawn particles occasionally
    if (Math.random() < 0.3) {
      setParticles(prev => [...prev, createParticle(e.clientX, e.clientY)]);
    }
    
    // Spawn music notes occasionally
    if (Math.random() < 0.1) {
      setMusicNotes(prev => [...prev, createMusicNote(e.clientX, e.clientY)]);
    }
  }, [createParticle, createMusicNote]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsHovering(true);
    
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      setHoverType('button');
    } else if (target.tagName === 'IMG' || target.closest('img')) {
      setHoverType('image');
    } else if (target.tagName === 'A' || target.closest('a') || target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
      setHoverType('text');
    } else {
      setHoverType('default');
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    setHoverType('default');
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Update particles
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
        })).filter(particle => particle.life > 0)
      );

      // Update music notes
      setMusicNotes(prev => 
        prev.map(note => ({
          ...note,
          y: note.y - 1,
          life: note.life - 1,
        })).filter(note => note.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [updateMousePosition, handleMouseOver, handleMouseOut]);

  const getCursorSize = () => {
    switch (hoverType) {
      case 'button': return 32;
      case 'image': return 28;
      case 'text': return 24;
      default: return 20;
    }
  };

  const getCursorOpacity = () => {
    return isHovering ? 0.8 : 0.6;
  };

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          width: `${getCursorSize()}px`,
          height: `${getCursorSize()}px`,
          transform: `translate(${mousePosition.x - getCursorSize()/2}px, ${mousePosition.y - getCursorSize()/2}px)`,
          opacity: getCursorOpacity(),
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: `0 0 30px 15px ${getCurrentColor()}`,
          filter: 'blur(2px)',
          willChange: 'transform',
        }}
      />

      {/* Secondary glow layer */}
      <div
        className="fixed pointer-events-none z-49 transition-all duration-300 ease-out"
        style={{
          width: `${getCursorSize() * 1.5}px`,
          height: `${getCursorSize() * 1.5}px`,
          transform: `translate(${mousePosition.x - (getCursorSize() * 1.5)/2}px, ${mousePosition.y - (getCursorSize() * 1.5)/2}px)`,
          opacity: getCursorOpacity() * 0.5,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: `0 0 50px 25px ${getCurrentColor()}`,
          filter: 'blur(4px)',
          willChange: 'transform',
        }}
      />

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-48"
          style={{
            width: '4px',
            height: '4px',
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            opacity: particle.life / particle.maxLife,
            borderRadius: '50%',
            background: particle.color,
            boxShadow: `0 0 10px 2px ${particle.color}`,
            filter: 'blur(0.5px)',
            willChange: 'transform',
          }}
        />
      ))}

      {/* Music Notes */}
      {musicNotes.map(note => (
        <div
          key={note.id}
          className="fixed pointer-events-none z-48 font-bold text-lg"
          style={{
            transform: `translate(${note.x}px, ${note.y}px)`,
            opacity: note.life / note.maxLife,
            color: note.color,
            textShadow: `0 0 10px ${note.color}`,
            filter: 'blur(0.2px)',
            willChange: 'transform',
          }}
        >
          {note.symbol}
        </div>
      ))}
    </>
  );
};

export default EnhancedCursor;