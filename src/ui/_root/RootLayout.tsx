import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section>
        <SidebarTrigger />
       <Outlet />
      </section>
    </SidebarProvider>
  )
}

export default RootLayout