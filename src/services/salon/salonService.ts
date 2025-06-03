
import { supabase } from '@/integrations/supabase/client';
import { Professional } from '@/types/salon';

interface CreateProfessionalData {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  active: boolean;
}

export class SalonService {
  static async getProfessionals(): Promise<Professional[]> {
    try {
      // Simular dados para desenvolvimento
      return [
        {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@exemplo.com',
          phone: '(11) 99999-9999',
          specialty: 'Cabelo',
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@exemplo.com',
          phone: '(11) 88888-8888',
          specialty: 'Unhas',
          active: true,
          created_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      return [];
    }
  }

  static async createProfessional(data: CreateProfessionalData): Promise<Professional> {
    try {
      // Simular criação
      const newProfessional: Professional = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialty: data.specialty,
        active: data.active,
        created_at: new Date().toISOString()
      };

      return newProfessional;
    } catch (error) {
      console.error('Erro ao criar profissional:', error);
      throw error;
    }
  }

  static async updateProfessional(id: string, data: Partial<CreateProfessionalData>): Promise<Professional> {
    try {
      // Simular atualização
      const updatedProfessional: Professional = {
        id,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        specialty: data.specialty || '',
        active: data.active || true,
        created_at: new Date().toISOString()
      };

      return updatedProfessional;
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      throw error;
    }
  }

  static async deleteProfessional(id: string): Promise<void> {
    try {
      // Simular exclusão
      console.log('Profissional excluído:', id);
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      throw error;
    }
  }
}

export default SalonService;
