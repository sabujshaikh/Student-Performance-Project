export type Role = 'student' | 'teacher';

export type PerformanceBand = 'At-Risk' | 'Average' | 'High-Performing';
export type RiskLevel = 'High Risk' | 'Moderate Risk' | 'Low Risk';

export interface User {
  id: string;
  name: string;
  role: Role;
  batch?: string;
  designation?: string;
  department: string;
}

export interface StudentProfile {
  student_id: string;
  student_name: string;
  gender: string;
  distance_from_home: string;
  learning_disabilities: string;
  parental_involvement: string;
  parental_education_level: string;
  family_income: string;
  access_to_resources: string;
  tutoring_sessions: number;
  school_type: string;
  teacher_quality: string;
  motivation_level: string;
  extracurricular_activities: string;
  internet_access: string;
  peer_influence: string;
  physical_activity: number;
  sleep_hours: number;
  hours_studied: number;
  attendance: number;
  previous_scores: number;
  exam_score: number;
  gpa: number;
  cgpa: number;
  performance_band: PerformanceBand;
  risk_level: RiskLevel;
  subject_marks: {
    subject_code: string;
    subject_name: string;
    credits: number;
    marks: number;
    grade: string;
    gpa: number;
  }[];
  semester_history: {
    semester: string;
    gpa: number;
    attendance: number;
  }[];
}

export interface PredictionInput {
  attendance_mark: number;
  lab_report_mark: number;
  assignment_mark: number;
  forum_mark: number;
  class_performance_mark: number;
  hours_studied?: number;
  attendance?: number;
  previous_scores?: number;
  parental_involvement?: string;
  access_to_resources?: string;
  tutoring_sessions?: number;
  motivation_level?: string;
  family_income?: string;
  teacher_quality?: string;
  school_type?: string;
  peer_influence?: string;
  sleep_hours?: number;
  physical_activity?: number;
}

export interface PredictionResult {
  predicted_score: number;
  performance_band: PerformanceBand;
  risk_level: RiskLevel;
  confidence_percentage: number;
  model_used: string;
  alternative_models: {
    decision_tree_band: PerformanceBand;
    logistic_regression_band: PerformanceBand;
  };
  feature_impacts: {
    feature: string;
    value: string | number;
    weight: number;
    effect: 'Positive' | 'Negative' | 'Neutral';
  }[];
  suggestions: string[];
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  is_best: boolean;
  confusion_matrix: number[][]; // 3x3 matrix for [At-Risk, Average, High-Performing]
  labels: string[];
}

export interface BenchmarkData {
  status: string;
  best_model: string;
  best_accuracy: string;
  feature_importance: {
    feature: string;
    importance: number;
    impact: string;
  }[];
  models: Record<string, ModelMetrics>;
}

export interface StarSchemaAnalytics {
  attendance_bands: { band: string; count: number; avg_score: number; avg_gpa: number; at_risk: number }[];
  parental_education: { level: string; count: number; avg_score: number; avg_gpa: number }[];
  teacher_quality: { quality: string; count: number; avg_score: number; at_risk_pct: number }[];
  school_type: { type: string; count: number; avg_score: number; avg_gpa: number }[];
  overall_summary: {
    total_students: number;
    at_risk_count: number;
    average_count: number;
    high_performing_count: number;
    avg_exam_score: number;
    avg_attendance: number;
    avg_gpa: number;
  };
}

export interface ETLLogEntry {
  step: string;
  timestamp: string;
  status: 'SUCCESS' | 'INFO' | 'WARNING';
  details: string;
}
