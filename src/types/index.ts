
export interface ActivityLog {
  id: string;
  user_email: string;
  action: string;
  module: string;
  ip: string;
  timestamp: string;
  status: "success" | "error";
  details: string | null;
  metadata: any | null;
}
