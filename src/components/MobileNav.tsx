// components/MobileNav.tsx
import React from 'react';
import { Package2, Home, FolderPlus , List , Users, LogOut , UserPlus } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <a
        href="#"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <Package2 className="h-6 w-6" />
        <span className="">SGRH</span>
      </a>
      <NavLink href="#" icon={<Home className="h-5 w-5" />} text="Accueil" />
      <NavLink href="#" icon={<FolderPlus  className="h-5 w-5" />} text="Nouvelle Demande" />
      <NavLink href="#" icon={<List  className="h-5 w-5" />} text="Liste des demandes" />
      <NavLink href="#" icon={<Users className="h-5 w-5" />} text="Employés" />
      <NavLink href="#" icon={<UserPlus  className="h-5 w-5" />} text="Ajouter un Employés" />
      <NavLink href="#" icon={<LogOut className="h-5 w-5" />} text="Deconnexion" />
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

function NavLink({ href, icon, text }: NavLinkProps) {
  return (
    <a
      href={href}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {icon}
      {text}
    </a>
  );
}