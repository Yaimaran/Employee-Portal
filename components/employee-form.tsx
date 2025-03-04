"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useEmployees } from "@/context/employee-context"
import type { EmployeeFormData } from "@/types/employee"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  department: z.string().min(1, { message: "Department is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  joiningDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Joining date is required and must be a valid date",
  }),
})

export function EmployeeForm({
  employeeId,
  defaultValues,
  onSuccess,
  onCancel,
}: {
  employeeId?: string
  defaultValues?: EmployeeFormData
  onSuccess?: () => void
  onCancel?: () => void
}) {
  const { addEmployee, updateEmployee } = useEmployees()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otherDepartment, setOtherDepartment] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      department: defaultValues?.department || "",
      position: defaultValues?.position || "",
      joiningDate: defaultValues?.joiningDate ? format(new Date(defaultValues.joiningDate), "yyyy-MM-dd") : "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formattedData = {
        ...data,
        department: data.department === "Other" ? otherDepartment : data.department,
        joiningDate: new Date(data.joiningDate).toISOString(),
      }
      if (employeeId) {
        await updateEmployee(employeeId, formattedData)
        toast({
          title: "Employee updated",
          description: `${data.name}'s information has been updated successfully.`,
        })
      } else {
        await addEmployee(formattedData)
        toast({
          title: "Employee added",
          description: `${data.name} has been added to the employee list.`,
        })
        form.reset()
      }
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your request.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Software Engineer" {...form.register("position")} />
              {form.formState.errors.position && (
                <p className="text-sm text-destructive">{form.formState.errors.position.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Controller
                name="department"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.value === "Other" && (
                      <Input
                        placeholder="Enter department"
                        value={otherDepartment}
                        onChange={(e) => setOtherDepartment(e.target.value)}
                      />
                    )}
                  </>
                )}
              />
              {form.formState.errors.department && (
                <p className="text-sm text-destructive">{form.formState.errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input type="date" id="joiningDate" {...form.register("joiningDate")} />
              {form.formState.errors.joiningDate && (
                <p className="text-sm text-destructive">{form.formState.errors.joiningDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : employeeId ? "Update Employee" : "Add Employee"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

