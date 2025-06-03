
import { toast } from "sonner";
import { CacheEntry, CacheOptions, ICacheNode } from "./CacheEntry";

/**
 * Classe utilitária para operações do cache distribuído
 */
export class CacheOperations {
  /**
   * Notifica outros nós sobre operações no cache
   */
  static notifyOtherNodes(
    nodes: ICacheNode[],
    currentNodeId: string,
    operation: 'set' | 'delete' | 'clear', 
    key?: string, 
    entry?: CacheEntry<any>, 
    options?: { region?: string; tags?: string[] }
  ): void {
    // Em uma implementação real, isso usaria um mecanismo de mensagens
    // como Redis Pub/Sub, RabbitMQ, Kafka, ou mesmo webhooks diretos
    // para sincronizar alterações do cache entre os nós
    
    const activeNodes = nodes.filter(n => n.id !== currentNodeId && n.status === 'active');
    
    if (activeNodes.length === 0) {
      return;
    }

    console.log(`[Cache] Notificando ${activeNodes.length} nós sobre operação ${operation}`);
    
    // Atualizar o timestamp de sincronização dos nós
    setTimeout(() => {
      activeNodes.forEach(node => {
        node.lastSync = new Date();
      });
    }, 50);
  }

  /**
   * Adiciona um novo nó ao cluster de cache
   */
  static addNode(
    nodes: ICacheNode[],
    node: Omit<ICacheNode, 'id' | 'lastSync'>
  ): ICacheNode {
    const newNode: ICacheNode = {
      ...node,
      id: 'node-' + Math.floor(Math.random() * 10000),
      lastSync: new Date()
    };
    
    nodes.push(newNode);
    console.log(`[Cache] Novo nó adicionado: ${newNode.name} (${newNode.id})`);
    
    // Simular sincronização de cache para o novo nó
    setTimeout(() => {
      newNode.status = 'active';
      console.log(`[Cache] Nó ${newNode.id} sincronizado e ativo`);
      toast.success(`${newNode.name} foi sincronizado e está ativo agora`);
    }, 2000);
    
    return newNode;
  }

  /**
   * Remove um nó do cluster de cache
   */
  static removeNode(nodes: ICacheNode[], nodeId: string, currentNodeId: string): boolean {
    const index = nodes.findIndex(node => node.id === nodeId);
    
    if (index === -1) {
      return false;
    }
    
    // Não permitir remover o nó atual
    if (nodes[index].id === currentNodeId) {
      toast.error("Não é possível remover o nó atual do cluster");
      return false;
    }
    
    const removedNode = nodes.splice(index, 1)[0];
    console.log(`[Cache] Nó removido: ${removedNode.name} (${removedNode.id})`);
    
    toast.success(`${removedNode.name} foi removido do cluster`);
    
    return true;
  }

  /**
   * Simula falha em um nó do cluster
   */
  static simulateNodeFailure(nodes: ICacheNode[], nodeId: string, currentNodeId: string): boolean {
    const node = nodes.find(n => n.id === nodeId);
    
    if (!node) {
      return false;
    }
    
    // Não permitir simular falha no nó atual (por segurança)
    if (node.id === currentNodeId) {
      toast.error("Não é possível simular falha no nó atual");
      return false;
    }
    
    node.status = 'inactive';
    console.log(`[Cache] Simulada falha no nó: ${node.name} (${node.id})`);
    
    toast.info(`${node.name} está agora inativo`);
    
    return true;
  }

  /**
   * Recupera um nó com falha
   */
  static recoverNode(nodes: ICacheNode[], nodeId: string): boolean {
    const node = nodes.find(n => n.id === nodeId);
    
    if (!node || node.status !== 'inactive') {
      return false;
    }
    
    // Simular processo de sincronização
    node.status = 'syncing';
    console.log(`[Cache] Iniciando recuperação do nó: ${node.name} (${node.id})`);
    
    toast.info(`${node.name} está sincronizando...`);
    
    // Após um tempo, considerar o nó recuperado
    setTimeout(() => {
      node.status = 'active';
      node.lastSync = new Date();
      console.log(`[Cache] Nó recuperado: ${node.name} (${node.id})`);
      
      toast.success(`${node.name} foi sincronizado e está ativo novamente`);
    }, 3000);
    
    return true;
  }
}
