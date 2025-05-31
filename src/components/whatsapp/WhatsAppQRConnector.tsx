
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  MessageCircle
} from 'lucide-react';

interface WhatsAppQRConnectorProps {
  onConnectionChange?: (connected: boolean) => void;
}

const WhatsAppQRConnector: React.FC<WhatsAppQRConnectorProps> = ({ onConnectionChange }) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Mock QR Code generation
  const generateQRCode = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    
    // Simula geração de QR Code
    setTimeout(() => {
      const mockQR = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ENGAJEFLOW_WA_${Date.now()}`;
      setQrCode(mockQR);
      setIsLoading(false);
    }, 2000);
  };

  // Mock connection check
  useEffect(() => {
    if (connectionStatus === 'connecting') {
      const timer = setTimeout(() => {
        const connected = Math.random() > 0.3; // 70% chance de conectar
        setIsConnected(connected);
        setConnectionStatus(connected ? 'connected' : 'disconnected');
        if (onConnectionChange) {
          onConnectionChange(connected);
        }
      }, 10000); // Simula 10 segundos para conectar

      return () => clearTimeout(timer);
    }
  }, [connectionStatus, onConnectionChange]);

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setQrCode('');
    if (onConnectionChange) {
      onConnectionChange(false);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected': 
        return <Badge className="bg-green-600 text-white">Conectado</Badge>;
      case 'connecting': 
        return <Badge className="bg-yellow-600 text-white">Conectando...</Badge>;
      default: 
        return <Badge variant="outline" className="border-gray-600 text-gray-500">Desconectado</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className={`h-5 w-5 ${getStatusColor()}`} />
          WhatsApp Pessoal
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-600/10 rounded-full">
                <QrCode className="h-8 w-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Conectar WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  Escaneie o QR Code com seu WhatsApp para conectar sua conta pessoal
                </p>
              </div>

              {!qrCode && !isLoading && (
                <Button onClick={generateQRCode} className="w-full bg-green-600 hover:bg-green-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Gerar QR Code
                </Button>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin text-green-600" />
                  <span className="ml-2 text-sm">Gerando QR Code...</span>
                </div>
              )}

              {qrCode && connectionStatus !== 'connected' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <img 
                      src={qrCode} 
                      alt="QR Code WhatsApp" 
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Smartphone className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-800">
                        <strong>Como conectar:</strong>
                        <ol className="list-decimal list-inside mt-1 space-y-1">
                          <li>Abra o WhatsApp no seu celular</li>
                          <li>Vá em Configurações → Aparelhos conectados</li>
                          <li>Toque em "Conectar um aparelho"</li>
                          <li>Escaneie este QR Code</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {connectionStatus === 'connecting' && (
                    <div className="flex items-center justify-center gap-2 text-yellow-600">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Aguardando conexão...</span>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={generateQRCode} 
                    className="w-full"
                    disabled={isLoading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Gerar Novo QR
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-600/10 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 mb-2">WhatsApp Conectado!</h3>
              <p className="text-sm text-muted-foreground">
                Sua conta pessoal do WhatsApp foi conectada com sucesso. 
                Agora você pode enviar mensagens automatizadas.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-800 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Pronto para automação de mensagens</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              Desconectar WhatsApp
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppQRConnector;
