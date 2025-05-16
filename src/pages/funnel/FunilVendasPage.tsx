
import React, { useState } from "react";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, ChevronRight, Mail, BarChart2, ExternalLink, Users, Loader2 } from "lucide-react";
import { useEmailSequence, EmailSequenceGroup } from "@/hooks/useEmailSequence";
import LeadCaptureForm from "@/components/funnel/LeadCaptureForm";
import EmailSequenceCard from "@/components/funnel/EmailSequenceCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Exemplos de formulários de captura para demonstração
const formTemplates = [
  {
    id: "form-1",
    title: "Newsletter Semanal",
    description: "Receba nossas dicas e novidades toda semana",
    preview: "https://placehold.co/250x180/3f3f46/FFF?text=Newsletter",
    embedCode: '<iframe src="https://example.com/form/newsletter"></iframe>'
  },
  {
    id: "form-2",
    title: "Ebook Gratuito",
    description: "Guia completo para aumentar suas vendas",
    preview: "https://placehold.co/250x180/3f3f46/FFF?text=Ebook",
    embedCode: '<iframe src="https://example.com/form/ebook"></iframe>'
  },
  {
    id: "form-3",
    title: "Webinar Exclusivo",
    description: "Aprenda novas estratégias de marketing",
    preview: "https://placehold.co/250x180/3f3f46/FFF?text=Webinar",
    embedCode: '<iframe src="https://example.com/form/webinar"></iframe>'
  },
  {
    id: "form-4",
    title: "Desconto na Primeira Compra",
    description: "Ofereça um cupom exclusivo para novos leads",
    preview: "https://placehold.co/250x180/3f3f46/FFF?text=Desconto",
    embedCode: '<iframe src="https://example.com/form/discount"></iframe>'
  }
];

const FunilVendasPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forms");
  const { sequences, isLoading, deleteSequence } = useEmailSequence();
  const { toast } = useToast();
  const [selectedForm, setSelectedForm] = useState<typeof formTemplates[0] | null>(null);
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<EmailSequenceGroup | null>(null);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyEmbedCode = () => {
    if (selectedForm) {
      navigator.clipboard.writeText(selectedForm.embedCode);
      toast({
        title: "Código copiado!",
        description: "O código de incorporação foi copiado para sua área de transferência."
      });
    }
  };

  const handleDeleteSequence = async (id: string) => {
    setSequenceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSequence = async () => {
    if (!sequenceToDelete) return;
    
    setIsDeleting(true);
    const success = await deleteSequence(sequenceToDelete);
    setIsDeleting(false);
    
    if (success) {
      setIsDeleteDialogOpen(false);
      setSequenceToDelete(null);
    }
  };

  const handleEditSequence = (sequence: EmailSequenceGroup) => {
    setSelectedSequence(sequence);
    setIsEditDialogOpen(true);
  };

  const handleViewStats = (sequence: EmailSequenceGroup) => {
    setSelectedSequence(sequence);
    setIsStatsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Funil de Vendas Automatizado</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total de Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-gray-400 mt-1">+24 nas últimas 24h</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-500" />
              Emails Enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,568</div>
            <p className="text-xs text-gray-400 mt-1">Taxa de abertura: 24.6%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-purple-500" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-gray-400 mt-1">+1.2% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="forms">Formulários de Captura</TabsTrigger>
          <TabsTrigger value="sequences">Sequências de Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Formulários de Captura</h2>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Formulário
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formTemplates.map(template => (
              <Card 
                key={template.id} 
                className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all"
                onClick={() => setSelectedForm(template)}
              >
                <div className="p-3">
                  <img 
                    src={template.preview} 
                    alt={template.title} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xs text-gray-400">{template.description}</p>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedForm(template);
                        setIsEmbedDialogOpen(true);
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Incorporar
                    </Button>
                    <Button size="sm">
                      Editar <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Prévia de um Formulário</h2>
            <div className="flex justify-center">
              <LeadCaptureForm 
                title="Ebook Gratuito: Estratégias de Vendas" 
                description="Receba agora mesmo nosso e-book com 10 estratégias comprovadas para aumentar suas vendas online."
                imageSrc="https://placehold.co/400x200/3b5998/FFF?text=Ebook+Gratuito"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sequences" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sequências de E-mails</h2>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Sequência
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sequences.map(sequence => (
                <EmailSequenceCard 
                  key={sequence.id}
                  sequence={sequence}
                  onEdit={handleEditSequence}
                  onDelete={handleDeleteSequence}
                  onViewStats={handleViewStats}
                />
              ))}
              
              <Card className="bg-gray-800/50 border-gray-700 border-dashed flex flex-col items-center justify-center h-[230px] cursor-pointer hover:bg-gray-800/70 transition-colors">
                <PlusCircle className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Adicionar nova sequência</p>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar o código de incorporação */}
      <Dialog open={isEmbedDialogOpen} onOpenChange={setIsEmbedDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle>Código de Incorporação</DialogTitle>
            <DialogDescription>
              Copie o código abaixo e cole-o em seu site ou landing page.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-900 p-4 rounded-md">
            <code className="text-sm font-mono text-gray-300">
              {selectedForm?.embedCode}
            </code>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsEmbedDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCopyEmbedCode}>
              Copiar Código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar a exclusão de uma sequência */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir esta sequência de emails? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteSequence}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Excluindo...
                </>
              ) : "Sim, excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FunilVendasPage;
