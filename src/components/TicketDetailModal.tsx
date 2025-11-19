import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TicketDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: any;
  onUpdate?: () => void;
}

export function TicketDetailModal({ open, onOpenChange, ticket, onUpdate }: TicketDetailModalProps) {
  const [newNote, setNewNote] = useState("");

  if (!ticket) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Cancelled": return "destructive";
      default: return "outline";
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error("Please enter a note");
      return;
    }
    
    toast.success("Note added successfully");
    setNewNote("");
    onUpdate?.();
  };

  const handleReopen = () => {
    toast.success(`Ticket ${ticket.id} reopened successfully`);
    onUpdate?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Ticket Detail: {ticket.id}</DialogTitle>
            <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Info */}
          <Card className="p-4 bg-card/50 border-border/50">
            <h3 className="font-semibold mb-3">Ticket Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Created At</div>
                <div className="font-medium">{ticket.date}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Completed At</div>
                <div className="font-medium">{ticket.status === "Completed" ? ticket.date : "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Machine ID</div>
                <div className="font-medium">{ticket.machine}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Maintenance Type</div>
                <Badge variant="outline">{ticket.type}</Badge>
              </div>
            </div>
          </Card>

          {/* Failure Details */}
          <Card className="p-4 bg-card/30 border-border/50">
            <h3 className="font-semibold mb-3">Failure Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Failure Type</div>
                <div className="font-medium">{ticket.failure}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Downtime</div>
                <div className="font-medium">{ticket.downtime} hours</div>
              </div>
            </div>
          </Card>

          {/* Cost Breakdown */}
          <Card className="p-4 bg-card/30 border-border/50">
            <h3 className="font-semibold mb-3">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parts Cost:</span>
                <span className="font-medium">Rp {(ticket.cost * 0.7).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labor Cost:</span>
                <span className="font-medium">Rp {(ticket.cost * 0.3).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Cost:</span>
                <span>Rp {ticket.cost.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Technician Info */}
          <Card className="p-4 bg-card/30 border-border/50">
            <h3 className="font-semibold mb-3">Technician Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned To:</span>
                <span className="font-medium">{ticket.technician}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium">+62 812-3456-7890</span>
              </div>
            </div>
          </Card>

          {/* Maintenance Notes */}
          <Card className="p-4 bg-card/30 border-border/50">
            <h3 className="font-semibold mb-3">Maintenance Notes</h3>
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{ticket.technician}</span>
                  <span className="text-xs text-muted-foreground">{ticket.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Initial diagnosis completed. Identified {ticket.failure}. Proceeding with repairs.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Add New Note</Label>
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter maintenance notes..."
                rows={3}
              />
              <Button onClick={handleAddNote} size="sm" className="w-full">
                Add Note
              </Button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {ticket.status === "Completed" && (
              <Button variant="outline" onClick={handleReopen}>
                Reopen Ticket
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
