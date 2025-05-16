
import React from "react";
import { Button } from "@/components/ui/button";
import { List, CalendarDays } from "lucide-react";

interface ViewModeSelectorProps {
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={viewMode === 'list' ? "default" : "outline"} 
        size="sm"
        onClick={() => setViewMode('list')}
        className="flex items-center gap-1"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Lista</span>
      </Button>
      <Button 
        variant={viewMode === 'calendar' ? "default" : "outline"} 
        size="sm"
        onClick={() => setViewMode('calendar')}
        className="flex items-center gap-1"
      >
        <CalendarDays className="h-4 w-4" />
        <span className="hidden sm:inline">Calendário</span>
      </Button>
    </div>
  );
};

export default ViewModeSelector;
