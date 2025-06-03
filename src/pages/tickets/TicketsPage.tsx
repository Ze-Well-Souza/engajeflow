
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const tickets = [
  {
    id: "TCK-001",
    title: "Problema com entrega",
    client: "Maria Silva",
    priority: "Alta",
    status: "ativo",
    createdAt: "2023-05-10T14:30:00",
    updatedAt: "2023-05-11T09:15:00",
  },
  {
    id: "TCK-002",
    title: "Dúvida sobre produto",
    client: "João Pereira",
    priority: "Média",
    status: "ativo",
    createdAt: "2023-05-11T10:45:00",
    updatedAt: "2023-05-11T11:30:00",
  },
  {
    id: "TCK-003",
    title: "Solicitação de reembolso",
    client: "Carlos Oliveira",
    priority: "Alta",
    status: "inativo",
    createdAt: "2023-05-09T08:20:00",
    updatedAt: "2023-05-10T16:45:00",
  },
  {
    id: "TCK-004",
    title: "Problema de login",
    client: "Ana Souza",
    priority: "Baixa",
    status: "ativo",
    createdAt: "2023-05-12T13:10:00",
    updatedAt: "2023-05-12T13:25:00",
  },
];

const TicketsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <TicketCheck className="h-4 w-4" />
          Novo Ticket
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Abertos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Em Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Resolvidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Tickets Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-3 pt-2 px-4">ID</th>
                  <th className="pb-3 pt-2 px-4">Título</th>
                  <th className="pb-3 pt-2 px-4">Cliente</th>
                  <th className="pb-3 pt-2 px-4">Prioridade</th>
                  <th className="pb-3 pt-2 px-4">Status</th>
                  <th className="pb-3 pt-2 px-4">Data</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 px-4">{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.title}</td>
                    <td className="py-3 px-4">{ticket.client}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        ticket.priority === "Alta" 
                          ? "bg-red-900/30 text-red-400 border border-red-700/50"
                          : ticket.priority === "Média"
                          ? "bg-yellow-900/30 text-yellow-400 border border-yellow-700/50"
                          : "bg-blue-900/30 text-blue-400 border border-blue-700/50"
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={ticket.status as "ativo" | "inativo" | "recurring"} />
                    </td>
                    <td className="py-3 px-4">
                      {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsPage;
