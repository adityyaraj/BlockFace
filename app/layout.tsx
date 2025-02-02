import { RightNav } from "@/components/RightNav"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PeelSkin : Minecraft Skin Generator",
  description: "Generate amazing Minecraft skins with AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen relative`}>
        <div className="fixed inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/bg.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 min-h-screen">{children}</div>
        <RightNav />
      </body>
    </html>
  )
}

