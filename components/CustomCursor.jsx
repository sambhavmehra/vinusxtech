'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Framer Motion values for the outer circle (with spring physics)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Framer Motion values for the inner dot (instant following)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    // Only run on client and devices with fine pointers (desktops)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsMounted(true);

      const moveCursor = (e) => {
        cursorX.set(e.clientX - 16); // Center outer circle (32px / 2)
        cursorY.set(e.clientY - 16);
        dotX.set(e.clientX - 4);     // Center inner dot (8px / 2)
        dotY.set(e.clientY - 4);
      };

      const handleMouseOver = (e) => {
        // Expand cursor when hovering over interactive elements
        const target = e.target;
        if (
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('interactive')
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      // Hide default cursor globally for desktops
      document.documentElement.classList.add('hide-cursor');

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.documentElement.classList.remove('hide-cursor');
      };
    }
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Outer Circle (Trailing effect) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Inner Dot (Instant effect) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity: isHovering ? 0 : 1, // Hide dot when outer circle is filled
          scale: isClicking ? 0.5 : 1,
        }}
      />
    </>
  );
}
