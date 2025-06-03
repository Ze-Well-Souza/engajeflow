export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          details: string | null
          id: string
          ip: string
          metadata: Json | null
          module: string
          status: string
          timestamp: string
          user_email: string
        }
        Insert: {
          action: string
          details?: string | null
          id?: string
          ip: string
          metadata?: Json | null
          module: string
          status: string
          timestamp?: string
          user_email: string
        }
        Update: {
          action?: string
          details?: string | null
          id?: string
          ip?: string
          metadata?: Json | null
          module?: string
          status?: string
          timestamp?: string
          user_email?: string
        }
        Relationships: []
      }
      automation_tasks: {
        Row: {
          client_id: string
          created_at: string | null
          error_message: string | null
          executed_at: string | null
          id: string
          parameters: Json | null
          result: Json | null
          scheduled_for: string | null
          status: string
          task_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          parameters?: Json | null
          result?: Json | null
          scheduled_for?: string | null
          status?: string
          task_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          parameters?: Json | null
          result?: Json | null
          scheduled_for?: string | null
          status?: string
          task_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_templates: {
        Row: {
          client_id: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parameters: Json | null
          task_type: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parameters?: Json | null
          task_type: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parameters?: Json | null
          task_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_templates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_members: {
        Row: {
          client_id: string
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_permissions: {
        Row: {
          client_id: string
          created_at: string
          granted_by: string | null
          id: string
          permission_id: number
        }
        Insert: {
          client_id: string
          created_at?: string
          granted_by?: string | null
          id?: string
          permission_id: number
        }
        Update: {
          client_id?: string
          created_at?: string
          granted_by?: string | null
          id?: string
          permission_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "client_permissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          document: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          plan_id: number | null
          status: string | null
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          document?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          plan_id?: number | null
          status?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          document?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          plan_id?: number | null
          status?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      media_edits: {
        Row: {
          created_at: string
          edit_data: Json
          edit_order: number
          edit_type: string
          id: string
          media_id: string
        }
        Insert: {
          created_at?: string
          edit_data: Json
          edit_order: number
          edit_type: string
          id?: string
          media_id: string
        }
        Update: {
          created_at?: string
          edit_data?: Json
          edit_order?: number
          edit_type?: string
          id?: string
          media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_edits_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "social_media"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          metric_type: string
          period_end: string
          period_start: string
          value: number
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          period_end: string
          period_start: string
          value: number
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          period_end?: string
          period_start?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "metrics_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          description: string | null
          id: number
          module_id: string | null
        }
        Insert: {
          action: string
          description?: string | null
          id?: number
          module_id?: string | null
        }
        Update: {
          action?: string
          description?: string | null
          id?: number
          module_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json
          id: number
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json
          id?: number
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json
          id?: number
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          client_id: string
          created_at: string | null
          expires_at: string | null
          file_path: string | null
          id: string
          parameters: Json | null
          report_type: string
          status: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expires_at?: string | null
          file_path?: string | null
          id?: string
          parameters?: Json | null
          report_type: string
          status?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expires_at?: string | null
          file_path?: string | null
          id?: string
          parameters?: Json | null
          report_type?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_appointment_history: {
        Row: {
          appointment_id: string
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: string
          previous_status: string
          reason: string | null
        }
        Insert: {
          appointment_id: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status: string
          previous_status: string
          reason?: string | null
        }
        Update: {
          appointment_id?: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: string
          previous_status?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_appointment_history_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "salon_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_appointments: {
        Row: {
          appointment_date: string
          client_id: string
          confirmation_sent: boolean | null
          created_at: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string
          end_time: string
          id: string
          notes: string | null
          professional_id: string
          reminder_sent: boolean | null
          service_id: string
          start_time: string
          status: string
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          client_id: string
          confirmation_sent?: boolean | null
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          end_time: string
          id?: string
          notes?: string | null
          professional_id: string
          reminder_sent?: boolean | null
          service_id: string
          start_time: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          client_id?: string
          confirmation_sent?: boolean | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          end_time?: string
          id?: string
          notes?: string | null
          professional_id?: string
          reminder_sent?: boolean | null
          service_id?: string
          start_time?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "salon_professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "salon_services"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_message_logs: {
        Row: {
          appointment_id: string | null
          client_id: string
          created_at: string | null
          error_message: string | null
          id: string
          message_content: string
          recipient_phone: string
          sent_at: string | null
          status: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          client_id: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          message_content: string
          recipient_phone: string
          sent_at?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          client_id?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          message_content?: string
          recipient_phone?: string
          sent_at?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_message_logs_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "salon_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_message_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_message_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "salon_message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_message_templates: {
        Row: {
          client_id: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_message_templates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_professional_specialties: {
        Row: {
          created_at: string | null
          id: string
          professional_id: string
          specialty_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          professional_id: string
          specialty_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          professional_id?: string
          specialty_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_professional_specialties_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "salon_professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_professional_specialties_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "salon_specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_professionals: {
        Row: {
          bio: string | null
          client_id: string
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          profile_image_url: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          client_id: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          client_id?: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_professionals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_service_specialties: {
        Row: {
          created_at: string | null
          id: string
          service_id: string
          specialty_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id: string
          specialty_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string
          specialty_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_service_specialties_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "salon_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_service_specialties_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "salon_specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_services: {
        Row: {
          client_id: string
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_services_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_settings: {
        Row: {
          allow_online_booking: boolean | null
          business_hours: Json
          client_id: string
          created_at: string | null
          id: string
          interval_between_appointments: number | null
          max_concurrent_appointments: number | null
          reminder_hours_before: number | null
          second_reminder_hours_before: number | null
          updated_at: string | null
        }
        Insert: {
          allow_online_booking?: boolean | null
          business_hours?: Json
          client_id: string
          created_at?: string | null
          id?: string
          interval_between_appointments?: number | null
          max_concurrent_appointments?: number | null
          reminder_hours_before?: number | null
          second_reminder_hours_before?: number | null
          updated_at?: string | null
        }
        Update: {
          allow_online_booking?: boolean | null
          business_hours?: Json
          client_id?: string
          created_at?: string | null
          id?: string
          interval_between_appointments?: number | null
          max_concurrent_appointments?: number | null
          reminder_hours_before?: number | null
          second_reminder_hours_before?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_settings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_specialties: {
        Row: {
          client_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_specialties_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_time_off: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          professional_id: string
          reason: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          professional_id: string
          reason?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          professional_id?: string
          reason?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_time_off_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "salon_professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_working_hours: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          professional_id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          professional_id: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          professional_id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_working_hours_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "salon_professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          caption: string | null
          client_id: string
          created_at: string
          error_message: string | null
          hashtags: string[] | null
          id: string
          integration_id: string | null
          media_id: string
          metadata: Json | null
          platform: string
          platform_post_id: string | null
          post_url: string | null
          scheduled_for: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          client_id: string
          created_at?: string
          error_message?: string | null
          hashtags?: string[] | null
          id?: string
          integration_id?: string | null
          media_id: string
          metadata?: Json | null
          platform: string
          platform_post_id?: string | null
          post_url?: string | null
          scheduled_for: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          caption?: string | null
          client_id?: string
          created_at?: string
          error_message?: string | null
          hashtags?: string[] | null
          id?: string
          integration_id?: string | null
          media_id?: string
          metadata?: Json | null
          platform?: string
          platform_post_id?: string | null
          post_url?: string | null
          scheduled_for?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_posts_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "social_integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_posts_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "social_media"
            referencedColumns: ["id"]
          },
        ]
      }
      social_integrations: {
        Row: {
          access_token: string | null
          client_id: string
          created_at: string
          id: string
          metadata: Json | null
          platform: string
          platform_user_id: string | null
          refresh_token: string | null
          status: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          client_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          platform: string
          platform_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          client_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          platform?: string
          platform_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_integrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          dimensions: Json | null
          duration: number | null
          id: string
          media_type: string
          metadata: Json | null
          original_filename: string | null
          size: number | null
          storage_path: string
          thumbnail_path: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          duration?: number | null
          id?: string
          media_type: string
          metadata?: Json | null
          original_filename?: string | null
          size?: number | null
          storage_path: string
          thumbnail_path?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          duration?: number | null
          id?: string
          media_type?: string
          metadata?: Json | null
          original_filename?: string | null
          size?: number | null
          storage_path?: string
          thumbnail_path?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_salon_availability: {
        Args: {
          p_client_id: string
          p_service_id: string
          p_date: string
          p_professional_id?: string
        }
        Returns: {
          professional_id: string
          professional_name: string
          available_start_time: string
          available_end_time: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
