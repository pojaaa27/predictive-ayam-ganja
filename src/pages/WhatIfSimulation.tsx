import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Wrench, Clock, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock machines for simulation
const mockMachines = [
  { id: "M65401", name: "Machine M65401", probability: 68.5, healthScore: 65.3, rul: 245, output: 85.0 },
  { id: "M18273", name: "Machine M18273", probability: 82.3, healthScore: 54.2, rul: 156, output: 72.0 },
  { id: "H87213", name: "Machine H87213", probability: 75.8, healthScore: 61.5, rul: 198, output: 78.0 },
];

const mockSimulationResult = {
  currentState: {
    probability: 68.5,
    healthScore: 65.3,
    remainingUsefulLife: 245,
    productionOutput: 85.0,
    estimatedMaintenanceCost: 4200000,
  },
  predictedState: {
    probability: 78.3,
    healthScore: 58.1,
    remainingUsefulLife: 173,
    productionOutput: 70.0,
    estimatedMaintenanceCost: 5460000,
  },
  costImpact: {
    currentMaintenanceCost: 4200000,
    delayedMaintenanceCost: 5460000,
    costIncrease: 1260000,
    costIncreasePercentage: 30.0,
    productionLoss: 4500000,
    totalAdditionalCost: 5760000,
  },
  comparisonScenarios: [
    { scenario: "Maintenance Today", totalCost: 4200000, downtimeHours: 3.8, riskLevel: "Low" },
    { scenario: "Delay 1 Day", totalCost: 4662000, downtimeHours: 4.2, riskLevel: "Medium" },
    { scenario: "Delay 3 Days", totalCost: 5460000, downtimeHours: 4.9, riskLevel: "High" },
    { scenario: "Delay 7 Days", totalCost: 7560000, downtimeHours: 6.8, riskLevel: "Critical" },
  ],
  recommendation: {
    action: "Schedule maintenance immediately",
    reason: "Cost increase Rp 1.26M (30%) if delayed 3 days. Risk of cascade failure increased by 15%.",
    priorityLevel: "High",
  },
};

type SimulationHistory = {
  timestamp: string;
  machine: string;
  delayDays: number;
  costIncrease: number;
  riskLevel: string;
  recommendation: string;
};

export default function WhatIfSimulation() {
  const [selectedMachine, setSelectedMachine] = useState("M65401");
  const [delayDays, setDelayDays] = useState(3);
  const [simulationResult, setSimulationResult] = useState<typeof mockSimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<SimulationHistory[]>([
    {
      timestamp: "2025-11-20 14:32",
      machine: "M65401",
      delayDays: 3,
      costIncrease: 1260000,
      riskLevel: "High",
      recommendation: "Schedule immediately"
    },
    {
      timestamp: "2025-11-20 11:15",
      machine: "H87213",
      delayDays: 7,
      costIncrease: 3360000,
      riskLevel: "Critical",
      recommendation: "Emergency maintenance required"
    },
    {
      timestamp: "2025-11-19 16:45",
      machine: "M18273",
      delayDays: 1,
      costIncrease: 462000,
      riskLevel: "Medium",
      recommendation: "Schedule within 24 hours"
    }
  ]);

  const handleSimulate = () => {
    // In real app, this would call API
    setSimulationResult(mockSimulationResult);
    
    // Add to history
    const newHistoryEntry: SimulationHistory = {
      timestamp: new Date().toLocaleString('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(/\//g, '-').replace(',', ''),
      machine: selectedMachine,
      delayDays,
      costIncrease: mockSimulationResult.costImpact.costIncrease,
      riskLevel: mockSimulationResult.recommendation.priorityLevel,
      recommendation: mockSimulationResult.recommendation.action
    };
    
    setSimulationHistory([newHistoryEntry, ...simulationHistory]);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical": return "text-status-critical";
      case "High": return "text-status-warning";
      case "Medium": return "text-yellow-500";
      default: return "text-status-running";
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "Critical": return "bg-status-critical/20 text-status-critical border-status-critical/30";
      case "High": return "bg-status-warning/20 text-status-warning border-status-warning/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default: return "bg-status-running/20 text-status-running border-status-running/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">What-If Simulation</h1>
          <p className="text-muted-foreground mt-2">Simulasikan dampak penundaan maintenance terhadap biaya dan risiko</p>
        </div>

        {/* Simulation Input */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle>Input Simulasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="machine">Pilih Mesin</Label>
                <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                  <SelectTrigger id="machine">
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMachines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delay">Penundaan (hari)</Label>
                <Input
                  id="delay"
                  type="number"
                  min="1"
                  max="30"
                  value={delayDays}
                  onChange={(e) => setDelayDays(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleSimulate} className="w-full">
                  Jalankan Simulasi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulation Results */}
        {simulationResult && (
          <>
            {/* Current vs Predicted State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current State */}
              <Card className="glass-effect border-status-running/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-status-running animate-pulse" />
                    Status Saat Ini
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Failure Probability</span>
                    <span className="text-lg font-bold text-status-running">{simulationResult.currentState.probability}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Health Score</span>
                    <span className="text-lg font-bold">{simulationResult.currentState.healthScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remaining Useful Life</span>
                    <span className="text-lg font-bold">{simulationResult.currentState.remainingUsefulLife}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Production Output</span>
                    <span className="text-lg font-bold">{simulationResult.currentState.productionOutput}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Maintenance Cost</span>
                    <span className="text-lg font-bold text-primary">Rp {(simulationResult.currentState.estimatedMaintenanceCost / 1000000).toFixed(1)}M</span>
                  </div>
                </CardContent>
              </Card>

              {/* Predicted State After Delay */}
              <Card className="glass-effect border-status-warning/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-status-warning animate-pulse" />
                    Prediksi Setelah {delayDays} Hari
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Failure Probability</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-warning">{simulationResult.predictedState.probability}%</span>
                      <TrendingUp className="h-4 w-4 text-status-warning" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Health Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-warning">{simulationResult.predictedState.healthScore}%</span>
                      <TrendingDown className="h-4 w-4 text-status-warning" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remaining Useful Life</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-warning">{simulationResult.predictedState.remainingUsefulLife}h</span>
                      <TrendingDown className="h-4 w-4 text-status-warning" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Production Output</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-warning">{simulationResult.predictedState.productionOutput}%</span>
                      <TrendingDown className="h-4 w-4 text-status-warning" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Maintenance Cost</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-critical">Rp {(simulationResult.predictedState.estimatedMaintenanceCost / 1000000).toFixed(1)}M</span>
                      <TrendingUp className="h-4 w-4 text-status-critical" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cost Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="glass-effect border-status-critical/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-status-critical" />
                    Cost Increase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-status-critical">
                    +Rp {(simulationResult.costImpact.costIncrease / 1000000).toFixed(2)}M
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +{simulationResult.costImpact.costIncreasePercentage}%
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-status-warning/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-status-warning" />
                    Production Loss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-status-warning">
                    Rp {(simulationResult.costImpact.productionLoss / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lost revenue</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-status-critical/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-status-critical" />
                    Total Additional Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-status-critical">
                    Rp {(simulationResult.costImpact.totalAdditionalCost / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total impact</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    Maintenance Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    Rp {(simulationResult.costImpact.delayedMaintenanceCost / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">After delay</p>
                </CardContent>
              </Card>
            </div>

            {/* Scenario Comparison */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Perbandingan Skenario</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={simulationResult.comparisonScenarios}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="totalCost" fill="hsl(var(--primary))" name="Total Cost (Rp)" />
                    <Bar dataKey="downtimeHours" fill="hsl(var(--status-warning))" name="Downtime (hours)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                  {simulationResult.comparisonScenarios.map((scenario, index) => (
                    <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                      <p className="text-sm font-medium mb-2">{scenario.scenario}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-medium">Rp {(scenario.totalCost / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Downtime:</span>
                          <span className="font-medium">{scenario.downtimeHours}h</span>
                        </div>
                        <div className="flex justify-between text-xs items-center">
                          <span className="text-muted-foreground">Risk:</span>
                          <Badge variant="outline" className={getRiskBadgeColor(scenario.riskLevel)}>
                            {scenario.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card className="glass-effect border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Rekomendasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Badge className={`${getRiskBadgeColor(simulationResult.recommendation.priorityLevel)} mt-1`}>
                      {simulationResult.recommendation.priorityLevel} Priority
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-lg mb-2">{simulationResult.recommendation.action}</p>
                      <p className="text-sm text-muted-foreground">{simulationResult.recommendation.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-border/50">
                    <Button className="flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Maintenance Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Run Another Simulation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Simulation History */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Riwayat Simulasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Machine</TableHead>
                    <TableHead>Delay (hari)</TableHead>
                    <TableHead>Cost Increase</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulationHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Belum ada riwayat simulasi
                      </TableCell>
                    </TableRow>
                  ) : (
                    simulationHistory.map((history, index) => (
                      <TableRow key={index} className="hover:bg-card/50">
                        <TableCell className="font-mono text-xs">{history.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{history.machine}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{history.delayDays}</TableCell>
                        <TableCell className="font-medium text-status-critical">
                          +Rp {(history.costIncrease / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRiskBadgeColor(history.riskLevel)}>
                            {history.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {history.recommendation}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
