"use client"

import { useState, useEffect } from "react"
import { Users, Info, UserPlus, List, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "add-employee", "employee-list"]
      const scrollPosition = window.scrollY + 100 // offset for header height

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial active section
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Users className="h-4 w-4 mr-2" /> },
    { id: "about", label: "About", icon: <Info className="h-4 w-4 mr-2" /> },
    { id: "add-employee", label: "Add Employee", icon: <UserPlus className="h-4 w-4 mr-2" /> },
    { id: "employee-list", label: "Employee List", icon: <List className="h-4 w-4 mr-2" /> },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <span className="text-xl font-bold">Employee Portal</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                activeSection === item.id ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => scrollToSection(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary justify-start",
                  activeSection === item.id ? "bg-muted text-primary" : "text-muted-foreground",
                )}
                onClick={() => scrollToSection(item.id)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

