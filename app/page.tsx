"use client"

import { Suspense, useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { CreativeNav } from "@/components/creative-nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { EmployeeForm } from "@/components/employee-form"
import { EmployeeList } from "@/components/employee-list"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Home() {
  const [theme, setTheme] = useState("dark")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark"
      if (prevTheme === "dark") return "nature"
      return "light"
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <motion.div className="fixed bottom-0 left-0 right-0 h-2 bg-primary z-50 md:top-0 md:h-2" style={{ scaleX }} />
      <CreativeNav />
      <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50" onClick={toggleTheme}>
        {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
      <div className="container mx-auto px-4 py-8 space-y-32">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <About />
        </section>

        <section id="add-employee" className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Add Employee</h2>
            <EmployeeForm />
          </div>
        </section>

        <section id="employee-list" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-center">Employee List</h2>
          <Suspense fallback={<div className="text-center py-10">Loading employees...</div>}>
            <EmployeeList />
          </Suspense>
        </section>
      </div>
      <Toaster />
    </main>
  )
}

