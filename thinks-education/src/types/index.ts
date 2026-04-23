export interface User {
  id: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  major: string
  avatar?: string
  email: string
  school: string
  department: string
  grade?: string
  class?: string
  semester?: string
}

export interface Course {
  id: string
  name: string
  code: string
  credits: number
  progress: number
  status: 'completed' | 'in-progress' | 'not-started'
  type: 'required' | 'elective'
  major?: string
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'completed'
  type: 'course' | 'practice' | 'ethics' | 'internship'
}

export interface LearningRecord {
  id: string
  type: 'course' | 'practice' | 'qa' | 'ethics'
  title: string
  timestamp: string
  duration?: number
  score?: number
}

export interface GrowthDimension {
  name: string
  score: number
  maxScore: number
}

export interface QAMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  type?: string
}

export interface EthicsScenario {
  id: string
  title: string
  description: string
  category: string
  difficulty: number
}

export interface EthicsAIResult {
  score: number
  strengths: string[]
  improvements: string[]
  suggestions: string[]
  analysis: string
}

export interface EthicsResponse {
  id: string
  scenarioId: string
  userId: string
  answer: string
  evaluation: {
    educationIdeal: number
    educationFairness: number
    careStudents: number
    professionalDiscipline: number
  }
  aiAnalysis?: EthicsAIResult
  reportUrl?: string
  timestamp: string
}

export interface KnowledgePoint {
  id: string
  name: string
  description: string
  relatedPoints: string[]
  resources: {
    id: string
    title: string
    type: string
    url: string
    duration?: number
  }[]
  exercises: {
    id: string
    type: string
    question: string
    options?: string[]
    answer: string | string[]
    explanation: string
  }[]
}

export interface StudentProfile {
  userId: string
  learningProgress: number
  knowledgeMastery: Record<string, number>
  teachingSkills: Record<string, number>
  ethicsDevelopment: number
  activityLevel: number
  interests: string[]
  internshipPreference: string[]
}

export interface GrowthRecord {
  id: string
  type: 'course' | 'practice' | 'qa' | 'ethics' | 'certification' | 'badge'
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface InternshipOpportunity {
  id: string
  title: string
  school: string
  location: string
  grade: string
  subject: string
  duration: string
  requirements: string[]
  matchScore: number
}

export interface FeedbackMetric {
  name: string
  score: number
  maxScore: number
  suggestion: string
}
