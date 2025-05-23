
import { supabase } from '@/integrations/supabase/client';
import { Professional, SalonService, Appointment } from '@/types/salon';

export class SalonService {
  // Profissionais
  static async getProfessionals(): Promise<Professional[]> {
    try {
      // Simular dados para demonstração
      return [
        {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@salon.com',
          phone: '(11) 99999-0001',
          specialty: 'Cabelo',
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Marina Costa',
          email: 'marina@salon.com',
          phone: '(11) 99999-0002',
          specialty: 'Unhas',
          active: true,
          created_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      throw error;
    }
  }

  static async createProfessional(professional: Omit<Professional, 'id' | 'created_at'>): Promise<Professional> {
    try {
      // Simular criação
      const newProfessional: Professional = {
        ...professional,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      };
      
      return newProfessional;
    } catch (error) {
      console.error('Erro ao criar profissional:', error);
      throw error;
    }
  }

  // Serviços
  static async getServices(): Promise<SalonService[]> {
    try {
      // Simular dados para demonstração
      return [
        {
          id: '1',
          name: 'Corte de Cabelo',
          description: 'Corte personalizado',
          duration: 60,
          price: 80,
          active: true,
          category: 'Cabelo'
        },
        {
          id: '2',
          name: 'Manicure',
          description: 'Cuidados com as unhas das mãos',
          duration: 45,
          price: 45,
          active: true,
          category: 'Unhas'
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  }

  // Agendamentos
  static async getAppointments(): Promise<Appointment[]> {
    try {
      // Simular dados para demonstração
      return [
        {
          id: '1',
          client_name: 'Maria Santos',
          client_phone: '(11) 98888-1111',
          client_email: 'maria@email.com',
          service_id: '1',
          professional_id: '1',
          scheduled_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
          created_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  }
}

export default SalonService;
