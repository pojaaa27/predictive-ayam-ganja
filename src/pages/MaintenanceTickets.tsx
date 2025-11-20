import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar as CalendarIcon,
  BarChart3, 
  Users,
  Trash2,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { CreateTicketModal } from "@/components/CreateTicketModal";
import { TicketDetailModal } from "@/components/TicketDetailModal";
import { RescheduleTicketModal } from "@/components/RescheduleTicketModal";
import { TechnicianAvailabilityModal } from "@/components/TechnicianAvailabilityModal";
import { TicketCalendarView } from "@/components/TicketCalendarView";
import { TicketAnalytics } from "@/components/TicketAnalytics";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const mockStats = {
  total_tickets: 1248,
  monthly_tickets: 184,
  avg_mttr: 9.4,
  repeat_failure_rate: 6.8,
  total_cost: 4820000000
};

const mockTickets = [
  {
    id: "TKT-2025-11842",
    date: "2025-11-15 14:30",
    machine: "H87213",
    type: "H",
    maintenance_type: "Emergency",
    failure_type: "Power Failure",
    technician: "Fajar Rahman",
    cost: 18500000,
    downtime: 14.2,
    status: "Completed"
  },
  {
    id: "TKT-2025-11841",
    date: "2025-11-15 08:10",
    machine: "M65401",
    type: "M",
    maintenance_type: "Preventive",
    failure_type: "Tool Wear Failure",
    technician: "Andi Pratama",
    cost: 4200000,
    downtime: 3.8,
    status: "Completed"
  },
  {
    id: "TKT-2025-11840",
    date: "2025-11-14 16:45",
    machine: "M98765",
    type: "M",
    maintenance_type: "Corrective",
    failure_type: "Heat Dissipation Failure",
    technician: "Budi Santoso",
    cost: 7500000,
    downtime: 8.5,
    status: "In Progress"
  },
  {
    id: "TKT-2025-11839",
    date: "2025-11-14 09:20",
    machine: "L38294",
    type: "L",
    maintenance_type: "Preventive",
    failure_type: "Routine Check",
    technician: "Andi Pratama",
    cost: 850000,
    downtime: 1.2,
    status: "Completed"
  },
  {
    id: "TKT-2025-11838",
    date: "2025-11-13 15:30",
    machine: "H92103",
    type: "H",
    maintenance_type: "Emergency",
    failure_type: "Overstrain Failure",
    technician: "Fajar Rahman",
    cost: 22000000,
    downtime: 18.5,
    status: "Completed"
  },
];

export default function MaintenanceTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [tickets, setTickets] = useState(mockTickets);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.machine.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesType = filterType === "all" || ticket.maintenance_type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetail = (ticket: any) => {
    setSelectedTicket(ticket);
    setDetailModalOpen(true);
  };

  const handleReschedule = (ticket: any) => {
    setSelectedTicket(ticket);
    setRescheduleModalOpen(true);
  };

  const handleDeleteTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTicket) {
      setTickets(tickets.filter(t => t.id !== selectedTicket.id));
      toast.success(`Ticket ${selectedTicket.id} deleted successfully`);
      setDeleteDialogOpen(false);
      setSelectedTicket(null);
    }
  };

  const handleUpdate = () => {
    // Refresh logic after update
    toast.success("Ticket updated successfully");
  };

  const handleExport = () => {
    toast.success("Exporting ticket data...", {
      description: "Your export will be ready in a moment"
    });
  };

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case "Emergency": return "bg-status-critical/20 text-status-critical border-status-critical/30";
      case "Corrective": return "bg-status-warning/20 text-status-warning border-status-warning/30";
      case "Preventive": return "bg-status-running/20 text-status-running border-status-running/30";
      default: return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-status-running/20 text-status-running border-status-running/30";
      case "In Progress": return "bg-accent/20 text-accent border-accent/30";
      case "Open": return "bg-primary/20 text-primary border-primary/30";
      case "Cancelled": return "bg-muted/20 text-muted-foreground border-muted/30";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Maintenance Tickets
          </h1>
          <p className="text-muted-foreground mt-1">Complete maintenance history and tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="glass-effect">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Tickets</p>
              <p className="text-2xl font-bold text-primary">{mockStats.total_tickets}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-accent">{mockStats.monthly_tickets}</p>
              <p className="text-xs text-status-running mt-1">↑12% vs last month</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Avg MTTR</p>
              <p className="text-2xl font-bold text-foreground">{mockStats.avg_mttr}h</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Repeat Failure</p>
              <p className="text-2xl font-bold text-status-warning">{mockStats.repeat_failure_rate}%</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Cost</p>
              <p className="text-xl font-bold text-foreground">Rp {(mockStats.total_cost / 1000000000).toFixed(2)}B</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <Card className="glass-effect">
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ticket or machine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 glass-effect"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 glass-effect">
                  <SelectValue placeholder="Maintenance Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 glass-effect">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="glass-effect" onClick={() => setTechModalOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Check Availability
              </Button>
              <Button variant="outline" className="glass-effect" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="glass-effect" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="glass-effect">
            <TabsTrigger value="list">
              <FileText className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-sm">Maintenance Tickets ({filteredTickets.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredTickets.map((ticket) => (
                    <div 
                      key={ticket.id}
                      className="p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-medium">{ticket.id}</span>
                            <Badge variant="outline" className="text-xs">{ticket.machine}</Badge>
                            <Badge className={`text-xs ${getMaintenanceTypeColor(ticket.maintenance_type)}`}>
                              {ticket.maintenance_type}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Date: </span>
                              <span className="font-medium">{ticket.date.split(' ')[0]}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Failure: </span>
                              <span className="font-medium">{ticket.failure_type}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Technician: </span>
                              <span className="font-medium">{ticket.technician}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Cost: </span>
                              <span className="font-medium">Rp {(ticket.cost / 1000000).toFixed(1)}M</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Downtime: </span>
                              <span className="font-medium">{ticket.downtime}h</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={() => handleViewDetail(ticket)}
                          >
                            View Details
                          </Button>
                          {ticket.status !== "Completed" && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => handleReschedule(ticket)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Reschedule
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs text-status-critical hover:text-status-critical"
                            onClick={() => handleDeleteTicket(ticket)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <TicketCalendarView tickets={tickets} />
          </TabsContent>

          <TabsContent value="analytics">
            <TicketAnalytics />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <CreateTicketModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onCreate={() => {
            setCreateModalOpen(false);
            // Refresh logic
          }}
        />

        <TicketDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          ticket={selectedTicket}
          onUpdate={handleUpdate}
        />

        <RescheduleTicketModal
          open={rescheduleModalOpen}
          onOpenChange={setRescheduleModalOpen}
          ticket={selectedTicket}
          onReschedule={() => {
            setRescheduleModalOpen(false);
            handleUpdate();
          }}
        />

        <TechnicianAvailabilityModal
          open={techModalOpen}
          onOpenChange={setTechModalOpen}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete ticket {selectedTicket?.id}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-status-critical hover:bg-status-critical/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
