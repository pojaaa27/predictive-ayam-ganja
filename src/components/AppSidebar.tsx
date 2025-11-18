import { LayoutDashboard, Activity, Box, Shield, Calendar, FileText, FlaskConical } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Machine Detail", url: "/machine-detail", icon: Activity },
  { title: "Digital Twin 3D", url: "/digital-twin", icon: Box },
  { title: "Self-Healing Logs", url: "/self-healing", icon: Shield },
  { title: "Maintenance Priority", url: "/maintenance-priority", icon: Calendar },
  { title: "What-If Simulation", url: "/what-if-simulation", icon: FlaskConical },
  { title: "Maintenance Tickets", url: "/maintenance-tickets", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        {!collapsed && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Predictive Maintenance
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Copilot System</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
