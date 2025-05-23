
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useScheduledPosts, ScheduledPost } from '@/hooks/useScheduledPosts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ScheduledPostsTableProps {
  clientId?: string;
  limit?: number;
  posts?: ScheduledPost[];
  isLoading?: boolean;
}

const ScheduledPostsTable: React.FC<ScheduledPostsTableProps> = ({ 
  clientId = '', 
  limit = 5,
  posts: propPosts,
  isLoading: propIsLoading
}) => {
  const { posts: hookPosts, isLoading: hookIsLoading, deleteScheduledPost } = useScheduledPosts(clientId, limit, 1);
  
  // Use props if provided, otherwise use hook data
  const posts = propPosts || hookPosts;
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '📷';
      case 'facebook':
        return '📘';
      case 'youtube':
        return '📺';
      case 'twitter':
        return '🐦';
      default:
        return '🌐';
    }
  };

  const handleDelete = async (postId: string) => {
    const result = await deleteScheduledPost(postId);
    if (!result.success) {
      console.error('Erro ao excluir post:', result.error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Publicações Agendadas</CardTitle>
          <CardDescription>Suas próximas publicações programadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p>Carregando publicações...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publicações Agendadas</CardTitle>
        <CardDescription>Suas próximas publicações programadas</CardDescription>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma publicação agendada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post: ScheduledPost) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">
                        {post.media_title || `Publicação ${post.id.substring(0, 8)}`}
                      </h4>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-1">
                      {post.caption || "Sem legenda"}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>
                        📅 {format(new Date(post.scheduled_for), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>
                      <span className="capitalize">
                        📱 {post.platform}
                      </span>
                      {post.client_name && (
                        <span>
                          👤 {post.client_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduledPostsTable;
