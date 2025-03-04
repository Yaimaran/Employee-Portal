"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Search, BarChart4 } from "lucide-react"

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Comprehensive Management",
    description: "Easily manage all your employee records in one centralized location with powerful CRUD operations.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Real-time Updates",
    description: "Experience instant updates across the portal whenever employee data is added, modified, or removed.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Advanced Search & Filtering",
    description: "Quickly find the information you need with powerful search and filtering capabilities.",
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-primary" />,
    title: "Data Visualization",
    description: "View employee data in a well-organized, easy-to-read format with sorting and pagination.",
  },
]

export function About() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">About the Portal</h2>
        <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
          Our Employee Portal is designed to streamline the management of your organization's workforce data, providing
          a seamless experience for HR professionals and managers alike.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

