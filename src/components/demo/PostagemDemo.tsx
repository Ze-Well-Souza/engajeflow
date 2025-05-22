import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Image, Calendar, Clock, Users, MessageSquare } from "lucide-react";

interface PostagemDemoProps {
  segment?: string;
}

const PostagemDemo: React.FC<PostagemDemoProps> = ({ segment = "default" }) => {
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<string | undefined>(undefined);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [socialNetworks, setSocialNetworks] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("criar");

  // Dados específicos por segmento
  const segmentData: Record<string, {
    title: string;
    postTypes: string[];
    defaultImages: string[];
    color: string;
    placeholderText: string;
  }> = {
    beauty: {
      title: "Gestão de Conteúdo para Beleza e Estética",
      postTypes: ["Promoção", "Antes e Depois", "Dica de Beleza", "Novo Serviço", "Depoimento", "Equipe"],
      defaultImages: ["cabelo.jpg", "manicure.jpg", "tratamento.jpg", "maquiagem.jpg"],
      color: "text-pink-500",
      placeholderText: "Ex: Aproveite nossa promoção de terça-feira! 30% de desconto em coloração."
    },
    food: {
      title: "Gestão de Conteúdo para Alimentação",
      postTypes: ["Prato do Dia", "Promoção", "Novo Item no Cardápio", "Evento", "Depoimento", "Equipe"],
      defaultImages: ["prato.jpg", "restaurante.jpg", "chef.jpg", "sobremesa.jpg"],
      color: "text-orange-500",
      placeholderText: "Ex: Experimente nossa nova sobremesa! Torta de limão com merengue italiano."
    },
    freelancer: {
      title: "Gestão de Conteúdo para Serviços Domésticos",
      postTypes: ["Promoção", "Antes e Depois", "Dica", "Novo Serviço", "Depoimento", "Equipe"],
      defaultImages: ["limpeza.jpg", "reforma.jpg", "jardim.jpg", "eletrica.jpg"],
      color: "text-blue-500",
      placeholderText: "Ex: Dica do dia: como manter sua casa limpa por mais tempo com 3 passos simples."
    },
    "content-creator": {
      title: "Gestão de Conteúdo para Eventos",
      postTypes: ["Portfolio", "Promoção", "Bastidores", "Novo Serviço", "Depoimento", "Equipe"],
      defaultImages: ["evento.jpg", "casamento.jpg", "festa.jpg", "corporativo.jpg"],
      color: "text-purple-500",
      placeholderText: "Ex: Confira as fotos do casamento de Mariana e João. Um dia inesquecível!"
    },
    education: {
      title: "Gestão de Conteúdo para Educação",
      postTypes: ["Dica de Estudo", "Novo Curso", "Depoimento", "Evento", "Artigo", "Equipe"],
      defaultImages: ["aula.jpg", "livros.jpg", "estudantes.jpg", "professor.jpg"],
      color: "text-green-500",
      placeholderText: "Ex: 5 técnicas de estudo comprovadas para melhorar sua concentração e memorização."
    },
    ecommerce: {
      title: "Gestão de Conteúdo para E-commerce",
      postTypes: ["Lançamento", "Promoção", "Tutorial", "Destaque", "Depoimento", "Equipe"],
      defaultImages: ["produto.jpg", "loja.jpg", "entrega.jpg", "cliente.jpg"],
      color: "text-yellow-500",
      placeholderText: "Ex: Novo lançamento! Conheça nossa linha exclusiva de produtos sustentáveis."
    },
    hr: {
      title: "Gestão de Conteúdo para RH",
      postTypes: ["Vaga Aberta", "Dica de Carreira", "Evento", "Cultura da Empresa", "Depoimento", "Equipe"],
      defaultImages: ["escritorio.jpg", "reuniao.jpg", "entrevista.jpg", "equipe.jpg"],
      color: "text-indigo-500",
      placeholderText: "Ex: Estamos contratando! Vaga para Analista de Recursos Humanos. Confira os requisitos."
    },
    accounting: {
      title: "Gestão de Conteúdo para Contabilidade/Advocacia",
      postTypes: ["Dica Legal", "Atualização Tributária", "Evento", "Novo Serviço", "Depoimento", "Equipe"],
      defaultImages: ["escritorio.jpg", "documentos.jpg", "reuniao.jpg", "contrato.jpg"],
      color: "text-gray-500",
      placeholderText: "Ex: Atenção empresários! Prazo para declaração do imposto de renda termina em 10 dias."
    },
    default: {
      title: "Gestão de Conteúdo",
      postTypes: ["Informativo", "Promoção", "Dica", "Novo Serviço", "Depoimento", "Equipe"],
      defaultImages: ["default1.jpg", "default2.jpg", "default3.jpg", "default4.jpg"],
      color: "text-primary",
      placeholderText: "Ex: Compartilhe informações relevantes sobre seu negócio aqui."
    }
  };

  // Obter dados do segmento atual ou usar padrão
  const data = segment && segmentData[segment] ? segmentData[segment] : segmentData.default;

  // Redes sociais disponíveis
  const availableSocialNetworks = [
    "Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok", "WhatsApp"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPostType(undefined);
    setPostContent("");
    setPostTitle("");
    setPostImage(undefined);
    setScheduledDate("");
    setScheduledTime("");
    setSocialNetworks([]);
    setIsSubmitted(false);
  };

  const toggleSocialNetwork = (network: string) => {
    if (socialNetworks.includes(network)) {
      setSocialNetworks(socialNetworks.filter(n => n !== network));
    } else {
      setSocialNetworks([...socialNetworks, network]);
    }
  };

  // Posts agendados simulados
  const scheduledPosts = [
    {
      id: 1,
      title: "Promoção de Fim de Semana",
      date: "24/05/2025",
      time: "10:00",
      networks: ["Instagram", "Facebook"]
    },
    {
      id: 2,
      title: "Dica Profissional",
      date: "26/05/2025",
      time: "14:30",
      networks: ["Instagram", "LinkedIn"]
    },
    {
      id: 3,
      title: "Novidades da Semana",
      date: "28/05/2025",
      time: "09:00",
      networks: ["Instagram", "Facebook", "WhatsApp"]
    }
  ];

  // Posts publicados simulados
  const publishedPosts = [
    {
      id: 101,
      title: "Lançamento da Nova Coleção",
      date: "15/05/2025",
      networks: ["Instagram", "Facebook", "TikTok"],
      engagement: "1.2k curtidas, 45 comentários"
    },
    {
      id: 102,
      title: "Dica do Especialista",
      date: "10/05/2025",
      networks: ["Instagram", "LinkedIn"],
      engagement: "856 curtidas, 32 comentários"
    },
    {
      id: 103,
      title: "Depoimento de Cliente",
      date: "05/05/2025",
      networks: ["Instagram", "Facebook"],
      engagement: "723 curtidas, 28 comentários"
    }
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className={data.color}>{data.title}</CardTitle>
        <CardDescription>
          Crie, agende e gerencie suas publicações nas redes sociais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="criar">Criar Post</TabsTrigger>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="publicados">Publicados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="criar">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Post Agendado!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Seu post foi agendado com sucesso e será publicado automaticamente.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-left max-w-md mx-auto mb-6">
                  <p className="mb-2"><strong>Tipo:</strong> {postType}</p>
                  <p className="mb-2"><strong>Título:</strong> {postTitle}</p>
                  <p className="mb-2"><strong>Data:</strong> {scheduledDate}</p>
                  <p className="mb-2"><strong>Horário:</strong> {scheduledTime}</p>
                  <p className="mb-2"><strong>Redes:</strong> {socialNetworks.join(", ")}</p>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="postType">Tipo de Post</Label>
                      <Select value={postType} onValueChange={setPostType}>
                        <SelectTrigger id="postType">
                          <SelectValue placeholder="Selecione o tipo de post" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.postTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postTitle">Título do Post</Label>
                      <Input
                        id="postTitle"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Digite um título atrativo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postContent">Conteúdo do Post</Label>
                      <Textarea
                        id="postContent"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder={data.placeholderText}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Imagem</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {data.defaultImages.map((img, index) => (
                          <div 
                            key={index}
                            className={`border rounded-md p-2 cursor-pointer ${postImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'}`}
                            onClick={() => setPostImage(img)}
                          >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                              <Image className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-xs text-center mt-2">{img}</p>
                          </div>
                        ))}
                        <div className="border border-dashed border-gray-200 rounded-md p-2 cursor-pointer flex flex-col items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-xs text-center">Upload de imagem</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Data de Publicação</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">Horário de Publicação</Label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Redes Sociais</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableSocialNetworks.map((network) => (
                          <Button
                            key={network}
                            type="button"
                            variant={socialNetworks.includes(network) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSocialNetwork(network)}
                          >
                            {network}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="agendados">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Posts Agendados</h3>
              {scheduledPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{post.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{post.date}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          <span>{post.time}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.networks.map((network) => (
                            <span key={network} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {network}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="destructive" size="sm">Cancelar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="publicados">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Posts Publicados</h3>
              {publishedPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{post.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.networks.map((network) => (
                            <span key={network} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {network}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{post.engagement}</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Ver Analytics</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {activeTab === "criar" && (
        <CardFooter className="flex justify-between">
          {isSubmitted ? (
            <Button onClick={handleReset} className="w-full">
              Criar novo post
            </Button>
          ) : (
            <>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={
                  (step === 1 && (!postType || !postTitle || !postContent)) ||
                  (step === 3 && (!scheduledDate || !scheduledTime || socialNetworks.length === 0))
                }
              >
                {step === 3 ? "Agendar post" : "Próximo"}
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default PostagemDemo;
