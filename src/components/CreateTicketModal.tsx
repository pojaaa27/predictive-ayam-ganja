import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: () => void;
}

const technicians = ["Fajar Rahman", "Budi Santoso", "Andi Pratama", "Gita Permata", "Rina Wijaya"];
const maintenanceTypes = ["Preventive", "Emergency", "Corrective", "Predictive"];
const failureTypes = [
  "Heat Dissipation Failure",
  "Power Failure",
  "Tool Wear Failure",
  "Overstrain Failure",
  "Random Failures"
];

export function CreateTicketModal({ open, onOpenChange, onCreate }: CreateTicketModalProps) {
  const [date, setDate] = useState<Date>();
  const [productId, setProductId] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedMaintenanceType, setSelectedMaintenanceType] = useState("");
  const [selectedFailureType, setSelectedFailureType] = useState("");
  const [duration, setDuration] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!productId || !date || !selectedTechnician || !selectedMaintenanceType || !selectedFailureType || !duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Maintenance ticket created successfully", {
      description: `Ticket for ${productId} scheduled on ${format(date, "PPP")}`
    });
    
    onCreate?.();
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setProductId("");
    setDate(undefined);
    setSelectedTechnician("");
    setSelectedMaintenanceType("");
    setSelectedFailureType("");
    setDuration("");
    setEstimatedCost("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Maintenance Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Machine ID *</Label>
            <Input 
              value={productId} 
              onChange={(e) => setProductId(e.target.value)}
              placeholder="e.g., M65401"
            />
          </div>

          <div className="space-y-2">
            <Label>Maintenance Type *</Label>
            <Select value={selectedMaintenanceType} onValueChange={setSelectedMaintenanceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select maintenance type" />
              </SelectTrigger>
              <SelectContent>
                {maintenanceTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Failure Type *</Label>
            <Select value={selectedFailureType} onValueChange={setSelectedFailureType}>
              <SelectTrigger>
                <SelectValue placeholder="Select failure type" />
              </SelectTrigger>
              <SelectContent>
                {failureTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Scheduled Start Date *</Label>
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
                  {date ? format(date, "PPP") : "Pick a date"}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estimated Duration (hours) *</Label>
              <Input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 4.5"
                min="0"
                step="0.5"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Cost (Rp)</Label>
              <Input 
                type="number" 
                value={estimatedCost} 
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="e.g., 5000000"
              />
            </div>
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
            <Label>Notes</Label>
            <Textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes for this maintenance..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
