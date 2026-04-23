import type { Course, Task, LearningRecord, EthicsScenario, KnowledgePoint, InternshipOpportunity, FeedbackMetric, StudentProfile, GrowthRecord, User } from '@/types'

export const mockUsers: Record<string, Record<string, User>> = {
  student: {
    'math': {
      id: 's-math-1',
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
    'chinese': {
      id: 's-chinese-1',
      name: '李华',
      role: 'student',
      major: 'chinese',
      avatar: '',
      email: 'lihua@thinks.edu.cn',
      school: '教育学院',
      department: '汉语言文学系',
      grade: '大三',
      class: '2022级语文师范2班',
      semester: '2024-2025 第二学期'
    },
    'primary-education': {
      id: 's-primary-1',
      name: '王小燕',
      role: 'student',
      major: 'primary-education',
      avatar: '',
      email: 'wangxiaoyan@thinks.edu.cn',
      school: '教育学院',
      department: '小学教育系',
      grade: '大二',
      class: '2023级小学教育1班',
      semester: '2024-2025 第二学期'
    },
    'preschool-education': {
      id: 's-preschool-1',
      name: '赵雅琪',
      role: 'student',
      major: 'preschool-education',
      avatar: '',
      email: 'zhaoyaqi@thinks.edu.cn',
      school: '教育学院',
      department: '学前教育系',
      grade: '大三',
      class: '2022级学前教育3班',
      semester: '2024-2025 第二学期'
    },
    'physical-education': {
      id: 's-pe-1',
      name: '陈志强',
      role: 'student',
      major: 'physical-education',
      avatar: '',
      email: 'chenzhiqiang@thinks.edu.cn',
      school: '体育学院',
      department: '体育教育系',
      grade: '大三',
      class: '2022级体育师范1班',
      semester: '2024-2025 第二学期'
    },
    'educational-technology': {
      id: 's-tech-1',
      name: '刘建国',
      role: 'student',
      major: 'educational-technology',
      avatar: '',
      email: 'liujinguo@thinks.edu.cn',
      school: '教育学院',
      department: '教育技术系',
      grade: '大四',
      class: '2021级教育技术学1班',
      semester: '2024-2025 第二学期'
    },
    'computer-education': {
      id: 's-comp-1',
      name: '孙伟',
      role: 'student',
      major: 'computer-education',
      avatar: '',
      email: 'sunwei@thinks.edu.cn',
      school: '计算机学院',
      department: '计算机教育系',
      grade: '大三',
      class: '2022级计算机师范1班',
      semester: '2024-2025 第二学期'
    },
    'special-education': {
      id: 's-special-1',
      name: '周芳',
      role: 'student',
      major: 'special-education',
      avatar: '',
      email: 'zhoufang@thinks.edu.cn',
      school: '教育学院',
      department: '特殊教育系',
      grade: '大二',
      class: '2023级特殊教育1班',
      semester: '2024-2025 第二学期'
    },
  },
  teacher: {
    'math': {
      id: 't-math-1',
      name: '李教授',
      role: 'teacher',
      major: 'math',
      avatar: '',
      email: 'li@thinks.edu.cn',
      school: '教育学院',
      department: '数学教育系'
    },
    'chinese': {
      id: 't-chinese-1',
      name: '王老师',
      role: 'teacher',
      major: 'chinese',
      avatar: '',
      email: 'wang@thinks.edu.cn',
      school: '教育学院',
      department: '汉语言文学系'
    },
    'default': {
      id: 't-default-1',
      name: '张教授',
      role: 'teacher',
      major: 'math',
      avatar: '',
      email: 'zhang@thinks.edu.cn',
      school: '教育学院',
      department: '教育科学系'
    },
  },
  admin: {
    'default': {
      id: 'a-1',
      name: '刘主任',
      role: 'admin',
      major: 'educational-technology',
      avatar: '',
      email: 'liu@thinks.edu.cn',
      school: '教育学院',
      department: '教务处'
    },
  }
}

export const validCredentials: Record<string, string> = {
  'zhangming@thinks.edu.cn': '123456',
  'lihua@thinks.edu.cn': '123456',
  'wangxiaoyan@thinks.edu.cn': '123456',
  'zhaoyaqi@thinks.edu.cn': '123456',
  'chenzhiqiang@thinks.edu.cn': '123456',
  'liujinguo@thinks.edu.cn': '123456',
  'sunwei@thinks.edu.cn': '123456',
  'zhoufang@thinks.edu.cn': '123456',
  'li@thinks.edu.cn': 'teacher123',
  'wang@thinks.edu.cn': 'teacher123',
  'zhang@thinks.edu.cn': 'teacher123',
  'liu@thinks.edu.cn': 'admin123',
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
    description: '研究函数的变化率和极值问题，包括导数的定义、求导法则、导数的应用（单调性、极值、最值）等核心内容',
    relatedPoints: ['k2', 'k5'],
    resources: [
      { id: 'res1', title: '导数的概念与几何意义', type: 'video', url: 'https://www.xuetangx.com/course/hubei050011001/7795172?channel=i.area.manual_search', duration: 23 },
      { id: 'res2', title: '基本初等函数求导公式', type: 'video', url: 'https://www.xuetangx.com/course/hubei050011001/7795173?channel=i.area.manual_search', duration: 18 },
      { id: 'res3', title: '导数的应用-单调性与极值', type: 'video', url: 'https://www.xuetangx.com/course/hubei050011001/7795174?channel=i.area.manual_search', duration: 25 },
      { id: 'res4', title: '导数综合应用例题讲解', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/' }
    ],
    exercises: [
      { id: 'ex1', type: 'single', question: '函数 f(x) = x^3 - 3x 在 x=1 处的导数值为？', options: ['0', '3', '-3', '6'], answer: 'A', explanation: 'f\'(x) = 3x^2 - 3，f\'(1) = 3(1)^2 - 3 = 0' },
      { id: 'ex2', type: 'single', question: '函数 f(x) = e^x 的导数是？', options: ['e^x', 'xe^(x-1)', '1/e^x', 'xe^x'], answer: 'A', explanation: '指数函数 e^x 的导数等于它本身' },
      { id: 'ex3', type: 'single', question: '若 f(x) = ln(x)，则 f\'(e) = ？', options: ['1', '1/e', 'e', '0'], answer: 'B', explanation: 'f\'(x) = 1/x，f\'(e) = 1/e' },
      { id: 'ex4', type: 'multiple', question: '下列函数中，在 x=0 处可导的有？', options: ['f(x) = x^2', 'f(x) = |x|', 'f(x) = x^(1/3)', 'f(x) = sin(x)'], answer: ['A', 'D'], explanation: 'f(x) = x^2 和 f(x) = sin(x) 在 x=0 处可导，f(x) = |x| 和 f(x) = x^(1/3) 在 x=0 处不可导' },
      { id: 'ex5', type: 'fill', question: '函数 f(x) = x^2 + 2x + 1 的导数 f\'(x) = ____', answer: '2x + 2', explanation: '根据求导法则，(x^2)\' = 2x，(2x)\' = 2，常数的导数为0' }
    ]
  },
  {
    id: 'k2',
    name: '三角函数',
    description: '研究三角形中边与角的关系，包括三角函数的定义、图像性质、三角恒等变换等内容',
    relatedPoints: ['k1', 'k3'],
    resources: [
      { id: 'res5', title: '三角函数的定义', type: 'video', url: 'https://www.icourse163.org/course/HNLG-1206100113?tid=1461696442', duration: 22 },
      { id: 'res6', title: '三角函数的图像与性质', type: 'video', url: 'https://www.icourse163.org/course/HNLG-1206100113?tid=1461696443', duration: 28 },
      { id: 'res7', title: '三角恒等变换公式', type: 'video', url: 'https://www.icourse163.org/course/HNLG-1206100113?tid=1461696444', duration: 35 },
      { id: 'res8', title: '三角函数诱导公式', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/dzkb/201701/t20170110_2989588.htm' }
    ],
    exercises: [
      { id: 'ex6', type: 'single', question: 'sin(π/6) 的值是？', options: ['0', '1/2', '√2/2', '√3/2'], answer: 'B', explanation: 'sin(π/6) = sin(30°) = 1/2' },
      { id: 'ex7', type: 'single', question: 'cos(π/2) 的值是？', options: ['0', '1', '-1', '1/2'], answer: 'A', explanation: 'cos(π/2) = cos(90°) = 0' },
      { id: 'ex8', type: 'single', question: 'tan(π/4) 的值是？', options: ['0', '1', '-1', '不存在'], answer: 'B', explanation: 'tan(π/4) = tan(45°) = 1' },
      { id: 'ex9', type: 'multiple', question: '下列等式成立的有？', options: ['sin^2(x) + cos^2(x) = 1', 'tan(x) = sin(x)/cos(x)', 'sin(2x) = 2sin(x)', 'cos(2x) = 2cos^2(x) - 1'], answer: ['A', 'B', 'D'], explanation: '选项C错误，正确的公式是 sin(2x) = 2sin(x)cos(x)' },
      { id: 'ex10', type: 'fill', question: 'sin^2(30°) + cos^2(30°) = ____', answer: '1', explanation: '根据同角三角函数的基本关系，sin^2(θ) + cos^2(θ) = 1' }
    ]
  },
  {
    id: 'k3',
    name: '数列',
    description: '研究有序数的序列规律，包括等差数列、等比数列的通项公式、前n项和公式等',
    relatedPoints: ['k2', 'k4'],
    resources: [
      { id: 'res9', title: '等差数列的概念与性质', type: 'video', url: 'https://www.icourse163.org/course/XJTU-1001577001', duration: 25 },
      { id: 'res10', title: '等比数列的概念与性质', type: 'video', url: 'https://www.icourse163.org/course/XJTU-1001577001?tid=1001757002', duration: 28 },
      { id: 'res11', title: '数列求和方法', type: 'video', url: 'https://www.icourse163.org/course/XJTU-1001577001?tid=1001757003', duration: 32 },
      { id: 'res12', title: '数列综合应用', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/dzkb/201701/t20170110_2989591.htm' }
    ],
    exercises: [
      { id: 'ex11', type: 'single', question: '等差数列 2, 5, 8, 11, ... 的第10项是？', options: ['26', '29', '32', '35'], answer: 'B', explanation: '公差d=3，a10 = 2 + 9×3 = 29' },
      { id: 'ex12', type: 'single', question: '等比数列 1, 2, 4, 8, ... 的前5项和是？', options: ['15', '31', '16', '30'], answer: 'B', explanation: '公比q=2，S5 = 1×(2^5 - 1)/(2 - 1) = 31' },
      { id: 'ex13', type: 'single', question: '等差数列的公差为2，首项为3，第5项是？', options: ['10', '11', '12', '13'], answer: 'B', explanation: 'a5 = 3 + 4×2 = 11' },
      { id: 'ex14', type: 'multiple', question: '下列数列中是等差数列的有？', options: ['1, 3, 5, 7, ...', '2, 4, 8, 16, ...', '5, 3, 1, -1, ...', '1, 1, 1, 1, ...'], answer: ['A', 'C', 'D'], explanation: '选项B是等比数列，其余都是等差数列' },
      { id: 'ex15', type: 'fill', question: '等比数列 3, 6, 12, ... 的公比 q = ____', answer: '2', explanation: '公比 q = a2/a1 = 6/3 = 2' }
    ]
  },
  {
    id: 'k4',
    name: '概率统计',
    description: '研究随机现象的统计规律，包括概率的定义、随机变量、统计推断等内容',
    relatedPoints: ['k3', 'k6'],
    resources: [
      { id: 'res13', title: '概率的基本概念', type: 'video', url: 'https://www.icourse163.org/course/HIT-1001584001', duration: 28 },
      { id: 'res14', title: '古典概型与几何概型', type: 'video', url: 'https://www.icourse163.org/course/HIT-1001584001?tid=1001766002', duration: 32 },
      { id: 'res15', title: '离散型随机变量', type: 'video', url: 'https://www.icourse163.org/course/HIT-1001584001?tid=1001766003', duration: 35 },
      { id: 'res16', title: '统计与统计案例', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/dzkb/201701/t20170110_2989594.htm' }
    ],
    exercises: [
      { id: 'ex16', type: 'single', question: '掷一枚均匀硬币两次，两次都是正面的概率是？', options: ['1/4', '1/2', '3/4', '1'], answer: 'A', explanation: '每次正面概率1/2，两次独立，P = 1/2 × 1/2 = 1/4' },
      { id: 'ex17', type: 'single', question: '从1到10中随机取一个数，取到偶数的概率是？', options: ['1/5', '2/5', '1/2', '3/5'], answer: 'C', explanation: '偶数有2,4,6,8,10共5个，P = 5/10 = 1/2' },
      { id: 'ex18', type: 'single', question: '若P(A)=0.6，P(B)=0.5，A与B独立，则P(AB)=？', options: ['0.3', '0.5', '0.6', '1.1'], answer: 'A', explanation: '独立事件：P(AB) = P(A)×P(B) = 0.6×0.5 = 0.3' },
      { id: 'ex19', type: 'multiple', question: '下列事件中是互斥事件的有？', options: ['掷骰子出现1点和出现2点', '掷硬币出现正面和出现反面', '考试及格和考试优秀', '下雨和刮风'], answer: ['A', 'B'], explanation: '互斥事件不能同时发生，A和B是互斥的，C和D不是' },
      { id: 'ex20', type: 'fill', question: '从标有1,2,3,4,5的五张卡片中随机抽取一张，抽到奇数的概率是____', answer: '3/5', explanation: '奇数有1,3,5共3个，P = 3/5' }
    ]
  },
  {
    id: 'k5',
    name: '积分学',
    description: '研究函数的累积和面积问题，包括不定积分、定积分的概念、计算方法和应用',
    relatedPoints: ['k1', 'k6'],
    resources: [
      { id: 'res17', title: '不定积分的概念', type: 'video', url: 'https://www.icourse163.org/course/SDU-1001624001', duration: 30 },
      { id: 'res18', title: '定积分的概念与性质', type: 'video', url: 'https://www.icourse163.org/course/SDU-1001624001?tid=1001804002', duration: 35 },
      { id: 'res19', title: '微积分基本定理', type: 'video', url: 'https://www.icourse163.org/course/SDU-1001624001?tid=1001804003', duration: 32 },
      { id: 'res20', title: '定积分的应用', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/dzkb/201701/t20170110_2989597.htm' }
    ],
    exercises: [
      { id: 'ex21', type: 'single', question: '∫x dx = ？', options: ['x^2', 'x^2/2 + C', '2x + C', '1'], answer: 'B', explanation: '幂函数积分公式：∫x^n dx = x^(n+1)/(n+1) + C' },
      { id: 'ex22', type: 'single', question: '∫(0到1) x dx = ？', options: ['0', '1/2', '1', '2'], answer: 'B', explanation: '∫(0到1)x dx = [x^2/2]从0到1 = 1/2 - 0 = 1/2' },
      { id: 'ex23', type: 'single', question: '∫e^x dx = ？', options: ['e^x + C', 'xe^(x-1) + C', '1/e^x + C', 'xe^x + C'], answer: 'A', explanation: '指数函数的积分等于它本身加常数' },
      { id: 'ex24', type: 'multiple', question: '下列等式成立的有？', options: ['∫(a到b)f(x)dx = -∫(b到a)f(x)dx', '∫(a到a)f(x)dx = 0', '∫(a到b)[f(x)+g(x)]dx = ∫f(x)dx + ∫g(x)dx', '∫kf(x)dx = k∫f(x)dx'], answer: ['A', 'B', 'C', 'D'], explanation: '这都是定积分的基本性质' },
      { id: 'ex25', type: 'fill', question: '∫(0到2) 2x dx = ____', answer: '4', explanation: '∫2x dx = x^2，从0到2的定积分 = 4 - 0 = 4' }
    ]
  },
  {
    id: 'k6',
    name: '立体几何',
    description: '研究空间几何体的性质和位置关系，包括空间点线面关系、空间向量、体积表面积计算等',
    relatedPoints: ['k4', 'k5'],
    resources: [
      { id: 'res21', title: '空间几何体的结构', type: 'video', url: 'https://www.icourse163.org/course/HUST-1001380001', duration: 28 },
      { id: 'res22', title: '空间点线面位置关系', type: 'video', url: 'https://www.icourse163.org/course/HUST-1001380001?tid=1001531002', duration: 35 },
      { id: 'res23', title: '空间向量及其应用', type: 'video', url: 'https://www.icourse163.org/course/HUST-1001380001?tid=1001531003', duration: 40 },
      { id: 'res24', title: '几何体的体积与表面积', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx_1/czsxtbjx/xkbsyjc/gzsxbnjc/dzkb/201701/t20170110_2989600.htm' }
    ],
    exercises: [
      { id: 'ex26', type: 'single', question: '正方体的对角线长为√3，则其边长为？', options: ['1', '√2', '√3', '3'], answer: 'A', explanation: '设边长为a，则对角线长 = a√3 = √3，所以a = 1' },
      { id: 'ex27', type: 'single', question: '圆柱的底面半径为1，高为2，则体积为？', options: ['π', '2π', '4π', '6π'], answer: 'B', explanation: 'V = πr²h = π×1²×2 = 2π' },
      { id: 'ex28', type: 'single', question: '下列命题正确的是？', options: ['平行于同一直线的两条直线平行', '垂直于同一直线的两条直线平行', '平行于同一平面的两条直线平行', '垂直于同一平面的两个平面平行'], answer: 'A', explanation: '选项A是平行公理，B、C、D都不一定成立' },
      { id: 'ex29', type: 'multiple', question: '下列几何体中是旋转体的有？', options: ['圆柱', '圆锥', '棱柱', '球'], answer: ['A', 'B', 'D'], explanation: '圆柱、圆锥、球都是旋转体，棱柱是多面体' },
      { id: 'ex30', type: 'fill', question: '长方体的长宽高分别为2,3,4，则其体积为____', answer: '24', explanation: 'V = 长×宽×高 = 2×3×4 = 24' }
    ]
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
  'primary-education': '小学教育',
  'preschool-education': '学前教育',
  'physical-education': '体育教育',
  'educational-technology': '教育技术学',
  'chinese': '语文教育',
  'math': '数学教育',
  'computer-education': '计算机师范',
  'special-education': '特殊教育'
}

export const roleNames: Record<string, string> = {
  student: '师范生',
  teacher: '指导教师',
  admin: '教学院管理员'
}
