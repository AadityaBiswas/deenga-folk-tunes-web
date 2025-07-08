import { useEffect, useState, useRef, useCallback } from 'react';

interface ColorState {
  r: number;
  g: number;
  b: number;
}

const MusicCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'image' | 'text' | 'default'>('default');
  const [currentColor, setCurrentColor] = useState<ColorState>({ r: 250, g: 204, b: 21 });
  
  const animationRef = useRef<number>();
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

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

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

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [updateMousePosition, handleMouseOver, handleMouseOut]);

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

  const colorString = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.3)`;
  const glowColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.15)`;

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
          border: `1px solid rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.2)`,
          boxShadow: `0 0 60px 20px ${glowColor}`,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default MusicCursor;