/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/use-employees.ts
import { useState, useEffect } from 'react'
import { Employee } from '../types/employee'

declare global {
    interface Window {
      electronAPI: {
        getEmployees: () => Promise<Employee[]>
        getEmployeeById: (id: string) => Promise<Employee | null>
        createEmployee: (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Employee>
        updateEmployee: (id: string, employeeData: Partial<Employee>) => Promise<Employee>
        deleteEmployee: (id: string) => Promise<{ success: boolean, id: string }>
      }
    }
  }

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const data = await window.electronAPI.getEmployees()
      setEmployees(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch employees'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEmployee = await window.electronAPI.createEmployee(employeeData)
      setEmployees(prev => [...prev, newEmployee])
      return newEmployee
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create employee'))
      throw err
    }
  }

  const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      const updatedEmployee = await window.electronAPI.updateEmployee(id, employeeData)
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? updatedEmployee : emp)
      )
      return updatedEmployee
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to update employee ${id}`))
      throw err
    }
  }

  const deleteEmployee = async (id: string) => {
    try {
      await window.electronAPI.deleteEmployee(id)
      setEmployees(prev => prev.filter(emp => emp.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to delete employee ${id}`))
      throw err
    }
  }

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
}