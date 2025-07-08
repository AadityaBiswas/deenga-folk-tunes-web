import { useEffect, useState, useRef, useCallback } from 'react';

interface MusicNote {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  symbol: string;
  size: number;
  opacity: number;
}

interface ColorState {
  r: number;
  g: number;
  b: number;
}

const MusicCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'image' | 'text' | 'default'>('default');
  const [musicNotes, setMusicNotes] = useState<MusicNote[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorState>({ r: 250, g: 204, b: 21 });
  
  const animationRef = useRef<number>();
  const noteIdRef = useRef(0);
  const colorTransitionRef = useRef(0);
  
  const brandColors = [
    { r: 250, g: 204, b: 21 },  // yellow
    { r: 139, g: 92, b: 246 },  // purple
    { r: 236, g: 72, b: 153 },  // pink
    { r: 56, g: 178, b: 172 },  // teal
  ];
  
  const musicSymbols = ['♪', '♫', '♬', '♭', '♯', '𝄞', '♩', '♮'];

  // Smooth color interpolation
  const lerpColor = useCallback((color1: ColorState, color2: ColorState, factor: number): ColorState => {
    return {
      r: Math.round(color1.r + (color2.r - color1.r) * factor),
      g: Math.round(color1.g + (color2.g - color1.g) * factor),
      b: Math.round(color1.b + (color2.b - color1.b) * factor),
    };
  }, []);

  const createMusicNote = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    
    return {
      id: noteIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * speed * 0.5,
      vy: Math.sin(angle) * speed - Math.random() * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      life: 180,
      maxLife: 180,
      symbol: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
      size: Math.random() * 8 + 12,
      opacity: 1,
    };
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Spawn music notes on movement
    if (Math.random() < 0.15) {
      setMusicNotes(prev => [...prev, createMusicNote(e.clientX, e.clientY)]);
    }
  }, [createMusicNote]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsHovering(true);
    
    if (target.tagName === 'BUTTON' || target.closest('button') || target.role === 'button') {
      setHoverType('button');
    } else if (target.tagName === 'IMG' || target.closest('img')) {
      setHoverType('image');
    } else if (target.tagName === 'A' || target.closest('a') || 
               ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN'].includes(target.tagName)) {
      setHoverType('text');
    } else {
      setHoverType('default');
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    setHoverType('default');
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    // Burst of notes on click
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setMusicNotes(prev => [...prev, createMusicNote(e.clientX, e.clientY)]);
      }, i * 50);
    }
  }, [createMusicNote]);

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      // Smooth color transition
      colorTransitionRef.current += 0.008; // Slower transition for smoothness
      const colorIndex = Math.floor(colorTransitionRef.current) % brandColors.length;
      const nextColorIndex = (colorIndex + 1) % brandColors.length;
      const factor = colorTransitionRef.current - Math.floor(colorTransitionRef.current);
      
      const newColor = lerpColor(brandColors[colorIndex], brandColors[nextColorIndex], factor);
      setCurrentColor(newColor);

      // Update music notes
      setMusicNotes(prev => 
        prev.map(note => ({
          ...note,
          x: note.x + note.vx,
          y: note.y + note.vy,
          vy: note.vy - 0.02, // Slight upward drift
          rotation: note.rotation + note.rotationSpeed,
          life: note.life - 1,
          opacity: (note.life / note.maxLife) * (note.life > 30 ? 1 : note.life / 30),
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
  }, [lerpColor]);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [updateMousePosition, handleMouseOver, handleMouseOut, handleClick]);

  const getCursorSize = () => {
    switch (hoverType) {
      case 'button': return 8;
      case 'image': return 6;
      case 'text': return 4;
      default: return 6;
    }
  };

  const getCursorScale = () => {
    return isHovering ? 1.5 : 1;
  };

  const colorString = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-200 ease-out"
        style={{
          width: `${getCursorSize()}px`,
          height: `${getCursorSize()}px`,
          transform: `translate(${mousePosition.x - getCursorSize()/2}px, ${mousePosition.y - getCursorSize()/2}px) scale(${getCursorScale()})`,
          backgroundColor: colorString,
          boxShadow: `0 0 20px 4px ${colorString}40, 0 0 40px 8px ${colorString}20`,
          willChange: 'transform',
        }}
      />

      {/* Outer glow ring */}
      <div
        className="fixed pointer-events-none z-49 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${getCursorSize() * 3}px`,
          height: `${getCursorSize() * 3}px`,
          transform: `translate(${mousePosition.x - (getCursorSize() * 3)/2}px, ${mousePosition.y - (getCursorSize() * 3)/2}px) scale(${getCursorScale() * 0.8})`,
          border: `1px solid ${colorString}60`,
          boxShadow: `0 0 30px 10px ${colorString}20`,
          willChange: 'transform',
        }}
      />

      {/* Floating Music Notes */}
      {musicNotes.map(note => (
        <div
          key={note.id}
          className="fixed pointer-events-none z-48 font-bold select-none"
          style={{
            fontSize: `${note.size}px`,
            transform: `translate(${note.x}px, ${note.y}px) rotate(${note.rotation}deg)`,
            opacity: note.opacity,
            color: colorString,
            textShadow: `0 0 20px ${colorString}80, 0 0 40px ${colorString}40`,
            filter: `drop-shadow(0 0 10px ${colorString})`,
            willChange: 'transform',
            fontFamily: 'serif',
          }}
        >
          {note.symbol}
        </div>
      ))}
    </>
  );
};

export default MusicCursor;