"use client"

import { useState } from "react"
import { ArrowUpDown, Search, Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

import { useEmployees } from "@/context/employee-context"
import { EmployeeForm } from "@/components/employee-form"
import { formatDate, truncateId } from "@/lib/utils"
import type { EmployeeFormData, SortField } from "@/types/employee"

export function EmployeeList() {
  const {
    filteredEmployees,
    employees,
    pagination,
    sort,
    filter,
    setSort,
    setFilter,
    setPage,
    setPageSize,
    deleteEmployee,
  } = useEmployees()
  const { toast } = useToast()

  const [editingEmployee, setEditingEmployee] = useState<{
    id: string
    data: EmployeeFormData
  } | null>(null)

  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null)

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize))

  // Get unique departments for filtering
  const departments = ["all", ...new Set(employees.map((emp) => emp.department))]

  const handleSort = (field: SortField) => {
    setSort({
      field,
      direction: sort.field === field && sort.direction === "asc" ? "desc" : "asc",
    })
  }

  const handleSearch = (value: string) => {
    setFilter({ ...filter, search: value })
    setPage(1)
  }

  const handleDepartmentFilter = (value: string) => {
    setFilter({ ...filter, department: value === "all" ? undefined : value })
    setPage(1)
  }

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmployee(id)
      toast({
        title: "Employee deleted",
        description: "The employee has been removed from the system.",
      })
      setEmployeeToDelete(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the employee.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Employees
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, department, or position..."
                  className="pl-8"
                  value={filter.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-[200px] space-y-2">
              <label htmlFor="department-filter" className="text-sm font-medium">
                Filter by Department
              </label>
              <Select value={filter.department || "all"} onValueChange={handleDepartmentFilter}>
                <SelectTrigger id="department-filter" className="w-full">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-[150px] space-y-2">
              <label htmlFor="page-size" className="text-sm font-medium">
                Rows per page
              </label>
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) => setPageSize(Number.parseInt(value))}
              >
                <SelectTrigger id="page-size">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 font-medium"
                  >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("department")}
                    className="flex items-center gap-1 font-medium"
                  >
                    Department
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("position")}
                    className="flex items-center gap-1 font-medium"
                  >
                    Position
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("joiningDate")}
                    className="flex items-center gap-1 font-medium"
                  >
                    Joining Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-mono text-xs">{truncateId(employee.id)}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.department}</Badge>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{formatDate(employee.joiningDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setEditingEmployee({
                              id: employee.id,
                              data: {
                                name: employee.name,
                                department: employee.department,
                                position: employee.position,
                                joiningDate: employee.joiningDate,
                              },
                            })
                          }
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEmployeeToDelete(employee.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredEmployees.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} employees
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => setPage(1)} disabled={pagination.page === 1}>
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <span className="text-sm mx-2">
              Page {pagination.page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(pagination.page + 1)}
              disabled={pagination.page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(totalPages)}
              disabled={pagination.page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      )}

      {/* Edit Employee Dialog */}
      <Dialog open={!!editingEmployee} onOpenChange={(open) => !open && setEditingEmployee(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update the employee information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {editingEmployee && (
            <EmployeeForm
              employeeId={editingEmployee.id}
              defaultValues={editingEmployee.data}
              onSuccess={() => setEditingEmployee(null)}
              onCancel={() => setEditingEmployee(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!employeeToDelete} onOpenChange={(open) => !open && setEmployeeToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => employeeToDelete && handleDeleteEmployee(employeeToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

