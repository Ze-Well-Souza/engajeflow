
import React from "react";
import MainSidebar from "@/components/MainSidebar";
import AssistantButton from "@/components/ai/AssistantButton";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <MainSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
          <AssistantButton />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
