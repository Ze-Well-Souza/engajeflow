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
      [_ in never]: never
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
