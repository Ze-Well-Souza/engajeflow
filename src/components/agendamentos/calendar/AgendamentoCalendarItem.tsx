
import React from "react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AgendamentoCalendarItemProps {
  post: ScheduledPost;
  onClick: (post: ScheduledPost) => void;
}

const AgendamentoCalendarItem: React.FC<AgendamentoCalendarItemProps> = ({ post, onClick }) => {
  // Função para renderizar o ícone da plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Função para formatar horário
  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "HH:mm", { locale: ptBR });
    } catch (e) {
      return "";
    }
  };

  // Função para obter classe de cor com base no status
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'posted': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'failed': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  return (
    <li 
      className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-900/50 cursor-pointer transition-colors"
      onClick={() => onClick(post)}
    >
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
        post.platform === 'instagram' ? 'bg-pink-900/30 text-pink-500' : 
        post.platform === 'youtube' ? 'bg-red-900/30 text-red-500' : 
        post.platform === 'facebook' ? 'bg-blue-900/30 text-blue-500' :
        'bg-gray-900/30 text-gray-500'
      }`}>
        {getPlatformIcon(post.platform)}
      </div>
      <div className="flex-1">
        <div className="font-medium">{post.media_title || "Mídia sem título"}</div>
        <div className="text-sm text-muted-foreground">
          Agendado para às {formatTime(post.scheduled_for)}
        </div>
      </div>
      <Badge variant="outline" className={`${getStatusColorClass(post.status)}`}>
        {post.status === 'pending' ? 'Pendente' : 
         post.status === 'processing' ? 'Processando' : 
         post.status === 'posted' ? 'Publicado' : 'Falha'}
      </Badge>
    </li>
  );
};

export default AgendamentoCalendarItem;
