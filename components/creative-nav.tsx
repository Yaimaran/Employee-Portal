"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Info, UserPlus, List } from "lucide-react"

const navItems = [
  { id: "home", label: "Home", icon: Users },
  { id: "about", label: "About", icon: Info },
  { id: "add-employee", label: "Add Employee", icon: UserPlus },
  { id: "employee-list", label: "Employee List", icon: List },
]

export function CreativeNav() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "add-employee", "employee-list"]
      const scrollPosition = window.scrollY + 100

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="fixed top-4 left-4 right-0 z-50 md:top-1/2 md:right-4 md:transform md:-translate-y-1/2 md:bottom-auto md:left-auto">
      <ul className="flex justify-start md:flex-col md:space-y-4 md:space-x-0 space-x-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <item.icon className="w-6 h-6" />
              </motion.div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

