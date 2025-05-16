
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X, Edit, Trash, Instagram, Youtube, Facebook } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScheduledPost } from "@/hooks/useScheduledPosts";

interface AgendamentoItemProps {
  post: ScheduledPost;
  onDeletePost: (id: string) => Promise<void>;
}

const AgendamentoItem: React.FC<AgendamentoItemProps> = ({ post, onDeletePost }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50';
      case 'processing':
        return 'bg-blue-900/30 text-blue-500 border border-blue-700/50';
      case 'posted':
        return 'bg-green-900/30 text-green-500 border border-green-700/50';
      case 'failed':
        return 'bg-red-900/30 text-red-500 border border-red-700/50';
      default:
        return 'bg-gray-900/30 text-gray-500 border border-gray-700/50';
    }
  };
  
  const formatScheduledDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div 
      key={post.id} 
      className={`p-4 border rounded-lg flex justify-between ${
        post.status === 'posted' ? 'border-green-700 bg-green-950/10' : 
        post.status === 'failed' ? 'border-red-700 bg-red-950/10' : 
        'border-gray-700 bg-gray-850'
      }`}
    >
      <div className="flex items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
          post.platform === 'instagram' ? 'bg-pink-900/30 text-pink-500' : 
          post.platform === 'youtube' ? 'bg-red-900/30 text-red-500' : 
          post.platform === 'facebook' ? 'bg-blue-900/30 text-blue-500' :
          'bg-gray-900/30 text-gray-500'
        }`}>
          {getPlatformIcon(post.platform)}
        </div>
        <div>
          <h3 className="font-medium">{post.mediaTitle || 'Mídia sem título'}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> {formatScheduledDate(post.scheduledFor)}
            </span>
            <span className={`px-1.5 py-0.5 text-xs rounded-full ${getStatusBadgeClass(post.status)}`}>
              {post.status === 'pending' ? 'Pendente' : 
                post.status === 'processing' ? 'Processando' : 
                post.status === 'posted' ? 'Publicado' : 'Falha'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {post.status === 'pending' && (
          <>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Marcar como concluído">
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Cancelar">
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
        {post.status === 'failed' && (
          <span className="text-xs text-red-400">
            {post.errorMessage || 'Erro de publicação'}
          </span>
        )}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar" 
          disabled={post.status === 'posted' || post.status === 'processing'}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Excluir"
          onClick={() => onDeletePost(post.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgendamentoItem;
