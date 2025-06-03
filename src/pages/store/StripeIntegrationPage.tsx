
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, ShieldCheck, Settings2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const StripeIntegrationPage: React.FC = () => {
  const { formatCurrency } = useCurrency({ defaultCurrency: 'BRL' });
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [testMode, setTestMode] = useState(true);

  // Simular informações do painel do Stripe
  const stripeInfo = {
    balance: 0,
    pendingPayments: 0,
    totalTransactions: 0,
    successRate: 99.8
  };

  const handleConnectStripe = async () => {
    setIsLoading(true);
    try {
      // Aqui seria implementada a lógica para conectar ao Stripe usando Edge Functions
      // Por enquanto, simulamos uma conexão bem-sucedida após 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsActivated(true);
      toast.success("Integração com Stripe ativada com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar com Stripe:", error);
      toast.error("Falha na integração com Stripe. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integração Stripe</h1>
          <p className="text-muted-foreground">
            Configure a integração de pagamentos para você e seus clientes
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="test-mode">Modo de Teste</Label>
          <Switch id="test-mode" checked={testMode} onCheckedChange={setTestMode} />
        </div>
      </div>

      {!isActivated ? (
        <Card>
          <CardHeader>
            <CardTitle>Conecte sua conta Stripe</CardTitle>
            <CardDescription>
              O Stripe permite que você e seus clientes recebam pagamentos de forma segura
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4 p-4 border rounded-md bg-muted/30">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Segurança em primeiro lugar</h3>
                <p className="text-sm text-muted-foreground">
                  O Stripe é compatível com PCI DSS e usa criptografia de ponta a ponta para proteger os dados dos cartões.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Para você (Admin)</h3>
                <p className="text-sm text-muted-foreground mb-4">Receba pagamentos dos seus clientes SaaS diretamente.</p>
                <Badge className="mb-2">Taxa: 2.9% + R$ 0,30</Badge>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Para seus clientes</h3>
                <p className="text-sm text-muted-foreground mb-4">Seus clientes podem receber pagamentos dos consumidores finais.</p>
                <Badge className="mb-2">Taxa: 3.9% + R$ 0,30</Badge>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Transferências</h3>
                <p className="text-sm text-muted-foreground mb-4">Transferências para conta bancária em até 2 dias úteis.</p>
                <Badge className="mb-2">Mínimo: R$ 20,00</Badge>
              </div>
            </div>

            <Alert className="bg-yellow-900/20 text-yellow-500 border-yellow-800/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Nunca compartilhe sua chave secreta do Stripe. Ela será armazenada de forma segura no sistema.
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Button onClick={handleConnectStripe} disabled={isLoading} size="lg" className="gap-2">
                {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
                Conectar com Stripe
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="keys">Chaves API</TabsTrigger>
            <TabsTrigger value="connect">Clientes Connect</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stripeInfo.balance)}</div>
                  <p className="text-xs text-muted-foreground">Transferência em 2 dias úteis</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stripeInfo.pendingPayments)}</div>
                  <p className="text-xs text-muted-foreground">Em processamento</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stripeInfo.totalTransactions}</div>
                  <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stripeInfo.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Pagamentos bem-sucedidos</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>Processamento de pagamentos dos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="py-6 text-center">
                    <p className="text-muted-foreground">Nenhuma transação recente</p>
                    <Button variant="outline" className="mt-2">
                      Criar Link de Pagamento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chaves de API</CardTitle>
                <CardDescription>
                  Gerencie suas chaves de API para integrar o Stripe em seu sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-muted">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Modo de {testMode ? 'Teste' : 'Produção'}</AlertTitle>
                  <AlertDescription>
                    {testMode 
                      ? "As transações não são reais. Use para testar a integração." 
                      : "As transações são reais e serão cobradas dos clientes."}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label>Chave Publicável</Label>
                    <div className="flex mt-1">
                      <Input 
                        readOnly 
                        value={testMode ? "pk_test_...D6M8ZNfEdA" : "pk_live_...XXXXXXXXX"} 
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" className="ml-2">
                        Copiar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Segura para uso no frontend
                    </p>
                  </div>

                  <div>
                    <Label>Chave Secreta</Label>
                    <div className="flex mt-1">
                      <Input 
                        readOnly 
                        type="password"
                        value="•••••••••••••••••••••••••••••••••"
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" className="ml-2">
                        Revelar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-red-500 font-semibold">NUNCA</span> compartilhe esta chave ou a exponha no frontend
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Como usar</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para aceitar pagamentos, você precisará usar estas chaves em sua integração.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Link to="/gateway/integrations" className="flex items-center gap-2">
                        Ver Gateway de Pagamento <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="link" size="sm">
                      <a href="https://stripe.com/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        Documentação <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connect" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stripe Connect para Clientes</CardTitle>
                <CardDescription>
                  Permita que seus clientes recebam pagamentos diretamente em suas contas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Configuração necessária</AlertTitle>
                  <AlertDescription>
                    Para habilitar o recurso Connect para seus clientes, você precisa configurar o Stripe Connect no painel do Stripe.
                  </AlertDescription>
                </Alert>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Benefícios do Stripe Connect</h3>
                  <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                    <li>Seus clientes podem receber pagamentos diretamente</li>
                    <li>Gerenciamento automatizado de repasse de comissões</li>
                    <li>Conformidade fiscal automática</li>
                    <li>Painéis personalizados para seus clientes</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Taxas e Comissões</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure suas margens de lucro e defina comissões automaticamente para cada transação.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" disabled>
                      Configurar Connect
                    </Button>
                    <Button variant="link" size="sm">
                      <a href="https://stripe.com/docs/connect" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        Saiba mais <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contas Connect de Clientes</CardTitle>
                <CardDescription>
                  Gerencie as contas Stripe Connect dos seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="py-6 text-center">
                    <p className="text-muted-foreground">Nenhuma conta Connect configurada</p>
                    <Button variant="outline" className="mt-2" disabled>
                      Adicionar Cliente Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Pagamento</CardTitle>
                <CardDescription>
                  Personalize as configurações de pagamento para sua plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-capture">Captura Automática</Label>
                    <Switch id="auto-capture" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Capturar pagamentos automaticamente ou apenas pré-autorizar
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="save-cards">Salvar Cartões</Label>
                    <Switch id="save-cards" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Permitir que clientes salvem cartões para pagamentos futuros
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="refunds">Reembolsos Automáticos</Label>
                    <Switch id="refunds" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatizar reembolsos baseados em regras definidas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Moeda Principal</Label>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option value="BRL">Real Brasileiro (BRL)</option>
                    <option value="USD">Dólar Americano (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Métodos de Pagamento</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <input type="checkbox" id="credit-card" defaultChecked />
                      <label htmlFor="credit-card">Cartões de Crédito</label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <input type="checkbox" id="pix" defaultChecked />
                      <label htmlFor="pix">PIX</label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <input type="checkbox" id="boleto" />
                      <label htmlFor="boleto">Boleto</label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <input type="checkbox" id="subscription" />
                      <label htmlFor="subscription">Assinaturas</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <div className="bg-muted/30 rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Link de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Crie links de pagamento para enviar aos seus clientes por e-mail ou mensagem.
              </p>
              <Button variant="outline" className="w-full mt-4" disabled={!isActivated}>
                Criar Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Checkout Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Integre o checkout do Stripe em seu site para aceitar pagamentos online.
              </p>
              <Button variant="outline" className="w-full mt-4" disabled={!isActivated}>
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Settings2 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Webhook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure webhooks para receber notificações de eventos do Stripe.
              </p>
              <Button variant="outline" className="w-full mt-4" disabled={!isActivated}>
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StripeIntegrationPage;
