
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, MessageCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AutoResponse {
  id: number;
  channelId: number;
  triggers: string[];
  responses: string[];
  enabled: boolean;
}

interface MessageAutomationProps {
  autoResponses: AutoResponse[];
  addAutoResponse: () => void;
  removeAutoResponse: (id: number) => void;
  toggleEnabled: (id: number) => void;
}

const MessageAutomation: React.FC<MessageAutomationProps> = ({ 
  autoResponses, 
  addAutoResponse, 
  removeAutoResponse,
  toggleEnabled
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Respostas Automáticas</CardTitle>
        <CardDescription>Configure mensagens automáticas com base em palavras-chave</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={addAutoResponse} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Resposta Automática
          </Button>
        </div>

        <div className="space-y-6">
          {autoResponses.map(response => (
            <Card key={response.id} className="border-muted bg-muted/20">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-md flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                  Resposta Automática #{response.id}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`response-switch-${response.id}`} 
                      checked={response.enabled}
                      onCheckedChange={() => toggleEnabled(response.id)}
                    />
                    <Label htmlFor={`response-switch-${response.id}`}>
                      {response.enabled ? 'Ativo' : 'Inativo'}
                    </Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeAutoResponse(response.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Canal</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">WhatsApp Business</SelectItem>
                      <SelectItem value="2">Telegram Bot</SelectItem>
                      <SelectItem value="3">SMS Broadcast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Palavras-chave de gatilho (separadas por vírgula)</Label>
                  <Input 
                    defaultValue={response.triggers.join(", ")} 
                    placeholder="Ex: olá, bom dia, atendimento"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Resposta Automática</Label>
                  <Input 
                    defaultValue={response.responses.join(" ")} 
                    placeholder="Mensagem de resposta automática"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageAutomation;
