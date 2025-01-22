
// components/Sidebar.tsx
import React from 'react';
import { Package2, Home, FolderPlus , List , Users, LogOut , UserPlus , CircleChevronLeft , CircleChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`hidden border-r bg-muted/40 md:block ${
        isSidebarOpen ? "md:w-[220px] lg:w-[280px]" : "md:w-[80px]"
      }`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className={`flex items-center gap-2 font-semibold ${
            isSidebarOpen ? "flex" : "hidden"
          } `}>
            <Package2 className="h-6 w-6" />
            {isSidebarOpen && <span className="">SGRH</span>}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 bg-slate-900"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <CircleChevronLeft className="h-4 w-4" />
            ) : (
              <CircleChevronRight className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            <NavLink href="/accueil" icon={<Home className="h-4 w-4" />} text="Accueil" isSidebarOpen={isSidebarOpen} />
            <NavLink href="/nouvelle_demande" icon={<FolderPlus className="h-4 w-4" />} text="Nouvelle Demande" isSidebarOpen={isSidebarOpen} />
            <NavLink href="/liste_demandes" icon={<List className="h-4 w-4" />} text="Liste des demandes" isSidebarOpen={isSidebarOpen} />
            <NavLink href="/employes" icon={<Users className="h-4 w-4" />} text="Employés" isSidebarOpen={isSidebarOpen} />
            <NavLink href="/ajouter_employe" icon={<UserPlus className="h-4 w-4" />} text="Ajouter un Employés" isSidebarOpen={isSidebarOpen} />
            <NavLink href="/deconnexion" icon={<LogOut className="h-4 w-4" />} text="Deconnexion" isSidebarOpen={isSidebarOpen} />
          </nav>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isSidebarOpen: boolean;
}

function NavLink({ href, icon, text, isSidebarOpen }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
    >
      {icon}
      {isSidebarOpen && text}
    </a>
  );
}