import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Database, Table, Key, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DatabaseSchema() {
  const navigate = useNavigate();

  const tables = [
    {
      name: "machines",
      description: "Master data untuk semua mesin yang dimonitor",
      columns: [
        { name: "id", type: "VARCHAR(50)", key: "PK", description: "Unique machine identifier" },
        { name: "name", type: "VARCHAR(255)", key: "", description: "Machine name" },
        { name: "type", type: "VARCHAR(100)", key: "", description: "Machine type/category" },
        { name: "location", type: "VARCHAR(255)", key: "", description: "Physical location" },
        { name: "installation_date", type: "DATE", key: "", description: "Installation date" },
        { name: "last_maintenance", type: "TIMESTAMP", key: "", description: "Last maintenance timestamp" },
        { name: "created_at", type: "TIMESTAMP", key: "", description: "Record creation time" },
        { name: "updated_at", type: "TIMESTAMP", key: "", description: "Last update time" }
      ]
    },
    {
      name: "sensor_data",
      description: "Real-time sensor readings dari mesin",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PK", description: "Auto-increment primary key" },
        { name: "machine_id", type: "VARCHAR(50)", key: "FK", description: "Reference to machines.id" },
        { name: "temperature", type: "DECIMAL(5,2)", key: "", description: "Temperature in Celsius" },
        { name: "vibration", type: "DECIMAL(5,2)", key: "", description: "Vibration level" },
        { name: "pressure", type: "DECIMAL(5,2)", key: "", description: "Pressure reading" },
        { name: "power_consumption", type: "DECIMAL(8,2)", key: "", description: "Power usage in kW" },
        { name: "rotation_speed", type: "INTEGER", key: "", description: "RPM" },
        { name: "timestamp", type: "TIMESTAMP", key: "INDEX", description: "Reading timestamp" }
      ]
    },
    {
      name: "predictions",
      description: "Hasil prediksi failure dari ML model",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PK", description: "Auto-increment primary key" },
        { name: "machine_id", type: "VARCHAR(50)", key: "FK", description: "Reference to machines.id" },
        { name: "failure_probability", type: "DECIMAL(5,2)", key: "", description: "Probability percentage (0-100)" },
        { name: "health_score", type: "DECIMAL(5,2)", key: "", description: "Overall health score" },
        { name: "rul_hours", type: "INTEGER", key: "", description: "Remaining Useful Life in hours" },
        { name: "risk_level", type: "VARCHAR(20)", key: "", description: "LOW, MEDIUM, HIGH, CRITICAL" },
        { name: "predicted_failure_date", type: "TIMESTAMP", key: "", description: "Estimated failure date" },
        { name: "model_version", type: "VARCHAR(50)", key: "", description: "ML model version used" },
        { name: "created_at", type: "TIMESTAMP", key: "", description: "Prediction timestamp" }
      ]
    },
    {
      name: "maintenance_tickets",
      description: "Maintenance tickets dan scheduling",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PK", description: "Auto-increment primary key" },
        { name: "machine_id", type: "VARCHAR(50)", key: "FK", description: "Reference to machines.id" },
        { name: "title", type: "VARCHAR(255)", key: "", description: "Ticket title" },
        { name: "description", type: "TEXT", key: "", description: "Detailed description" },
        { name: "priority", type: "VARCHAR(20)", key: "", description: "LOW, MEDIUM, HIGH, CRITICAL" },
        { name: "status", type: "VARCHAR(20)", key: "", description: "OPEN, IN_PROGRESS, COMPLETED, CANCELLED" },
        { name: "scheduled_date", type: "TIMESTAMP", key: "", description: "Scheduled maintenance date" },
        { name: "completed_date", type: "TIMESTAMP", key: "", description: "Actual completion date" },
        { name: "assigned_to", type: "VARCHAR(255)", key: "", description: "Assigned technician" },
        { name: "estimated_cost", type: "DECIMAL(12,2)", key: "", description: "Estimated cost in IDR" },
        { name: "actual_cost", type: "DECIMAL(12,2)", key: "", description: "Actual cost in IDR" },
        { name: "created_at", type: "TIMESTAMP", key: "", description: "Ticket creation time" },
        { name: "updated_at", type: "TIMESTAMP", key: "", description: "Last update time" }
      ]
    },
    {
      name: "self_healing_logs",
      description: "Log dari automatic self-healing actions",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PK", description: "Auto-increment primary key" },
        { name: "machine_id", type: "VARCHAR(50)", key: "FK", description: "Reference to machines.id" },
        { name: "trigger_condition", type: "VARCHAR(255)", key: "", description: "Condition that triggered action" },
        { name: "action_taken", type: "TEXT", key: "", description: "Description of action taken" },
        { name: "action_type", type: "VARCHAR(100)", key: "", description: "Type of self-healing action" },
        { name: "result", type: "VARCHAR(20)", key: "", description: "SUCCESS or FAILED" },
        { name: "details", type: "TEXT", key: "", description: "Detailed results and metrics" },
        { name: "response_time_ms", type: "INTEGER", key: "", description: "Response time in milliseconds" },
        { name: "timestamp", type: "TIMESTAMP", key: "", description: "Action timestamp" }
      ]
    },
    {
      name: "simulations",
      description: "What-if simulation history",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PK", description: "Auto-increment primary key" },
        { name: "machine_id", type: "VARCHAR(50)", key: "FK", description: "Reference to machines.id" },
        { name: "delay_days", type: "INTEGER", key: "", description: "Simulated delay in days" },
        { name: "current_cost", type: "DECIMAL(12,2)", key: "", description: "Current maintenance cost" },
        { name: "predicted_cost", type: "DECIMAL(12,2)", key: "", description: "Predicted cost after delay" },
        { name: "cost_increase", type: "DECIMAL(12,2)", key: "", description: "Cost increase amount" },
        { name: "risk_assessment", type: "TEXT", key: "", description: "Risk analysis results" },
        { name: "recommendation", type: "TEXT", key: "", description: "System recommendation" },
        { name: "created_at", type: "TIMESTAMP", key: "", description: "Simulation timestamp" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-block mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Database className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Database Schema
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Struktur database PredMaint AI yang dirancang untuk mendukung predictive maintenance, 
              real-time monitoring, dan analytics dengan performa optimal
            </p>
          </div>

          {/* Schema Overview */}
          <Card className="glass-effect border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{tables.length}</div>
                  <p className="text-sm text-muted-foreground">Total Tables</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">PostgreSQL</div>
                  <p className="text-sm text-muted-foreground">Database Engine</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Optimized</div>
                  <p className="text-sm text-muted-foreground">For Time-Series Data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entity Relationship Overview */}
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Entity Relationships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-primary">machines</span> (1) → (N) 
                    <span className="font-mono text-primary"> sensor_data</span>
                    <span className="text-xs ml-2">- One machine has many sensor readings</span>
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-primary">machines</span> (1) → (N) 
                    <span className="font-mono text-primary"> predictions</span>
                    <span className="text-xs ml-2">- One machine has many predictions</span>
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-primary">machines</span> (1) → (N) 
                    <span className="font-mono text-primary"> maintenance_tickets</span>
                    <span className="text-xs ml-2">- One machine has many maintenance tickets</span>
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-primary">machines</span> (1) → (N) 
                    <span className="font-mono text-primary"> self_healing_logs</span>
                    <span className="text-xs ml-2">- One machine has many self-healing logs</span>
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-primary">machines</span> (1) → (N) 
                    <span className="font-mono text-primary"> simulations</span>
                    <span className="text-xs ml-2">- One machine has many simulation records</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables Detail */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">Table Schemas</h2>
            
            {tables.map((table, index) => (
              <Card key={index} className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Table className="h-5 w-5 text-primary" />
                      <span className="font-mono">{table.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {table.columns.length} columns
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{table.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-card/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Column Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Key
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {table.columns.map((column, colIndex) => (
                          <tr key={colIndex} className="hover:bg-card/30">
                            <td className="px-4 py-3">
                              <code className="text-sm font-mono text-primary">{column.name}</code>
                            </td>
                            <td className="px-4 py-3">
                              <code className="text-xs font-mono text-muted-foreground">{column.type}</code>
                            </td>
                            <td className="px-4 py-3">
                              {column.key && (
                                <Badge 
                                  variant="outline" 
                                  className={
                                    column.key === "PK" 
                                      ? "border-primary text-primary" 
                                      : column.key === "FK"
                                      ? "border-accent text-accent"
                                      : ""
                                  }
                                >
                                  <Key className="h-3 w-3 mr-1" />
                                  {column.key}
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {column.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Notes */}
          <Card className="glass-effect border-accent/30">
            <CardHeader>
              <CardTitle>Technical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Indexing Strategy:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Primary keys (PK) automatically indexed</li>
                    <li>• Foreign keys (FK) indexed for join optimization</li>
                    <li>• Timestamp columns indexed for time-series queries</li>
                    <li>• Composite indexes on (machine_id, timestamp) for sensor data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Data Retention:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Sensor data: 90 days rolling window</li>
                    <li>• Predictions: 180 days</li>
                    <li>• Maintenance tickets: Permanent</li>
                    <li>• Self-healing logs: 60 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Performance Optimization:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Partitioning on sensor_data by timestamp (monthly)</li>
                    <li>• Read replicas for analytics queries</li>
                    <li>• Connection pooling with pgBouncer</li>
                    <li>• Materialized views for dashboard aggregations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 PredMaint AI. Database schema documentation.
        </div>
      </footer>
    </div>
  );
}
