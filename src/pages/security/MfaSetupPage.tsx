
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  Check, 
  AlertTriangle, 
  ScanLine,
  MailQuestion,
  RefreshCw
} from "lucide-react";

const MfaSetupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("app");
  const [verificationCode, setVerificationCode] = useState("");
  const [setupStep, setSetupStep] = useState("setup"); // setup, verify, success

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSetupStep("setup");
    setVerificationCode("");
  };

  const handleVerifyCode = () => {
    // Simulação de verificação
    if (verificationCode.length === 6) {
      setSetupStep("success");
    }
  };

  const renderSetupContent = () => {
    switch (activeTab) {
      case "app":
        return <AppAuthenticatorSetup onVerify={() => setSetupStep("verify")} />;
      case "sms":
        return <SmsAuthenticatorSetup onVerify={() => setSetupStep("verify")} />;
      case "email":
        return <EmailAuthenticatorSetup onVerify={() => setSetupStep("verify")} />;
      case "security-key":
        return <SecurityKeySetup onVerify={() => setSetupStep("verify")} />;
      default:
        return <AppAuthenticatorSetup onVerify={() => setSetupStep("verify")} />;
    }
  };

  const renderVerificationContent = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verificar configuração</CardTitle>
          <CardDescription>
            Digite o código gerado pelo seu dispositivo de autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="verification-code" className="text-sm font-medium">
              Código de verificação
            </label>
            <Input
              id="verification-code"
              placeholder="Digite o código de 6 dígitos"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-wider font-mono"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleVerifyCode} 
            className="w-full"
            disabled={verificationCode.length !== 6}
          >
            Verificar
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderSuccessContent = () => {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center">Configuração bem-sucedida!</CardTitle>
          <CardDescription className="text-center">
            A autenticação de dois fatores foi configurada com sucesso para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Próximos passos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Mantenha seus códigos de backup em um local seguro</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Configure um segundo método de autenticação (recomendado)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Revise as configurações de sua conta regularmente</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("app")}>
            Configurar outro método
          </Button>
          <Button>Concluir</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="text-primary" />
          Autenticação Multifator
        </h1>
        <p className="text-muted-foreground">
          Configure um método adicional de autenticação para aumentar a segurança da sua conta
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-400">Por que ativar MFA?</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              A autenticação multifator adiciona uma camada extra de segurança à sua conta, exigindo um segundo método de verificação além da senha. Isso dificulta significativamente o acesso não autorizado, mesmo se suas credenciais forem comprometidas.
            </p>
          </div>
        </div>
      </div>

      {setupStep === "setup" && (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="app" className="flex flex-col items-center py-2">
              <Smartphone className="h-4 w-4 mb-1" />
              <span>App</span>
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex flex-col items-center py-2">
              <Mail className="h-4 w-4 mb-1" />
              <span>SMS</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex flex-col items-center py-2">
              <MailQuestion className="h-4 w-4 mb-1" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="security-key" className="flex flex-col items-center py-2">
              <Key className="h-4 w-4 mb-1" />
              <span>Chave</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {renderSetupContent()}
          </TabsContent>
        </Tabs>
      )}

      {setupStep === "verify" && renderVerificationContent()}
      {setupStep === "success" && renderSuccessContent()}
      
      <Card>
        <CardHeader>
          <CardTitle>Métodos de autenticação ativos</CardTitle>
          <CardDescription>
            Métodos de autenticação adicional configurados para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Google Authenticator</div>
                  <div className="text-sm text-muted-foreground">Adicionado em 12/03/2025</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="17" 
                    height="17" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-red-500"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Códigos de recuperação</CardTitle>
          <CardDescription>
            Utilize estes códigos únicos para acessar sua conta caso não tenha acesso ao seu dispositivo de autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {["ABCD-1234", "EFGH-5678", "IJKL-9012", "MNOP-3456", "QRST-7890"].map((code, index) => (
              <div key={index} className="bg-muted p-2 rounded text-center font-mono">
                {code}
              </div>
            ))}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md p-3 text-sm text-amber-700 dark:text-amber-300">
            Importante: Guarde estes códigos em um local seguro, pois eles são necessários caso você perca acesso ao seu dispositivo de autenticação.
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Gerar novos códigos
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar códigos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface AuthenticatorSetupProps {
  onVerify: () => void;
}

const AppAuthenticatorSetup: React.FC<AuthenticatorSetupProps> = ({ onVerify }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar aplicativo autenticador</CardTitle>
        <CardDescription>
          Use um aplicativo como Google Authenticator, Microsoft Authenticator ou Authy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="p-1 border rounded-md">
            {/* Placeholder para QR code */}
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
              <ScanLine className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Código alternativo</h3>
          <div className="p-2 bg-muted rounded text-center font-mono tracking-wider">
            JBSWY3DPEHPK3PXP
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Instruções:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Instale um aplicativo autenticador no seu dispositivo móvel.</li>
            <li>No aplicativo, escaneie o QR code acima ou insira o código manualmente.</li>
            <li>O aplicativo irá gerar um código de 6 dígitos que muda a cada 30 segundos.</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onVerify} className="w-full">
          Continuar para verificação
        </Button>
      </CardFooter>
    </Card>
  );
};

const SmsAuthenticatorSetup: React.FC<AuthenticatorSetupProps> = ({ onVerify }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar SMS</CardTitle>
        <CardDescription>
          Receba códigos de verificação via SMS no seu celular
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone-number" className="text-sm font-medium">
            Número de telefone
          </label>
          <Input
            id="phone-number"
            placeholder="+55 (11) 98765-4321"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Digite o número com código do país (ex: +55 para Brasil)
          </p>
        </div>

        <div className="bg-muted p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Observações importantes:</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>Podem ser aplicadas taxas de mensagem padrão.</li>
            <li>O SMS pode não estar disponível em todas as regiões.</li>
            <li>É recomendável ter um método secundário configurado.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button 
          onClick={onVerify} 
          disabled={!phoneNumber.length}
        >
          Enviar código
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmailAuthenticatorSetup: React.FC<AuthenticatorSetupProps> = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar email</CardTitle>
        <CardDescription>
          Receba códigos de verificação via email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email-address" className="text-sm font-medium">
            Endereço de email
          </label>
          <Input
            id="email-address"
            placeholder="seu-email@exemplo.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="bg-muted p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Observações importantes:</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>Use um endereço de email diferente da sua conta principal para maior segurança.</li>
            <li>Certifique-se de que o email não está configurado para receber em seu dispositivo principal.</li>
            <li>Verifique sua pasta de spam caso não receba o código.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button 
          onClick={onVerify} 
          disabled={!email.length}
        >
          Enviar código
        </Button>
      </CardFooter>
    </Card>
  );
};

const SecurityKeySetup: React.FC<AuthenticatorSetupProps> = ({ onVerify }) => {
  const [keyName, setKeyName] = useState("");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar chave de segurança</CardTitle>
        <CardDescription>
          Use uma chave de segurança física como YubiKey ou outro dispositivo compatível com FIDO2/WebAuthn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="key-name" className="text-sm font-medium">
            Nome da chave
          </label>
          <Input
            id="key-name"
            placeholder="Ex: YubiKey Pessoal"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Dê um nome que ajude a identificar esta chave no futuro
          </p>
        </div>

        <div className="p-4 border-2 border-dashed rounded-md text-center">
          <Key className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Pressione o botão abaixo para iniciar o registro e conecte sua chave de segurança quando solicitado
          </p>
        </div>

        <div className="bg-muted p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Informações:</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>É necessário ter um dispositivo compatível com WebAuthn/FIDO2.</li>
            <li>Seu navegador deve suportar WebAuthn (Chrome, Firefox, Edge, Safari).</li>
            <li>Recomendamos registrar mais de uma chave como backup.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button 
          onClick={onVerify} 
          disabled={!keyName.length}
        >
          Registrar chave
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MfaSetupPage;
