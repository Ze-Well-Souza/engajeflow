
import React from "react";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "ativo" | "inativo" | "recurring";
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <div
      className={cn(
        "px-2 py-0.5 rounded-md text-xs font-medium text-center w-16",
        status === "ativo" && "bg-green-900/30 text-green-400 border border-green-700/50",
        status === "inativo" && "bg-gray-800/30 text-gray-400 border border-gray-700/50",
        status === "recurring" && "bg-blue-900/30 text-blue-400 border border-blue-700/50",
        className
      )}
    >
      {status === "recurring" ? "Recorrente" : status === "ativo" ? "Ativo" : "Inativo"}
    </div>
  );
};

export default StatusBadge;
