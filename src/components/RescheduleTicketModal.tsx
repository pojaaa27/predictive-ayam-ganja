import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RescheduleTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: any;
  onReschedule?: () => void;
}

const technicians = ["Fajar Rahman", "Budi Santoso", "Andi Pratama", "Gita Permata", "Rina Wijaya"];

export function RescheduleTicketModal({ open, onOpenChange, ticket, onReschedule }: RescheduleTicketModalProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTechnician, setSelectedTechnician] = useState(ticket?.technician || "");
  const [reason, setReason] = useState("");

  if (!ticket) return null;

  const handleSubmit = () => {
    if (!date || !selectedTechnician) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for rescheduling");
      return;
    }

    toast.success("Ticket rescheduled successfully", {
      description: `Ticket ${ticket.id} rescheduled to ${format(date, "PPP")}`
    });
    
    onReschedule?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Ticket: {ticket.id}</DialogTitle>
        </DialogHeader>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Current schedule: {ticket.date} with {ticket.technician}
          </AlertDescription>
        </Alert>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>New Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a new date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Assign Technician *</Label>
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger>
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map((tech) => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason for Rescheduling *</Label>
            <Textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this ticket needs to be rescheduled..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Reschedule Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
