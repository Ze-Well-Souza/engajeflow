
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/MainSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-900">
        <MainSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
