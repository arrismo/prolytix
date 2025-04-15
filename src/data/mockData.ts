
import { Survey, Provider, PatientSurvey, SurveyQuestion, AnalyticsData, ChartData } from '@/types';

// Mock data for development
export const mockSurveys: Survey[] = [
  {
    id: 's1',
    title: 'Patient Satisfaction Survey',
    responseRate: 78,
    completedCount: 156,
    totalCount: 200,
    averageScore: 4.2,
    date: '2025-03-15',
  },
  {
    id: 's2',
    title: 'Post-Operation Feedback',
    responseRate: 65,
    completedCount: 98,
    totalCount: 150,
    averageScore: 4.5,
    date: '2025-03-10',
  },
  {
    id: 's3',
    title: 'Emergency Care Evaluation',
    responseRate: 45,
    completedCount: 68,
    totalCount: 150,
    averageScore: 3.8,
    date: '2025-03-05',
  },
  {
    id: 's4',
    title: 'Annual Health Assessment',
    responseRate: 82,
    completedCount: 246,
    totalCount: 300,
    averageScore: 4.7,
    date: '2025-02-25',
  },
  {
    id: 's5',
    title: 'Nursing Care Feedback',
    responseRate: 70,
    completedCount: 140,
    totalCount: 200,
    averageScore: 4.0,
    date: '2025-02-15',
  }
];

export const mockProviders: Provider[] = [
  {
    id: 'p1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    department: 'Heart Center',
    surveys: mockSurveys.slice(0, 2),
  },
  {
    id: 'p2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedics',
    department: 'Surgical',
    surveys: mockSurveys.slice(2, 4),
  },
  {
    id: 'p3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    department: 'Children\'s Health',
    surveys: mockSurveys.slice(1, 3),
  },
  {
    id: 'p4',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    department: 'Neuroscience',
    surveys: mockSurveys.slice(3, 5),
  }
];

export const mockPatientSurveys: PatientSurvey[] = [
  {
    id: 'ps1',
    patientId: 'pat1',
    patientName: 'John Smith',
    surveyId: 's1',
    surveyTitle: 'Patient Satisfaction Survey',
    status: 'completed',
    completedDate: '2025-03-18',
    score: 4.5,
  },
  {
    id: 'ps2',
    patientId: 'pat2',
    patientName: 'Mary Johnson',
    surveyId: 's1',
    surveyTitle: 'Patient Satisfaction Survey',
    status: 'completed',
    completedDate: '2025-03-17',
    score: 4.2,
  },
  {
    id: 'ps3',
    patientId: 'pat3',
    patientName: 'Robert Davis',
    surveyId: 's2',
    surveyTitle: 'Post-Operation Feedback',
    status: 'pending',
  },
  {
    id: 'ps4',
    patientId: 'pat4',
    patientName: 'Lisa Thompson',
    surveyId: 's2',
    surveyTitle: 'Post-Operation Feedback',
    status: 'completed',
    completedDate: '2025-03-12',
    score: 4.8,
  },
  {
    id: 'ps5',
    patientId: 'pat5',
    patientName: 'Michael Brown',
    surveyId: 's3',
    surveyTitle: 'Emergency Care Evaluation',
    status: 'pending',
  }
];

export const mockSurveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1',
    text: 'How satisfied were you with the care you received?',
    surveyId: 's1',
    averageScore: 4.3,
    responseCount: 156,
  },
  {
    id: 'q2',
    text: 'How well did the staff explain your treatment options?',
    surveyId: 's1',
    averageScore: 4.1,
    responseCount: 156,
  },
  {
    id: 'q3',
    text: 'How would you rate the cleanliness of the facility?',
    surveyId: 's1',
    averageScore: 4.5,
    responseCount: 156,
  },
  {
    id: 'q4',
    text: 'How satisfied were you with your post-surgery care?',
    surveyId: 's2',
    averageScore: 4.6,
    responseCount: 98,
  },
  {
    id: 'q5',
    text: 'How well was your pain managed after surgery?',
    surveyId: 's2',
    averageScore: 4.2,
    responseCount: 98,
  }
];

export const mockAnalyticsData: AnalyticsData = {
  responseRate: 72,
  totalSurveys: 850,
  averageScore: 4.3,
  anovaResults: {
    fValue: 3.42,
    pValue: 0.032,
    significant: true,
  },
};

export const mockResponseRateChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Response Rate (%)',
      data: [65, 70, 72, 75, 78, 80],
      backgroundColor: 'rgba(110, 89, 165, 0.2)',
      borderColor: 'rgba(110, 89, 165, 1)',
      borderWidth: 1,
    },
  ],
};

export const mockScoreDistributionChartData: ChartData = {
  labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
  datasets: [
    {
      label: 'Number of Responses',
      data: [12, 38, 120, 356, 324],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1,
    },
  ],
};

export const mockProviderComparisonChartData: ChartData = {
  labels: ['Dr. Johnson', 'Dr. Chen', 'Dr. Rodriguez', 'Dr. Wilson'],
  datasets: [
    {
      label: 'Average Score',
      data: [4.2, 3.8, 4.3, 4.7],
      backgroundColor: 'rgba(14, 165, 233, 0.2)',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
    },
  ],
};

export const mockSamplePDFUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
