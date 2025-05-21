
import { ICacheNode } from './types';

/**
 * Gerenciador de nós do cache distribuído
 */
export class NodeManager {
  private nodes: ICacheNode[] = [];

  constructor() {
    // Inicializar com um nó padrão
    this.nodes.push({
      id: 'primary',
      name: 'Primary Node',
      url: 'localhost',
      status: 'active',
      priority: 1,
      lastSync: new Date()
    });
  }

  /**
   * Adiciona um nó ao cluster de cache
   */
  public addNode(node: Omit<ICacheNode, 'lastSync'>): void {
    const newNode: ICacheNode = {
      ...node,
      lastSync: new Date()
    };

    this.nodes.push(newNode);
    console.log(`[NodeManager] Nó adicionado ao cluster: ${node.name}`);
  }

  /**
   * Remove um nó do cluster
   */
  public removeNode(id: string): boolean {
    const initialLength = this.nodes.length;
    this.nodes = this.nodes.filter(node => node.id !== id);

    const removed = this.nodes.length < initialLength;
    if (removed) {
      console.log(`[NodeManager] Nó removido do cluster: ${id}`);
    }

    return removed;
  }

  /**
   * Obtém todos os nós do cluster
   */
  public getNodes(): ICacheNode[] {
    return [...this.nodes];
  }

  /**
   * Simula a falha de um nó para testes
   */
  public simulateNodeFailure(id: string): boolean {
    const node = this.nodes.find(node => node.id === id);
    if (node) {
      node.status = 'inactive';
      console.log(`[NodeManager] Nó ${id} marcado como inativo`);
      return true;
    }
    return false;
  }

  /**
   * Recupera um nó que estava inativo
   */
  public recoverNode(id: string): boolean {
    const node = this.nodes.find(node => node.id === id);
    if (node && node.status === 'inactive') {
      node.status = 'active';
      node.lastSync = new Date();
      console.log(`[NodeManager] Nó ${id} recuperado para status ativo`);
      return true;
    }
    return false;
  }

  /**
   * Sincroniza o cache entre os nós
   */
  public syncNodes(): boolean {
    // Implementação simulada de sincronização
    this.nodes.forEach(node => {
      if (node.status === 'active' && node.id !== 'primary') {
        node.lastSync = new Date();
      }
    });

    console.log('[NodeManager] Sincronização de nós concluída');
    return true;
  }
}
