import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";


const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
       <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
