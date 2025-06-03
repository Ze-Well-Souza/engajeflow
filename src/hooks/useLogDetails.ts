
import { useState } from "react";
import { ActivityLog } from "@/components/admin/activity-logs/types";

export const useLogDetails = () => {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const handleShowDetails = (log: ActivityLog) => {
    setSelectedLog(log);
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
  };

  return {
    selectedLog,
    handleShowDetails,
    handleCloseDetails
  };
};
