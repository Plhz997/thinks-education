import { create } from 'zustand'
import type { User, Course, Task, LearningRecord, GrowthDimension, QAMessage, GrowthRecord, StudentProfile, EthicsResponse } from '@/types'

interface AppState {
  user: User | null
  courses: Course[]
  tasks: Task[]
  learningRecords: LearningRecord[]
  growthDimensions: GrowthDimension[]
  qaMessages: QAMessage[]
  growthRecords: GrowthRecord[]
  studentProfile: StudentProfile | null
  ethicsResponses: EthicsResponse[]
  currentSemester: string
  closedLoopProgress: number
  
  setUser: (user: User) => void
  logout: () => void
  updateCourseProgress: (courseId: string, progress: number) => void
  addTask: (task: Omit<Task, 'id'>) => void
  completeTask: (taskId: string) => void
  addLearningRecord: (record: Omit<LearningRecord, 'id'>) => void
  addQAMessage: (message: Omit<QAMessage, 'id'>) => void
  addGrowthRecord: (record: Omit<GrowthRecord, 'id'>) => void
  addEthicsResponse: (response: Omit<EthicsResponse, 'id' | 'timestamp'>) => void
  updateClosedLoopProgress: (progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  courses: [],
  tasks: [],
  learningRecords: [],
  growthDimensions: [
    { name: '师德素养', score: 85, maxScore: 100 },
    { name: '教学设计', score: 78, maxScore: 100 },
    { name: '课堂管理', score: 72, maxScore: 100 },
    { name: '表达能力', score: 88, maxScore: 100 },
    { name: '反思能力', score: 68, maxScore: 100 },
    { name: '技术应用', score: 92, maxScore: 100 },
  ],
  qaMessages: [],
  growthRecords: [],
  studentProfile: null,
  ethicsResponses: [],
  currentSemester: '2024-2025 第二学期',
  closedLoopProgress: 65,
  
  setUser: (user) => set({ user }),
  
  logout: () => set({ 
    user: null, 
    courses: [], 
    tasks: [], 
    learningRecords: [],
    qaMessages: [],
    growthRecords: [],
    studentProfile: null,
    ethicsResponses: []
  }),
  
  updateCourseProgress: (courseId, progress) => set((state) => ({
    courses: state.courses.map(c => 
      c.id === courseId ? { ...c, progress: Math.min(100, progress) } : c
    )
  })),
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: `task-${Date.now()}` }]
  })),
  
  completeTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === taskId ? { ...t, status: 'completed' as const } : t
    )
  })),
  
  addLearningRecord: (record) => set((state) => ({
    learningRecords: [{ ...record, id: `record-${Date.now()}` }, ...state.learningRecords]
  })),
  
  addQAMessage: (message) => set((state) => ({
    qaMessages: [...state.qaMessages, { ...message, id: `msg-${Date.now()}` }]
  })),
  
  addGrowthRecord: (record) => set((state) => ({
    growthRecords: [{ ...record, id: `growth-${Date.now()}` }, ...state.growthRecords]
  })),
  
  addEthicsResponse: (response) => set((state) => ({
    ethicsResponses: [
      { ...response, id: `ethics-${Date.now()}`, timestamp: new Date().toISOString() },
      ...state.ethicsResponses
    ]
  })),
  
  updateClosedLoopProgress: (progress) => set({ closedLoopProgress: Math.min(100, Math.max(0, progress)) }),
}))
