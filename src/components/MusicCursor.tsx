import { useEffect, useState, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
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
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorState>({ r: 250, g: 204, b: 21 });
  
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);
  const colorTransitionRef = useRef(0);
  
  const brandColors = [
    { r: 250, g: 204, b: 21 },  // yellow
    { r: 139, g: 92, b: 246 },  // purple
    { r: 236, g: 72, b: 153 },  // pink
    { r: 56, g: 178, b: 172 },  // teal
  ];

  // Smooth color interpolation
  const lerpColor = useCallback((color1: ColorState, color2: ColorState, factor: number): ColorState => {
    return {
      r: Math.round(color1.r + (color2.r - color1.r) * factor),
      g: Math.round(color1.g + (color2.g - color1.g) * factor),
      b: Math.round(color1.b + (color2.b - color1.b) * factor),
    };
  }, []);

  const createParticle = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    
    return {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed * 0.3,
      vy: -Math.random() * 2 - 0.5, // Always drift upward
      life: 120,
      maxLife: 120,
      size: Math.random() * 3 + 2,
      opacity: 1,
    };
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Spawn particles on movement
    if (Math.random() < 0.4) {
      setParticles(prev => [...prev, createParticle(e.clientX, e.clientY)]);
    }
  }, [createParticle]);

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
    // Burst of particles on click
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        setParticles(prev => [...prev, createParticle(e.clientX, e.clientY)]);
      }, i * 20);
    }
  }, [createParticle]);

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      // Smooth color transition
      colorTransitionRef.current += 0.008;
      const colorIndex = Math.floor(colorTransitionRef.current) % brandColors.length;
      const nextColorIndex = (colorIndex + 1) % brandColors.length;
      const factor = colorTransitionRef.current - Math.floor(colorTransitionRef.current);
      
      const newColor = lerpColor(brandColors[colorIndex], brandColors[nextColorIndex], factor);
      setCurrentColor(newColor);

      // Update particles with physics
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.99, // Air resistance
          vy: particle.vy - 0.01, // Gravity (upward drift)
          life: particle.life - 1,
          opacity: (particle.life / particle.maxLife) * (particle.life > 20 ? 1 : particle.life / 20),
        })).filter(particle => particle.life > 0)
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
      case 'button': return 16;
      case 'image': return 14;
      case 'text': return 12;
      default: return 12;
    }
  };

  const getCursorScale = () => {
    return isHovering ? 1.8 : 1;
  };

  const colorString = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.8)`;
  const glowColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.4)`;

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
          boxShadow: `0 0 40px 8px ${glowColor}, 0 0 80px 16px ${glowColor}`,
          willChange: 'transform',
        }}
      />

      {/* Outer glow ring */}
      <div
        className="fixed pointer-events-none z-49 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${getCursorSize() * 4}px`,
          height: `${getCursorSize() * 4}px`,
          transform: `translate(${mousePosition.x - (getCursorSize() * 4)/2}px, ${mousePosition.y - (getCursorSize() * 4)/2}px) scale(${getCursorScale() * 0.8})`,
          border: `1px solid rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.5)`,
          boxShadow: `0 0 60px 20px ${glowColor}`,
          willChange: 'transform',
        }}
      />

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-48 rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(${particle.x - particle.size/2}px, ${particle.y - particle.size/2}px)`,
            opacity: particle.opacity,
            backgroundColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.size}px rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${particle.opacity * 0.5})`,
            filter: 'blur(0.5px)',
            willChange: 'transform',
          }}
        />
      ))}
    </>
  );
};

export default MusicCursor;