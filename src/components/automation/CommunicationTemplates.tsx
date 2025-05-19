
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Instagram, Plus } from "lucide-react";

const CommunicationTemplates: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates de Comunicação</CardTitle>
        <CardDescription>Gerencie templates para comunicação multicanal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-muted/20 border-muted">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                Boas-vindas WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Olá {"{{nome}}"}, seja bem-vindo(a)! Como posso ajudar?</p>
              <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/20 border-muted">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                Confirmação de Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Olá {"{{nome}}"}, sua consulta foi agendada para {"{{data}}"} às {"{{hora}}"}.</p>
              <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/20 border-muted">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-400" />
                Post Promocional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">✨ PROMOÇÃO! ✨ Aproveite nosso desconto especial de {"{{desconto}}"} em todos os serviços!</p>
              <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
            </CardContent>
          </Card>

          <Card className="border-dashed flex flex-col items-center justify-center h-[150px] cursor-pointer hover:bg-muted/10 transition-colors">
            <Plus className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Novo Template</p>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationTemplates;
