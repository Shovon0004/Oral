"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center">
          <span className="text-red-600 mr-1">Oral</span>Cancer Risk
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link href="/assessment" className="text-sm font-medium hover:text-red-600 transition-colors">
            Risk Assessment
          </Link>
          <Link href="/education" className="text-sm font-medium hover:text-red-600 transition-colors">
            Education
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-red-600 transition-colors">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Link href="/register">
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Start Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium py-2 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-medium py-2 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Risk Assessment
            </Link>
            <Link
              href="/education"
              className="text-sm font-medium py-2 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium py-2 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center justify-between pt-4 border-t">
              <ModeToggle />
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
