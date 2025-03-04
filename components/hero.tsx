"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { UserPlus, List } from "lucide-react"

export function Hero() {
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
    <div className="flex flex-col items-center text-center">
      <motion.h1
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to the Employee Portal
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-[800px] mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        A comprehensive solution for managing your organization's employee records with ease. Add, view, update, and
        manage employee information all in one place.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" className="gap-2" onClick={() => scrollToSection("add-employee")}>
          <UserPlus className="h-5 w-5" />
          Add Employee
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={() => scrollToSection("employee-list")}>
          <List className="h-5 w-5" />
          View Employees
        </Button>
      </motion.div>
    </div>
  )
}

