
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RealDashboard from './RealDashboard';

const Dashboard: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Você precisa estar logado para acessar o dashboard
          </p>
        </div>
      </div>
    );
  }

  return <RealDashboard />;
};

export default Dashboard;
