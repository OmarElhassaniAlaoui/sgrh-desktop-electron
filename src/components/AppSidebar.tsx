import {
  LayoutDashboard,
  FilePlus,
  Settings,
  LogOut,
  List,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginStore } from "../ui/_auth/store/login-store"; // Adjust this import path

export function AppSidebar() {
  const logout = useLoginStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "demande de congé",
      icon: FilePlus,
      url: "request",
    },
    {
      title: "Liste des fonctionnaires",
      icon: List,
      url: "liste-fonctionnaire",
    },
    {
      title: "Paramètres",
      icon: Settings,
      url: "settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold text-center">S-G-R-H</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Separate logout button */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
