import React, { useState } from 'react';
import * as onnx from 'onnxruntime-web';
import Canvas from './canvas';
import Skin3DViewer from './skin3dviewer';

const MinecraftSkinGenerator = () => {
  const [skinURL, setSkinURL] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isRendered, setIsRendered] = useState(false); // Track rendering state

  const generateSkin = async () => {
    try {
      const session = await onnx.InferenceSession.create('/generator.onnx');

      // Generate random latent vector
      const latentVector = new Float32Array(128).map(() => Math.random() * 2 - 1);
      const inputTensor = new onnx.Tensor('float32', latentVector, [1, 128]);

      // Run inference
      const results = await session.run({ latent_vector: inputTensor });
      const outputTensor = results['generated_image'];

      // Validate shape (1, 3, 64, 64)
      const [batch, channels, height, width] = outputTensor.dims;
      if (batch !== 1 || channels !== 3 || height !== 64 || width !== 64) {
        throw new Error(`Unexpected output shape: ${outputTensor.dims}`);
      }

      // Process image data (CHW -> RGBA)
      const processedImg = outputTensor.data;
      const newImageData = new Uint8ClampedArray(64 * 64 * 4);

      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 64; x++) {
          const chwIndex = y * 64 + x;
          const hwcIndex = (y * 64 + x) * 4;

          newImageData[hwcIndex] = Math.round(((processedImg[chwIndex] + 1) / 2) * 255); // Red
          newImageData[hwcIndex + 1] = Math.round(((processedImg[chwIndex + 64 * 64] + 1) / 2) * 255); // Green
          newImageData[hwcIndex + 2] = Math.round(((processedImg[chwIndex + 2 * 64 * 64] + 1) / 2) * 255); // Blue
          newImageData[hwcIndex + 3] = 255; // Alpha
        }
      }

      // Set imageData for the canvas
      setImageData(newImageData);

      // Render to canvas
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const imgData = new ImageData(newImageData, 64, 64);
      ctx.putImageData(imgData, 0, 0);

      // Convert to image URL
      const skinDataURL = canvas.toDataURL();
      setSkinURL(skinDataURL);

      // Disable rendering until the render button is pressed again
      setIsRendered(false);

    } catch (error) {
      console.error('Error running ONNX model:', error);
    }
  };

  const handleRender = () => {
    // Toggle render state on button click
    setIsRendered((prevState) => !prevState);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={generateSkin}>Generate Skin</button>
      <button onClick={handleRender} disabled={!skinURL}>Render in 3D</button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {imageData && <Canvas imageData={imageData} />}
        {/* Render Skin3DViewer only when Render button is clicked */}
        {isRendered && <Skin3DViewer skinURL={skinURL} />}
      </div>
    </div>
  );
};

export default MinecraftSkinGenerator;
