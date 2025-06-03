
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ClientFormData } from "../hooks/useClients";
import SentimentAnalysis from "@/components/ai/SentimentAnalysis";
import { PlusCircle, UserPlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newClient: ClientFormData;
  setNewClient: (client: ClientFormData) => void;
  onAddClient: () => void;
}

const ClientFormDialog: React.FC<ClientFormDialogProps> = ({
  open,
  onOpenChange,
  newClient,
  setNewClient,
  onAddClient
}) => {
  const [comments, setComments] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleRadioChange = (value: string) => {
    setNewClient({ ...newClient, type: value });
  };

  const handleStatusChange = (value: string) => {
    setNewClient({ ...newClient, status: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Adicionar Novo Cliente
          </DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo cliente no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Nome completo ou razão social"
                value={newClient.name}
                onChange={handleInputChange}
                className="focus-visible-ring"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document" className="text-right">
                Documento <span className="text-destructive">*</span>
              </Label>
              <Input
                id="document"
                name="document"
                placeholder="CPF ou CNPJ"
                value={newClient.document}
                onChange={handleInputChange}
                className="focus-visible-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Cliente <span className="text-destructive">*</span></Label>
            <RadioGroup 
              defaultValue={newClient.type} 
              value={newClient.type}
              onValueChange={handleRadioChange}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="fisica" id="fisica" />
                <Label htmlFor="fisica" className="cursor-pointer">Pessoa Física</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="juridica" id="juridica" />
                <Label htmlFor="juridica" className="cursor-pointer">Pessoa Jurídica</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@exemplo.com"
                value={newClient.email}
                onChange={handleInputChange}
                className="focus-visible-ring"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="(00) 00000-0000"
                value={newClient.phone}
                onChange={handleInputChange}
                className="focus-visible-ring"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-right">
              Endereço
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Endereço completo"
              value={newClient.address}
              onChange={handleInputChange}
              className="focus-visible-ring"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={newClient.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="focus-visible-ring">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-right">
              Comentários
            </Label>
            <Textarea
              id="comments"
              placeholder="Observações sobre o cliente"
              className="min-h-20 focus-visible-ring"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          {comments && (
            <SentimentAnalysis text={comments} />
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="focus-visible-ring"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            onClick={onAddClient}
            className="focus-visible-ring"
            disabled={!newClient.name || !newClient.document || !newClient.email}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientFormDialog;
