export type Role = 'student' | 'teacher' | 'admin'

export type Major = 
  | 'primary-education'
  | 'preschool-education'
  | 'physical-education'
  | 'educational-technology'
  | 'chinese'
  | 'math'
  | 'computer-education'
  | 'special-education'

export interface User {
  id: string
  name: string
  role: Role
  major: Major
  avatar: string
  email: string
  phone?: string
  school?: string
  department?: string
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
  major: Major
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'pending' | 'in-progress'
  type: 'course' | 'practice' | 'ethics' | 'internship'
}

export interface LearningRecord {
  id: string
  type: 'course' | 'practice' | 'qa' | 'ethics' | 'review'
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

export interface EthicsScenario {
  id: string
  title: string
  description: string
  category: 'gift' | 'conflict' | 'fairness' | 'special-care' | 'professional'
  difficulty: number
}

export interface EthicsResponse {
  id: string
  scenarioId: string
  userId: string
  response: string
  evaluation: {
    educationIdeal: number
    educationFairness: number
    careStudents: number
    professionalEthics: number
  }
  report: string
  timestamp: string
}

export interface KnowledgePoint {
  id: string
  name: string
  description: string
  parentId?: string
  relatedPoints: string[]
  resources: Resource[]
  exercises: Exercise[]
}

export interface Resource {
  id: string
  title: string
  type: 'video' | 'document' | 'image' | 'link'
  url: string
  duration?: number
}

export interface Exercise {
  id: string
  type: 'single' | 'multiple' | 'essay' | 'code'
  question: string
  options?: string[]
  answer: string
  explanation: string
}

export interface QAMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: string
  type?: 'theory' | 'design' | 'management' | 'lesson-plan' | 'grading' | 'code'
}

export interface TeachingSkill {
  id: string
  name: string
  category: 'lesson-plan' | '试讲' | 'blackboard' | 'tools'
  score: number
  maxScore: number
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

export interface GrowthRecord {
  id: string
  type: 'course' | 'practice' | 'qa' | 'ethics' | 'review' | 'certification' | 'badge'
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface FeedbackMetric {
  name: string
  score: number
  maxScore: number
  suggestion: string
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
