import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Download, AlertTriangle, Activity, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const machineData = {
  product_id: "M65401",
  status: "Warning",
  health_score: 78.2,
  probability: 32.4,
  remaining_useful_life: 456,
  sensors: {
    process_temperature_k: 308.5,
    air_temperature_k: 302.1,
    rotational_speed_rpm: 1542,
    torque_nm: 43.2,
    tool_wear_min: 187,
    power: 58500
  }
};

const trendData = [
  { date: "Day 1", probability: 28.1 },
  { date: "Day 2", probability: 29.3 },
  { date: "Day 3", probability: 30.8 },
  { date: "Day 4", probability: 31.2 },
  { date: "Day 5", probability: 31.9 },
  { date: "Day 6", probability: 32.0 },
  { date: "Day 7", probability: 32.4 },
];

const maintenanceHistory = [
  { date: "2025-11-10", type: "Preventive", cost: 4200000, downtime: 3.8, technician: "Andi Pratama" },
  { date: "2025-10-22", type: "Corrective", cost: 7500000, downtime: 8.5, technician: "Budi Santoso" },
  { date: "2025-10-05", type: "Preventive", cost: 3800000, downtime: 2.2, technician: "Andi Pratama" },
];

const selfHealingLogs = [
  { timestamp: "2025-11-18 14:32", action: "Sistem pendingin otomatis diaktifkan - Suhu turun 2.1K" },
  { timestamp: "2025-11-17 09:15", action: "RPM disesuaikan ke range optimal - Stabilisasi torque" },
];

export default function MachineDetail() {
  const navigate = useNavigate();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "text-status-critical";
      case "Warning": return "text-status-warning";
      default: return "text-status-running";
    }
  };

  const getSensorStatus = (sensor: string, value: number) => {
    if (sensor === "process_temperature_k") {
      return value >= 310.5 ? { status: "High", color: "text-status-warning" } : { status: "Normal", color: "text-status-running" };
    }
    if (sensor === "rotational_speed_rpm") {
      return (value >= 1400 && value <= 1800) ? { status: "Normal", color: "text-status-running" } : { status: "Out of Range", color: "text-status-warning" };
    }
    if (sensor === "torque_nm") {
      return (value >= 20 && value <= 60) ? { status: "Normal", color: "text-status-running" } : { status: "Concern", color: "text-status-warning" };
    }
    if (sensor === "tool_wear_min") {
      if (value > 200) return { status: "Critical", color: "text-status-critical" };
      if (value >= 180) return { status: "Warning", color: "text-status-warning" };
      return { status: "Normal", color: "text-status-running" };
    }
    if (sensor === "power") {
      return (value >= 50000 && value <= 70000) ? { status: "Normal", color: "text-status-running" } : { status: "Out of Range", color: "text-status-warning" };
    }
    return { status: "Normal", color: "text-status-running" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/dashboard")} className="glass-effect">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Machine {machineData.product_id}</h1>
              <Badge className={`mt-2 ${getStatusColor(machineData.status)}`}>{machineData.status}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-effect" onClick={() => setShowScheduleModal(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="glass-effect">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-running">{machineData.health_score}%</div>
              <p className="text-xs text-muted-foreground mt-1">Overall machine health</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-status-warning/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-status-warning" />
                Failure Probability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-warning">{machineData.probability}%</div>
              <p className="text-xs text-muted-foreground mt-1">Risk of failure</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Remaining Useful Life
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{machineData.remaining_useful_life}h</div>
              <p className="text-xs text-muted-foreground mt-1">Estimated operating time</p>
            </CardContent>
          </Card>
        </div>

        {/* Sensor Readings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Sensor Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Temperature</p>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Process:</span>
                  <span className={`text-sm font-medium ${getSensorStatus("process_temperature_k", machineData.sensors.process_temperature_k).color}`}>
                    {machineData.sensors.process_temperature_k}K ({getSensorStatus("process_temperature_k", machineData.sensors.process_temperature_k).status})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Air:</span>
                  <span className="text-sm font-medium text-status-running">{machineData.sensors.air_temperature_k}K (Normal)</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">RPM & Torque</p>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">RPM:</span>
                  <span className={`text-sm font-medium ${getSensorStatus("rotational_speed_rpm", machineData.sensors.rotational_speed_rpm).color}`}>
                    {machineData.sensors.rotational_speed_rpm} ({getSensorStatus("rotational_speed_rpm", machineData.sensors.rotational_speed_rpm).status})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Torque:</span>
                  <span className={`text-sm font-medium ${getSensorStatus("torque_nm", machineData.sensors.torque_nm).color}`}>
                    {machineData.sensors.torque_nm}Nm ({getSensorStatus("torque_nm", machineData.sensors.torque_nm).status})
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Tool Wear & Power</p>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tool Wear:</span>
                  <span className={`text-sm font-medium ${getSensorStatus("tool_wear_min", machineData.sensors.tool_wear_min).color}`}>
                    {machineData.sensors.tool_wear_min}/253 min ({getSensorStatus("tool_wear_min", machineData.sensors.tool_wear_min).status})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Power:</span>
                  <span className={`text-sm font-medium ${getSensorStatus("power", machineData.sensors.power).color}`}>
                    {(machineData.sensors.power / 1000).toFixed(1)}kW ({getSensorStatus("power", machineData.sensors.power).status})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Probability Trend */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>7-Day Failure Probability Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="probability" stroke="hsl(var(--status-warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Maintenance History & Self-Healing Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceHistory.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{item.type}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge variant="outline">{item.technician}</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Cost: </span>
                        <span className="font-medium">Rp {(item.cost / 1000000).toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Downtime: </span>
                        <span className="font-medium">{item.downtime}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Self-Healing Logs (48h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selfHealingLogs.map((log, index) => (
                  <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    <p className="text-sm mt-1">{log.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
