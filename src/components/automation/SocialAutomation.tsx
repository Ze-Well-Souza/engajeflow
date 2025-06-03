
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Instagram, Facebook } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostAutomation {
  id: number;
  channelId: number;
  platform: string;
  frequency: string;
  templates: string[];
  enabled: boolean;
}

interface SocialAutomationProps {
  postAutomations: PostAutomation[];
  addPostAutomation: () => void;
  removePostAutomation: (id: number) => void;
  toggleEnabled: (id: number) => void;
}

const SocialAutomation: React.FC<SocialAutomationProps> = ({ 
  postAutomations, 
  addPostAutomation, 
  removePostAutomation,
  toggleEnabled
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automação de Postagens</CardTitle>
        <CardDescription>Configure postagens automáticas para redes sociais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={addPostAutomation} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Automação de Postagem
          </Button>
        </div>

        <div className="space-y-6">
          {postAutomations.map(automation => (
            <Card key={automation.id} className="border-muted bg-muted/20">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-md flex items-center gap-2">
                  {automation.platform === "Instagram" ? (
                    <Instagram className="h-4 w-4 text-pink-400" />
                  ) : (
                    <Facebook className="h-4 w-4 text-blue-400" />
                  )}
                  Automação {automation.platform}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`post-switch-${automation.id}`} 
                      checked={automation.enabled}
                      onCheckedChange={() => toggleEnabled(automation.id)}
                    />
                    <Label htmlFor={`post-switch-${automation.id}`}>
                      {automation.enabled ? 'Ativo' : 'Inativo'}
                    </Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removePostAutomation(automation.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plataforma</Label>
                    <Select defaultValue={automation.platform.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequência</Label>
                    <Select defaultValue={automation.frequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="custom">Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Templates Selecionados</Label>
                  <Select defaultValue={automation.templates.length > 0 ? "template-1" : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template-1">Template 1</SelectItem>
                      <SelectItem value="template-2">Template 2</SelectItem>
                      <SelectItem value="template-3">Template 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {automation.templates.length > 0 && (
                  <div className="pt-2">
                    <Label className="mb-2 block">Templates Adicionados</Label>
                    <div className="flex flex-wrap gap-2">
                      {automation.templates.map((template, index) => (
                        <div key={index} className="bg-muted text-sm rounded px-2 py-1 flex items-center gap-1">
                          {template}
                          <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialAutomation;
