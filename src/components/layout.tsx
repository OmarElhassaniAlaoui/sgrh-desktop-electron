import Home from "@/ui/pages/Home";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Route, Routes } from "react-router-dom";
import Settings from "@/ui/pages/Settings";


const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        
        </Routes>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
