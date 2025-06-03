
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import PaymentForm from "@/components/store/payment/PaymentForm";
import PaymentOrderSummary from "@/components/store/payment/PaymentOrderSummary";
import StripeCheckoutButton from "@/components/store/payment/StripeCheckoutButton";
import { toast } from "sonner";

const PaymentTestPage = () => {
  const [amount, setAmount] = useState(9990); // R$ 99,90
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Converter para centavos
    const value = e.target.value.replace(/\D/g, '');
    setAmount(parseInt(value || "0") * 100);
  };
  
  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    toast.success("Pagamento processado com sucesso!");
    setTimeout(() => setPaymentComplete(false), 5000);
  };
  
  const orderItems = [
    { id: '1', name: 'Produto Teste', quantity: 1, price: amount }
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Teste de Pagamentos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {paymentComplete ? (
            <Card className="w-full h-full flex items-center justify-center">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Pagamento Concluído</h2>
                <p className="text-muted-foreground mb-4">
                  Seu pagamento foi processado com sucesso!
                </p>
                <Button onClick={() => setPaymentComplete(false)}>Fazer Novo Pagamento</Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="integrado">
              <TabsList className="mb-4">
                <TabsTrigger value="integrado">Formulário Integrado</TabsTrigger>
                <TabsTrigger value="stripe">Stripe Checkout</TabsTrigger>
                <TabsTrigger value="personalizado">Valor Personalizado</TabsTrigger>
              </TabsList>
              
              <TabsContent value="integrado">
                <PaymentForm 
                  amount={amount}
                  title="Teste de Pagamento"
                  description="Use este formulário para testar o processamento de pagamentos"
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => toast.info("Pagamento cancelado")}
                />
              </TabsContent>
              
              <TabsContent value="stripe">
                <Card>
                  <CardHeader>
                    <CardTitle>Teste Stripe Checkout</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <p className="text-center text-muted-foreground">
                      Clique no botão abaixo para testar o redirecionamento para o Stripe Checkout
                    </p>
                    <StripeCheckoutButton 
                      productName="Produto Teste"
                      amount={amount}
                      size="lg"
                      className="w-full max-w-xs"
                      onSuccess={handlePaymentSuccess}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personalizado">
                <Card>
                  <CardHeader>
                    <CardTitle>Valor Personalizado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="custom-amount">Valor do Pagamento (R$)</Label>
                      <Input
                        id="custom-amount"
                        type="text"
                        placeholder="99,90"
                        onChange={handleCustomAmount}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-4 pt-4">
                      <Button onClick={() => setAmount(5000)}>R$ 50,00</Button>
                      <Button onClick={() => setAmount(10000)}>R$ 100,00</Button>
                      <Button onClick={() => setAmount(25000)}>R$ 250,00</Button>
                      <Button onClick={() => setAmount(50000)}>R$ 500,00</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <div>
          <PaymentOrderSummary 
            items={orderItems}
            subtotal={amount}
            shipping={0}
            discount={0}
            tax={0}
          />
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Informações do Teste</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <p className="mb-2">Este é um ambiente de teste, nenhum pagamento real será processado.</p>
                <p>Para testar o cartão de crédito, use:</p>
                <ul className="list-disc pl-4 pt-1 space-y-1">
                  <li>Número: 4242 4242 4242 4242</li>
                  <li>Validade: qualquer data futura</li>
                  <li>CVC: qualquer 3 dígitos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTestPage;
