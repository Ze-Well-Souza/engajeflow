
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useTranslateMessage } from "@/hooks/useTranslateMessage";
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { translations, SupportedLocale } from '@/i18n/translations';
import { 
  Globe, 
  Languages, 
  Wallet, 
  Clock, 
  FileText, 
  CheckCircle, 
  CircleDot,
  AlertCircle,
  FileEdit,
  Search,
  ChevronsUpDown,
  Sparkles,
  Settings,
  BookOpen,
  ArrowDown,
  CheckSquare
} from "lucide-react";

const InternationalizationPage: React.FC = () => {
  const { toast } = useToast();
  const { locale, setLocale, t, formatCurrency, availableLocales } = useLocalization();
  const { translateMessage, isTranslating } = useTranslateMessage();
  const [isTestingTranslation, setIsTestingTranslation] = useState(false);
  const [textToTranslate, setTextToTranslate] = useState("Olá, este é um teste de tradução automática para demonstração.");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLocale, setTargetLocale] = useState<SupportedLocale>("en");
  
  const handleTranslateText = async () => {
    setIsTestingTranslation(true);
    try {
      const result = await translateMessage(textToTranslate, targetLocale);
      setTranslatedText(result);
      
      toast({
        title: "Texto traduzido",
        description: `Tradução para ${getLanguageName(targetLocale)} concluída`
      });
    } catch (error) {
      toast({
        title: "Erro na tradução",
        description: "Não foi possível traduzir o texto",
        variant: "destructive"
      });
    } finally {
      setIsTestingTranslation(false);
    }
  };
  
  const getLanguageName = (localeCode: string): string => {
    const names: Record<string, string> = {
      pt: "Português",
      en: "English",
      es: "Español",
      fr: "Français",
      de: "Deutsch"
    };
    return names[localeCode] || localeCode;
  };
  
  const getCurrencyByLocale = (localeCode: string): string => {
    const currencies: Record<string, string> = {
      pt: "BRL (R$)",
      en: "USD ($)",
      es: "EUR (€)",
      fr: "EUR (€)",
      de: "EUR (€)"
    };
    return currencies[localeCode] || "USD ($)";
  };

  const getSupportedRegions = (localeCode: string): string => {
    const regions: Record<string, string> = {
      pt: "Brasil, Portugal",
      en: "Estados Unidos, Reino Unido, Canadá, Austrália",
      es: "Espanha, México, Argentina, Colômbia",
      fr: "França, Canadá, Bélgica, Suíça",
      de: "Alemanha, Áustria, Suíça"
    };
    return regions[localeCode] || "";
  };
  
  const getTranslationStatus = (localeCode: string): number => {
    // Simular percentual de tradução completa
    const percentages: Record<string, number> = {
      pt: 100,
      en: 95,
      es: 87,
      fr: 76,
      de: 65
    };
    return percentages[localeCode] || 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="text-primary" />
            Internacionalização
          </h1>
          <p className="text-muted-foreground">
            Gerencie traduções, moedas e adaptações regionais para expansão global
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Configurações
          </Button>
          <LocaleSwitcher variant="full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Idiomas Suportados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{availableLocales.length}</div>
              <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-600">
                <Languages className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Idiomas nativos: Português, Inglês
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Moedas Habilitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">5</div>
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Principal: {getCurrencyByLocale(locale)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Fusos Horários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Padrão: {locale === "pt" ? "Brasília (GMT-3)" : "UTC"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Conteúdo Localizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">87%</div>
              <div className="p-2 rounded-full bg-orange-500/10 text-orange-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Últimas atualizações: 2 dias atrás
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="languages">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="languages">
            <Languages className="h-4 w-4 mr-1" />
            Idiomas
          </TabsTrigger>
          <TabsTrigger value="currencies">
            <Wallet className="h-4 w-4 mr-1" />
            Moedas
          </TabsTrigger>
          <TabsTrigger value="timezones">
            <Clock className="h-4 w-4 mr-1" />
            Fusos Horários
          </TabsTrigger>
          <TabsTrigger value="regulations">
            <BookOpen className="h-4 w-4 mr-1" />
            Regulamentações
          </TabsTrigger>
        </TabsList>
        
        {/* Tab: Idiomas */}
        <TabsContent value="languages" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Idiomas Suportados</CardTitle>
              <CardDescription>
                Gerencie os idiomas disponíveis no sistema e configure traduções
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar idioma..."
                    className="pl-8"
                  />
                </div>
                <Button>
                  <CircleDot className="h-4 w-4 mr-1" />
                  Adicionar Idioma
                </Button>
              </div>
              
              <div className="space-y-2">
                {availableLocales.map((localeCode) => (
                  <div 
                    key={localeCode} 
                    className={`border rounded-md p-4 ${
                      localeCode === locale ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">
                          {localeCode === 'pt' ? '🇧🇷' :
                           localeCode === 'en' ? '🇺🇸' :
                           localeCode === 'es' ? '🇪🇸' :
                           localeCode === 'fr' ? '🇫🇷' :
                           localeCode === 'de' ? '🇩🇪' : '🌐'}
                        </div>
                        <div>
                          <p className="font-medium">{getLanguageName(localeCode)}</p>
                          <p className="text-sm text-muted-foreground">
                            {getSupportedRegions(localeCode)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={
                          getTranslationStatus(localeCode) === 100 
                            ? 'bg-green-500/10 text-green-600 border-green-600/20' 
                            : 'bg-amber-500/10 text-amber-600 border-amber-600/20'
                        }>
                          {getTranslationStatus(localeCode)}% Traduzido
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          {localeCode === locale ? (
                            <Badge className="bg-primary/10 text-primary">
                              Padrão
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => {
                              setLocale(localeCode as SupportedLocale);
                              toast({
                                title: "Idioma alterado",
                                description: `O idioma foi alterado para ${getLanguageName(localeCode)}`
                              });
                            }}>
                              Ativar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Teste de Tradução Automática</CardTitle>
              <CardDescription>
                Teste o mecanismo de tradução automática para conteúdo dinâmico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Texto de origem (Português)</label>
                  <Textarea 
                    value={textToTranslate}
                    onChange={(e) => setTextToTranslate(e.target.value)}
                    placeholder="Digite o texto a ser traduzido"
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Tradução</label>
                    <select 
                      className="text-sm bg-transparent border-none"
                      value={targetLocale}
                      onChange={(e) => setTargetLocale(e.target.value as SupportedLocale)}
                    >
                      {availableLocales.filter(l => l !== 'pt').map(l => (
                        <option key={l} value={l}>{getLanguageName(l)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <Textarea 
                      value={translatedText}
                      readOnly
                      placeholder="A tradução aparecerá aqui"
                      rows={5}
                      className={isTestingTranslation ? 'opacity-50' : ''}
                    />
                    {isTestingTranslation && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleTranslateText} 
                  disabled={isTestingTranslation || !textToTranslate.trim()}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Traduzir
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab: Moedas */}
        <TabsContent value="currencies" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Moedas</CardTitle>
              <CardDescription>
                Gerencie as moedas suportadas e suas configurações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Alert className="bg-blue-500/10 border-blue-200 dark:border-blue-900">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300">Demonstração de formatação</AlertTitle>
                  <AlertDescription className="text-blue-600 dark:text-blue-400">
                    Valor exemplo: {formatCurrency(1234.56)}
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  {[
                    { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', locales: ['pt'] },
                    { code: 'USD', name: 'Dólar Americano', symbol: '$', locales: ['en'] },
                    { code: 'EUR', name: 'Euro', symbol: '€', locales: ['es', 'fr', 'de'] },
                    { code: 'GBP', name: 'Libra Esterlina', symbol: '£', locales: [] },
                    { code: 'JPY', name: 'Iene Japonês', symbol: '¥', locales: [] }
                  ].map(currency => (
                    <div key={currency.code} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full text-primary font-medium">
                          {currency.symbol}
                        </div>
                        <div>
                          <p className="font-medium">{currency.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {currency.code} • {currency.locales.map(l => getLanguageName(l)).join(', ') || 'Não é padrão para nenhum idioma'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Ativo</span>
                          <Switch checked={true} />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Alert className="w-full bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800 dark:text-amber-300">Sobre a atualização de taxas</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  O sistema atualiza automaticamente as taxas de câmbio a cada 6 horas. Última atualização: 2 horas atrás.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab: Fusos Horários */}
        <TabsContent value="timezones" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fusos Horários</CardTitle>
              <CardDescription>
                Gerencie os fusos horários suportados pelo sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Fuso horário atual do sistema</h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'pt' ? 'America/Sao_Paulo (GMT-3)' : 'UTC'}
                  </p>
                </div>
                <Button variant="outline">
                  Alterar fuso horário padrão
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Fusos Horários por Região</h3>
                  <Button variant="ghost" size="sm">
                    <ChevronsUpDown className="h-3 w-3 mr-1" />
                    Ordenar
                  </Button>
                </div>
                
                <div className="max-h-96 overflow-y-auto border rounded-md divide-y">
                  {[
                    { region: "América do Norte", zones: ["America/New_York (EST)", "America/Chicago (CST)", "America/Denver (MST)", "America/Los_Angeles (PST)"] },
                    { region: "América do Sul", zones: ["America/Sao_Paulo (BRT)", "America/Buenos_Aires (ART)", "America/Santiago (CLT)", "America/Bogota (COT)"] },
                    { region: "Europa", zones: ["Europe/London (GMT)", "Europe/Paris (CET)", "Europe/Moscow (MSK)"] },
                    { region: "Ásia", zones: ["Asia/Tokyo (JST)", "Asia/Shanghai (CST)", "Asia/Dubai (GST)", "Asia/Singapore (SGT)"] },
                    { region: "Oceania", zones: ["Australia/Sydney (AEST)", "Pacific/Auckland (NZST)"] }
                  ].map((item, index) => (
                    <div key={index} className="p-3">
                      <div className="font-medium mb-1">{item.region}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {item.zones.map((zone, zIndex) => (
                          <div key={zIndex} className="flex items-center text-sm">
                            <CircleDot className="h-2.5 w-2.5 mr-1.5 text-primary" />
                            {zone}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Alert className="bg-blue-500/10 border-blue-200 dark:border-blue-900">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Tratamento de data e hora</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                  O sistema armazena todos os horários em UTC e realiza conversões para o fuso horário local do usuário no momento da exibição.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab: Regulamentações */}
        <TabsContent value="regulations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conformidade Internacional</CardTitle>
              <CardDescription>
                Gerencie a conformidade com regulamentações internacionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Regulamentações de Privacidade</h3>
                
                <div className="space-y-3">
                  {[
                    { name: "LGPD (Brasil)", active: true, description: "Lei Geral de Proteção de Dados", icon: <CheckCircle className="h-4 w-4 text-green-600" /> },
                    { name: "GDPR (União Europeia)", active: true, description: "General Data Protection Regulation", icon: <CheckCircle className="h-4 w-4 text-green-600" /> },
                    { name: "CCPA (Califórnia)", active: true, description: "California Consumer Privacy Act", icon: <CheckCircle className="h-4 w-4 text-green-600" /> },
                    { name: "PIPEDA (Canadá)", active: false, description: "Personal Information Protection and Electronic Documents Act", icon: <CircleDot className="h-4 w-4 text-amber-600" /> },
                  ].map((regulation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        {regulation.icon}
                        <div>
                          <p className="font-medium">{regulation.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {regulation.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={
                          regulation.active ? 'bg-green-500/10 text-green-600 border-green-600/20' : 'bg-amber-500/10 text-amber-600 border-amber-600/20'
                        }>
                          {regulation.active ? 'Implementado' : 'Pendente'}
                        </Badge>
                        <Button variant="outline" size="sm">Configurar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Regulamentações Fiscais</h3>
                
                <div className="border p-4 rounded-md bg-muted/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium">Integração com sistemas fiscais</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Para conformidade fiscal em diferentes regiões, o sistema precisa se integrar com APIs específicas de cada país.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Brasil (NFe)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                      <span className="text-sm">EUA (Sales Tax)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                      <span className="text-sm">UE (VAT)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowDown className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">México (em desenvolvimento)</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Visualizar todas as integrações fiscais
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternationalizationPage;
