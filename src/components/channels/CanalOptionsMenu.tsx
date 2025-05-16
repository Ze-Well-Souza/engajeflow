
import React from "react";
import { 
  MoreVertical,
  Calendar,
  Bot,
  Settings,
  Trash2,
  Instagram,
  Facebook,
  MessageCircle
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Channel {
  id: number;
  name: string;
  type: string;
  status: string;
  messages: number;
  lastSync: string;
}

interface CanalOptionsMenuProps {
  channel: Channel;
}

const CanalOptionsMenu: React.FC<CanalOptionsMenuProps> = ({ channel }) => {
  const { toast } = useToast();

  const handlePostAutoClick = (platform: string) => {
    toast({
      title: "Automação de Postagens",
      description: `Configurando automação para ${channel.name} na plataforma ${platform}`,
    });
  };

  const handleChatbotClick = () => {
    toast({
      title: "Respostas Automatizadas",
      description: `Configurando chatbot para ${channel.name}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-700">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Opções para {channel.name}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
        <DropdownMenuLabel>Canal: {channel.name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        
        {/* Automação de Postagens */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="hover:bg-gray-700">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Automação de Postagens</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-gray-800 border-gray-700">
            <DropdownMenuItem 
              className="hover:bg-gray-700"
              onClick={() => handlePostAutoClick("Instagram")}
            >
              <Instagram className="mr-2 h-4 w-4 text-pink-500" />
              <span>Instagram</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="hover:bg-gray-700"
              onClick={() => handlePostAutoClick("Facebook")}
            >
              <Facebook className="mr-2 h-4 w-4 text-blue-500" />
              <span>Facebook</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="hover:bg-gray-700"
              onClick={() => handlePostAutoClick("TikTok")}
            >
              <MessageCircle className="mr-2 h-4 w-4 text-black bg-white rounded-full p-0.5" />
              <span>TikTok</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Respostas Automatizadas */}
        <DropdownMenuItem 
          className="hover:bg-gray-700"
          onClick={handleChatbotClick}
        >
          <Bot className="mr-2 h-4 w-4" />
          <span>Respostas Automatizadas</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-700" />
        
        {/* Outras opções padrão */}
        <DropdownMenuItem className="hover:bg-gray-700">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurar</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="hover:bg-gray-700 text-red-500">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CanalOptionsMenu;
