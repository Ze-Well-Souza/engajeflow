
import React from 'react';

const ChannelsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Canais de Comunicação</h1>
      <p className="text-muted-foreground">Gerencie todos os seus canais de comunicação em um só lugar.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Canais Disponíveis</h2>
          <p className="mb-4">Esta página está em desenvolvimento e permitirá a gestão dos canais de comunicação.</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Adicionar Novo Canal</h2>
          <p className="mb-4">Futuramente, você poderá adicionar e configurar novos canais de comunicação aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
