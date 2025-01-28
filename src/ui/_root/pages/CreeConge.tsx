import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
interface LeaveRequestFormData {
  leaveType: string;
  startDate: Date;
  endDate: Date;
}
const LeaveRequest = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Votre demande de congés a été envoyée avec succès.",
    });
  };

  const form = useForm<LeaveRequestFormData>();

  const onSubmit = (data: LeaveRequestFormData) => {
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted successfully.",
    });
    console.log(data);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Demande de congés</h1>
      {/*recherch fonctionnaire  Card  */}

      {/* demmade de congee */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouvelle demande</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Type de congé</Label>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="leaveType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leave Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select leave type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="annual">
                                Annual Leave
                              </SelectItem>
                              <SelectItem value="sick">Sick Leave</SelectItem>
                              <SelectItem value="personal">
                                Personal Leave
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input type="date" id="startDate" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input type="date" id="endDate" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days">Nombre de jours</Label>
                <Input id="days" type="number" min="1" required />
              </div>
            </div>

            <div className="flex justify-start space-x-4">
              <Button type="submit">Cree la demande</Button>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequest;
