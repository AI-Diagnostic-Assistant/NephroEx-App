export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      analysis: {
        Row: {
          ckd_stage_prediction: number;
          created_at: string;
          id: number;
          probabilities: number[];
          user_id: string | null;
        };
        Insert: {
          ckd_stage_prediction: number;
          created_at?: string;
          id?: number;
          probabilities: number[];
          user_id?: string | null;
        };
        Update: {
          ckd_stage_prediction?: number;
          created_at?: string;
          id?: number;
          probabilities?: number[];
          user_id?: string | null;
        };
        Relationships: [];
      };
      explanation: {
        Row: {
          analysis_id: number | null;
          created_at: string;
          id: number;
          technique: Database["public"]["Enums"]["xai_technique"] | null;
          type: Database["public"]["Enums"]["xai_type"] | null;
        };
        Insert: {
          analysis_id?: number | null;
          created_at?: string;
          id?: number;
          technique?: Database["public"]["Enums"]["xai_technique"] | null;
          type?: Database["public"]["Enums"]["xai_type"] | null;
        };
        Update: {
          analysis_id?: number | null;
          created_at?: string;
          id?: number;
          technique?: Database["public"]["Enums"]["xai_technique"] | null;
          type?: Database["public"]["Enums"]["xai_type"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "Explanation_analysis_id_fkey";
            columns: ["analysis_id"];
            isOneToOne: false;
            referencedRelation: "analysis";
            referencedColumns: ["id"];
          },
        ];
      };
      masked_composite_image: {
        Row: {
          created_at: string;
          explanation_id: number | null;
          id: number;
          image_id: string | null;
        };
        Insert: {
          created_at?: string;
          explanation_id?: number | null;
          id?: number;
          image_id?: string | null;
        };
        Update: {
          created_at?: string;
          explanation_id?: number | null;
          id?: number;
          image_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "masked_composite_image_explanation_id_fkey";
            columns: ["explanation_id"];
            isOneToOne: false;
            referencedRelation: "explanation";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          full_name: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Insert: {
          id?: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Update: {
          id?: number;
          permission?: Database["public"]["Enums"]["app_permission"];
          role?: Database["public"]["Enums"]["app_role"];
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: {
          event: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      app_permission: "analysis.delete" | "analysis.insert" | "analysis.update";
      app_role: "admin" | "user";
      xai_technique: "Grad-CAM" | "LIME" | "LRP";
      xai_type: "Visual" | "Textual";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
