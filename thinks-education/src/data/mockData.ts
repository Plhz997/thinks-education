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
    id: 'math-1',
    name: '函数与导数',
    description: '研究函数的变化率和极值问题',
    subject: 'math',
    relatedPoints: ['math-2', 'math-3'],
    resources: [
      { id: 'res1', title: '导数概念讲解', type: 'video', url: 'https://www.bilibili.com/video/BV1aW411Q7x1/', duration: 15 },
      { id: 'res2', title: '导数应用案例', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx/xkbsyjc/gzsxbysjc/dzkb/202003/t20200302_1954532.htm' }
    ],
    exercises: [
      { id: 'ex1', type: 'single', question: '函数 f(x) = x^2 在 x=2 处的导数是？', options: ['2', '4', '6', '8'], answer: 'B', explanation: 'f\'(x) = 2x, f\'(2) = 4' },
      { id: 'ex2', type: 'single', question: '函数 f(x) = sin(x) 的导数是？', options: ['cos(x)', '-cos(x)', 'tan(x)', 'sec(x)'], answer: 'A', explanation: 'sin(x) 的导数是 cos(x)' },
      { id: 'ex3', type: 'fill', question: '函数 f(x) = x^3 - 3x 在 x=1 处的导数值为____', answer: '0', explanation: 'f\'(x) = 3x^2 - 3, f\'(1) = 0' },
      { id: 'ex4', type: 'multiple', question: '下列函数中，在 x=0 处可导的有？', options: ['f(x) = |x|', 'f(x) = x^2', 'f(x) = sin(x)', 'f(x) = 1/x'], answer: ['B', 'C'], explanation: '|x|在0处不可导，1/x在0处不连续' },
      { id: 'ex5', type: 'single', question: '若 f\'(x) = 2x + 1，则 f(x) = ?', options: ['x^2', 'x^2 + x', 'x^2 + x + C', '2'], answer: 'C', explanation: '不定积分的结果包含常数C' }
    ]
  },
  {
    id: 'math-2',
    name: '三角函数',
    description: '研究三角形中边与角的关系',
    subject: 'math',
    relatedPoints: ['math-1', 'math-4'],
    resources: [
      { id: 'res3', title: '三角函数图像', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411Q799/', duration: 12 },
      { id: 'res4', title: '三角函数公式', type: 'document', url: 'https://www.pep.com.cn/gzsx/jszx/xkbsyjc/gzsxbysjc/dzkb/202003/t20200302_1954533.htm' }
    ],
    exercises: [
      { id: 'ex6', type: 'single', question: 'sin(90°) 的值是？', options: ['0', '1', '-1', '0.5'], answer: 'B', explanation: 'sin(90°) = 1' },
      { id: 'ex7', type: 'single', question: 'cos(180°) 的值是？', options: ['0', '1', '-1', '0.5'], answer: 'C', explanation: 'cos(180°) = -1' },
      { id: 'ex8', type: 'fill', question: 'tan(45°) = ____', answer: '1', explanation: 'tan(45°) = 1' },
      { id: 'ex9', type: 'multiple', question: '下列等式成立的是？', options: ['sin^2 x + cos^2 x = 1', 'sin(2x) = 2sinx', 'tanx = sinx/cosx', 'cos(-x) = -cosx'], answer: ['A', 'C'], explanation: 'sin(2x) = 2sinxcosx, cos(-x) = cosx' },
      { id: 'ex10', type: 'single', question: '函数 y = sin(2x) 的周期是？', options: ['π', '2π', 'π/2', '4π'], answer: 'A', explanation: '周期 T = 2π/2 = π' }
    ]
  },
  {
    id: 'math-3',
    name: '积分学',
    description: '研究函数的累积和面积问题',
    subject: 'math',
    relatedPoints: ['math-1'],
    resources: [
      { id: 'res5', title: '定积分概念', type: 'video', url: 'https://www.bilibili.com/video/BV18x411177o/', duration: 18 }
    ],
    exercises: [
      { id: 'ex11', type: 'single', question: '∫x dx = ?', options: ['x^2', 'x^2/2', 'x^2/2 + C', '2x'], answer: 'C', explanation: '不定积分的结果' },
      { id: 'ex12', type: 'fill', question: '∫(0到1) x dx = ____', answer: '0.5', explanation: '定积分计算：[x^2/2]从0到1 = 1/2' }
    ]
  },
  {
    id: 'math-4',
    name: '数列',
    description: '研究有序数的序列规律',
    subject: 'math',
    relatedPoints: ['math-2'],
    resources: [
      { id: 'res6', title: '等差数列', type: 'video', url: 'https://www.bilibili.com/video/BV1Ks411579J/', duration: 14 }
    ],
    exercises: [
      { id: 'ex13', type: 'single', question: '等差数列 1, 3, 5, 7... 的公差是？', options: ['1', '2', '3', '4'], answer: 'B', explanation: '公差 d = 3 - 1 = 2' },
      { id: 'ex14', type: 'fill', question: '等差数列首项为2，公差为3，第5项是____', answer: '14', explanation: 'a5 = 2 + 4×3 = 14' }
    ]
  },
  {
    id: 'math-5',
    name: '概率统计',
    description: '研究随机现象和数据处理',
    subject: 'math',
    relatedPoints: ['math-6'],
    resources: [
      { id: 'res7', title: '概率基础', type: 'video', url: 'https://www.bilibili.com/video/BV1sb411i7ag/', duration: 16 }
    ],
    exercises: [
      { id: 'ex15', type: 'single', question: '掷一枚硬币，正面朝上的概率是？', options: ['0', '0.5', '1', '0.25'], answer: 'B', explanation: '正面和反面概率各为0.5' }
    ]
  },
  {
    id: 'math-6',
    name: '立体几何',
    description: '研究空间图形的性质',
    subject: 'math',
    relatedPoints: ['math-5'],
    resources: [
      { id: 'res8', title: '空间向量', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411o7gC/', duration: 15 }
    ],
    exercises: [
      { id: 'ex16', type: 'single', question: '正方体的对角线长度是边长的几倍？', options: ['1', '√2', '√3', '2'], answer: 'C', explanation: '对角线 = √(a²+a²+a²) = a√3' }
    ]
  },
  {
    id: 'chinese-1',
    name: '现代文阅读',
    description: '掌握现代文的阅读方法和技巧',
    subject: 'chinese',
    relatedPoints: ['chinese-2', 'chinese-3'],
    resources: [
      { id: 'res9', title: '现代文阅读技巧', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411K7Uv/', duration: 20 },
      { id: 'res10', title: '阅读理解答题方法', type: 'document', url: 'https://www.pep.com.cn/gzyw/jszx/tbjxzy/dzkb/bx1/202003/t20200302_1955254.htm' }
    ],
    exercises: [
      { id: 'ex17', type: 'single', question: '记叙文的六要素不包括？', options: ['时间', '地点', '人物', '主题'], answer: 'D', explanation: '六要素是时间、地点、人物、起因、经过、结果' },
      { id: 'ex18', type: 'fill', question: '小说三要素是人物、情节和____', answer: '环境', explanation: '小说三要素是人物、情节、环境' }
    ]
  },
  {
    id: 'chinese-2',
    name: '文言文阅读',
    description: '掌握文言文的理解和翻译能力',
    subject: 'chinese',
    relatedPoints: ['chinese-1', 'chinese-4'],
    resources: [
      { id: 'res11', title: '文言文实词虚词', type: 'video', url: 'https://www.bilibili.com/video/BV1at411o7cF/', duration: 22 }
    ],
    exercises: [
      { id: 'ex19', type: 'single', question: '"之"在"吾欲之南海"中是什么意思？', options: ['的', '到、往', '代词', '取消句子独立性'], answer: 'B', explanation: '之在这里是动词，意为到、往' },
      { id: 'ex20', type: 'fill', question: '"学而时习之"中"习"的意思是____', answer: '复习', explanation: '习在这里是复习、练习的意思' }
    ]
  },
  {
    id: 'chinese-3',
    name: '写作',
    description: '掌握各类文体的写作技巧',
    subject: 'chinese',
    relatedPoints: ['chinese-1'],
    resources: [
      { id: 'res12', title: '议论文写作', type: 'video', url: 'https://www.bilibili.com/video/BV1bt411o7cF/', duration: 18 }
    ],
    exercises: [
      { id: 'ex21', type: 'single', question: '议论文的三要素是？', options: ['论点、论据、论证', '开头、正文、结尾', '记叙、描写、议论', '时间、地点、人物'], answer: 'A', explanation: '议论文三要素是论点、论据、论证' }
    ]
  },
  {
    id: 'chinese-4',
    name: '诗词鉴赏',
    description: '欣赏和分析古典诗词',
    subject: 'chinese',
    relatedPoints: ['chinese-2'],
    resources: [
      { id: 'res13', title: '古诗词鉴赏方法', type: 'video', url: 'https://www.bilibili.com/video/BV1jt411o7cF/', duration: 16 }
    ],
    exercises: [
      { id: 'ex22', type: 'single', question: '"春风又绿江南岸"中"绿"字的词性是？', options: ['名词', '形容词', '动词', '副词'], answer: 'C', explanation: '绿在这里是使动用法，意为使...变绿' }
    ]
  },
  {
    id: 'physics-1',
    name: '力学',
    description: '研究物体的运动和受力',
    subject: 'physics',
    relatedPoints: ['physics-2', 'physics-3'],
    resources: [
      { id: 'res14', title: '牛顿运动定律', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411B75M/', duration: 20 },
      { id: 'res15', title: '力学基础', type: 'document', url: 'https://www.pep.com.cn/gzwl/gzwljszx/gzwlbx/gzwlkb/202003/t20200302_1954764.htm' }
    ],
    exercises: [
      { id: 'ex23', type: 'single', question: '牛顿第一定律又称为？', options: ['加速度定律', '惯性定律', '作用力反作用力定律', '万有引力定律'], answer: 'B', explanation: '牛顿第一定律也叫惯性定律' },
      { id: 'ex24', type: 'fill', question: 'F=ma 是牛顿第____定律', answer: '二', explanation: 'F=ma 是牛顿第二定律' }
    ]
  },
  {
    id: 'physics-2',
    name: '电磁学',
    description: '研究电和磁的相互作用',
    subject: 'physics',
    relatedPoints: ['physics-1', 'physics-4'],
    resources: [
      { id: 'res16', title: '电场与磁场', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411Q7x1/', duration: 22 }
    ],
    exercises: [
      { id: 'ex25', type: 'single', question: '电流的单位是？', options: ['伏特', '安培', '欧姆', '瓦特'], answer: 'B', explanation: '电流的单位是安培' }
    ]
  },
  {
    id: 'physics-3',
    name: '热学',
    description: '研究热现象和热力学规律',
    subject: 'physics',
    relatedPoints: ['physics-1'],
    resources: [
      { id: 'res17', title: '热力学基础', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411o7qH/', duration: 18 }
    ],
    exercises: [
      { id: 'ex26', type: 'single', question: '绝对零度是多少摄氏度？', options: ['0°C', '-100°C', '-273°C', '-373°C'], answer: 'C', explanation: '绝对零度是-273.15°C' }
    ]
  },
  {
    id: 'physics-4',
    name: '光学',
    description: '研究光的传播和性质',
    subject: 'physics',
    relatedPoints: ['physics-2'],
    resources: [
      { id: 'res18', title: '光的折射与反射', type: 'video', url: 'https://www.bilibili.com/video/BV1sb411i7ag/', duration: 16 }
    ],
    exercises: [
      { id: 'ex27', type: 'single', question: '光在真空中的传播速度约为？', options: ['3×10^6 m/s', '3×10^7 m/s', '3×10^8 m/s', '3×10^9 m/s'], answer: 'C', explanation: '光速约为3×10^8 m/s' }
    ]
  },
  {
    id: 'chemistry-1',
    name: '物质结构',
    description: '研究原子和分子的结构',
    subject: 'chemistry',
    relatedPoints: ['chemistry-2', 'chemistry-3'],
    resources: [
      { id: 'res19', title: '原子结构', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411Q799/', duration: 18 },
      { id: 'res20', title: '化学键', type: 'document', url: 'https://www.pep.com.cn/gzhx/gzhxjszx/gzhxbx1/gzhxkbsyjc/202003/t20200302_1954854.htm' }
    ],
    exercises: [
      { id: 'ex28', type: 'single', question: '原子的核外电子排布遵循什么原理？', options: ['能量最低原理', '质量守恒定律', '电荷守恒定律', '万有引力定律'], answer: 'A', explanation: '电子优先占据能量最低的轨道' },
      { id: 'ex29', type: 'fill', question: '质子数=____数=核电荷数', answer: '电子', explanation: '原子中质子数等于电子数' }
    ]
  },
  {
    id: 'chemistry-2',
    name: '化学反应原理',
    description: '研究化学反应的规律',
    subject: 'chemistry',
    relatedPoints: ['chemistry-1', 'chemistry-4'],
    resources: [
      { id: 'res21', title: '化学平衡', type: 'video', url: 'https://www.bilibili.com/video/BV1At411o7cF/', duration: 20 }
    ],
    exercises: [
      { id: 'ex30', type: 'single', question: '催化剂能改变什么？', options: ['反应热', '平衡常数', '反应速率', '反应物转化率'], answer: 'C', explanation: '催化剂只改变反应速率' }
    ]
  },
  {
    id: 'chemistry-3',
    name: '有机化学',
    description: '研究有机化合物的性质',
    subject: 'chemistry',
    relatedPoints: ['chemistry-1'],
    resources: [
      { id: 'res22', title: '烃类化合物', type: 'video', url: 'https://www.bilibili.com/video/BV1bt411o72q/', duration: 18 }
    ],
    exercises: [
      { id: 'ex31', type: 'single', question: '甲烷的分子式是？', options: ['CH4', 'C2H6', 'C3H8', 'C4H10'], answer: 'A', explanation: '甲烷是最简单的烷烃' }
    ]
  },
  {
    id: 'chemistry-4',
    name: '元素化合物',
    description: '研究常见元素及其化合物',
    subject: 'chemistry',
    relatedPoints: ['chemistry-2'],
    resources: [
      { id: 'res23', title: '金属元素', type: 'video', url: 'https://www.bilibili.com/video/BV1xt411o7cF/', duration: 16 }
    ],
    exercises: [
      { id: 'ex32', type: 'single', question: '下列金属中最活泼的是？', options: ['铜', '铁', '钠', '铝'], answer: 'C', explanation: '钠是最活泼的金属之一' }
    ]
  },
  {
    id: 'biology-1',
    name: '细胞生物学',
    description: '研究细胞的结构和功能',
    subject: 'biology',
    relatedPoints: ['biology-2', 'biology-3'],
    resources: [
      { id: 'res24', title: '细胞结构', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411K7Uv/', duration: 20 },
      { id: 'res25', title: '细胞膜与细胞器', type: 'document', url: 'https://www.pep.com.cn/gzsw/jshzhx/kbjc/bx1/202003/t20200302_1955114.htm' }
    ],
    exercises: [
      { id: 'ex33', type: 'single', question: '细胞的控制中心是？', options: ['细胞膜', '细胞质', '细胞核', '线粒体'], answer: 'C', explanation: '细胞核是遗传物质的储存场所' },
      { id: 'ex34', type: 'fill', question: '植物细胞特有的细胞器是____', answer: '叶绿体', explanation: '叶绿体是光合作用的场所' }
    ]
  },
  {
    id: 'biology-2',
    name: '遗传与进化',
    description: '研究遗传规律和生物进化',
    subject: 'biology',
    relatedPoints: ['biology-1', 'biology-4'],
    resources: [
      { id: 'res26', title: '孟德尔遗传定律', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411o7gC/', duration: 22 }
    ],
    exercises: [
      { id: 'ex35', type: 'single', question: 'DNA的双螺旋结构是由谁发现的？', options: ['孟德尔', '沃森和克里克', '达尔文', '摩尔根'], answer: 'B', explanation: '沃森和克里克发现了DNA双螺旋结构' }
    ]
  },
  {
    id: 'biology-3',
    name: '生态学',
    description: '研究生物与环境的关系',
    subject: 'biology',
    relatedPoints: ['biology-1'],
    resources: [
      { id: 'res27', title: '生态系统', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411Q799/', duration: 18 }
    ],
    exercises: [
      { id: 'ex36', type: 'single', question: '生态系统的组成包括？', options: ['生产者、消费者、分解者', '动物、植物、微生物', '生物群落和非生物环境', '以上都对'], answer: 'C', explanation: '生态系统包括生物群落和非生物环境' }
    ]
  },
  {
    id: 'biology-4',
    name: '生命活动调节',
    description: '研究生物体的调节机制',
    subject: 'biology',
    relatedPoints: ['biology-2'],
    resources: [
      { id: 'res28', title: '神经调节', type: 'video', url: 'https://www.bilibili.com/video/BV1sb411i7ag/', duration: 16 }
    ],
    exercises: [
      { id: 'ex37', type: 'single', question: '胰岛素的主要功能是？', options: ['升高血糖', '降低血糖', '消化脂肪', '促进生长'], answer: 'B', explanation: '胰岛素能降低血糖浓度' }
    ]
  },
  {
    id: 'computer-1',
    name: '程序设计基础',
    description: '掌握编程的基本概念和方法',
    subject: 'computer',
    relatedPoints: ['computer-2', 'computer-3'],
    resources: [
      { id: 'res29', title: 'Python入门', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411B75M/', duration: 20 },
      { id: 'res30', title: '算法基础', type: 'document', url: 'https://www.pep.com.cn/xxjs/jszx/jcjf/xxjsjc/202003/t20200302_1955234.htm' }
    ],
    exercises: [
      { id: 'ex38', type: 'single', question: 'Python中打印输出用什么函数？', options: ['echo()', 'print()', 'console.log()', 'printf()'], answer: 'B', explanation: 'Python使用print()函数输出' },
      { id: 'ex39', type: 'fill', question: 'for循环的关键字是____', answer: 'for', explanation: 'for是Python中的循环关键字' }
    ]
  },
  {
    id: 'computer-2',
    name: '数据结构',
    description: '研究数据的组织和存储方式',
    subject: 'computer',
    relatedPoints: ['computer-1', 'computer-4'],
    resources: [
      { id: 'res31', title: '数组与链表', type: 'video', url: 'https://www.bilibili.com/video/BV1Wx411Q7x1/', duration: 22 }
    ],
    exercises: [
      { id: 'ex40', type: 'single', question: '栈的特点是？', options: ['先进先出', '先进后出', '随机访问', '顺序访问'], answer: 'B', explanation: '栈是先进后出的数据结构' }
    ]
  },
  {
    id: 'computer-3',
    name: '数据库基础',
    description: '掌握数据库的基本操作',
    subject: 'computer',
    relatedPoints: ['computer-1'],
    resources: [
      { id: 'res32', title: 'SQL入门', type: 'video', url: 'https://www.icourse163.org/course/HIT-1001530001', duration: 18 }
    ],
    exercises: [
      { id: 'ex41', type: 'single', question: '查询数据用什么SQL语句？', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], answer: 'C', explanation: 'SELECT用于查询数据' }
    ]
  },
  {
    id: 'computer-4',
    name: '网络基础',
    description: '了解计算机网络的基本原理',
    subject: 'computer',
    relatedPoints: ['computer-2'],
    resources: [
      { id: 'res33', title: 'TCP/IP协议', type: 'video', url: 'https://www.bilibili.com/video/BV1xs411o7qH/', duration: 16 }
    ],
    exercises: [
      { id: 'ex42', type: 'single', question: 'HTTP协议默认端口是？', options: ['21', '22', '80', '443'], answer: 'C', explanation: 'HTTP默认端口是80' }
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
