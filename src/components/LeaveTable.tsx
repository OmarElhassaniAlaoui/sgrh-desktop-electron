import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { Check, X } from "lucide-react";
  
  interface LeaveRequest {
    id: string;
    employee: string;
    department: string;
    startDate: string;
    endDate: string;
    status: "pending" | "approved" | "rejected";
  }
  
  const mockData: LeaveRequest[] = [
    {
      id: "1",
      employee: "John Doe",
      department: "IT",
      startDate: "2024-04-15",
      endDate: "2024-04-20",
      status: "pending",
    },
    {
      id: "2",
      employee: "Jane Smith",
      department: "HR",
      startDate: "2024-04-18",
      endDate: "2024-04-25",
      status: "pending",
    },
  ];
  
  const LeaveTable = () => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.employee}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>
                  <span className="capitalize">{request.status}</span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default LeaveTable;