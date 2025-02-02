"use client"
import React, { useEffect, useRef } from 'react';
import { SkinViewer, WalkingAnimation } from 'skinview3d';

const Skin3DViewer = ({ skinURL }: { skinURL: string }) => {
  const skinContainerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!skinURL || !skinContainerRef.current) return;

    const skinViewer = new SkinViewer({
      canvas: skinContainerRef.current,
      width: 300,
      height: 400,
      skin: skinURL,
    });

    skinViewer.animation = new WalkingAnimation();
    skinViewer.animation.speed = 1;

    // Cleanup
    return () => {
      skinViewer.dispose();
    };
  }, [skinURL]);

  return (
    <canvas
      ref={skinContainerRef}
      style={{ 
        width: '300px', 
        height: '400px', 
        borderRadius: '0.5rem',
        border: '1px solid rgba(255,255,255,0.1)' 
      }}
    />
  );
};

export default Skin3DViewer;