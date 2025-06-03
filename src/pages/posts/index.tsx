import React, { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Send,
  Clock,
  TrendingUp,
  FileText,
  Sparkles,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { usePosts, Post } from '@/hooks/usePosts';
import { PostEditor } from '@/components/posts/PostEditor';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const platformColors = {
  facebook: 'bg-blue-500',
  instagram: 'bg-pink-500',
  whatsapp: 'bg-green-500',
  youtube: 'bg-red-500',
  linkedin: 'bg-blue-700',
  twitter: 'bg-blue-400'
};

const statusConfig = {
  draft: { label: 'Rascunho', color: 'bg-gray-500', icon: FileText },
  scheduled: { label: 'Agendado', color: 'bg-yellow-500', icon: Clock },
  publishing: { label: 'Publicando', color: 'bg-blue-500', icon: Send },
  published: { label: 'Publicado', color: 'bg-green-500', icon: CheckCircle },
  failed: { label: 'Falhou', color: 'bg-red-500', icon: XCircle },
  cancelled: { label: 'Cancelado', color: 'bg-gray-400', icon: AlertCircle }
};

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
  onDuplicate: (postId: string) => void;
  onPublishNow: (postId: string) => void;
  onCancel: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  onDuplicate,
  onPublishNow,
  onCancel
}) => {
  const statusInfo = statusConfig[post.status];
  const StatusIcon = statusInfo.icon;

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'edit':
          onEdit(post);
          break;
        case 'delete':
          if (confirm('Tem certeza que deseja excluir este post?')) {
            await onDelete(post.id);
          }
          break;
        case 'duplicate':
          await onDuplicate(post.id);
          break;
        case 'publish':
          await onPublishNow(post.id);
          break;
        case 'cancel':
          if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
            await onCancel(post.id);
          }
          break;
      }
    } catch (error) {
      console.error('Erro na ação do post:', error);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {post.title && (
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                {post.title}
              </h3>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`${statusInfo.color} text-white`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusInfo.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {post.content_type}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction('edit')}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('duplicate')}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
              {post.status === 'draft' && (
                <DropdownMenuItem onClick={() => handleAction('publish')}>
                  <Send className="h-4 w-4 mr-2" />
                  Publicar Agora
                </DropdownMenuItem>
              )}
              {post.status === 'scheduled' && (
                <DropdownMenuItem onClick={() => handleAction('cancel')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar Agendamento
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => handleAction('delete')}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {post.content}
        </p>
        
        {/* Platforms */}
        <div className="flex items-center gap-1 mb-3">
          {post.platforms.map((platform) => (
            <div
              key={platform}
              className={`w-4 h-4 rounded ${platformColors[platform as keyof typeof platformColors]} opacity-80`}
              title={platform}
            />
          ))}
        </div>
        
        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.hashtags.slice(0, 5).map((hashtag) => (
              <Badge key={hashtag} variant="outline" className="text-xs">
                #{hashtag}
              </Badge>
            ))}
            {post.hashtags.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{post.hashtags.length - 5}
              </Badge>
            )}
          </div>
        )}
        
        {/* Schedule info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {post.scheduled_for && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(post.scheduled_for), "dd/MM 'às' HH:mm", { locale: ptBR })}
              </div>
            )}
            {post.ai_generated && (
              <div className="flex items-center gap-1 text-purple-500">
                <Sparkles className="h-3 w-3" />
                IA
              </div>
            )}
          </div>
          
          <span>
            {formatDistanceToNow(new Date(post.created_at), { 
              addSuffix: true, 
              locale: ptBR 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PostsPage() {
  const { 
    posts, 
    loading, 
    fetchPosts, 
    deletePost, 
    duplicatePost, 
    publishNow, 
    cancelScheduled,
    getPostsStats,
    drafts,
    scheduled,
    published,
    failed
  } = usePosts();

  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);

  // Load posts and stats on mount
  useEffect(() => {
    fetchPosts();
    loadStats();
  }, []);

  const loadStats = async () => {
    const statsData = await getPostsStats();
    setStats(statsData);
  };

  // Filter posts based on search and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    const matchesPlatform = filterPlatform === 'all' || 
      post.platforms.includes(filterPlatform);

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleNewPost = () => {
    setEditingPost(undefined);
    setShowEditor(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handlePostSaved = (post: Post) => {
    setShowEditor(false);
    setEditingPost(undefined);
    fetchPosts(); // Reload posts
    loadStats(); // Reload stats
    toast.success('Post salvo com sucesso!');
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    loadStats();
  };

  const handleDuplicatePost = async (postId: string) => {
    await duplicatePost(postId);
    loadStats();
  };

  const handlePublishNow = async (postId: string) => {
    await publishNow(postId);
    loadStats();
  };

  const handleCancelScheduled = async (postId: string) => {
    await cancelScheduled(postId);
    loadStats();
  };

  if (showEditor) {
    return (
      <PostEditor
        post={editingPost}
        onSave={handlePostSaved}
        onCancel={() => setShowEditor(false)}
        isOpen={showEditor}
      />
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">
            Gerencie seu conteúdo para redes sociais
          </p>
        </div>
        <Button onClick={handleNewPost} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rascunhos</p>
                  <p className="text-2xl font-bold">{stats.drafts}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agendados</p>
                  <p className="text-2xl font-bold">{stats.scheduled}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Publicados</p>
                  <p className="text-2xl font-bold">{stats.published}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Falhas</p>
                  <p className="text-2xl font-bold">{stats.failed}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="failed">Falhas</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            Todos ({filteredPosts.length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Rascunhos ({drafts.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Agendados ({scheduled.length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Publicados ({published.length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Falhas ({failed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum post encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterStatus !== 'all' || filterPlatform !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro post'}
                </p>
                <Button onClick={handleNewPost}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onDuplicate={handleDuplicatePost}
                  onPublishNow={handlePublishNow}
                  onCancel={handleCancelScheduled}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Other tabs with filtered content */}
        {['draft', 'scheduled', 'published', 'failed'].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts
                .filter((post) => post.status === status)
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    onDuplicate={handleDuplicatePost}
                    onPublishNow={handlePublishNow}
                    onCancel={handleCancelScheduled}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 