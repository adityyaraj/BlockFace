"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as onnx from 'onnxruntime-web'
import Canvas from '@/components/canvas'
import Skin3DViewer from '@/components/skin3dviewer'

interface MinecraftVersion {
  value: string;
  label: string;
}

export default function GeneratePage() {
  const [skinURL, setSkinURL] = useState<string | null>(null)
  const [imageData, setImageData] = useState<Uint8ClampedArray | null>(null)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [showIn3D, setShowIn3D] = useState<boolean>(false)
  const [generatorVersion, setGeneratorVersion] = useState<string>("v3") // Default to v3

  const generateSkin = async () => {
    try {
      setIsGenerating(true)
      const modelPath = generatorVersion === "v3" ? '/generatorv3.onnx' : '/generatorv5.onnx'
      const session = await onnx.InferenceSession.create(modelPath)
      
      // Generate random latent vector
      const latentVector = new Float32Array(128).map(() => Math.random() * 2 - 1)
      const inputTensor = new onnx.Tensor('float32', latentVector, [1, 128])
      
      // Run inference
      const results = await session.run({ latent_vector: inputTensor })
      const outputTensor = results['generated_image']
      
      // Validate shape (1, 3, 64, 64)
      const [batch, channels, height, width] = outputTensor.dims
      if (batch !== 1 || channels !== 3 || height !== 64 || width !== 64) {
        throw new Error(`Unexpected output shape: ${outputTensor.dims}`)
      }
      
      // Process image data (CHW -> RGBA)
      const processedImg = outputTensor.data as Float32Array
      const newImageData = new Uint8ClampedArray(64 * 64 * 4)
      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 64; x++) {
          const chwIndex = y * 64 + x
          const hwcIndex = (y * 64 + x) * 4
          newImageData[hwcIndex] = Math.round(((processedImg[chwIndex] + 1) / 2) * 255)
          newImageData[hwcIndex + 1] = Math.round(((processedImg[chwIndex + 64 * 64] + 1) / 2) * 255)
          newImageData[hwcIndex + 2] = Math.round(((processedImg[chwIndex + 2 * 64 * 64] + 1) / 2) * 255)
          newImageData[hwcIndex + 3] = 255
        }
      }
      
      setImageData(newImageData)
      
      // Convert to image URL
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Could not get 2D context')
      }
      const imgData = new ImageData(newImageData, 64, 64)
      ctx.putImageData(imgData, 0, 0)
      const skinDataURL = canvas.toDataURL()
      setSkinURL(skinDataURL)
      
    } catch (error) {
      console.error('Error running ONNX model:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (skinURL) {
      const link = document.createElement('a')
      link.href = skinURL
      link.download = 'minecraft-skin.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-20 relative">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-6 text-center text-pink-300">
          Minecraft Skin Generator
        </h1>
        
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 bg-white/60">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-blue-300 hover:text-white"
                onClick={generateSkin}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Skin"}
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-blue-300 hover:text-white"
                onClick={() => setShowIn3D(!showIn3D)}
                disabled={!skinURL}
              >
                {showIn3D ? "Hide 3D View" : "Show in 3D"}
              </Button>
            </div>
            
            <Select value={generatorVersion} onValueChange={setGeneratorVersion}>
              <SelectTrigger className="w-[180px] bg-white text-black">
                <SelectValue placeholder="Select generator version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v3">Generator v3</SelectItem>
                <SelectItem value="v5">Generator v5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4 flex flex-col items-center justify-center min-h-[400px]">
              {imageData ? (
                <div className="relative">
                  <Canvas imageData={imageData} />
                  <Button
                    className="mt-4 w-full"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </div>
              ) : (
                <p className="text-white/70">Generated skin will appear here</p>
              )}
            </div>

            <div className="bg-black/30 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
              {showIn3D && skinURL ? (
                <Skin3DViewer skinURL={skinURL} />
              ) : (
                <p className="text-white/70">3D view Status: off</p>
              )}
            </div>
          </div>
          <p className="mt-1 text-black/30">*Note: generated skins are Outerbody, to use this turn off necessary settings in minecraft</p>
        </div>
      </div>
    </main>
  )
}
