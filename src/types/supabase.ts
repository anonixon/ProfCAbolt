export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          bio: string | null;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          bio?: string | null;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          bio?: string | null;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          email_notifications: boolean;
          marketing_emails: boolean;
          privacy_level: 'public' | 'private' | 'connections';
          theme: 'light' | 'dark' | 'system';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email_notifications?: boolean;
          marketing_emails?: boolean;
          privacy_level?: 'public' | 'private' | 'connections';
          theme?: 'light' | 'dark' | 'system';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email_notifications?: boolean;
          marketing_emails?: boolean;
          privacy_level?: 'public' | 'private' | 'connections';
          theme?: 'light' | 'dark' | 'system';
          created_at?: string;
          updated_at?: string;
        };
      };
      career_assessments: {
        Row: {
          id: string;
          user_id: string;
          answers: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          answers: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          answers?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      business_ideas: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          market_size: number;
          competition: string;
          required_skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          market_size: number;
          competition: string;
          required_skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          market_size?: number;
          competition?: string;
          required_skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 