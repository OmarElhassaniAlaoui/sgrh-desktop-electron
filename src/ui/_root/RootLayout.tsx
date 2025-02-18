import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <SidebarInset >
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
