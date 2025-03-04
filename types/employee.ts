export interface Employee {
  id: string
  name: string
  department: string
  position: string
  joiningDate: string
  createdAt: string
  updatedAt: string
}

export interface EmployeeFormData {
  name: string
  department: string
  position: string
  joiningDate: string
}

export type SortField = "name" | "department" | "position" | "joiningDate"
export type SortDirection = "asc" | "desc"

export interface EmployeeSort {
  field: SortField
  direction: SortDirection
}

export interface EmployeeFilter {
  search: string
  department?: string
}

export interface EmployeePagination {
  page: number
  pageSize: number
  total: number
}

