
import { QueueStats } from './types';

/**
 * Classe responsável por gerenciar as estatísticas da fila
 */
export class QueueStatistics {
  private waitTimes: number[] = [];
  private processTimes: number[] = [];
  
  /**
   * Adiciona um tempo de espera à estatística
   * @param waitTime Tempo de espera em milissegundos
   */
  public addWaitTime(waitTime: number): void {
    this.waitTimes.push(waitTime);
    
    // Limite o histórico de tempos para evitar consumo excessivo de memória
    if (this.waitTimes.length > 100) {
      this.waitTimes.shift();
    }
  }
  
  /**
   * Adiciona um tempo de processamento à estatística
   * @param processTime Tempo de processamento em milissegundos
   */
  public addProcessTime(processTime: number): void {
    this.processTimes.push(processTime);
    
    // Limite o histórico de tempos para evitar consumo excessivo de memória
    if (this.processTimes.length > 100) {
      this.processTimes.shift();
    }
  }
  
  /**
   * Calcula o tempo médio de espera
   */
  public getAverageWaitTime(): number {
    return this.waitTimes.length > 0 
      ? this.waitTimes.reduce((a, b) => a + b, 0) / this.waitTimes.length 
      : 0;
  }
  
  /**
   * Calcula o tempo médio de processamento
   */
  public getAverageProcessTime(): number {
    return this.processTimes.length > 0 
      ? this.processTimes.reduce((a, b) => a + b, 0) / this.processTimes.length 
      : 0;
  }
}
