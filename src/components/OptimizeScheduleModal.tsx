import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";

interface OptimizeScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMachines: string[];
  onConfirm?: () => void;
}

export function OptimizeScheduleModal({ 
  open, 
  onOpenChange, 
  selectedMachines,
  onConfirm 
}: OptimizeScheduleModalProps) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizedSchedule, setOptimizedSchedule] = useState<any>(null);

  const handleOptimize = () => {
    // Mock optimization
    const mockSchedule = {
      totalCost: 35200000,
      totalDowntime: 18.0,
      completionDate: "2025-11-19",
      efficiencyScore: 92.5,
      tasks: [
        {
          timeslot: "08:00-16:00",
          productId: selectedMachines[0] || "M18273",
          technician: "Fajar Rahman",
          maintenanceType: "Emergency",
          cost: 12500000,
          downtime: 8.0
        },
        {
          timeslot: "08:00-14:30",
          productId: selectedMachines[1] || "H87213",
          technician: "Gita Permata",
          maintenanceType: "Emergency",
          cost: 18500000,
          downtime: 6.5
        },
        {
          timeslot: "14:30-18:00",
          productId: selectedMachines[2] || "M65401",
          technician: "Budi Santoso",
          maintenanceType: "Preventive",
          cost: 4200000,
          downtime: 3.5
        }
      ]
    };

    setOptimizedSchedule(mockSchedule);
    setIsOptimized(true);
    toast.success("Schedule optimized successfully");
  };

  const handleConfirm = () => {
    toast.success(`${selectedMachines.length} maintenance tickets created successfully`);
    onConfirm?.();
    onOpenChange(false);
    setIsOptimized(false);
    setOptimizedSchedule(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Optimize Maintenance Schedule</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isOptimized ? (
            <div className="space-y-4">
              <Card className="p-4 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-3">Selected Machines</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMachines.map((machine) => (
                    <Badge key={machine} variant="secondary">{machine}</Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-3">Optimization Constraints</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Downtime:</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Technicians:</span>
                    <span className="font-medium">5 technicians</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">Tomorrow</span>
                  </div>
                </div>
              </Card>

              <Button onClick={handleOptimize} className="w-full">
                Generate Optimized Schedule
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 text-center bg-card/50 border-border/50">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                  <div className="text-lg font-bold">Rp {optimizedSchedule.totalCost.toLocaleString()}</div>
                </Card>
                <Card className="p-4 text-center bg-card/50 border-border/50">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Total Downtime</div>
                  <div className="text-lg font-bold">{optimizedSchedule.totalDowntime} hrs</div>
                </Card>
                <Card className="p-4 text-center bg-card/50 border-border/50">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Completion</div>
                  <div className="text-lg font-bold">{optimizedSchedule.completionDate}</div>
                </Card>
                <Card className="p-4 text-center bg-card/50 border-border/50">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                  <div className="text-lg font-bold">{optimizedSchedule.efficiencyScore}%</div>
                </Card>
              </div>

              {/* Schedule Tasks */}
              <Card className="p-4 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-3">Optimized Schedule for {optimizedSchedule.completionDate}</h3>
                <div className="space-y-3">
                  {optimizedSchedule.tasks.map((task: any, idx: number) => (
                    <div key={idx}>
                      {idx > 0 && <Separator className="my-3" />}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{task.timeslot}</Badge>
                            <span className="font-medium">{task.productId}</span>
                            <Badge>{task.maintenanceType}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{task.technician}</div>
                        </div>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>Cost: Rp {task.cost.toLocaleString()}</span>
                          <span>Downtime: {task.downtime} hrs</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <p className="text-sm text-center">
                  Click <strong>"Confirm & Create Tickets"</strong> to automatically create maintenance tickets for this schedule
                </p>
              </Card>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => {
                  setIsOptimized(false);
                  setOptimizedSchedule(null);
                }}>
                  Re-optimize
                </Button>
                <Button onClick={handleConfirm}>
                  Confirm & Create Tickets
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
