
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type NavigationGroupProps = {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const NavigationGroup: React.FC<NavigationGroupProps> = ({ 
  label, 
  children,
  defaultOpen = false 
}) => {
  const location = useLocation();
  
  // Check if any child path matches the current location
  const childPaths = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.to) {
      return child.props.to;
    }
    return null;
  });
  
  const isActive = childPaths?.some(path => path && location.pathname.startsWith(path));
  const [isOpen, setIsOpen] = useState(defaultOpen || isActive);

  return (
    <div className="mb-2">
      <button 
        className="flex items-center w-full text-sm font-medium text-gray-400 hover:text-gray-200 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{isOpen ? '▼' : '►'}</span>
        {label}
      </button>
      {isOpen && (
        <div className="ml-4 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavigationGroup;
