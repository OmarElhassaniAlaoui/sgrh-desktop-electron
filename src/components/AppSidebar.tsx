import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  UserCog,
  FilePlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    url: "/dashboard/accueil", 
  },
  {
    title: "Demandes de congé",
    icon: ClipboardList,
    url: "/dashboard/demande-conges",
  },
  {
    title: "cree un congé",
    icon: FilePlus,
    url: "/dashboard/creer-conge",
  },
  {
    title: "Solde de congé",
    icon: Calendar,
    url: "/dashboard/solde-de-conge",
  },
  {
    title: "Rapports",
    icon: FileText,
    url: "/dashboard/rapports",
  },
  {
    title: "Panneau d'administration",
    icon: UserCog,
    url: "/dashboard/admin",
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "/dashboard/parametres",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Leave Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
