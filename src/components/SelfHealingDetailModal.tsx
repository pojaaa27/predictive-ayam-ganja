import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SelfHealingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: any;
}

export function SelfHealingDetailModal({ open, onOpenChange, log }: SelfHealingDetailModalProps) {
  if (!log) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Self-Healing Log Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="p-4 bg-card/50 border-border/50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Timestamp</div>
                <div className="font-medium">{log.timestamp}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Machine ID</div>
                <div className="font-medium">{log.machine}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Result</div>
                <Badge variant={log.result === "Success" ? "default" : "destructive"}>
                  {log.result}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Response Time</div>
                <div className="font-medium">1.2 seconds</div>
              </div>
            </div>
          </Card>

          {/* Trigger */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Trigger Condition</h3>
            <Card className="p-4 bg-card/30 border-border/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{log.trigger}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Detected At:</span>
                  <span className="font-medium">{log.timestamp}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Taken */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Action Taken</h3>
            <Card className="p-4 bg-card/30 border-border/50">
              <p className="text-sm mb-2">{log.action}</p>
              <div className="text-xs text-muted-foreground">
                Executed at: {log.timestamp}
              </div>
            </Card>
          </div>

          {/* Sensor Comparison */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sensor Data Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card/30 border-border/50">
                <h4 className="font-medium mb-3 text-center">Before Action</h4>
                <Separator className="mb-3" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium">311.8 K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RPM:</span>
                    <span className="font-medium">1542</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">66,564 W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Torque:</span>
                    <span className="font-medium">43.2 Nm</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/30 border-border/50">
                <h4 className="font-medium mb-3 text-center">After Action</h4>
                <Separator className="mb-3" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium text-green-500">309.7 K ↓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RPM:</span>
                    <span className="font-medium">1542</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">66,564 W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Torque:</span>
                    <span className="font-medium">43.2 Nm</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Impact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Impact & Savings</h3>
            <Card className="p-4 bg-card/30 border-border/50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Prevented Failure</div>
                  <div className="text-2xl font-bold text-green-500">✓</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Cost Saved</div>
                  <div className="text-xl font-bold">Rp 8.5M</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Downtime Saved</div>
                  <div className="text-xl font-bold">6.5 hrs</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Detail Log */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Detailed Log</h3>
            <Card className="p-4 bg-card/30 border-border/50">
              <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{log.detail}
              </pre>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
