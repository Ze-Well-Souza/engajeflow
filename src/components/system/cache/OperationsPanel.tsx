
import React from 'react';
import AddCacheForm from './AddCacheForm';
import CacheOperations from './CacheOperations';

interface OperationsPanelProps {
  onOperationComplete: () => void;
}

const OperationsPanel: React.FC<OperationsPanelProps> = ({ onOperationComplete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AddCacheForm onItemAdded={onOperationComplete} />
      <CacheOperations onOperationComplete={onOperationComplete} />
    </div>
  );
};

export default OperationsPanel;
