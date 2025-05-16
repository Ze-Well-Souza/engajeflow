
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Store, Bell, Shield, Database, Globe, Save } from "lucide-react";

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-2">
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-400 mb-2 px-4">CONFIGURAÇÕES</h3>
            
            <a href="#conta" className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white">
              <User className="h-4 w-4 mr-3" />
              Conta
            </a>
            
            <a href="#loja" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300">
              <Store className="h-4 w-4 mr-3" />
              Loja
            </a>
            
            <a href="#notificacoes" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300">
              <Bell className="h-4 w-4 mr-3" />
              Notificações
            </a>
            
            <a href="#seguranca" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300">
              <Shield className="h-4 w-4 mr-3" />
              Segurança
            </a>
            
            <a href="#integracao" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300">
              <Database className="h-4 w-4 mr-3" />
              Integração
            </a>
            
            <a href="#avancado" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 text-gray-300">
              <Settings className="h-4 w-4 mr-3" />
              Avançado
            </a>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="bg-gray-800 border-gray-700" id="conta">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Configurações de Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                      defaultValue="Administrador"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                      defaultValue="admin@techcare.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input 
                      type="tel" 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                      defaultValue="(11) 98765-4321"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-28 w-28 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    Alterar foto
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Idioma</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                  <option>Português (Brasil)</option>
                  <option>English (US)</option>
                  <option>Español</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700" id="loja">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2 text-green-500" />
                Configurações da Loja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Loja</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                  defaultValue="TechCare"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2" 
                  rows={3}
                  defaultValue="Sua loja completa de tecnologia e acessórios."
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Moeda</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                    <option>BRL (R$)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Formato de Data</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                    <option>DD/MM/AAAA</option>
                    <option>MM/DD/AAAA</option>
                    <option>AAAA-MM-DD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo da Loja</label>
                <div className="flex items-center mt-2">
                  <div className="h-16 w-16 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                    <Store className="h-8 w-8 text-gray-400" />
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    Fazer upload do logo
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700" id="notificacoes">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-500" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Notificações por e-mail</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Notificações no sistema</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
                  <span>Resumo diário de atividades</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Alertas de estoque baixo</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Novas vendas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
                  <span>Novidades e atualizações do sistema</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700" id="seguranca">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-500" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Alterar Senha</label>
                <input 
                  type="password" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 mb-2"
                  placeholder="Senha atual"
                />
                <input 
                  type="password" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 mb-2"
                  placeholder="Nova senha"
                />
                <input 
                  type="password" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                  placeholder="Confirmar nova senha"
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Autenticação de dois fatores</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
                  <span>Notificar sobre novos logins</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Exigir autenticação para ações sensíveis</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700" id="integracao">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-500" />
                Integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp Business API</h3>
                    <p className="text-xs text-gray-400">Integração para envio e recebimento de mensagens</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Conectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-800/30 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Gateway de Pagamento</h3>
                    <p className="text-xs text-gray-400">Processamento de pagamentos online</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Conectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-800/30 text-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Automação de Marketing</h3>
                    <p className="text-xs text-gray-400">Criação de campanhas automatizadas</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-800/30 text-gray-400 text-xs rounded-full border border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-800/30 text-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sistema de Logística</h3>
                    <p className="text-xs text-gray-400">Gerenciamento de envios e entregas</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-800/30 text-gray-400 text-xs rounded-full border border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Adicionar Nova Integração
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700" id="avancado">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-500" />
                Configurações Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Modo de manutenção</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span>Logs avançados</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
                  <span>Backup automático diário</span>
                </label>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Intervalo de sessão (minutos)</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                  defaultValue="30"
                />
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <button className="text-red-500 hover:text-red-400">
                  Resetar configurações
                </button>
                <button className="text-yellow-500 hover:text-yellow-400">
                  Limpar cache
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
