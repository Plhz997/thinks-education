import type { Course, Task, LearningRecord, EthicsScenario, KnowledgePoint, InternshipOpportunity, FeedbackMetric, StudentProfile, GrowthRecord, User } from '@/types'

export const mockUsers: Record<string, User> = {
  student: {
    id: 'u1',
    name: '张明',
    role: 'student',
    major: 'math',
    avatar: '',
    email: 'zhangming@thinks.edu.cn',
    school: '教育学院',
    department: '数学教育系',
    grade: '大三',
    class: '2022级数学师范1班',
    semester: '2024-2025 第二学期'
  },
  teacher: {
    id: 'u2',
    name: '李教授',
    role: 'teacher',
    major: 'math',
    avatar: '',
    email: 'li@thinks.edu.cn',
    school: '教育学院',
    department: '数学教育系'
  },
  admin: {
    id: 'u3',
    name: '王主任',
    role: 'admin',
    major: 'educational-technology',
    avatar: '',
    email: 'wang@thinks.edu.cn',
    school: '教育学院',
    department: '教务处'
  }
}

export const mockCourses: Course[] = [
  { id: 'c1', name: '教育学原理', code: 'EDU101', credits: 3, progress: 95, status: 'completed', type: 'required' },
  { id: 'c2', name: '教育心理学', code: 'EDU102', credits: 3, progress: 80, status: 'in-progress', type: 'required' },
  { id: 'c3', name: '现代教育技术', code: 'EDU201', credits: 2, progress: 100, status: 'completed', type: 'required' },
  { id: 'c4', name: '教育测量与评价', code: 'EDU202', credits: 2, progress: 30, status: 'in-progress', type: 'elective' },
  
  { id: 'm1', name: '数学课程与教学论', code: 'MATH201', credits: 4, progress: 60, status: 'in-progress', type: 'required', major: 'math' },
  { id: 'm2', name: '数学思维方法', code: 'MATH202', credits: 3, progress: 0, status: 'not-started', type: 'elective', major: 'math' },
  { id: 'm3', name: '中学数学解题研究', code: 'MATH203', credits: 3, progress: 45, status: 'in-progress', type: 'required', major: 'math' },
  
  { id: 'ch1', name: '语文课程与教学论', code: 'CHIN201', credits: 4, progress: 65, status: 'in-progress', type: 'required', major: 'chinese' },
  { id: 'ch2', name: '文学作品解读', code: 'CHIN202', credits: 3, progress: 20, status: 'in-progress', type: 'elective', major: 'chinese' },
  { id: 'ch3', name: '古代汉语', code: 'CHIN203', credits: 3, progress: 80, status: 'completed', type: 'required', major: 'chinese' },
  
  { id: 'pe1', name: '体育课程与教学论', code: 'PE201', credits: 4, progress: 55, status: 'in-progress', type: 'required', major: 'physical-education' },
  { id: 'pe2', name: '运动生理学', code: 'PE202', credits: 3, progress: 70, status: 'completed', type: 'required', major: 'physical-education' },
  { id: 'pe3', name: '体育训练学', code: 'PE203', credits: 3, progress: 15, status: 'not-started', type: 'elective', major: 'physical-education' },
  
  { id: 'te1', name: '教育技术学导论', code: 'TECH201', credits: 4, progress: 75, status: 'completed', type: 'required', major: 'educational-technology' },
  { id: 'te2', name: '多媒体课件制作', code: 'TECH202', credits: 3, progress: 40, status: 'in-progress', type: 'required', major: 'educational-technology' },
  { id: 'te3', name: '教育大数据分析', code: 'TECH203', credits: 3, progress: 0, status: 'not-started', type: 'elective', major: 'educational-technology' },
  
  { id: 'pri1', name: '小学教育学', code: 'PRIM201', credits: 4, progress: 85, status: 'completed', type: 'required', major: 'primary-education' },
  { id: 'pri2', name: '小学课程与教学', code: 'PRIM202', credits: 4, progress: 50, status: 'in-progress', type: 'required', major: 'primary-education' },
  { id: 'pri3', name: '小学生心理学', code: 'PRIM203', credits: 3, progress: 30, status: 'in-progress', type: 'required', major: 'primary-education' },
  
  { id: 'pre1', name: '学前教育学', code: 'PRE201', credits: 4, progress: 90, status: 'completed', type: 'required', major: 'preschool-education' },
  { id: 'pre2', name: '幼儿心理学', code: 'PRE202', credits: 3, progress: 65, status: 'in-progress', type: 'required', major: 'preschool-education' },
  { id: 'pre3', name: '幼儿园课程设计', code: 'PRE203', credits: 4, progress: 25, status: 'in-progress', type: 'required', major: 'preschool-education' },
  
  { id: 'comp1', name: '程序设计基础', code: 'COMP201', credits: 4, progress: 80, status: 'completed', type: 'required', major: 'computer-education' },
  { id: 'comp2', name: '教育软件工程', code: 'COMP202', credits: 3, progress: 50, status: 'in-progress', type: 'required', major: 'computer-education' },
  { id: 'comp3', name: '人工智能教育应用', code: 'COMP203', credits: 3, progress: 15, status: 'not-started', type: 'elective', major: 'computer-education' },
  
  { id: 'spe1', name: '特殊教育学', code: 'SPE201', credits: 4, progress: 70, status: 'completed', type: 'required', major: 'special-education' },
  { id: 'spe2', name: '特殊儿童心理学', code: 'SPE202', credits: 3, progress: 45, status: 'in-progress', type: 'required', major: 'special-education' },
  { id: 'spe3', name: '融合教育', code: 'SPE203', credits: 3, progress: 20, status: 'in-progress', type: 'elective', major: 'special-education' },
]

export const mockTasks: Task[] = [
  { id: 't1', title: '完成教育心理学第三章测验', description: '完成第三章学习后进行测验', dueDate: '2024-04-25', priority: 'high', status: 'pending', type: 'course' },
  { id: 't2', title: '提交数学教学设计方案', description: '设计一节高中数学课堂教学方案', dueDate: '2024-04-28', priority: 'high', status: 'pending', type: 'practice' },
  { id: 't3', title: '师德情境训练 - 家长沟通', description: '完成家长送礼情境模拟训练', dueDate: '2024-04-26', priority: 'medium', status: 'pending', type: 'ethics' },
  { id: 't4', title: '观看名师课堂实录', description: '观看并完成评课报告', dueDate: '2024-04-27', priority: 'medium', status: 'pending', type: 'practice' },
  { id: 't5', title: '准备实习面试', description: '完善个人简历和自我介绍', dueDate: '2024-05-05', priority: 'low', status: 'pending', type: 'internship' },
]

export const mockLearningRecords: LearningRecord[] = [
  { id: 'r1', type: 'course', title: '教育心理学第三章学习', timestamp: '2024-04-22T14:30:00', duration: 45, score: 92 },
  { id: 'r2', type: 'qa', title: 'AI助教问答 - 如何设计探究式教学', timestamp: '2024-04-22T10:15:00', duration: 15 },
  { id: 'r3', type: 'practice', title: '试讲训练 - 三角函数', timestamp: '2024-04-21T16:00:00', duration: 30, score: 85 },
  { id: 'r4', type: 'ethics', title: '师德情境训练 - 学生冲突调解', timestamp: '2024-04-21T09:00:00', duration: 20 },
  { id: 'r5', type: 'course', title: '数学课程与教学论学习', timestamp: '2024-04-20T14:00:00', duration: 60 },
]

export const mockEthicsScenarios: EthicsScenario[] = [
  { id: 'e1', title: '家长送礼', description: '一位学生家长在课后找到你，希望你能在期末考试中给予特殊照顾，并送上了礼品卡。', category: 'gift', difficulty: 3 },
  { id: 'e2', title: '学生冲突调解', description: '两名学生在课堂上发生激烈争吵，其中一名学生动手推搡了另一名学生。', category: 'conflict', difficulty: 4 },
  { id: 'e3', title: '课堂公平', description: '班级中有学习成绩差异较大的学生，你如何设计教学活动确保每个学生都能参与？', category: 'fairness', difficulty: 3 },
  { id: 'e4', title: '特殊学生关怀', description: '班级中有一名自闭症学生，你如何在课堂上给予适当的关怀和支持？', category: 'special-care', difficulty: 5 },
  { id: 'e5', title: '专业自律', description: '你发现自己准备的教案存在错误，而课程即将开始，你该如何处理？', category: 'professional', difficulty: 4 },
]

export const mockKnowledgePoints: KnowledgePoint[] = [
  {
    id: 'k1',
    name: '函数与导数',
    description: '研究函数的变化率和极值问题',
    relatedPoints: ['k2', 'k3'],
    resources: [
      { id: 'res1', title: '导数概念讲解', type: 'video', url: '#', duration: 15 },
      { id: 'res2', title: '导数应用案例', type: 'document', url: '#' }
    ],
    exercises: [
      { id: 'ex1', type: 'single', question: '函数 f(x) = x^2 在 x=2 处的导数是？', options: ['2', '4', '6', '8'], answer: 'B', explanation: 'f\'(x) = 2x, f\'(2) = 4' }
    ]
  },
  {
    id: 'k2',
    name: '三角函数',
    description: '研究三角形中边与角的关系',
    relatedPoints: ['k1', 'k4'],
    resources: [
      { id: 'res3', title: '三角函数图像', type: 'video', url: '#', duration: 12 }
    ],
    exercises: [
      { id: 'ex2', type: 'single', question: 'sin(90°) 的值是？', options: ['0', '1', '-1', '0.5'], answer: 'B', explanation: 'sin(90°) = 1' }
    ]
  },
  {
    id: 'k3',
    name: '积分学',
    description: '研究函数的累积和面积问题',
    relatedPoints: ['k1'],
    resources: [
      { id: 'res4', title: '定积分概念', type: 'video', url: '#', duration: 18 }
    ],
    exercises: []
  },
  {
    id: 'k4',
    name: '数列',
    description: '研究有序数的序列规律',
    relatedPoints: ['k2'],
    resources: [],
    exercises: []
  }
]

export const mockInternships: InternshipOpportunity[] = [
  { id: 'i1', title: '数学教师实习生', school: '第一中学', location: '北京市海淀区', grade: '高中', subject: '数学', duration: '2024.9-2025.1', requirements: ['数学专业', '良好沟通能力', '熟悉现代教育技术'], matchScore: 92 },
  { id: 'i2', title: '小学数学教师', school: '实验小学', location: '北京市朝阳区', grade: '小学', subject: '数学', duration: '2024.9-2025.1', requirements: ['教育相关专业', '热爱小学教育'], matchScore: 85 },
  { id: 'i3', title: '教育技术实习', school: '第三中学', location: '北京市西城区', grade: '初中', subject: '信息技术', duration: '2024.9-2025.1', requirements: ['教育技术专业', '熟悉希沃白板'], matchScore: 78 },
  { id: 'i4', title: '乡村教育支援', school: '希望小学', location: '河北省张家口市', grade: '小学', subject: '数学', duration: '2024.9-2025.6', requirements: ['愿意到乡村任教', '吃苦耐劳'], matchScore: 88 },
]

export const mockFeedbackMetrics: FeedbackMetric[] = [
  { name: '语速稳定性', score: 85, maxScore: 100, suggestion: '语速适中，建议在重点内容处适当放慢' },
  { name: '互动有效性', score: 72, maxScore: 100, suggestion: '增加提问频率，鼓励学生参与' },
  { name: '板书规范性', score: 90, maxScore: 100, suggestion: '板书布局合理，重点突出' },
  { name: '表达清晰度', score: 88, maxScore: 100, suggestion: '语言表达清晰，逻辑连贯' },
  { name: '情绪感染力', score: 78, maxScore: 100, suggestion: '适当增加肢体语言和表情变化' },
]

export const mockStudentProfile: StudentProfile = {
  userId: 'u1',
  learningProgress: 72,
  knowledgeMastery: { '函数与导数': 85, '三角函数': 78, '概率统计': 65, '立体几何': 72 },
  teachingSkills: { '教学设计': 82, '课堂管理': 75, '教学评价': 68, '信息技术': 90 },
  ethicsDevelopment: 85,
  activityLevel: 88,
  interests: ['数学建模', '教育技术', '竞赛指导'],
  internshipPreference: ['高中数学', '重点中学', '北京地区']
}

export const mockGrowthRecords: GrowthRecord[] = [
  { id: 'g1', type: 'course', title: '教育学原理', description: '完成全部课程学习，成绩92分', timestamp: '2024-03-15T10:00:00' },
  { id: 'g2', type: 'practice', title: '试讲训练', description: '三角函数课堂试讲，评分85分', timestamp: '2024-04-21T16:00:00' },
  { id: 'g3', type: 'ethics', title: '师德训练', description: '完成家长送礼情境训练，获得优秀评价', timestamp: '2024-04-20T09:00:00' },
  { id: 'g4', type: 'certification', title: '普通话证书', description: '获得二级甲等证书', timestamp: '2024-01-20T14:00:00' },
  { id: 'g5', type: 'badge', title: '学习之星', description: '连续四周完成学习任务', timestamp: '2024-04-18T00:00:00' },
]

export const majorNames: Record<string, string> = {
  'math': '数学教育',
  'chinese': '语文教育',
  'physics': '物理教育',
  'chemistry': '化学教育',
  'biology': '生物教育',
  'english': '英语教育',
  'history': '历史教育',
  'geography': '地理教育',
  'music': '音乐教育',
  'art': '美术教育',
  'pe': '体育教育',
  'tech': '教育技术学',
  'primary': '小学教育',
  'preschool': '学前教育',
  'computer': '计算机师范',
  'special': '特殊教育',
  'primary-education': '小学教育',
  'preschool-education': '学前教育',
  'physical-education': '体育教育',
  'educational-technology': '教育技术学',
  'computer-education': '计算机师范',
  'special-education': '特殊教育'
}

export const roleNames: Record<string, string> = {
  student: '师范生',
  teacher: '指导教师',
  admin: '教学院管理员'
}
