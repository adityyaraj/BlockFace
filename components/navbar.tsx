"use client"

import type React from "react"
import { useState } from "react"
import { MoreVertical, Home, User, Settings, HelpCircle } from "lucide-react"

const NavItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <li className="mb-4">
    <a href="#" className="flex items-center text-white hover:text-gray-300 transition-colors">
      <Icon className="w-6 h-6 mr-2" />
      <span>{label}</span>
    </a>
  </li>
)

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav
      className={`fixed right-0 top-0 h-full transition-all duration-300 ease-in-out
                  ${isExpanded ? "w-64 bg-black bg-opacity-50 backdrop-blur-md" : "w-12 bg-transparent"}
                  flex items-center justify-center`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded ? (
        <div className="p-4 w-full">
          <ul>
            <NavItem icon={Home} label="Home" />
            <NavItem icon={User} label="Profile" />
            <NavItem icon={Settings} label="Settings" />
            <NavItem icon={HelpCircle} label="Help" />
          </ul>
        </div>
      ) : (
        <MoreVertical className="w-6 h-6 text-gray-600 hover:text-white transition-colors" />
      )}
    </nav>
  )
}

