"use client"
import React, { useRef, useEffect } from 'react';

const Canvas = ({ imageData }: { imageData: Uint8ClampedArray }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageData && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imgData = new ImageData(imageData, 64, 64);
        ctx.putImageData(imgData, 0, 0);
      }
    }
  }, [imageData]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '256px', 
        height: '256px', 
        imageRendering: 'pixelated', 
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem'
      }} 
    />
  );
};

export default Canvas;