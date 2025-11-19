import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Search, Filter, CheckCircle, XCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { SelfHealingDetailModal } from "@/components/SelfHealingDetailModal";

const mockStats = {
  totalActions: 1248,
  successRate: 94.7,
  failedActions: 66,
  avgResponseTime: 1.42
};

const actionTypeData = [
  { type: "Cooling", count: 485 },
  { type: "Emergency", count: 142 },
  { type: "Stabilization", count: 328 },
  { type: "Power Boost", count: 198 },
  { type: "Tool Wear", count: 95 }
];

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

const mockLogs = [
  {
    timestamp: "2025-11-18 14:32",
    machine: "M65401",
    trigger: "High Temperature",
    action: "Sistem pendingin otomatis diaktifkan (cooling fan speed +30%)",
    result: "Success",
    detail: "Process temperature turun 2.1K dalam 1.2 detik"
  },
  {
    timestamp: "2025-11-18 12:15",
    machine: "H87213",
    trigger: "Extreme Temp",
    action: "Emergency cooling + production halt selama 30 detik",
    result: "Success",
    detail: "Temperature normalized, produksi dilanjutkan"
  },
  {
    timestamp: "2025-11-18 09:20",
    machine: "M54201",
    trigger: "Low Power",
    action: "Power supply boost + voltage stabilization",
    result: "Failed",
    detail: "Manual intervention required - technician dispatched"
  }
];

export default function SelfHealingLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [machineFilter, setMachineFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.machine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.result.toLowerCase() === statusFilter.toLowerCase();
    const matchesMachine = machineFilter === "all" || log.machine === machineFilter;
    
    return matchesSearch && matchesStatus && matchesMachine;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Self-Healing Logs</h1>
          <p className="text-muted-foreground mt-1">Automatic system recovery actions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Actions</p>
                  <p className="text-2xl font-bold text-primary">{mockStats.totalActions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-status-running">{mockStats.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Action Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={actionTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Action Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={actionTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="count">
                    {actionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Logs */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Self-Healing Logs ({filteredLogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border cursor-pointer hover:bg-card/50"
                  onClick={() => {
                    setSelectedLog(log);
                    setIsDetailModalOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    <Badge variant="outline">{log.machine}</Badge>
                    <Badge variant={log.result === "Success" ? "default" : "destructive"}>
                      {log.result}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SelfHealingDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        log={selectedLog}
      />
    </div>
  );
}
