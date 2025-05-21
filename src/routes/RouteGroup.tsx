
import React, { Fragment } from "react";

interface RouteGroupProps {
  children: React.ReactNode;
}

const RouteGroup: React.FC<RouteGroupProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
}

export default RouteGroup;
