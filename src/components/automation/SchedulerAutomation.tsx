
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Clock, Bot } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const SchedulerAutomation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automação de Agendamentos</CardTitle>
        <CardDescription>Configure lembretes e confirmações automáticas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Antecedência</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Lembrete de Consulta
              </TableCell>
              <TableCell>WhatsApp</TableCell>
              <TableCell>24 horas</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch id="schedule-1" defaultChecked />
                  <Label htmlFor="schedule-1">Ativo</Label>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                Confirmação de Agendamento
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Imediato</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch id="schedule-2" defaultChecked />
                  <Label htmlFor="schedule-2">Ativo</Label>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-400" />
                Follow-up Pós Atendimento
              </TableCell>
              <TableCell>SMS</TableCell>
              <TableCell>2 dias depois</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch id="schedule-3" />
                  <Label htmlFor="schedule-3">Inativo</Label>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button className="mt-4 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Automação de Agendamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchedulerAutomation;
