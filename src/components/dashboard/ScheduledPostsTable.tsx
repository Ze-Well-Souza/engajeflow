
import React from 'react';
import { ScheduledPost } from '@/hooks/useScheduledPosts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2, Eye } from 'lucide-react';

interface ScheduledPostsTableProps {
  posts: ScheduledPost[];
  isLoading: boolean;
  onDelete?: (postId: string) => void;
  onEdit?: (post: ScheduledPost) => void;
  onView?: (post: ScheduledPost) => void;
}

const ScheduledPostsTable: React.FC<ScheduledPostsTableProps> = ({ 
  posts, 
  isLoading,
  onDelete,
  onEdit,
  onView
}) => {
  const [dialogPost, setDialogPost] = React.useState<ScheduledPost | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">Pendente</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/50">Processando</Badge>;
      case 'posted':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">Publicado</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/50">Falha</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy 'às' HH:mm", { locale: ptBR });
  };
  
  const handleDelete = (postId: string) => {
    if (onDelete) {
      onDelete(postId);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma publicação agendada encontrada.</p>
      </div>
    );
  }
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plataforma</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data Agendada</TableHead>
            <TableHead>Mídia</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="capitalize">{post.platform}</TableCell>
              <TableCell>{getStatusBadge(post.status)}</TableCell>
              <TableCell>{formatDateTime(post.scheduled_for)}</TableCell>
              <TableCell>{post.media_title || "Sem título"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {onView && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onView(post)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && post.status === 'pending' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEdit(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && post.status !== 'processing' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={!!dialogPost} onOpenChange={(open) => !open && setDialogPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Publicação</DialogTitle>
          </DialogHeader>
          {dialogPost && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Plataforma</h4>
                <p>{dialogPost.platform}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Legenda</h4>
                <p>{dialogPost.caption || "Sem legenda"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Data Agendada</h4>
                <p>{formatDateTime(dialogPost.scheduled_for)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Status</h4>
                <div>{getStatusBadge(dialogPost.status)}</div>
              </div>
              {dialogPost.error_message && (
                <div>
                  <h4 className="text-sm font-medium text-red-500">Erro</h4>
                  <p className="text-red-500">{dialogPost.error_message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduledPostsTable;
