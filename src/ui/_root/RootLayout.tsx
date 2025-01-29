import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <section className="w-full h-full ">
        <Header />
        <Outlet />
      </section>
    </SidebarProvider>
  );
};

export default RootLayout;
