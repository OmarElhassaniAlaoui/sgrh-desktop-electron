import { Employee } from './employee'

declare global {
  interface Window {
    electronAPI: {
      getEmployees: () => Promise<Employee[]>
      getEmployeeById: (id: string) => Promise<Employee | null>
      createEmployee: (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Employee>
      updateEmployee: (id: string, employeeData: Partial<Employee>) => Promise<Employee>
      deleteEmployee: (id: string) => Promise<{ success: boolean, id: string }>
      
      // Add other API methods here as your application grows
    }
  }
}