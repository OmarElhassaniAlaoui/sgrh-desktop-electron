import LeaveTable from "@/components/LeaveTable";
import { Overview } from "@/components/overview";
import { RecentLeaves } from "@/components/recent-leaves";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle, FileText, XCircle } from "lucide-react";

const Accueil = () => {
  return (
    <div className="mx-10 my-6 items-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of leave requests and approvals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value="12"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Approved"
          value="8"
          icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}
        />
        <StatsCard
          title="Rejected"
          value="2"
          icon={<XCircle className="h-4 w-4 text-red-500" />}
        /> <StatsCard
          title="Pending"
          value="2"
          icon={<CalendarDays className="h-4 w-4 text-yellow-500" />}
        />
      </div>
      <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leave Requests Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentLeaves />
          </CardContent>
        </Card>
      </div>
    </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Leave Requests</h3>
        <LeaveTable />
      </div>
    </div>
  );
};

export default Accueil;
