
import React from "react";

interface RouteGroupProps {
  children: React.ReactNode;
}

const RouteGroup: React.FC<RouteGroupProps> = ({ children }) => {
  return <>{children}</>;
}

export default RouteGroup;
