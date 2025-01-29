"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Employee } from "@/types/employee"

// Mock function to simulate API call
const fetchEmployees = async (query: string): Promise<Employee[]> => {
  // In a real application, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
  const allEmployees = [
    { id: "1", name: "John Doe", department: "IT", restDays: 10, balance: 15 },
    { id: "2", name: "Jane Smith", department: "HR", restDays: 8, balance: 12 },
    { id: "3", name: "Alice Johnson", department: "Finance", restDays: 12, balance: 18 },
    { id: "4", name: "Bob Williams", department: "Marketing", restDays: 7, balance: 10 },
    { id: "5", name: "Charlie Brown", department: "Operations", restDays: 9, balance: 14 },
  ]
  return allEmployees.filter((emp) => emp.name.toLowerCase().includes(query.toLowerCase()) || emp.id.includes(query))
}

interface EmployeeSearchProps {
  onSelectEmployee: (employee: Employee) => void
}

export function EmployeeSearch({ onSelectEmployee }: EmployeeSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null)

  const handleSearch = async (query: string) => {
    if (query) {
      const results = await fetchEmployees(query)
      setEmployees(results)
    } else {
      setEmployees([])
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedEmployee ? selectedEmployee.name : "Select employee..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search employee..." onValueChange={handleSearch} />
            <CommandList>
              <CommandEmpty>No employee found.</CommandEmpty>
              <CommandGroup>
                {employees.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    onSelect={() => {
                      setSelectedEmployee(employee)
                      setOpen(false)
                      onSelectEmployee(employee)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedEmployee?.id === employee.id ? "opacity-100" : "opacity-0")}
                    />
                    {employee.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedEmployee && (
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold mb-2">Selected Employee</h3>
          <p>
            <strong>Name:</strong> {selectedEmployee.name}
          </p>
          <p>
            <strong>Department:</strong> {selectedEmployee.department}
          </p>
          <p>
            <strong>Rest Days:</strong> {selectedEmployee.restDays}
          </p>
          <p>
            <strong>Leave Balance:</strong> {selectedEmployee.balance} days
          </p>
        </div>
      )}
    </div>
  )
}

