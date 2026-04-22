import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Video, 
  PenTool, 
  Monitor, 
  Play, 
  Square,
  Mic,
  Camera,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { mockFeedbackMetrics } from '@/data/mockData'

const tabs = [
  { id: 'lesson-plan', label: '智能教案', icon: FileText },
  { id: 'practice', label: '虚拟试讲', icon: Video },
  { id: 'blackboard', label: '板书设计', icon: PenTool },
  { id: 'tools', label: '教学工具', icon: Monitor },
]

const gradeOptions = ['小学', '初中', '高中']
const subjectOptions = ['语文', '数学', '英语', '物理', '化学', '生物']

export function SkillTraining() {
  const [activeTab, setActiveTab] = useState('lesson-plan')
  const [selectedGrade, setSelectedGrade] = useState('初中')
  const [selectedSubject, setSelectedSubject] = useState('数学')
  const [courseTheme, setCourseTheme] = useState('')
  const [teachingObjective, setTeachingObjective] = useState('')
  const [isPracticing, setIsPracticing] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const mockLessonPlan = {
    title: '三角函数的图像与性质',
    grade: '高中',
    subject: '数学',
    duration: '45分钟',
    objectives: ['理解正弦函数的图像特征', '掌握三角函数的周期性', '能够应用三角函数解决实际问题'],
    procedures: [
      { step: '导入', content: '复习角的概念，引入三角函数', duration: '5分钟' },
      { step: '新授', content: '讲解正弦函数的定义和图像', duration: '15分钟' },
      { step: '探究', content: '小组讨论三角函数的性质', duration: '10分钟' },
      { step: '练习', content: '课堂练习，巩固知识点', duration: '10分钟' },
      { step: '总结', content: '总结本节课重点内容', duration: '5分钟' },
    ],
    materials: ['PPT课件', '三角函数图像教具', '练习题单'],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教学技能实训平台</h1>
          <p className="text-text-secondary mt-1">提升师范生试讲、教案、板书、教学工具使用能力</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-surface-tertiary'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'lesson-plan' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">教案参数设置</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学段</label>
                  <div className="flex flex-wrap gap-2">
                    {gradeOptions.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedGrade === grade
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学科</label>
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedSubject === subject
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">课程主题</label>
                  <input
                    type="text"
                    value={courseTheme}
                    onChange={(e) => setCourseTheme(e.target.value)}
                    placeholder="请输入课程主题..."
                    className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">教学目标</label>
                  <textarea
                    value={teachingObjective}
                    onChange={(e) => setTeachingObjective(e.target.value)}
                    placeholder="请输入教学目标..."
                    className="w-full h-24 px-4 py-3 bg-surface-tertiary border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <button className="mt-4 w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                生成教案框架
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">教案合规性检测</h3>
              <div className="space-y-3">
                {[
                  { item: '教学目标符合课程标准', status: 'pass' },
                  { item: '教学流程合理', status: 'pass' },
                  { item: '评价方式多元化', status: 'pass' },
                  { item: '技术整合恰当', status: 'warning' },
                  { item: '差异化教学设计', status: 'pass' },
                ].map((check) => (
                  <div key={check.item} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                    <span className="text-sm text-text-primary">{check.item}</span>
                    {check.status === 'pass' ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">生成的教案框架</h3>
              <span className="text-sm text-text-secondary">AI生成</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{mockLessonPlan.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm px-2 py-0.5 bg-primary/10 text-primary rounded">{mockLessonPlan.grade}</span>
                    <span className="text-sm px-2 py-0.5 bg-secondary/10 text-secondary rounded">{mockLessonPlan.subject}</span>
                    <span className="text-sm text-text-tertiary">{mockLessonPlan.duration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">教学目标</h4>
                <ul className="space-y-2">
                  {mockLessonPlan.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-text-secondary">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">教学流程</h4>
                <div className="space-y-3">
                  {mockLessonPlan.procedures.map((proc) => (
                    <div key={proc.step} className="flex items-center gap-4 p-3 bg-surface-tertiary rounded-lg">
                      <span className="w-16 text-sm font-medium text-primary">{proc.step}</span>
                      <span className="flex-1 text-sm text-text-secondary">{proc.content}</span>
                      <span className="text-sm text-text-tertiary">{proc.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">推荐资源</h4>
                <div className="flex flex-wrap gap-2">
                  {mockLessonPlan.materials.map((material) => (
                    <span key={material} className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
                  编辑教案
                </button>
                <button className="flex-1 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  保存教案
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'practice' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="relative h-96 bg-surface-tertiary rounded-xl flex items-center justify-center">
                {isPracticing ? (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-10 h-10 text-danger" />
                    </div>
                    <p className="text-text-secondary">正在录制试讲...</p>
                    <p className="text-sm text-text-tertiary">已录制: 05:32</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Video className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-text-secondary">虚拟试讲区域</p>
                    <p className="text-sm text-text-tertiary">点击下方按钮开始试讲</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setIsPracticing(!isPracticing)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isPracticing
                      ? 'bg-danger text-white'
                      : 'bg-primary text-white hover:opacity-90'
                  }`}
                >
                  {isPracticing ? (
                    <>
                      <Square className="w-5 h-5" />
                      结束试讲
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      开始试讲
                    </>
                  )}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:bg-surface-tertiary transition-colors">
                  <Mic className="w-5 h-5" />
                  麦克风设置
                </button>
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-accent/10 rounded-xl"
                >
                  <p className="text-accent font-medium mb-2">试讲分析完成！</p>
                  <p className="text-sm text-text-secondary">以下是您的试讲反馈报告</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">试讲反馈指标</h3>
              <div className="space-y-4">
                {mockFeedbackMetrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-primary">{metric.name}</span>
                      <span className="text-sm font-medium text-primary">{metric.score}</span>
                    </div>
                    <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{metric.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">评分详情</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                    <motion.circle
                      cx="48" cy="48" r="42" fill="none" stroke="#5B21B6" strokeWidth="10"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.82 }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">82</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-2">综合评分</p>
                <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity" onClick={() => setShowFeedback(true)}>
                  查看详细报告
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'blackboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4">板书设计</h3>
            <div className="relative h-80 bg-surface-tertiary rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PenTool className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-text-secondary">板书设计区域</p>
                <p className="text-sm text-text-tertiary">支持手写输入和模板选择</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              {['标题式', '提纲式', '图示式', '表格式'].map((template) => (
                <button
                  key={template}
                  className="px-3 py-2 bg-surface-tertiary rounded-lg text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">OCR识别结果</h3>
              <div className="p-4 bg-surface-tertiary rounded-xl">
                <p className="text-sm text-text-secondary">
                  <strong>识别内容：</strong><br />
                  三角函数的图像与性质<br />
                  一、正弦函数 y = sin(x)<br />
                  二、余弦函数 y = cos(x)<br />
                  三、周期性与对称性
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">板书评价</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-primary">布局评分</span>
                    <span className="text-sm font-medium text-accent">85分</span>
                  </div>
                  <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-primary">重点突出度</span>
                    <span className="text-sm font-medium text-primary">92分</span>
                  </div>
                  <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'tools' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">虚拟训练环境</h3>
              <div className="relative h-80 bg-surface-tertiary rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-text-secondary">希沃白板/雨课堂训练环境</p>
                  <p className="text-sm text-text-tertiary">模拟真实教学工具操作</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">工具培训课程</h3>
              <div className="space-y-3">
                {[
                  { title: '希沃白板基础操作', progress: 75 },
                  { title: '雨课堂互动功能', progress: 50 },
                  { title: 'PPT高级技巧', progress: 30 },
                  { title: '在线教学平台使用', progress: 0 },
                ].map((course) => (
                  <div key={course.title} className="p-3 bg-surface-tertiary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-primary">{course.title}</span>
                      <span className="text-xs text-text-tertiary">{course.progress}%</span>
                    </div>
                    <div className="relative h-1.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">故障情景训练</h3>
              <div className="space-y-3">
                {['设备连接失败', '网络中断', '软件崩溃', '投影故障'].map((scenario) => (
                  <button key={scenario} className="w-full flex items-center justify-between p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors">
                    <span className="text-sm text-text-primary">{scenario}</span>
                    <ChevronRight className="w-4 h-4 text-text-tertiary" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
