
export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  active: boolean;
  created_at: string;
}

export interface Specialty {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  created_at: string;
}

export interface SalonService {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
  active: boolean;
  category: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  service_id: string;
  professional_id: string;
  scheduled_date: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  isActive: boolean;
  profile_picture_url?: string;
  profilePictureUrl?: string;
}
