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
          category: Database["public"]["Enums"]["analysis_category"];
          created_at: string;
          id: string;
          report_id: number | null;
          roi_activity: number[] | null;
        };
        Insert: {
          category: Database["public"]["Enums"]["analysis_category"];
          created_at?: string;
          id?: string;
          report_id?: number | null;
          roi_activity?: number[] | null;
        };
        Update: {
          category?: Database["public"]["Enums"]["analysis_category"];
          created_at?: string;
          id?: string;
          report_id?: number | null;
          roi_activity?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "report";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "analysis_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "report_with_classification";
            referencedColumns: ["id"];
          },
        ];
      };
      classification: {
        Row: {
          analysis_id: string | null;
          confidence: number;
          created_at: string;
          id: string;
          kidney_label: Database["public"]["Enums"]["kidney_label"];
          prediction: Database["public"]["Enums"]["health_status"];
          time_bins: Json | null;
          type: Database["public"]["Enums"]["classification_type"];
        };
        Insert: {
          analysis_id?: string | null;
          confidence: number;
          created_at?: string;
          id?: string;
          kidney_label?: Database["public"]["Enums"]["kidney_label"];
          prediction: Database["public"]["Enums"]["health_status"];
          time_bins?: Json | null;
          type: Database["public"]["Enums"]["classification_type"];
        };
        Update: {
          analysis_id?: string | null;
          confidence?: number;
          created_at?: string;
          id?: string;
          kidney_label?: Database["public"]["Enums"]["kidney_label"];
          prediction?: Database["public"]["Enums"]["health_status"];
          time_bins?: Json | null;
          type?: Database["public"]["Enums"]["classification_type"];
        };
        Relationships: [
          {
            foreignKeyName: "classification_analysis_id_fkey";
            columns: ["analysis_id"];
            isOneToOne: false;
            referencedRelation: "analysis";
            referencedColumns: ["id"];
          },
        ];
      };
      explanation: {
        Row: {
          classification_id: string;
          created_at: string;
          description: string | null;
          heatmap_object_paths: string[] | null;
          id: number;
          shap_values_renogram: number[] | null;
          shap_values_renogram_summed: number[] | null;
          technique: Database["public"]["Enums"]["xai_technique"] | null;
        };
        Insert: {
          classification_id: string;
          created_at?: string;
          description?: string | null;
          heatmap_object_paths?: string[] | null;
          id?: number;
          shap_values_renogram?: number[] | null;
          shap_values_renogram_summed?: number[] | null;
          technique?: Database["public"]["Enums"]["xai_technique"] | null;
        };
        Update: {
          classification_id?: string;
          created_at?: string;
          description?: string | null;
          heatmap_object_paths?: string[] | null;
          id?: number;
          shap_values_renogram?: number[] | null;
          shap_values_renogram_summed?: number[] | null;
          technique?: Database["public"]["Enums"]["xai_technique"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "explanation_classification_id_fkey";
            columns: ["classification_id"];
            isOneToOne: false;
            referencedRelation: "classification";
            referencedColumns: ["id"];
          },
        ];
      };
      patient: {
        Row: {
          age: number | null;
          clinician_id: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string;
        };
        Insert: {
          age?: number | null;
          clinician_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          age?: number | null;
          clinician_id?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
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
      report: {
        Row: {
          created_at: string;
          dicom_storage_ids: string[] | null;
          diuretic_timing: number;
          id: number;
          interpolated_renograms: number[][] | null;
          interpolated_smoothed_renograms: number[][] | null;
          interpolated_tv: number[] | null;
          original_tv: number[] | null;
          patient_dicom_storage_id: string | null;
          patient_id: string | null;
          roi_contour_object_path: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          dicom_storage_ids?: string[] | null;
          diuretic_timing?: number;
          id?: number;
          interpolated_renograms?: number[] | null;
          interpolated_smoothed_renograms?: number[] | null;
          interpolated_tv?: number[] | null;
          original_tv?: number[] | null;
          patient_dicom_storage_id?: string | null;
          patient_id?: string | null;
          roi_contour_object_path?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          dicom_storage_ids?: string[] | null;
          diuretic_timing?: number;
          id?: number;
          interpolated_renograms?: number[] | null;
          interpolated_smoothed_renograms?: number[] | null;
          interpolated_tv?: number[] | null;
          original_tv?: number[] | null;
          patient_dicom_storage_id?: string | null;
          patient_id?: string | null;
          roi_contour_object_path?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patient";
            referencedColumns: ["id"];
          },
        ];
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
      report_with_classification: {
        Row: {
          created_at: string | null;
          dicom_storage_ids: string[] | null;
          id: number | null;
          patient_dicom_storage_id: string | null;
          patient_id: string | null;
          prediction: Database["public"]["Enums"]["health_status"] | null;
          roi_contour_object_path: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patient";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
    };
    Enums: {
      analysis_category: "renogram" | "image" | "feature";
      app_permission:
        | "analysis.delete"
        | "analysis.insert"
        | "analysis.update"
        | "analysis.select"
        | "patient.select";
      app_role: "admin" | "clinician";
      classification_type: "cnn" | "svm" | "decision_tree";
      health_status: "sick" | "healthy";
      kidney_label: "left" | "right" | "default";
      xai_technique: "Grad-CAM" | "LIME" | "LRP" | "SHAP";
      xai_type: "Visual" | "Textual";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      analysis_category: ["renogram", "image", "feature"],
      app_permission: [
        "analysis.delete",
        "analysis.insert",
        "analysis.update",
        "analysis.select",
        "patient.select",
      ],
      app_role: ["admin", "clinician"],
      classification_type: ["cnn", "svm", "decision_tree"],
      health_status: ["sick", "healthy"],
      kidney_label: ["left", "right", "default"],
      xai_technique: ["Grad-CAM", "LIME", "LRP", "SHAP"],
      xai_type: ["Visual", "Textual"],
    },
  },
} as const;
