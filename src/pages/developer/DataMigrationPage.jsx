import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, Download, FileUp, Database, ArrowDownToLine, Upload, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/badge"; // Adicionando a importação do Badge

// Dados de exemplo para histórico de migrações
const migrationHistory = [
  {
    id: "mig_001",
    type: "export",
    date: "2025-05-15T14:30:00Z",
    status: "completed",
    description: "Exportação completa de dados de campanhas",
    records: 1243,
    size: "4.5 MB"
  },
  {
    id: "mig_002",
    type: "import",
    date: "2025-05-12T10:15:00Z",
    status: "completed",
    description: "Importação de usuários e permissões",
    records: 156,
    size: "1.2 MB"
  },
  {
    id: "mig_003",
    type: "export",
    date: "2025-05-10T09:45:00Z",
    status: "failed",
    description: "Exportação de relatórios analíticos",
    error: "Erro de conexão com o serviço de armazenamento",
    records: 0,
    size: "0 KB"
  }
];

// Exemplo de tipos de dados disponíveis para exportação/importação
const dataTypes = [
  { value: "users", label: "Usuários e Perfis" },
  { value: "campaigns", label: "Campanhas" },
  { value: "posts", label: "Posts e Conteúdos" },
  { value: "analytics", label: "Dados Analíticos" },
  { value: "settings", label: "Configurações" },
  { value: "contacts", label: "Contatos" },
];

const DataMigrationPage = () => {
  const { toast } = useToast();
  const { t } = useLocalization();
  const [history, setHistory] = useState(migrationHistory);
  const [importFile, setImportFile] = useState(null);
  const [exportOptions, setExportOptions] = useState({
    dataTypes: [],
    format: "json"
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const handleExport = () => {
    if (exportOptions.dataTypes.length === 0) {
      toast({
        title: "Erro na exportação",
        description: "Selecione pelo menos um tipo de dados para exportar.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Simulação de progresso
    const interval = setInterval(() => {
      setExportProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          finishExport();
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const finishExport = () => {
    // Em uma aplicação real, aqui iniciaria o download do arquivo
    setIsExporting(false);

    // Adicionar ao histórico
    const newExport = {
      id: `mig_${Math.floor(Math.random() * 1000)}`,
      type: "export",
      date: new Date().toISOString(),
      status: "completed",
      description: `Exportação de ${exportOptions.dataTypes.join(", ")} em formato ${exportOptions.format.toUpperCase()}`,
      records: Math.floor(Math.random() * 2000) + 100,
      size: `${(Math.random() * 10).toFixed(1)} MB`
    };

    setHistory([newExport, ...history]);

    toast({
      title: "Exportação concluída",
      description: "Seus dados foram exportados com sucesso.",
    });
  };

  const handleImport = () => {
    if (!importFile) {
      toast({
        title: "Erro na importação",
        description: "Selecione um arquivo para importar.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    // Simulação de progresso
    const interval = setInterval(() => {
      setImportProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          finishImport();
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const finishImport = () => {
    setIsImporting(false);

    // Adicionar ao histórico
    const newImport = {
      id: `mig_${Math.floor(Math.random() * 1000)}`,
      type: "import",
      date: new Date().toISOString(),
      status: "completed",
      description: `Importação de dados do arquivo ${importFile?.name}`,
      records: Math.floor(Math.random() * 500) + 50,
      size: `${(importFile?.size || 0) / (1024 * 1024).toFixed(1)} MB`
    };

    setHistory([newImport, ...history]);
    setImportFile(null);

    toast({
      title: "Importação concluída",
      description: "Seus dados foram importados com sucesso.",
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
    }
  };

  const toggleDataType = (type) => {
    if (exportOptions.dataTypes.includes(type)) {
      setExportOptions({
        ...exportOptions,
        dataTypes: exportOptions.dataTypes.filter(t => t !== type)
      });
    } else {
      setExportOptions({
        ...exportOptions,
        dataTypes: [...exportOptions.dataTypes, type]
      });
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Migração de Dados</h1>
      
      <Tabs defaultValue="export" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="export" className="flex items-center gap-1">
            <ArrowDownToLine className="h-4 w-4" />
            Exportar
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Importar
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Exportar Dados</CardTitle>
              <CardDescription>
                Exporte seus dados para backup ou migração para outro sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="block mb-2">Tipos de Dados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dataTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`type-${type.value}`}
                        checked={exportOptions.dataTypes.includes(type.value)}
                        onChange={() => toggleDataType(type.value)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`type-${type.value}`}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="export-format" className="block mb-2">Formato</Label>
                <Select
                  value={exportOptions.format}
                  onValueChange={(value) => setExportOptions({...exportOptions, format: value})}
                >
                  <SelectTrigger id="export-format" className="w-full md:w-52">
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xml">XML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isExporting && (
                <div className="space-y-2">
                  <Label>Progresso da Exportação</Label>
                  <Progress value={exportProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {exportProgress}% completo
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 mr-1" />
                A exportação não inclui dados de terceiros
              </div>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Exportando..." : "Exportar Dados"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Importar Dados</CardTitle>
              <CardDescription>
                Importe dados de um arquivo previamente exportado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="import-file" className="block mb-2">Arquivo para Importação</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="import-file"
                    type="file"
                    accept=".json,.csv,.xml"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => document.getElementById('import-file')?.click()}
                  >
                    <FileUp className="h-4 w-4" />
                    Selecionar
                  </Button>
                </div>
                
                {importFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Arquivo selecionado: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              {isImporting && (
                <div className="space-y-2">
                  <Label>Progresso da Importação</Label>
                  <Progress value={importProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {importProgress}% completo
                  </p>
                </div>
              )}
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Importante</h4>
                    <p className="text-sm text-amber-700">
                      A importação pode substituir dados existentes no sistema. Recomendamos fazer um backup
                      antes de prosseguir com a importação.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button 
                variant="outline"
                onClick={() => setImportFile(null)}
                disabled={!importFile || isImporting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleImport} 
                disabled={!importFile || isImporting}
                className="flex items-center gap-1"
              >
                <ArrowUpDown className="h-4 w-4" />
                {isImporting ? "Importando..." : "Iniciar Importação"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Migrações</CardTitle>
              <CardDescription>
                Registros de suas importações e exportações anteriores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="divide-y">
                  {history.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {item.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <h3 className="font-medium">
                            {item.description}
                          </h3>
                        </div>
                        <Badge className={item.type === "export" ? "bg-blue-600" : "bg-amber-600"}>
                          {item.type === "export" ? "Exportação" : "Importação"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mt-2">
                        <div>
                          <p className="font-medium text-foreground">ID</p>
                          <p>{item.id}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Data</p>
                          <p>{new Date(item.date).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Registros</p>
                          <p>{item.records}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tamanho</p>
                          <p>{item.size}</p>
                        </div>
                      </div>
                      
                      {item.error && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-sm text-red-600">
                          {item.error}
                        </div>
                      )}
                      
                      {item.status === "completed" && item.type === "export" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 flex items-center gap-1"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Baixar novamente
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Nenhum histórico de migração encontrado.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataMigrationPage;
