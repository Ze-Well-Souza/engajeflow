
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  PlusCircle, 
  Settings,
  Bell,
  Calendar,
  Bot
} from "lucide-react";
import SearchInput from "@/components/search/SearchInput";
import { Channel } from "@/types/channels";

interface ChannelsHubProps {
  channels?: Channel[];
  onAddChannel?: () => void;
  onEditChannel?: (channelId: number) => void;
  onConfigureChannel?: (channelId: number) => void;
}

const ChannelsHub: React.FC<ChannelsHubProps> = ({
  channels = [],
  onAddChannel,
  onEditChannel,
  onConfigureChannel,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtra canais com base na busca e na aba ativa
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || channel.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case "email":
        return <Mail className="h-5 w-5 text-blue-500" />;
      case "sms":
        return <Phone className="h-5 w-5 text-yellow-500" />;
      case "telegram":
        return <MessageSquare className="h-5 w-5 text-blue-400" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Canais de Comunicação</CardTitle>
          <Button 
            onClick={onAddChannel} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Canal
          </Button>
        </div>
        <SearchInput
          id="channel-search"
          label="Buscar Canal"
          placeholder="Nome ou tipo de canal..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChannels.map((channel) => (
                <Card key={channel.id} className="bg-gray-700 border-gray-600 hover:border-blue-500/50 cursor-pointer transition-all">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {getChannelIcon(channel.type)}
                      {channel.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => onConfigureChannel && onConfigureChannel(channel.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{channel.messages.toLocaleString()}</div>
                    <p className="text-xs text-gray-400">
                      Última sincronização: {new Date(channel.lastSync).toLocaleString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              ))}

              <Card 
                className="bg-gray-800/50 border-gray-700 border-dashed flex flex-col items-center justify-center h-[148px] cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={onAddChannel}
              >
                <PlusCircle className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Adicionar novo canal</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChannelsHub;
