"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [visibleSamples, setVisibleSamples] = useState(7)

  // Dynamic sample count based on screen width
  useEffect(() => {
    const updateVisibleSamples = () => {
      const width = window.innerWidth
      if (width >= 1536) setVisibleSamples(7)      // 2xl
      else if (width >= 1280) setVisibleSamples(6) // xl
      else if (width >= 1024) setVisibleSamples(5) // lg
      else if (width >= 768) setVisibleSamples(4)  // md
      else if (width >= 640) setVisibleSamples(3)  // sm
      else setVisibleSamples(2)                    // xs
    }

    updateVisibleSamples()
    window.addEventListener('resize', updateVisibleSamples)
    return () => window.removeEventListener('resize', updateVisibleSamples)
  }, [])

  /* Commented download functionality
  const handleImageClick = (num: number) => {
    const link = document.createElement('a');
    link.href = `/sample/download_${num}.png`;
    link.download = `minecraft_skin_${num}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  */

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-4">
      <div className="w-full max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Don&apos;t Stress About Creativity</h1><h1 className="text-6xl font-bold text-pink-300 leading-tight">
            Let AI Do the Work</h1><h1 className="text-4xl font-bold mb-6 text-white leading-tight">
            Get Your Unique Minecraft Skin
          </h1>
          
          <Link href="/generate">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-300 text-black bg-white hover:text-white hover:bg-blue-300"
            >
              Generate Your Skin
            </Button>
          </Link>
        </div>

        {/* Sample Gallery */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex justify-center gap-8">
            {Array.from({ length: visibleSamples }, (_, i) => i + 1).map((num) => (
              <div 
                key={num}
                className="relative group"
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={`/sample/sample_${num}.png`}
                  alt={`Minecraft Skin ${num}`}
                  width={120}
                  height={72}
                  className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:z-10"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}