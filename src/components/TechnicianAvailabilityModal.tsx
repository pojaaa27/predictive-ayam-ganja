import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechnicianAvailabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockAvailability = [
  { name: "Fajar Rahman", available: true, currentTask: null, nextFree: null },
  { name: "Budi Santoso", available: false, currentTask: "TKT-2025-11840", nextFree: "2025-11-16 14:00" },
  { name: "Andi Pratama", available: true, currentTask: null, nextFree: null },
  { name: "Gita Permata", available: false, currentTask: "TKT-2025-11835", nextFree: "2025-11-15 18:30" },
  { name: "Rina Wijaya", available: true, currentTask: null, nextFree: null },
];

export function TechnicianAvailabilityModal({ open, onOpenChange }: TechnicianAvailabilityModalProps) {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Technician Availability</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Check Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Technician Status</h3>
            {mockAvailability.map((tech) => (
              <Card key={tech.name} className="p-4 bg-card/30 border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {tech.available ? (
                      <CheckCircle className="h-5 w-5 text-status-running" />
                    ) : (
                      <XCircle className="h-5 w-5 text-status-critical" />
                    )}
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      {tech.currentTask && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          Working on {tech.currentTask}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={tech.available ? "default" : "secondary"}>
                      {tech.available ? "Available" : "Busy"}
                    </Badge>
                    {tech.nextFree && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Free at {tech.nextFree}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
