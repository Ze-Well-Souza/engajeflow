
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, CheckCircle, Gift, Ticket, Users } from "lucide-react";
import { toast } from "sonner";

interface RifaTicket {
  id: string;
  number: string;
  status: "disponivel" | "reservado" | "pago";
  owner?: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

interface RifaPromo {
  id: string;
  name: string;
  description: string;
  pricePerTicket: number;
  drawDate: string;
  prize: string;
  imageUrl: string;
  totalTickets: number;
  soldTickets: number;
  status: "ativo" | "encerrado" | "sorteado";
  winner?: string;
}

const RifaOnlinePage: React.FC = () => {
  const [rifas, setRifas] = useState<RifaPromo[]>([
    {
      id: "1",
      name: "Sorteio de Inauguração",
      description: "Participe do sorteio especial de inauguração e concorra a prêmios exclusivos!",
      pricePerTicket: 10,
      drawDate: "2025-06-30",
      prize: "1 Sessão de Tratamento Completo",
      imageUrl: "https://images.unsplash.com/photo-1607008829749-c0f284a49b23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      totalTickets: 100,
      soldTickets: 43,
      status: "ativo"
    },
    {
      id: "2",
      name: "Sorteio do Mês",
      description: "Todo mês sorteamos um prêmio especial entre nossos clientes!",
      pricePerTicket: 5,
      drawDate: "2025-05-31",
      prize: "Kit de Produtos Profissionais",
      imageUrl: "https://images.unsplash.com/photo-1621607510008-37244b057de7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      totalTickets: 200,
      soldTickets: 152,
      status: "ativo"
    },
    {
      id: "3",
      name: "Super Sorteio Anual",
      description: "O maior sorteio do ano com prêmios incríveis para nossos clientes!",
      pricePerTicket: 20,
      drawDate: "2025-12-20",
      prize: "1 Ano de Serviços Grátis",
      imageUrl: "https://images.unsplash.com/photo-1607462571650-e556ae4935cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      totalTickets: 500,
      soldTickets: 187,
      status: "ativo"
    }
  ]);

  const [selectedRifa, setSelectedRifa] = useState<RifaPromo | null>(null);
  const [tickets, setTickets] = useState<RifaTicket[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const selectRifa = (rifaId: string) => {
    const rifa = rifas.find(r => r.id === rifaId);
    if (rifa) {
      setSelectedRifa(rifa);
      
      // Gerar bilhetes para a rifa
      const generatedTickets: RifaTicket[] = [];
      for (let i = 1; i <= rifa.totalTickets; i++) {
        const number = i.toString().padStart(3, '0');
        const isReserved = i <= rifa.soldTickets;
        
        generatedTickets.push({
          id: `${rifaId}-${number}`,
          number,
          status: isReserved ? "pago" : "disponivel"
        });
      }
      
      setTickets(generatedTickets);
      setSelectedTickets([]);
    }
  };

  const toggleTicket = (number: string) => {
    if (selectedTickets.includes(number)) {
      setSelectedTickets(selectedTickets.filter(t => t !== number));
    } else {
      setSelectedTickets([...selectedTickets, number]);
    }
  };

  const reserveTickets = () => {
    if (!selectedRifa) return;
    
    if (selectedTickets.length === 0) {
      toast.error("Selecione pelo menos um bilhete");
      return;
    }
    
    if (!customerName || !customerEmail || !customerPhone) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    // Atualizar bilhetes
    const updatedTickets = tickets.map(ticket => {
      if (selectedTickets.includes(ticket.number)) {
        return {
          ...ticket,
          status: "reservado",
          owner: customerName,
          ownerEmail: customerEmail,
          ownerPhone: customerPhone
        };
      }
      return ticket;
    });
    
    // Atualizar rifa
    const updatedRifas = rifas.map(rifa => {
      if (rifa.id === selectedRifa.id) {
        return {
          ...rifa,
          soldTickets: rifa.soldTickets + selectedTickets.length
        };
      }
      return rifa;
    });
    
    setTickets(updatedTickets);
    setRifas(updatedRifas);
    setSelectedRifa(prev => prev ? {
      ...prev,
      soldTickets: prev.soldTickets + selectedTickets.length
    } : null);
    
    toast.success("Bilhetes reservados com sucesso!");
    setSelectedTickets([]);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
  };

  const createNewRifa = () => {
    const newId = (rifas.length + 1).toString();
    const newRifa: RifaPromo = {
      id: newId,
      name: "Nova Promoção",
      description: "Descrição da nova promoção",
      pricePerTicket: 10,
      drawDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias no futuro
      prize: "Prêmio a definir",
      imageUrl: "https://images.unsplash.com/photo-1607462571650-e556ae4935cf",
      totalTickets: 100,
      soldTickets: 0,
      status: "ativo"
    };
    
    setRifas([...rifas, newRifa]);
    toast.success("Nova rifa criada com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Ticket className="h-7 w-7" /> Rifa Online
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Gerencie rifas e promoções online para seus clientes
        </p>
      </header>

      <Tabs defaultValue="rifas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rifas">Rifas Ativas</TabsTrigger>
          <TabsTrigger value="management">Gerenciamento</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="rifas" className="space-y-6">
          {selectedRifa ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedRifa(null)}>
                  Voltar para lista
                </Button>
                <h2 className="text-2xl font-bold">{selectedRifa.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Selecione seus bilhetes</CardTitle>
                    <CardDescription>
                      Clique nos números para selecionar. Bilhetes em verde já foram vendidos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                      {tickets.map((ticket) => (
                        <button
                          key={ticket.id}
                          className={`
                            p-2 rounded-md text-center transition-colors
                            ${ticket.status === "disponivel" 
                              ? selectedTickets.includes(ticket.number)
                                ? "bg-blue-500 text-white hover:bg-blue-600" 
                                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700" 
                              : "bg-green-500 text-white cursor-not-allowed"}
                          `}
                          disabled={ticket.status !== "disponivel"}
                          onClick={() => toggleTicket(ticket.number)}
                        >
                          {ticket.number}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes da Rifa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <img 
                            src={selectedRifa.imageUrl} 
                            alt={selectedRifa.name} 
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-bold">{selectedRifa.name}</h3>
                          <p className="text-sm text-gray-500">{selectedRifa.description}</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Valor</p>
                            <p className="font-bold">R$ {selectedRifa.pricePerTicket.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Data do Sorteio</p>
                            <p className="font-bold flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(selectedRifa.drawDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500">Prêmio</p>
                          <p className="font-bold flex items-center gap-1">
                            <Gift className="h-4 w-4" />
                            {selectedRifa.prize}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Bilhetes</p>
                          <p className="font-medium">
                            {selectedRifa.soldTickets} / {selectedRifa.totalTickets} vendidos
                            <span className="ml-1 text-xs text-gray-500">
                              ({Math.round((selectedRifa.soldTickets / selectedRifa.totalTickets) * 100)}%)
                            </span>
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 dark:bg-gray-700">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${(selectedRifa.soldTickets / selectedRifa.totalTickets) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedTickets.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Reservar Bilhetes</CardTitle>
                        <CardDescription>
                          Bilhetes selecionados: {selectedTickets.length}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input 
                              id="name" 
                              placeholder="Seu nome completo" 
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="seu@email.com" 
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input 
                              id="phone" 
                              placeholder="(00) 00000-0000" 
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <p className="text-sm font-medium">Resumo</p>
                            <div className="flex justify-between mt-2">
                              <span>{selectedTickets.length} bilhete(s)</span>
                              <span className="font-bold">
                                R$ {(selectedTickets.length * selectedRifa.pricePerTicket).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={reserveTickets}
                          >
                            Reservar Agora
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rifas.filter(rifa => rifa.status === "ativo").map((rifa) => (
                <Card key={rifa.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={rifa.imageUrl} 
                      alt={rifa.name} 
                      className="w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{rifa.name}</CardTitle>
                    <CardDescription>{rifa.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Valor</span>
                        <span className="font-bold">R$ {rifa.pricePerTicket.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Data do Sorteio</span>
                        <span className="font-medium">{new Date(rifa.drawDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Prêmio</span>
                        <span className="font-medium">{rifa.prize}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bilhetes</span>
                          <span className="text-sm font-medium">
                            {rifa.soldTickets} / {rifa.totalTickets}
                            <span className="ml-1 text-xs text-gray-500">
                              ({Math.round((rifa.soldTickets / rifa.totalTickets) * 100)}%)
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 dark:bg-gray-700">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${(rifa.soldTickets / rifa.totalTickets) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => selectRifa(rifa.id)}>
                      Participar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Gerenciar Rifas</CardTitle>
                <Button onClick={createNewRifa}>Criar Nova Rifa</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rifas.map((rifa) => (
                  <div key={rifa.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 overflow-hidden rounded">
                        <img 
                          src={rifa.imageUrl} 
                          alt={rifa.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{rifa.name}</h3>
                        <p className="text-sm text-gray-500">
                          {rifa.soldTickets} / {rifa.totalTickets} bilhetes vendidos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          rifa.status === "ativo" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                          rifa.status === "encerrado" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" :
                          "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }
                      >
                        {rifa.status === "ativo" ? "Ativo" : 
                         rifa.status === "encerrado" ? "Encerrado" : 
                         "Sorteado"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => selectRifa(rifa.id)}>
                        Gerenciar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resultados dos Sorteios</CardTitle>
              <CardDescription>
                Veja os resultados de sorteios anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Os sorteios são realizados de forma transparente e os resultados são publicados aqui.
                </AlertDescription>
              </Alert>
              
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum sorteio realizado ainda</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Os resultados dos sorteios aparecerão aqui assim que forem realizados.
                  Fique de olho nas datas dos próximos sorteios!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RifaOnlinePage;
