
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Shield, CheckCircle, XCircle, Smartphone, Key, QrCode, Copy, Download as DownloadIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MfaSetupPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("app");
  const [verificationCode, setVerificationCode] = useState("");
  const [appVerified, setAppVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [recoveryCodesVisible, setRecoveryCodesVisible] = useState(false);

  const handleVerifyApp = () => {
    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      setAppVerified(true);
      toast({
        title: "Autenticação verificada",
        description: "Autenticador configurado com sucesso!",
      });
      setStep(2);
    } else {
      toast({
        title: "Código inválido",
        description: "O código deve conter 6 dígitos",
        variant: "destructive",
      });
    }
  };

  const handleEnableAll = () => {
    toast({
      title: "MFA ativado com sucesso",
      description: "Sua conta agora está protegida com autenticação multi-fator!",
    });
    setStep(3);
  };

  const handleCopyRecoveryCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    toast({
      title: "Códigos copiados",
      description: "Códigos de recuperação copiados para a área de transferência",
    });
  };

  const handleDownloadRecoveryCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([recoveryCodes.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery-codes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const recoveryCodes = [
    "9F8A-B7C6-D5E4",
    "3F2E-1D0C-B9A8",
    "7H6G-5F4E-3D2C",
    "1B0A-9Z8Y-7X6W",
    "5U4T-3S2R-1Q0P",
    "9O8N-7M6L-5K4J",
    "3I2H-1G0F-E9D8",
    "7C6B-5A4Z-3Y2X",
    "1W0V-U9T8-S7R6",
    "5Q4P-3O2N-1M0L",
  ];

  return (
    <div className="container max-w-4xl py-10 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Configuração de Autenticação Multi-Fator (MFA)
        </h1>
        <p className="text-muted-foreground">
          Aumente a segurança da sua conta adicionando uma camada extra de proteção
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`border-l-4 ${step >= 1 ? "border-l-primary" : "border-l-muted"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
              Configurar Autenticador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure um aplicativo autenticador ou método alternativo para gerar códigos de verificação
            </p>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${step >= 2 ? "border-l-primary" : "border-l-muted"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
              Códigos de Recuperação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Salve códigos de recuperação para acessar sua conta caso perca o dispositivo autenticador
            </p>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${step >= 3 ? "border-l-primary" : "border-l-muted"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>
              Concluído
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              MFA ativado com sucesso. Sua conta está protegida com autenticação multi-fator
            </p>
          </CardContent>
        </Card>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Configurar Autenticador</CardTitle>
            <CardDescription>
              Escolha como deseja receber os códigos de verificação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="app">App Autenticador</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="app" className="space-y-4 mt-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <h3 className="font-medium">1. Escaneie o QR Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Use um aplicativo autenticador como Google Authenticator, Microsoft Authenticator ou Authy para escanear o QR code.
                    </p>
                    
                    <div className="bg-muted/30 p-6 rounded-md flex items-center justify-center">
                      <div className="w-48 h-48 bg-white p-2 rounded">
                        <QrCode className="w-full h-full text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono">JBSW Y3DP EHPK 3PXP</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => {
                        navigator.clipboard.writeText("JBSW Y3DP EHPK 3PXP");
                        toast({ title: "Chave copiada" });
                      }}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="font-medium">2. Digite o código de verificação</h3>
                    <p className="text-sm text-muted-foreground">
                      Abra seu aplicativo autenticador e digite o código de 6 dígitos mostrado para o site EngageFlow.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Input
                          placeholder="Código de 6 dígitos"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={6}
                        />
                        <Button onClick={handleVerifyApp}>Verificar</Button>
                      </div>
                      
                      {appVerified && (
                        <Alert className="bg-green-500/10 text-green-600 border-green-600/20">
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Verificado com sucesso!</AlertTitle>
                          <AlertDescription>
                            O aplicativo autenticador foi configurado corretamente.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sms" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Número de telefone</label>
                    <div className="flex gap-2">
                      <Input placeholder="+55 (11) 98765-4321" className="flex-1" />
                      <Button>Enviar código</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Um código de verificação será enviado para este número
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="h-px flex-1 bg-border"></div>
                    <span className="text-xs">Verificar código</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Input placeholder="Código de verificação" />
                    <Button variant="outline">Verificar</Button>
                  </div>
                  
                  <Alert variant="destructive" className="bg-yellow-500/10 text-yellow-600 border-yellow-600/20">
                    <Phone className="h-4 w-4" />
                    <AlertTitle>Apenas para demonstração</AlertTitle>
                    <AlertDescription>
                      A verificação por SMS está disponível apenas para contas empresariais.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Endereço de email</label>
                    <div className="flex gap-2">
                      <Input placeholder="usuario@exemplo.com" className="flex-1" />
                      <Button>Enviar código</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Um código de verificação será enviado para este email
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="h-px flex-1 bg-border"></div>
                    <span className="text-xs">Verificar código</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Input placeholder="Código de verificação" />
                    <Button variant="outline">Verificar</Button>
                  </div>
                  
                  <Alert variant="destructive" className="bg-yellow-500/10 text-yellow-600 border-yellow-600/20">
                    <Mail className="h-4 w-4" />
                    <AlertTitle>Apenas para demonstração</AlertTitle>
                    <AlertDescription>
                      A verificação por email está disponível apenas para contas empresariais.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              disabled={!appVerified}
              onClick={() => setStep(2)}
            >
              Continuar
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Códigos de Recuperação</CardTitle>
            <CardDescription>
              Guarde estes códigos em um local seguro. Eles podem ser usados para acessar sua conta caso você perca o acesso ao seu dispositivo de MFA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
                <Shield className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800 dark:text-amber-300">Importante</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  Cada código pode ser usado apenas uma vez. Guarde estes códigos em um local seguro mas acessível.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Seus códigos de recuperação</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 h-8"
                  onClick={() => setRecoveryCodesVisible(!recoveryCodesVisible)}
                >
                  {recoveryCodesVisible ? "Ocultar" : "Mostrar"} códigos
                </Button>
              </div>
              
              {recoveryCodesVisible && (
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    {recoveryCodes.map((code, index) => (
                      <div key={index} className="font-mono text-sm p-2 border border-dashed rounded">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleCopyRecoveryCodes}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar códigos
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownloadRecoveryCodes}>
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download TXT
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar
            </Button>
            <Button onClick={handleEnableAll}>
              Ativar MFA
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {step === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle>MFA Ativado com Sucesso</CardTitle>
            </div>
            <CardDescription>
              Sua conta agora está protegida com uma camada adicional de segurança
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-600/20">
                <h3 className="font-medium flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  MFA está ativo em sua conta
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agora você precisará inserir um código de verificação junto com sua senha ao fazer login
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Métodos de autenticação configurados</h3>
                
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Aplicativo Autenticador</p>
                      <p className="text-xs text-muted-foreground">Método principal</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-600/20">
                    Ativo
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Códigos de Recuperação</p>
                      <p className="text-xs text-muted-foreground">10 códigos restantes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-600/20">
                    Configurado
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Gerenciar configurações de MFA
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MfaSetupPage;
