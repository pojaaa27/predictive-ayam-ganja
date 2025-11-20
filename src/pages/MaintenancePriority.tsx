import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, TrendingUp, Clock, Users, DollarSign, Wrench } from "lucide-react";
import { ScheduleMaintenanceModal } from "@/components/ScheduleMaintenanceModal";
import { OptimizeScheduleModal } from "@/components/OptimizeScheduleModal";
import { toast } from "sonner";

const mockTasks = [
  {
    id: 1,
    machine: "H87213",
    type: "H",
    task: "Emergency cooling system repair",
    probability: 89.7,
    impact: "High",
    rul: 8,
    cost: 18500000,
    priority: "Critical"
  },
  {
    id: 2,
    machine: "M65401",
    type: "M",
    task: "Tool wear replacement",
    probability: 68.5,
    impact: "Medium",
    rul: 72,
    cost: 4200000,
    priority: "High"
  },
  {
    id: 3,
    machine: "M98765",
    type: "M",
    task: "Bearing lubrication",
    probability: 45.2,
    impact: "Medium",
    rul: 156,
    cost: 2100000,
    priority: "Medium"
  },
  {
    id: 4,
    machine: "L38294",
    type: "L",
    task: "Routine inspection",
    probability: 15.2,
    impact: "Low",
    rul: 480,
    cost: 850000,
    priority: "Low"
  },
];

const riskMatrix = [
  { probability: "High", impact: "High", count: 3, color: "bg-status-critical" },
  { probability: "High", impact: "Medium", count: 5, color: "bg-[#fb923c]" },
  { probability: "High", impact: "Low", count: 2, color: "bg-status-warning" },
  { probability: "Medium", impact: "High", count: 4, color: "bg-[#fb923c]" },
  { probability: "Medium", impact: "Medium", count: 8, color: "bg-status-warning" },
  { probability: "Medium", impact: "Low", count: 6, color: "bg-status-warning" },
  { probability: "Low", impact: "High", count: 1, color: "bg-status-warning" },
  { probability: "Low", impact: "Medium", count: 3, color: "bg-status-running" },
  { probability: "Low", impact: "Low", count: 12, color: "bg-status-running" },
];

export default function MaintenancePriority() {
  const [tasks] = useState(mockTasks);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const navigate = useNavigate();

  const handleSchedule = (task: any) => {
    setSelectedTask(task);
    setScheduleModalOpen(true);
  };

  const handleScheduleAll = () => {
    setOptimizeModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-status-critical/20 text-status-critical border-status-critical/30";
      case "High": return "bg-[#fb923c]/20 text-[#fb923c] border-[#fb923c]/30";
      case "Medium": return "bg-status-warning/20 text-status-warning border-status-warning/30";
      case "Low": return "bg-status-running/20 text-status-running border-status-running/30";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Maintenance Prioritization
          </h1>
          <p className="text-muted-foreground mt-1">Optimize maintenance scheduling based on risk and impact</p>
        </div>

        {/* Smart Scheduling Recommendations */}
        <Card className="glass-effect border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              💡 Smart Scheduling Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm">
                  <span className="font-medium">Batch Maintenance Opportunity:</span> Mesin M65401 dan M98765 dapat dijadwalkan bersamaan untuk menghemat waktu downtime total 30%.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm">
                  <span className="font-medium">Cost Optimization:</span> Menunda maintenance mesin L38294 hingga akhir bulan dapat menghemat biaya operasional Rp 2.4M tanpa risiko signifikan.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-status-warning/10 border border-status-warning/20">
                <p className="text-sm">
                  <span className="font-medium">Resource Alert:</span> Teknisi Fajar Rahman sudah dijadwalkan untuk 3 tugas critical hari ini. Pertimbangkan realokasi atau backup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Summary */}
        <Card className="glass-effect border-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wrench className="h-4 w-4 text-accent" />
                Resource Requirements Summary
              </CardTitle>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleScheduleAll}
                className="glass-effect"
              >
                Optimize Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Technicians Required</div>
                    <div className="text-xl font-bold">5 Techs</div>
                    <div className="text-xs text-status-running mt-1">All available</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <DollarSign className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total Cost Estimate</div>
                    <div className="text-xl font-bold">Rp 142M</div>
                    <div className="text-xs text-muted-foreground mt-1">16 tasks pending</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-status-warning/20">
                    <Clock className="h-5 w-5 text-status-warning" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total Time Required</div>
                    <div className="text-xl font-bold">48 Hours</div>
                    <div className="text-xs text-status-warning mt-1">Schedule optimization available</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Optimization Potential:</span> By optimizing the schedule, you can reduce total downtime by 18 hours and save approximately Rp 12M in operational costs.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect border-status-critical/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-status-critical" />
                Critical Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-critical">3</div>
              <p className="text-xs text-muted-foreground mt-1">Immediate action</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-[#fb923c]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-[#fb923c]" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#fb923c]">5</div>
              <p className="text-xs text-muted-foreground mt-1">Within 24h</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-status-warning/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs flex items-center gap-2">
                <Clock className="h-3 w-3 text-status-warning" />
                Medium Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-warning">8</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs">Total Cost Est.</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Rp 142M</div>
              <p className="text-xs text-muted-foreground mt-1">All pending tasks</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Matrix */}
          <Card className="glass-effect lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Risk Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs text-center font-medium text-muted-foreground mb-3">
                  <div></div>
                  <div>Low</div>
                  <div>Medium</div>
                  <div>High</div>
                </div>
                
                {["High", "Medium", "Low"].map((prob) => (
                  <div key={prob} className="grid grid-cols-4 gap-2">
                    <div className="text-xs font-medium text-muted-foreground flex items-center">{prob}</div>
                    {["Low", "Medium", "High"].map((impact) => {
                      const cell = riskMatrix.find(r => r.probability === prob && r.impact === impact);
                      return (
                        <div 
                          key={impact}
                          className={`${cell?.color} rounded p-2 text-center font-bold text-white text-sm`}
                        >
                          {cell?.count}
                        </div>
                      );
                    })}
                  </div>
                ))}
                
                <p className="text-xs text-muted-foreground text-center pt-2">Impact →</p>
                <p className="text-xs text-muted-foreground -mt-2">↑ Probability</p>
              </div>
            </CardContent>
          </Card>

          {/* Priority Task List */}
          <Card className="glass-effect lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Priority Task Queue</CardTitle>
                <Button variant="outline" size="sm" className="glass-effect" onClick={handleScheduleAll}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{task.machine}</Badge>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{task.task}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Probability: </span>
                            <span className="font-medium text-status-warning">{task.probability}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Impact: </span>
                            <span className="font-medium">{task.impact}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">RUL: </span>
                            <span className="font-medium text-accent">{task.rul}h</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost: </span>
                            <span className="font-medium">Rp {(task.cost / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="glass-effect"
                        onClick={() => handleSchedule(task)}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optimization Recommendations */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              📊 Additional Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-status-running/10 border border-status-running/20">
                <p className="text-sm">
                  <span className="font-medium">Maintenance Window:</span> Best scheduling window is between 02:00-06:00 AM for minimal production impact.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm">
                  <span className="font-medium">Parts Availability:</span> All required spare parts are in stock except for H87213 cooling unit (ETA: 2 days).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <ScheduleMaintenanceModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          machine={selectedTask?.machine}
          onSchedule={() => {
            setScheduleModalOpen(false);
            toast.success("Maintenance scheduled successfully");
          }}
        />

        <OptimizeScheduleModal
          open={optimizeModalOpen}
          onOpenChange={setOptimizeModalOpen}
          tasks={tasks}
          onConfirm={() => {
            setOptimizeModalOpen(false);
            toast.success("Optimized schedule confirmed and tickets created");
          }}
        />
      </div>
    </div>
  );
}
