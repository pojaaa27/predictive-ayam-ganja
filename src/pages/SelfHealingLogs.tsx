import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, Filter, CheckCircle2, XCircle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const mockStats = {
  total_actions: 247,
  success_rate: 94.7,
  failed_actions: 13
};

const actionTypeData = [
  { name: "Cooling Activation", value: 89 },
  { name: "RPM Adjustment", value: 67 },
  { name: "Power Stabilization", value: 53 },
  { name: "Tool Wear Alert", value: 38 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--status-warning))", "hsl(var(--status-critical))"];

const mockLogs = [
  {
    timestamp: "2025-11-18 14:32:15",
    machine: "M65401",
    trigger: "High Temp (311.6K)",
    action: "Sistem pendingin otomatis diaktifkan",
    result: "Success",
    detail: "Suhu turun 2.1K dalam 5 menit"
  },
  {
    timestamp: "2025-11-18 13:45:22",
    machine: "H87213",
    trigger: "RPM Instability",
    action: "RPM disesuaikan ke range optimal",
    result: "Success",
    detail: "Stabilisasi torque berhasil"
  },
  {
    timestamp: "2025-11-18 12:18:07",
    machine: "L38294",
    trigger: "Power Fluctuation",
    action: "Power stabilizer diaktifkan",
    result: "Success",
    detail: "Power kembali normal"
  },
  {
    timestamp: "2025-11-18 11:22:45",
    machine: "M65401",
    trigger: "Tool Wear > 200",
    action: "Alert teknisi & reduce RPM",
    result: "Success",
    detail: "Maintenance dijadwalkan"
  },
  {
    timestamp: "2025-11-18 10:15:33",
    machine: "H87213",
    trigger: "Overheat Critical",
    action: "Emergency cooling + shutdown",
    result: "Failed",
    detail: "Cooling system malfunction"
  },
  {
    timestamp: "2025-11-18 09:08:19",
    machine: "M98765",
    trigger: "High Vibration",
    action: "RPM reduction & alert",
    result: "Success",
    detail: "Vibration normalized"
  },
];

export default function SelfHealingLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMachine, setFilterMachine] = useState("all");

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.machine.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || log.result.toLowerCase() === filterStatus;
    const matchesMachine = filterMachine === "all" || log.machine === filterMachine;
    return matchesSearch && matchesStatus && matchesMachine;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Self-Healing Logs
          </h1>
          <p className="text-muted-foreground mt-1">Automatic system recovery actions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Total Actions (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{mockStats.total_actions}</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-status-running/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-running" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-running">{mockStats.success_rate}%</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-status-critical/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <XCircle className="h-4 w-4 text-status-critical" />
                Failed Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-critical">{mockStats.failed_actions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm">Action Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={actionTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm">Action Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={actionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {actionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search machine or action..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 glass-effect"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 glass-effect">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMachine} onValueChange={setFilterMachine}>
                <SelectTrigger className="w-40 glass-effect">
                  <SelectValue placeholder="Machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Machines</SelectItem>
                  <SelectItem value="M65401">M65401</SelectItem>
                  <SelectItem value="H87213">H87213</SelectItem>
                  <SelectItem value="L38294">L38294</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterMachine("all");
                }}
                className="glass-effect"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-sm">Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                        <Badge variant="outline" className="text-xs">{log.machine}</Badge>
                        <Badge 
                          className={`text-xs ${
                            log.result === "Success" 
                              ? "bg-status-running/20 text-status-running border-status-running/30" 
                              : "bg-status-critical/20 text-status-critical border-status-critical/30"
                          }`}
                        >
                          {log.result === "Success" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                          {log.result}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>🎯 Trigger: {log.trigger}</span>
                        <span>📊 {log.detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
