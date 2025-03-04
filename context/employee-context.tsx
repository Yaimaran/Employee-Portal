"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Employee, EmployeeFormData, EmployeeSort, EmployeeFilter, EmployeePagination } from "@/types/employee"
import { generateId } from "@/lib/utils"

interface EmployeeContextType {
  employees: Employee[]
  filteredEmployees: Employee[]
  pagination: EmployeePagination
  sort: EmployeeSort
  filter: EmployeeFilter
  addEmployee: (data: EmployeeFormData) => Promise<Employee>
  updateEmployee: (id: string, data: EmployeeFormData) => Promise<Employee>
  deleteEmployee: (id: string) => Promise<void>
  setSort: (sort: EmployeeSort) => void
  setFilter: (filter: EmployeeFilter) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  isLoading: boolean
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState<EmployeeSort>({ field: "name", direction: "asc" })
  const [filter, setFilter] = useState<EmployeeFilter>({ search: "" })
  const [pagination, setPagination] = useState<EmployeePagination>({
    page: 1,
    pageSize: 10,
    total: 0,
  })

  // Load initial data from localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees")
    if (storedEmployees) {
      try {
        const parsedEmployees = JSON.parse(storedEmployees)
        setEmployees(parsedEmployees)
      } catch (error) {
        console.error("Failed to parse stored employees:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save to localStorage whenever employees change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("employees", JSON.stringify(employees))
    }
  }, [employees, isLoading])

  // Apply filtering, sorting, and pagination
  useEffect(() => {
    let result = [...employees]

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchLower) ||
          emp.department.toLowerCase().includes(searchLower) ||
          emp.position.toLowerCase().includes(searchLower),
      )
    }

    // Apply department filter
    if (filter.department && filter.department !== "all") {
      result = result.filter((emp) => emp.department === filter.department)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sort.field === "joiningDate") {
        const dateA = new Date(a.joiningDate).getTime()
        const dateB = new Date(b.joiningDate).getTime()
        return sort.direction === "asc" ? dateA - dateB : dateB - dateA
      }

      if (sort.field === "name") {
        return sort.direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }

      if (sort.field === "department") {
        return sort.direction === "asc"
          ? a.department.localeCompare(b.department)
          : b.department.localeCompare(a.department)
      }

      if (sort.field === "position") {
        return sort.direction === "asc" ? a.position.localeCompare(b.position) : b.position.localeCompare(a.position)
      }

      return 0
    })

    // Update pagination
    setPagination((prev) => ({
      ...prev,
      total: result.length,
    }))

    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.pageSize
    const paginatedResult = result.slice(startIndex, startIndex + pagination.pageSize)

    setFilteredEmployees(paginatedResult)
  }, [employees, sort, filter, pagination.page, pagination.pageSize])

  const addEmployee = useCallback(async (data: EmployeeFormData): Promise<Employee> => {
    const now = new Date().toISOString()
    const newEmployee: Employee = {
      id: generateId(),
      ...data,
      joiningDate: new Date(data.joiningDate).toISOString(), // Ensure date is properly formatted
      createdAt: now,
      updatedAt: now,
    }

    setEmployees((prev) => [...prev, newEmployee])
    return newEmployee
  }, [])

  const updateEmployee = useCallback(
    async (id: string, data: EmployeeFormData): Promise<Employee> => {
      const updatedEmployee: Employee = {
        id,
        ...data,
        joiningDate: new Date(data.joiningDate).toISOString(), // Ensure date is properly formatted
        createdAt: employees.find((e) => e.id === id)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setEmployees((prev) => prev.map((emp) => (emp.id === id ? updatedEmployee : emp)))
      return updatedEmployee
    },
    [employees],
  )

  const deleteEmployee = useCallback(async (id: string): Promise<void> => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }, [])

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }))
  }, [])

  const value = {
    employees,
    filteredEmployees,
    pagination,
    sort,
    filter,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setSort,
    setFilter,
    setPage,
    setPageSize,
    isLoading,
  }

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export function useEmployees() {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error("useEmployees must be used within an EmployeeProvider")
  }
  return context
}

