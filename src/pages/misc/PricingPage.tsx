
import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Planos de Preços</h1>
      <p className="text-muted-foreground">Escolha o plano que melhor atende às necessidades do seu negócio.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Plano Básico</h2>
          <p className="text-2xl font-bold mb-4">R$ 99/mês</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Recurso básico 1
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Recurso básico 2
            </li>
          </ul>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow border border-primary">
          <h2 className="text-xl font-semibold mb-2">Plano Profissional</h2>
          <p className="text-2xl font-bold mb-4">R$ 199/mês</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Todos os recursos do plano básico
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Recurso profissional 1
            </li>
          </ul>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Plano Enterprise</h2>
          <p className="text-2xl font-bold mb-4">R$ 399/mês</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Todos os recursos do plano profissional
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Recurso enterprise avançado
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
