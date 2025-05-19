
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Client, Profile, PermissionModule } from "../types";
import ModulesPermissionsTable from "./ModulesPermissionsTable";
import NewProfileDialog from "./NewProfileDialog";

interface PermissionsConfigProps {
  selectedClient: string;
  clients: Client[];
  clientPermissions: Record<string, string[]>;
  profiles: Profile[];
  modulesList: PermissionModule[];
  selectedProfile: string;
  setSelectedProfile: (id: string) => void;
  isPermissionChecked: (moduleId: string, permission: string) => boolean;
  handlePermissionChange: (moduleId: string, permission: string, checked: boolean) => void;
  handleSavePermissions: () => void;
  showProfileDialog: boolean;
  setShowProfileDialog: (show: boolean) => void;
  newProfileName: string;
  setNewProfileName: (name: string) => void;
  newProfileDesc: string;
  setNewProfileDesc: (desc: string) => void;
  handleSaveProfile: () => void;
}

const PermissionsConfig = ({
  selectedClient,
  clients,
  clientPermissions,
  profiles,
  modulesList,
  selectedProfile,
  setSelectedProfile,
  isPermissionChecked,
  handlePermissionChange,
  handleSavePermissions,
  showProfileDialog,
  setShowProfileDialog,
  newProfileName,
  setNewProfileName,
  newProfileDesc,
  setNewProfileDesc,
  handleSaveProfile
}: PermissionsConfigProps) => {
  const client = clients.find(c => c.id.toString() === selectedClient);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Configurar Permissões</CardTitle>
          <CardDescription>
            Cliente: {client?.name}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <NewProfileDialog
            open={showProfileDialog}
            setOpen={setShowProfileDialog}
            newProfileName={newProfileName}
            setNewProfileName={setNewProfileName}
            newProfileDesc={newProfileDesc}
            setNewProfileDesc={setNewProfileDesc}
            handleSaveProfile={handleSaveProfile}
          />
          <Button onClick={handleSavePermissions} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Permissões
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="profile">Aplicar perfil predefinido</Label>
          <Select value={selectedProfile} onValueChange={setSelectedProfile}>
            <SelectTrigger className="w-[280px] mt-2">
              <SelectValue placeholder="Selecione um perfil" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(profile => (
                <SelectItem key={profile.id} value={profile.id.toString()}>
                  {profile.name} - {profile.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ModulesPermissionsTable 
          modulesList={modulesList}
          isPermissionChecked={isPermissionChecked}
          handlePermissionChange={handlePermissionChange}
        />
      </CardContent>
    </Card>
  );
};

export default PermissionsConfig;
