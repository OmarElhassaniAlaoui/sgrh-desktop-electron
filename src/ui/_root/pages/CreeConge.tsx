"use client"

import { useState } from "react"
import type { Employee } from "@/types/employee"
import type { LeaveRequest } from "@/types/leave-request"
import { EmployeeSearch } from "@/components/EmployeeSearch"
import { CreateLeaveForm } from "@/components/CreateLeaveForm"
import { LeaveConfirmation } from "@/components/LeaveConfirmation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { id: "search", title: "Search Employee" },
  { id: "details", title: "Leave Details" },
  { id: "confirm", title: "Confirmation" },
]

export default function LeaveRequest() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest | null>(null)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee)
    handleNext()
  }

  const handleLeaveDetailsSubmit = (details: LeaveRequest) => {
    setLeaveRequest(details)
    handleNext()
  }

  const handleConfirm = () => {
    if (selectedEmployee && leaveRequest) {
      // In a real application, you would submit the leave request to your backend here
      console.log("Submitting leave request:", { employee: selectedEmployee, ...leaveRequest })
      alert("Leave request submitted successfully!")
      // Reset the form
      setCurrentStep(0)
      setSelectedEmployee(null)
      setLeaveRequest(null)
    } else {
      console.error("Cannot confirm: Missing employee or leave request data")
    }
  }

  return (
    <div className="m-10 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Create Leave Request</h2>

      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                index <= currentStep ? "bg-primary text-primary-foreground border-primary" : "border-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-2 text-sm font-medium">{step.title}</div>
            {index < steps.length - 1 && <div className="ml-2 h-px w-12 bg-gray-300" />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 0 && <EmployeeSearch onSelectEmployee={handleEmployeeSelect} />}
          {currentStep === 1 && selectedEmployee && (
            <CreateLeaveForm employee={selectedEmployee} onSubmit={handleLeaveDetailsSubmit} />
          )}
          {currentStep === 2 && selectedEmployee && leaveRequest && (
            <LeaveConfirmation employee={selectedEmployee} leaveRequest={leaveRequest} onConfirm={handleConfirm} />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < steps.length - 1 && (
          <Button
            onClick={handleNext}
            disabled={(currentStep === 0 && !selectedEmployee) || (currentStep === 1 && !leaveRequest)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

