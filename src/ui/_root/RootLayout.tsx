import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <SidebarProvider>
       <Toaster />
      <AppSidebar />
      <section>
        <SidebarTrigger />
       <Outlet />
      </section>
    </SidebarProvider>
  )
}

export default RootLayout