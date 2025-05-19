
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, QrCode, Calendar, Download, Banknote, TrendingUp, PieChart, CreditCard, Plus, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentForm from "@/components/store/payment/PaymentForm";
import StripeCheckoutButton from "@/components/store/payment/StripeCheckoutButton";

const VendasPage = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Vendas</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
            <option>Mês passado</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Link to="/store/stripe-integration">
            <Button variant="default" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Configurar Stripe
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 24.583,00</div>
            <p className="text-xs text-green-500">+12.5% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-green-500">+8.3% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 192,05</div>
            <p className="text-xs text-green-500">+3.7% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7%</div>
            <p className="text-xs text-green-500">+0.5% que no período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="pagamentos">Links de Pagamento</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transacoes">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Últimas Vendas</CardTitle>
              <Button variant="outline" size="sm">Ver todas</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Cliente</th>
                      <th className="pb-3">Data</th>
                      <th className="pb-3">Valor</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { id: '#12345', cliente: 'Maria Silva', data: '16/05/2025', valor: 'R$ 378,90', status: 'Completo' },
                      { id: '#12344', cliente: 'João Santos', data: '15/05/2025', valor: 'R$ 142,50', status: 'Pendente' },
                      { id: '#12343', cliente: 'Ana Oliveira', data: '15/05/2025', valor: 'R$ 253,75', status: 'Completo' },
                      { id: '#12342', cliente: 'Carlos Souza', data: '14/05/2025', valor: 'R$ 89,99', status: 'Cancelado' },
                      { id: '#12341', cliente: 'Pedro Lima', data: '14/05/2025', valor: 'R$ 427,30', status: 'Completo' },
                    ].map((venda, i) => (
                      <tr key={i} className="border-t border-gray-700">
                        <td className="py-3">{venda.id}</td>
                        <td>{venda.cliente}</td>
                        <td>{venda.data}</td>
                        <td>{venda.valor}</td>
                        <td>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            venda.status === 'Completo' ? 'bg-green-900/30 text-green-500 border border-green-800/50' : 
                            venda.status === 'Pendente' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-800/50' : 
                            'bg-red-900/30 text-red-500 border border-red-800/50'
                          }`}>
                            {venda.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button className="p-1 hover:bg-gray-700 rounded">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded">
                              <QrCode className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pagamentos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Links de pagamento existentes */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Assinatura Mensal</CardTitle>
                <CardDescription>
                  Plano mensal de acesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">R$ 99,90</div>
                <p className="text-sm text-muted-foreground mb-4">Link criado em 15/05/2025</p>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-500 border border-blue-800/50">
                    10 vendas
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-500 border border-green-800/50">
                    Ativo
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <StripeCheckoutButton 
                  amount={9990}
                  variant="outline"
                  size="sm"
                >
                  Testar Checkout
                </StripeCheckoutButton>
                <Button variant="ghost" size="sm">
                  <QrCode className="h-4 w-4 mr-1" /> QR Code
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Consultoria Premium</CardTitle>
                <CardDescription>
                  Serviço de consultoria avançada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">R$ 1.499,00</div>
                <p className="text-sm text-muted-foreground mb-4">Link criado em 10/05/2025</p>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-500 border border-blue-800/50">
                    2 vendas
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-500 border border-green-800/50">
                    Ativo
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <StripeCheckoutButton 
                  amount={149900}
                  variant="outline"
                  size="sm"
                >
                  Testar Checkout
                </StripeCheckoutButton>
                <Button variant="ghost" size="sm">
                  <QrCode className="h-4 w-4 mr-1" /> QR Code
                </Button>
              </CardFooter>
            </Card>
            
            {/* Criar novo link de pagamento */}
            <Card className="bg-gray-800 border-gray-700 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-700/50 transition-colors">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="text-center">
                    <div className="bg-gray-700/50 p-4 rounded-full mb-4">
                      <Plus className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Novo Link de Pagamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Crie um novo link para receber pagamentos
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Criar Link de Pagamento</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes para gerar um novo link de pagamento
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome do Produto/Serviço
                      </label>
                      <input
                        id="name"
                        className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                        placeholder="Ex: Consultoria Básica"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        Valor (R$)
                      </label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                        placeholder="99,90"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Descrição
                      </label>
                      <textarea
                        id="description"
                        className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
                        rows={3}
                        placeholder="Descreva o que está sendo vendido..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Gerar Link</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
          
          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Teste de Checkout</CardTitle>
              <CardDescription>
                Simule um checkout com o Stripe para testar sua integração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-700 rounded-md p-4">
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-medium mb-2">Simular Pagamento</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Teste a experiência de pagamento integrada com o Stripe sem realizar uma transação real.
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setShowPaymentForm(true)}>
                        <CreditCard className="h-4 w-4 mr-2" /> Testar Formulário
                      </Button>
                      <StripeCheckoutButton 
                        amount={2500}
                        variant="default"
                      >
                        Testar Checkout
                      </StripeCheckoutButton>
                    </div>
                    
                    <div className="mt-4 text-xs text-muted-foreground">
                      <p>Para testes, você pode usar:</p>
                      <p>• Cartão: 4242 4242 4242 4242</p>
                      <p>• Validade: Qualquer data futura</p>
                      <p>• CVC: Quaisquer 3 dígitos</p>
                    </div>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-700/20 rounded-md p-4">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <ExternalLink className="h-4 w-4" />
                      Documentação do Stripe
                    </h4>
                    <p className="text-sm mb-4">
                      Acesse a documentação para configurar corretamente sua integração:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        <a href="https://stripe.com/docs/checkout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          Stripe Checkout
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        <a href="https://stripe.com/docs/payments" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          Aceitar Pagamentos
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        <a href="https://stripe.com/docs/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          API Reference
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relatorios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Métodos de Pagamento</CardTitle>
                <PieChart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cartão de Crédito</span>
                        <span>65%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Boleto</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pix</span>
                        <span>20%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-600 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>QR Code Generator</CardTitle>
                <QrCode className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ID da Venda ou Produto</label>
                    <input 
                      type="text" 
                      placeholder="Digite o ID da venda ou o código do produto"
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                      <option>Link de Pagamento</option>
                      <option>Info do Produto</option>
                      <option>Catálogo</option>
                    </select>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="h-32 w-32 border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" /> Gerar QR Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para o formulário de pagamento */}
      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent>
          <PaymentForm 
            title="Pagamento de Teste"
            description="Este é um formulário de pagamento para teste"
            amount={2500} // R$ 25,00
            onSuccess={() => setShowPaymentForm(false)}
            onCancel={() => setShowPaymentForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendasPage;
