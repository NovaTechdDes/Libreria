'use client';

import React, { useRef, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const DragScrollContainer = ({ children, className = '' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const dragInfo = useRef({
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    lastX: 0,
    rafId: 0,
  });

  useEffect(() => {
    return () => {
      if (dragInfo.current.rafId) {
        cancelAnimationFrame(dragInfo.current.rafId);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    if (dragInfo.current.rafId) {
      cancelAnimationFrame(dragInfo.current.rafId);
    }

    setIsDown(true);
    setHasDragged(false);

    dragInfo.current.startX = e.pageX - container.offsetLeft;
    dragInfo.current.scrollLeft = container.scrollLeft;
    dragInfo.current.lastX = e.pageX;
    dragInfo.current.velocity = 0;
  };

  const handleMouseLeave = () => {
    if (isDown) {
      setIsDown(false);
      startInertia();
    }
  };

  const handleMouseUp = () => {
    if (isDown) {
      setIsDown(false);
      startInertia();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    const container = containerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;

    if (Math.abs(walk) > 5) {
      setHasDragged(true);
      
      const deltaX = e.pageX - dragInfo.current.lastX;
      dragInfo.current.velocity = -deltaX * 1.3;
      dragInfo.current.lastX = e.pageX;

      container.scrollLeft = dragInfo.current.scrollLeft - walk;
    }
  };

  const startInertia = () => {
    const container = containerRef.current;
    if (!container) return;

    const step = () => {
      dragInfo.current.velocity *= 0.95; // factor de desaceleración

      if (Math.abs(dragInfo.current.velocity) > 0.2) {
        container.scrollLeft += dragInfo.current.velocity;
        dragInfo.current.rafId = requestAnimationFrame(step);
      } else {
        dragInfo.current.velocity = 0;
      }
    };

    dragInfo.current.rafId = requestAnimationFrame(step);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ 
        scrollBehavior: isDown ? 'auto' : 'smooth',
        scrollSnapType: isDown ? 'none' : 'x proximity'
      }}
    >
      {children}
    </div>
  );
};
