
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Copy, MessageCircle, Mail, Phone } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const templates = [
  {
    id: 1,
    name: "Boas-vindas ao cliente",
    content: "Olá {nome}, seja bem-vindo à TechCare! Estamos felizes em ter você conosco. Como podemos ajudar?",
    type: "whatsapp",
    usageCount: 145,
    status: "ativo",
  },
  {
    id: 2,
    name: "Confirmação de pedido",
    content: "TechCare: Olá {nome}, seu pedido #{pedido} foi confirmado e está sendo processado. Acompanhe o status pelo nosso app.",
    type: "sms",
    usageCount: 287,
    status: "ativo",
  },
  {
    id: 3,
    name: "Promoção mensal",
    content: "Olá {nome}, temos uma oferta especial para você! Use o cupom TECH20 e ganhe 20% de desconto em todos os produtos da loja.",
    type: "email",
    usageCount: 93,
    status: "inativo",
  },
  {
    id: 4,
    name: "Pesquisa de satisfação",
    content: "Olá {nome}, como foi sua experiência com a TechCare? Responda nossa pesquisa rápida e ajude-nos a melhorar.",
    type: "whatsapp",
    usageCount: 210,
    status: "ativo",
  }
];

const TemplatesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Templates de Mensagens</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Total de Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Copy className="h-4 w-4 text-green-500" />
              Uso Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.reduce((sum, template) => sum + template.usageCount, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Templates Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.status === "ativo").length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Biblioteca de Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {template.type === "whatsapp" && (
                      <div className="w-10 h-10 bg-green-800/30 text-green-500 rounded-md flex items-center justify-center">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                    )}
                    {template.type === "email" && (
                      <div className="w-10 h-10 bg-blue-800/30 text-blue-500 rounded-md flex items-center justify-center">
                        <Mail className="h-5 w-5" />
                      </div>
                    )}
                    {template.type === "sms" && (
                      <div className="w-10 h-10 bg-yellow-800/30 text-yellow-500 rounded-md flex items-center justify-center">
                        <Phone className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="text-xs mt-1 text-gray-400">
                        Usado {template.usageCount} vezes
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={template.status as "ativo" | "inativo" | "recurring"} />
                </div>
                <div className="mt-4 p-3 bg-gray-800 rounded-md text-sm border border-gray-700">
                  {template.content}
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center gap-1">
                    <Copy className="h-3 w-3" /> Duplicar
                  </button>
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesPage;
