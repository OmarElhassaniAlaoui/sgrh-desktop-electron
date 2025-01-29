import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentLeaves = [
  {
    employee: "John Doe",
    department: "IT",
    startDate: "2023-07-01",
    endDate: "2023-07-05",
    status: "Approved",
  },
  {
    employee: "Jane Smith",
    department: "HR",
    startDate: "2023-07-10",
    endDate: "2023-07-12",
    status: "Pending",
  },
  {
    employee: "Bob Johnson",
    department: "Finance",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    status: "Rejected",
  },
  {
    employee: "Alice Brown",
    department: "Marketing",
    startDate: "2023-07-22",
    endDate: "2023-07-26",
    status: "Approved",
  },
  {
    employee: "Charlie Wilson",
    department: "Sales",
    startDate: "2023-07-28",
    endDate: "2023-07-30",
    status: "Pending",
  },
]

export function RecentLeaves() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentLeaves.map((leave) => (
          <TableRow key={leave.employee}>
            <TableCell className="font-medium">{leave.employee}</TableCell>
            <TableCell>{leave.department}</TableCell>
            <TableCell>{leave.startDate}</TableCell>
            <TableCell>{leave.endDate}</TableCell>
            <TableCell>{leave.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

