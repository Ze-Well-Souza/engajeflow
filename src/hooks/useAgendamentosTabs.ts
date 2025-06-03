
import { useState } from 'react';

type TabType = 'agendamentos' | 'novo';

export const useAgendamentosTabs = (initialTab: TabType = 'agendamentos') => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleCreateNew = () => {
    setActiveTab('novo');
  };

  const handleListReturn = () => {
    setActiveTab('agendamentos');
  };

  return {
    activeTab,
    handleTabChange,
    handleCreateNew,
    handleListReturn
  };
};
