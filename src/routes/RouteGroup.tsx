
import React from "react";
import { Route } from "react-router-dom";

interface RouteGroupProps {
  children: React.ReactNode;
}

const RouteGroup: React.FC<RouteGroupProps> = ({ children }) => {
  return <>{children}</>;
}

export default RouteGroup;
