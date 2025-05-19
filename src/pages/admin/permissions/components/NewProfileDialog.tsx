
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface NewProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newProfileName: string;
  setNewProfileName: (name: string) => void;
  newProfileDesc: string;
  setNewProfileDesc: (desc: string) => void;
  handleSaveProfile: () => void;
}

const NewProfileDialog = ({
  open,
  setOpen,
  newProfileName,
  setNewProfileName,
  newProfileDesc,
  setNewProfileDesc,
  handleSaveProfile
}: NewProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Salvar como Perfil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Perfil de Permissões</DialogTitle>
          <DialogDescription>
            Salve as permissões atuais como um perfil reutilizável.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome do Perfil</Label>
            <Input 
              id="profile-name" 
              value={newProfileName} 
              onChange={(e) => setNewProfileName(e.target.value)} 
              placeholder="Ex: Administrador, Usuário Básico, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-desc">Descrição (opcional)</Label>
            <Input 
              id="profile-desc" 
              value={newProfileDesc} 
              onChange={(e) => setNewProfileDesc(e.target.value)} 
              placeholder="Descreva o objetivo deste perfil de permissões"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveProfile}>Salvar Perfil</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProfileDialog;
