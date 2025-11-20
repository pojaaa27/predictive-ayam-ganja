import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Box, RotateCw, ZoomIn, ZoomOut, RotateCcw, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for machines
const machines = [
  { id: "M65401", type: "M", health: 65.3, alert: "Warning" },
  { id: "H87213", type: "H", health: 22.1, alert: "Critical" },
  { id: "L38294", type: "L", health: 88.5, alert: null },
];

// Mock trend data for health history
const mockTrendData = [
  { time: "00:00", overall: 68, cooling: 89, motor: 85, spindle: 72, bearing: 92 },
  { time: "04:00", overall: 67, cooling: 88, motor: 84, spindle: 71, bearing: 92 },
  { time: "08:00", overall: 66, cooling: 87, motor: 83, spindle: 70, bearing: 91 },
  { time: "12:00", overall: 65, cooling: 87, motor: 82, spindle: 68, bearing: 91 },
  { time: "16:00", overall: 65, cooling: 87, motor: 82, spindle: 68, bearing: 91 },
  { time: "20:00", overall: 66, cooling: 88, motor: 83, spindle: 69, bearing: 92 },
  { time: "Now", overall: 65.3, cooling: 87, motor: 82, spindle: 68, bearing: 91 }
];

const mockMachine3DData = {
  product_id: "M65401",
  overall_health: 65.3,
  parts: [
    {
      name: "Cooling System",
      health: 87.0,
      status: "Normal",
      color: "#22c55e",
      temp: "309.2K"
    },
    {
      name: "Motor & Power",
      health: 82.0,
      status: "Normal",
      color: "#22c55e",
      power: "58.5kW"
    },
    {
      name: "Spindle & Tool",
      health: 68.0,
      status: "Warning",
      color: "#eab308",
      wear: "187/253 min"
    },
    {
      name: "Bearing System",
      health: 91.0,
      status: "Normal",
      color: "#22c55e",
      torque: "43.2Nm"
    }
  ]
};

export default function DigitalTwin() {
  const [selectedMachine, setSelectedMachine] = useState("M65401");
  const [rotation, setRotation] = useState(0);
  const [showTrendHistory, setShowTrendHistory] = useState(false);

  const getHealthColor = (health: number) => {
    if (health >= 70) return "bg-status-running";
    if (health >= 50) return "bg-status-warning";
    if (health >= 30) return "bg-[#fb923c]";
    return "bg-status-critical";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Normal": return "🟢";
      case "Warning": return "🟡";
      case "Critical": return "🔴";
      default: return "⚪";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Box className="h-8 w-8 text-primary" />
              Digital Twin 3D
            </h1>
            <p className="text-muted-foreground mt-1">Interactive 3D machine visualization</p>
          </div>
          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-48 glass-effect">
              <SelectValue placeholder="Select machine" />
            </SelectTrigger>
            <SelectContent>
              {machines.map((machine) => (
                <SelectItem key={machine.id} value={machine.id}>
                  {machine.id} ({machine.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Part Status Panel */}
          <Card className="glass-effect lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Part Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockMachine3DData.parts.map((part, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium">{part.name}</p>
                    <span className="text-lg">{getStatusIcon(part.status)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getHealthColor(part.health)}`}
                          style={{ width: `${part.health}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{part.health}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {part.temp && `Temp: ${part.temp}`}
                      {part.power && `Power: ${part.power}`}
                      {part.wear && `Wear: ${part.wear}`}
                      {part.torque && `Torque: ${part.torque}`}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 3D Canvas */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div 
                  className="relative w-full aspect-video bg-gradient-to-br from-card via-secondary/20 to-card rounded-lg border-2 border-primary/20 flex items-center justify-center overflow-hidden"
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)`,
                  }}
                >
                  {/* Placeholder 3D machine visualization */}
                  <div 
                    className="relative transition-transform duration-500"
                    style={{ transform: `rotateY(${rotation}deg)` }}
                  >
                    {/* Simple 3D-like machine representation */}
                    <div className="relative w-64 h-64">
                      {/* Base */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-b from-primary/40 to-primary/60 rounded-lg shadow-lg border border-primary/30" />
                      
                      {/* Main Body */}
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-32 bg-gradient-to-br from-accent/60 to-accent/80 rounded-lg shadow-xl border border-accent/40">
                        <div className="absolute top-2 left-2 w-8 h-8 bg-status-running rounded-full animate-pulse-slow shadow-glow-green" />
                        <div className="absolute top-2 right-2 w-8 h-8 bg-status-warning rounded-full animate-pulse-slow shadow-glow-yellow" />
                      </div>
                      
                      {/* Top Component */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-t from-primary/60 to-primary/40 rounded-t-lg shadow-lg border border-primary/30">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-accent animate-pulse-slow" />
                      </div>
                      
                      {/* Side indicators */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-16 bg-status-running shadow-glow-green rounded-l-lg" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-16 bg-status-warning shadow-glow-yellow rounded-r-lg" />
                    </div>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge className="glass-effect">
                      Machine {selectedMachine}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge className="glass-effect bg-primary/20">
                      Health: {mockMachine3DData.overall_health}%
                    </Badge>
                  </div>

                  {/* Instruction text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground glass-effect px-3 py-1 rounded-full">
                    Use controls below to rotate and zoom
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Control Panel */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-sm">Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setRotation(rotation - 45)}
                    className="glass-effect"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Rotate Left
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setRotation(rotation + 45)}
                    className="glass-effect"
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate Right
                  </Button>
                  <Button variant="outline" size="sm" className="glass-effect">
                    <ZoomIn className="h-4 w-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm" className="glass-effect">
                    <ZoomOut className="h-4 w-4 mr-2" />
                    Zoom Out
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setRotation(0)}
                    className="glass-effect"
                  >
                    Reset View
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Click on parts to see detailed information and maintenance history
                </p>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="glass-effect border-status-running/20">
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">Normal Parts</p>
                  <p className="text-2xl font-bold text-status-running">3</p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-status-warning/20">
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">Warning Parts</p>
                  <p className="text-2xl font-bold text-status-warning">1</p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-status-critical/20">
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">Critical Parts</p>
                  <p className="text-2xl font-bold text-status-critical">0</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Health Trend History */}
        <Card className="glass-effect">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Health Trend History (24h)</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="trend-mode"
                  checked={showTrendHistory}
                  onCheckedChange={setShowTrendHistory}
                />
                <Label htmlFor="trend-mode" className="text-sm">
                  {showTrendHistory ? "Hide Chart" : "Show Chart"}
                </Label>
              </div>
            </div>
          </CardHeader>
          {showTrendHistory && (
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="overall" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Overall Health"
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cooling" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Cooling System"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="motor" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Motor & Power"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spindle" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    name="Spindle & Tool"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bearing" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Bearing System"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs text-muted-foreground">24h Avg</p>
                  <p className="text-lg font-bold text-foreground">66.1%</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs text-muted-foreground">Trend</p>
                  <p className="text-lg font-bold text-status-warning">↓ -2.7%</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs text-muted-foreground">Min Health</p>
                  <p className="text-lg font-bold text-status-critical">65.0%</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs text-muted-foreground">Max Health</p>
                  <p className="text-lg font-bold text-status-running">68.0%</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
