
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MainSidebar from "@/components/MainSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <MainSidebar />
        <SidebarInset className="flex-1">
          <div className="container mx-auto p-6 max-w-7xl">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
