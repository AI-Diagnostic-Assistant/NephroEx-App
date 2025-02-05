export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      analysis: {
        Row: {
          category: Database["public"]["Enums"]["analysis_category"]
          created_at: string
          id: string
          report_id: number | null
          roi_activity: number[] | null
        }
        Insert: {
          category: Database["public"]["Enums"]["analysis_category"]
          created_at?: string
          id?: string
          report_id?: number | null
          roi_activity?: number[] | null
        }
        Update: {
          category?: Database["public"]["Enums"]["analysis_category"]
          created_at?: string
          id?: string
          report_id?: number | null
          roi_activity?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "report"
            referencedColumns: ["id"]
          },
        ]
      }
      classification: {
        Row: {
          analysis_id: string | null
          confidence: number
          created_at: string
          id: string
          prediction: Database["public"]["Enums"]["health_status"]
          type: Database["public"]["Enums"]["classification_type"]
        }
        Insert: {
          analysis_id?: string | null
          confidence: number
          created_at?: string
          id?: string
          prediction: Database["public"]["Enums"]["health_status"]
          type: Database["public"]["Enums"]["classification_type"]
        }
        Update: {
          analysis_id?: string | null
          confidence?: number
          created_at?: string
          id?: string
          prediction?: Database["public"]["Enums"]["health_status"]
          type?: Database["public"]["Enums"]["classification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "classification_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      explanation: {
        Row: {
          classification_id: string
          created_at: string
          description: string | null
          heatmap_object_paths: string[] | null
          id: number
          shap_values_renogram: number[] | null
          technique: Database["public"]["Enums"]["xai_technique"] | null
          type: Database["public"]["Enums"]["xai_type"] | null
        }
        Insert: {
          classification_id: string
          created_at?: string
          description?: string | null
          heatmap_object_paths?: string[] | null
          id?: number
          shap_values_renogram?: number[] | null
          technique?: Database["public"]["Enums"]["xai_technique"] | null
          type?: Database["public"]["Enums"]["xai_type"] | null
        }
        Update: {
          classification_id?: string
          created_at?: string
          description?: string | null
          heatmap_object_paths?: string[] | null
          id?: number
          shap_values_renogram?: number[] | null
          technique?: Database["public"]["Enums"]["xai_technique"] | null
          type?: Database["public"]["Enums"]["xai_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "explanation_classification_id_fkey"
            columns: ["classification_id"]
            isOneToOne: false
            referencedRelation: "classification"
            referencedColumns: ["id"]
          },
        ]
      }
      patient: {
        Row: {
          clinician_id: string | null
          created_at: string
          email: string | null
          id: string
          name: string
        }
        Insert: {
          clinician_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          clinician_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      report: {
        Row: {
          created_at: string
          dicom_storage_ids: string[] | null
          id: number
          patient_dicom_storage_id: string | null
          patient_id: string | null
          roi_contour_object_path: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dicom_storage_ids?: string[] | null
          id?: number
          patient_dicom_storage_id?: string | null
          patient_id?: string | null
          roi_contour_object_path?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dicom_storage_ids?: string[] | null
          id?: number
          patient_dicom_storage_id?: string | null
          patient_id?: string | null
          roi_contour_object_path?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      analysis_category: "renogram" | "image"
      app_permission:
        | "analysis.delete"
        | "analysis.insert"
        | "analysis.update"
        | "analysis.select"
        | "patient.select"
      app_role: "admin" | "clinician"
      classification_type: "cnn" | "svm" | "decision_tree"
      health_status: "sick" | "healthy"
      xai_technique: "Grad-CAM" | "LIME" | "LRP" | "SHAP"
      xai_type: "Visual" | "Textual"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
