-- Migration: 20250522_05_salon_tables.sql
-- Descrição: Adiciona tabelas para o segmento de salão de beleza

-- Tabela de profissionais do salão
CREATE TABLE IF NOT EXISTS public.salon_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    bio TEXT,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de especialidades
CREATE TABLE IF NOT EXISTS public.salon_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de relação entre profissionais e especialidades
CREATE TABLE IF NOT EXISTS public.salon_professional_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES public.salon_professionals(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES public.salon_specialties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(professional_id, specialty_id)
);

-- Tabela de serviços oferecidos
CREATE TABLE IF NOT EXISTS public.salon_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de relação entre serviços e especialidades necessárias
CREATE TABLE IF NOT EXISTS public.salon_service_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES public.salon_services(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES public.salon_specialties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(service_id, specialty_id)
);

-- Tabela de horários de trabalho dos profissionais
CREATE TABLE IF NOT EXISTS public.salon_working_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES public.salon_professionals(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Tabela de folgas e férias dos profissionais
CREATE TABLE IF NOT EXISTS public.salon_time_off (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES public.salon_professionals(id) ON DELETE CASCADE,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT valid_date_range CHECK (start_date < end_date)
);

-- Tabela de configurações do salão
CREATE TABLE IF NOT EXISTS public.salon_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    business_hours JSONB NOT NULL DEFAULT '{
        "monday": {"open": "09:00", "close": "19:00"},
        "tuesday": {"open": "09:00", "close": "19:00"},
        "wednesday": {"open": "09:00", "close": "19:00"},
        "thursday": {"open": "09:00", "close": "19:00"},
        "friday": {"open": "09:00", "close": "19:00"},
        "saturday": {"open": "09:00", "close": "17:00"},
        "sunday": {"open": null, "close": null}
    }',
    interval_between_appointments INTEGER DEFAULT 0,
    max_concurrent_appointments INTEGER DEFAULT 10,
    reminder_hours_before INTEGER DEFAULT 24,
    second_reminder_hours_before INTEGER DEFAULT 3,
    allow_online_booking BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(client_id)
);

-- Tabela de agendamentos do salão
CREATE TABLE IF NOT EXISTS public.salon_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.salon_professionals(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.salon_services(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    confirmation_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT valid_appointment_time CHECK (start_time < end_time)
);

-- Tabela de histórico de agendamentos
CREATE TABLE IF NOT EXISTS public.salon_appointment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES public.salon_appointments(id) ON DELETE CASCADE,
    previous_status VARCHAR(20) NOT NULL,
    new_status VARCHAR(20) NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de templates de mensagens
CREATE TABLE IF NOT EXISTS public.salon_message_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    variables JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de registro de mensagens enviadas
CREATE TABLE IF NOT EXISTS public.salon_message_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.salon_appointments(id) ON DELETE SET NULL,
    template_id UUID REFERENCES public.salon_message_templates(id) ON DELETE SET NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    message_content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_salon_professionals_client_id ON public.salon_professionals(client_id);
CREATE INDEX IF NOT EXISTS idx_salon_specialties_client_id ON public.salon_specialties(client_id);
CREATE INDEX IF NOT EXISTS idx_salon_services_client_id ON public.salon_services(client_id);
CREATE INDEX IF NOT EXISTS idx_salon_working_hours_professional_id ON public.salon_working_hours(professional_id);
CREATE INDEX IF NOT EXISTS idx_salon_working_hours_day_of_week ON public.salon_working_hours(day_of_week);
CREATE INDEX IF NOT EXISTS idx_salon_time_off_professional_id ON public.salon_time_off(professional_id);
CREATE INDEX IF NOT EXISTS idx_salon_time_off_date_range ON public.salon_time_off(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_salon_appointments_client_id ON public.salon_appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_salon_appointments_professional_id ON public.salon_appointments(professional_id);
CREATE INDEX IF NOT EXISTS idx_salon_appointments_date ON public.salon_appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_salon_appointments_status ON public.salon_appointments(status);
CREATE INDEX IF NOT EXISTS idx_salon_message_logs_appointment_id ON public.salon_message_logs(appointment_id);
CREATE INDEX IF NOT EXISTS idx_salon_message_logs_status ON public.salon_message_logs(status);

-- Políticas RLS para salon_professionals
ALTER TABLE public.salon_professionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas profissionais de seus clientes"
ON public.salon_professionals FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_professionals.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar profissionais para seus clientes"
ON public.salon_professionals FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_professionals.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar profissionais de seus clientes"
ON public.salon_professionals FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_professionals.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para salon_services
ALTER TABLE public.salon_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas serviços de seus clientes"
ON public.salon_services FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_services.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar serviços para seus clientes"
ON public.salon_services FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_services.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar serviços de seus clientes"
ON public.salon_services FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_services.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para salon_appointments
ALTER TABLE public.salon_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas agendamentos de seus clientes"
ON public.salon_appointments FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_appointments.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar agendamentos para seus clientes"
ON public.salon_appointments FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_appointments.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar agendamentos de seus clientes"
ON public.salon_appointments FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = salon_appointments.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Função para verificar disponibilidade de horários
CREATE OR REPLACE FUNCTION public.check_salon_availability(
    p_client_id UUID,
    p_service_id UUID,
    p_date DATE,
    p_professional_id UUID DEFAULT NULL
)
RETURNS TABLE (
    professional_id UUID,
    professional_name TEXT,
    available_start_time TIME,
    available_end_time TIME
) AS $$
DECLARE
    v_service_duration INTEGER;
    v_service_specialty UUID;
BEGIN
    -- Obter duração do serviço
    SELECT duration_minutes INTO v_service_duration
    FROM public.salon_services
    WHERE id = p_service_id AND client_id = p_client_id;
    
    IF v_service_duration IS NULL THEN
        RAISE EXCEPTION 'Serviço não encontrado';
    END IF;
    
    -- Obter especialidade necessária para o serviço
    SELECT specialty_id INTO v_service_specialty
    FROM public.salon_service_specialties
    WHERE service_id = p_service_id
    LIMIT 1;
    
    RETURN QUERY
    WITH professional_hours AS (
        -- Horários de trabalho dos profissionais para o dia da semana
        SELECT 
            sp.id AS professional_id,
            sp.name AS professional_name,
            wh.start_time,
            wh.end_time
        FROM 
            public.salon_professionals sp
        JOIN 
            public.salon_working_hours wh ON sp.id = wh.professional_id
        LEFT JOIN
            public.salon_professional_specialties sps ON sp.id = sps.professional_id
        WHERE 
            sp.client_id = p_client_id
            AND sp.is_active = true
            AND wh.day_of_week = EXTRACT(DOW FROM p_date)
            AND wh.is_active = true
            AND (p_professional_id IS NULL OR sp.id = p_professional_id)
            AND (v_service_specialty IS NULL OR sps.specialty_id = v_service_specialty)
    ),
    time_offs AS (
        -- Folgas e férias dos profissionais
        SELECT 
            professional_id,
            start_date,
            end_date
        FROM 
            public.salon_time_off
        WHERE 
            p_date BETWEEN DATE(start_date) AND DATE(end_date)
            AND (p_professional_id IS NULL OR professional_id = p_professional_id)
    ),
    existing_appointments AS (
        -- Agendamentos existentes
        SELECT 
            professional_id,
            start_time,
            end_time
        FROM 
            public.salon_appointments
        WHERE 
            appointment_date = p_date
            AND status IN ('pending', 'confirmed')
            AND (p_professional_id IS NULL OR professional_id = p_professional_id)
    ),
    available_slots AS (
        -- Slots disponíveis considerando horário de trabalho, folgas e agendamentos existentes
        SELECT 
            ph.professional_id,
            ph.professional_name,
            ph.start_time,
            ph.end_time
        FROM 
            professional_hours ph
        LEFT JOIN
            time_offs t ON ph.professional_id = t.professional_id
        WHERE
            t.professional_id IS NULL -- Sem folgas neste dia
    )
    SELECT 
        as_prof.professional_id,
        as_prof.professional_name,
        time_slot.start_time AS available_start_time,
        (time_slot.start_time + (v_service_duration || ' minutes')::interval)::TIME AS available_end_time
    FROM 
        available_slots as_prof,
        -- Gerar slots de 30 minutos dentro do horário de trabalho
        generate_series(
            as_prof.start_time, 
            (as_prof.end_time - (v_service_duration || ' minutes')::interval)::TIME, 
            '30 minutes'::interval
        ) AS time_slot(start_time)
    WHERE
        -- Verificar se o slot não conflita com agendamentos existentes
        NOT EXISTS (
            SELECT 1
            FROM existing_appointments ea
            WHERE 
                ea.professional_id = as_prof.professional_id
                AND (
                    (time_slot.start_time, (time_slot.start_time + (v_service_duration || ' minutes')::interval)::TIME) OVERLAPS 
                    (ea.start_time, ea.end_time)
                )
        )
    ORDER BY
        as_prof.professional_name,
        time_slot.start_time;
END;
$$ LANGUAGE plpgsql;
