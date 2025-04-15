
// Define types for our application
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'provider';
}

export interface Survey {
  id: string;
  title: string;
  responseRate: number;
  completedCount: number;
  totalCount: number;
  averageScore: number;
  date: string;
  providerId?: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  department: string;
  surveys: Survey[];
}

export interface PatientSurvey {
  id: string;
  patientId: string;
  patientName: string;
  surveyId: string;
  surveyTitle: string;
  status: 'pending' | 'completed';
  completedDate?: string;
  score?: number;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  surveyId: string;
  averageScore: number;
  responseCount: number;
}

export interface AnalyticsData {
  responseRate: number;
  totalSurveys: number;
  averageScore: number;
  anovaResults: {
    fValue: number;
    pValue: number;
    significant: boolean;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
  }[];
}
