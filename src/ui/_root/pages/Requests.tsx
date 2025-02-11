import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLeaveStore } from "../stores/cree-conge-store";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const LeaveRequests = () => {
  const { requests, updateRequestStatus } = useLeaveStore();
  const navigate = useNavigate();

  const handleStatusUpdate = (id: string, status: 'approved' | 'rejected') => {
    updateRequestStatus(id, status);
    toast.success(`Request ${status} successfully`);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/request/create')}
        >
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.employeeId}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusUpdate(request.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequests;
