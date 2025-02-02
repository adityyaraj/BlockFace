"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Home, User, HelpCircle, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItem = ({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li className="mb-4">
      <Link
        href={href}
        className={`flex items-center text-white hover:text-gray-300 transition-colors ${isActive ? "font-bold" : ""}`}
      >
        <Icon className="w-6 h-6 mr-2" />
        <span>{label}</span>
      </Link>
    </li>
  )
}

export function RightNav() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleNav = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <nav
      className={`fixed right-0 top-0 h-full transition-all duration-300 ease-in-out z-50
                  ${isExpanded ? "w-64" : "w-16"}
                  bg-black bg-opacity-30 backdrop-blur-sm`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button onClick={toggleNav} className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors">
        {isExpanded ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {isExpanded && (
        <div className="p-4 pt-16 w-full">
          <ul>
            <NavItem icon={Home} label="Home" href="/" />
            <NavItem icon={Zap} label="Generate" href="/generate" />
            <NavItem icon={User} label="Author" href="/author" />
            <NavItem icon={HelpCircle} label="How it works" href="/how-it-works" />
          </ul>
        </div>
      )}
    </nav>
  )
}

