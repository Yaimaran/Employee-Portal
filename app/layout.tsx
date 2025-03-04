import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { EmployeeProvider } from "@/context/employee-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "A comprehensive solution for managing employee records",
  generator: 'yai.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <EmployeeProvider>{children}</EmployeeProvider>
      </body>
    </html>
  )
}