import { useState } from "react";
import { Activity, AlertTriangle, Wrench, CheckCircle2, TrendingUp, DollarSign, Clock, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - akan diganti dengan data dari API
  const machineStatus = {
    running_normal: 45,
    failed: 3,
    warning: 12,
    in_maintenance: 10
  };

  const healthMetrics = {
    avg_health_score: 78.5,
    avg_failure_probability: 32.4,
    avg_remaining_useful_life: 456
  };

  const productionSummary = {
    total_production_today: 6850,
    total_maintenance_cost: 45000000,
    total_downtime: 124
  };

  const failureData = [
    { type: "Heat Dissipation", count: 15 },
    { type: "Power Failure", count: 12 },
    { type: "Overstrain", count: 8 },
    { type: "Tool Wear", count: 18 },
    { type: "Random Failures", count: 5 }
  ];

  const trendData = [
    { day: "Mon", probability: 28 },
    { day: "Tue", probability: 32 },
    { day: "Wed", probability: 30 },
    { day: "Thu", probability: 35 },
    { day: "Fri", probability: 33 },
    { day: "Sat", probability: 29 },
    { day: "Sun", probability: 31 }
  ];

  const healthDistribution = [
    { type: "L", health: 75 },
    { type: "M", health: 82 },
    { type: "H", health: 68 }
  ];

  const criticalAlerts = [
    { id: "M65401", type: "Heat Dissipation Failure", probability: 87, remaining: 24, status: "critical" },
    { id: "L32102", type: "Power Failure", probability: 82, remaining: 36, status: "critical" },
    { id: "H88903", type: "Tool Wear Failure", probability: 78, remaining: 48, status: "critical" },
    { id: "M54201", type: "Overstrain Failure", probability: 75, remaining: 52, status: "warning" },
    { id: "L67802", type: "Random Failures", probability: 68, remaining: 68, status: "warning" }
  ];

  const machines = [
    { id: "M65401", type: "M", status: "critical", temp: 310.5, rpm: 1551, torque: 42.8, probability: 87, health: 34 },
    { id: "L32102", type: "L", status: "critical", temp: 305.2, rpm: 1456, torque: 38.2, probability: 82, health: 41 },
    { id: "H88903", type: "H", status: "warning", temp: 302.8, rpm: 1689, torque: 48.5, probability: 78, health: 58 },
    { id: "M54201", type: "M", status: "normal", temp: 298.5, rpm: 1523, torque: 41.2, probability: 25, health: 89 },
    { id: "L67802", type: "L", status: "normal", temp: 300.1, rpm: 1478, torque: 39.8, probability: 22, health: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "status-normal";
      case "warning": return "status-warning";
      case "critical": return "status-critical";
      case "maintenance": return "status-maintenance";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "normal": return "bg-status-normal";
      case "warning": return "bg-status-warning";
      case "critical": return "bg-status-critical";
      case "maintenance": return "bg-status-maintenance";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Predictive Maintenance Copilot
          </h1>
          <p className="text-muted-foreground mt-2">Real-time machine monitoring & analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            Live Dashboard
          </Badge>
        </div>
      </div>

      {/* Machine Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-6 hover:glow-border transition-all animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Running Normal</p>
              <p className="text-3xl font-bold mt-2 status-normal">{machineStatus.running_normal}</p>
            </div>
            <div className="p-3 rounded-xl bg-status-normal/20">
              <CheckCircle2 className="w-8 h-8 status-normal" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover:glow-border transition-all animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed Machines</p>
              <p className="text-3xl font-bold mt-2 status-critical">{machineStatus.failed}</p>
            </div>
            <div className="p-3 rounded-xl bg-status-critical/20">
              <AlertTriangle className="w-8 h-8 status-critical" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover:glow-border transition-all animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-3xl font-bold mt-2 status-warning">{machineStatus.warning}</p>
            </div>
            <div className="p-3 rounded-xl bg-status-warning/20">
              <Activity className="w-8 h-8 status-warning" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover:glow-border transition-all animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Maintenance</p>
              <p className="text-3xl font-bold mt-2 status-maintenance">{machineStatus.in_maintenance}</p>
            </div>
            <div className="p-3 rounded-xl bg-status-maintenance/20">
              <Wrench className="w-8 h-8 status-maintenance" />
            </div>
          </div>
        </Card>
      </div>

      {/* Health Metrics & Production Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium">Avg Health Score</p>
          </div>
          <p className="text-3xl font-bold text-primary">{healthMetrics.avg_health_score}%</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <p className="text-sm font-medium">Avg Failure Probability</p>
          </div>
          <p className="text-3xl font-bold text-accent">{healthMetrics.avg_failure_probability}%</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-foreground" />
            <p className="text-sm font-medium">Avg Remaining Life</p>
          </div>
          <p className="text-3xl font-bold">{healthMetrics.avg_remaining_useful_life}h</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Production Today</p>
          <p className="text-2xl font-bold">{productionSummary.total_production_today.toLocaleString()} units</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Maintenance Cost (Monthly)</p>
          </div>
          <p className="text-2xl font-bold">Rp {(productionSummary.total_maintenance_cost / 1000000).toFixed(1)}M</p>
        </Card>

        <Card className="glass-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Downtime (Monthly)</p>
          <p className="text-2xl font-bold">{productionSummary.total_downtime}h</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Failure Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={failureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(263 30% 25%)" />
              <XAxis dataKey="type" stroke="hsl(270 20% 65%)" fontSize={12} />
              <YAxis stroke="hsl(270 20% 65%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(263 60% 12%)", 
                  border: "1px solid hsl(263 30% 25%)",
                  borderRadius: "0.5rem"
                }} 
              />
              <Bar dataKey="count" fill="hsl(271 76% 62%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">7-Day Failure Probability Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(263 30% 25%)" />
              <XAxis dataKey="day" stroke="hsl(270 20% 65%)" />
              <YAxis stroke="hsl(270 20% 65%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(263 60% 12%)", 
                  border: "1px solid hsl(263 30% 25%)",
                  borderRadius: "0.5rem"
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="probability" 
                stroke="hsl(280 80% 65%)" 
                strokeWidth={3}
                dot={{ fill: "hsl(280 80% 65%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Critical Alerts Table */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Critical Alerts</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Machine ID</TableHead>
              <TableHead>Failure Type</TableHead>
              <TableHead>Probability</TableHead>
              <TableHead>Remaining Life</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {criticalAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-mono font-semibold">{alert.id}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.probability}%
                  </Badge>
                </TableCell>
                <TableCell>{alert.remaining}h</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(alert.status)} text-white`}>
                    {alert.status.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive">STOP</Button>
                    <Button size="sm" variant="outline">SCHEDULE</Button>
                    <Button size="sm" variant="secondary">WATCH</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Machine Overview */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Machine Overview</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search machine..." 
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="L">Type L</SelectItem>
                <SelectItem value="M">Type M</SelectItem>
                <SelectItem value="H">Type H</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Machine ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Temp (K)</TableHead>
              <TableHead>RPM</TableHead>
              <TableHead>Torque (Nm)</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell className="font-mono font-semibold">{machine.id}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{machine.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(machine.status)} text-white`}>
                    {machine.status.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>{machine.temp}</TableCell>
                <TableCell>{machine.rpm}</TableCell>
                <TableCell>{machine.torque}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(machine.status)}>
                    {machine.probability}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStatusBg(machine.status)}`}
                        style={{ width: `${machine.health}%` }}
                      />
                    </div>
                    <span className="text-sm">{machine.health}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
