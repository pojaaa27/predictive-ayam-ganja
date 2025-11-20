import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TicketCalendarViewProps {
  tickets: any[];
}

const daysInMonth = 30;
const mockCalendarTickets = [
  { date: 15, tickets: [{ id: "TKT-2025-11842", machine: "H87213", type: "Emergency" }] },
  { date: 16, tickets: [{ id: "TKT-2025-11843", machine: "M65401", type: "Preventive" }] },
  { date: 17, tickets: [
      { id: "TKT-2025-11844", machine: "L38294", type: "Corrective" },
      { id: "TKT-2025-11845", machine: "H92103", type: "Preventive" }
    ] 
  },
  { date: 20, tickets: [{ id: "TKT-2025-11846", machine: "M98765", type: "Emergency" }] },
  { date: 22, tickets: [{ id: "TKT-2025-11847", machine: "H87213", type: "Preventive" }] },
  { date: 25, tickets: [
      { id: "TKT-2025-11848", machine: "L38294", type: "Corrective" },
      { id: "TKT-2025-11849", machine: "M65401", type: "Preventive" },
      { id: "TKT-2025-11850", machine: "H92103", type: "Emergency" }
    ] 
  },
];

export function TicketCalendarView({ tickets }: TicketCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState("November 2025");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency": return "bg-status-critical/20 text-status-critical border-status-critical/30";
      case "Corrective": return "bg-status-warning/20 text-status-warning border-status-warning/30";
      case "Preventive": return "bg-status-running/20 text-status-running border-status-running/30";
      default: return "";
    }
  };

  const getDayTickets = (day: number) => {
    const dayData = mockCalendarTickets.find(d => d.date === day);
    return dayData?.tickets || [];
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Maintenance Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentMonth}</span>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground p-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for offset */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayTickets = getDayTickets(day);
            const isToday = day === 15;

            return (
              <div
                key={day}
                className={cn(
                  "aspect-square p-1 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer",
                  isToday && "bg-primary/10 border-primary/50"
                )}
              >
                <div className="h-full flex flex-col">
                  <div className={cn(
                    "text-xs font-medium text-center mb-1",
                    isToday && "text-primary"
                  )}>
                    {day}
                  </div>
                  <div className="flex-1 space-y-0.5 overflow-hidden">
                    {dayTickets.slice(0, 2).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="text-[8px] px-1 py-0.5 rounded bg-card/50 truncate"
                        title={`${ticket.id} - ${ticket.machine}`}
                      >
                        {ticket.machine}
                      </div>
                    ))}
                    {dayTickets.length > 2 && (
                      <div className="text-[8px] text-muted-foreground text-center">
                        +{dayTickets.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-status-critical/20 border border-status-critical/30" />
            <span className="text-muted-foreground">Emergency</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-status-warning/20 border border-status-warning/30" />
            <span className="text-muted-foreground">Corrective</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-status-running/20 border border-status-running/30" />
            <span className="text-muted-foreground">Preventive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
