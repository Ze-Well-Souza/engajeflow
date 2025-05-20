
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListFilter, Calendar } from "lucide-react";

interface ViewModeSelectorProps {
  viewMode: 'list' | 'calendar';
  setViewMode: (value: 'list' | 'calendar') => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, setViewMode }) => {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'list' | 'calendar')}>
      <ToggleGroupItem value="list" aria-label="Visualização em lista">
        <ListFilter className="h-4 w-4 mr-2" />
        Lista
      </ToggleGroupItem>
      <ToggleGroupItem value="calendar" aria-label="Visualização em calendário">
        <Calendar className="h-4 w-4 mr-2" />
        Calendário
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewModeSelector;
