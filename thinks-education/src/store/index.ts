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
  ethicsResponses: [
    {
      id: 'ethics-1',
      scenarioId: 's1',
      userId: 'u1',
      answer: '面对家长送礼的情况，我会礼貌地拒绝，并向家长说明我们教师的职业操守和学校的相关规定。我会强调教育公平的重要性，让家长理解真正对孩子好的方式是配合学校教育，而不是送礼。同时，我会保持专业和友好的态度，避免让家长感到尴尬。',
      evaluation: { educationIdeal: 88, educationFairness: 92, careStudents: 85, professionalDiscipline: 95 },
      timestamp: '2024-04-15T10:30:00'
    },
    {
      id: 'ethics-2',
      scenarioId: 's2',
      userId: 'u1',
      answer: '当学生发生冲突时，我会首先分开双方，确保他们的安全。然后分别听取双方的陈述，了解事情的经过。在处理过程中，我会保持中立和公正，引导学生认识到自己的错误，并学会用和平的方式解决问题。同时，我会联系班主任和家长，共同做好后续的教育工作。',
      evaluation: { educationIdeal: 82, educationFairness: 88, careStudents: 90, professionalDiscipline: 85 },
      timestamp: '2024-04-18T14:20:00'
    },
    {
      id: 'ethics-3',
      scenarioId: 's3',
      userId: 'u1',
      answer: '在教学中，我会注意公平对待每一个学生，不因学生的成绩、家庭背景等因素而有所区别。我会关注每个学生的学习情况，为学习困难的学生提供额外的帮助，同时鼓励成绩好的学生继续努力。我相信每个学生都有潜力，应该得到平等的发展机会。',
      evaluation: { educationIdeal: 90, educationFairness: 95, careStudents: 88, professionalDiscipline: 92 },
      timestamp: '2024-04-22T09:15:00'
    }
  ],
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
