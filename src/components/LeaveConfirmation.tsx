import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import type { Employee } from "@/types/employee"
import type { LeaveRequest } from "@/types/leave-request"

interface LeaveConfirmationProps {
  employee: Employee
  leaveRequest: LeaveRequest
  onConfirm: () => void
}

export function LeaveConfirmation({ employee, leaveRequest, onConfirm }: LeaveConfirmationProps) {
  if (!employee || !leaveRequest) {
    return <div>Error: Missing employee or leave request information.</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Leave Request Summary</h3>
      <div className="space-y-2">
        <p>
          <strong>Employee:</strong> {employee.name}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Leave Type:</strong> {leaveRequest.leaveType}
        </p>
        <p>
          <strong>Start Date:</strong> {format(leaveRequest.startDate, "PPP")}
        </p>
        <p>
          <strong>End Date:</strong> {format(leaveRequest.endDate, "PPP")}
        </p>
        <p>
          <strong>Replacement:</strong> {leaveRequest.replacement}
        </p>
      </div>
      <Button onClick={onConfirm}>Confirm and Submit</Button>
    </div>
  )
}

