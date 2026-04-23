import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, User, TrendingUp, Sparkles, Brain, BarChart3, Activity, Lightbulb, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockStudentProfile } from '@/data/mockData'

const mockStudents = [
  { id: 's1', name: '李明', grade: '高一(3)班', score: 85, weakPoints: ['函数', '几何'], learningStyle: '视觉型', progress: 78 },
  { id: 's2', name: '王芳', grade: '高一(3)班', score: 72, weakPoints: ['代数', '概率'], learningStyle: '听觉型', progress: 65 },
  { id: 's3', name: '张伟', grade: '高一(3)班', score: 92, weakPoints: ['导数'], learningStyle: '动觉型', progress: 90 },
  { id: 's4', name: '刘洋', grade: '高一(3)班', score: 68, weakPoints: ['三角函数', '数列'], learningStyle: '视觉型', progress: 58 },
]

const teachingStrategies = [
  { id: 't1', name: '分层教学', description: '根据学生水平分组教学', icon: Target, color: 'bg-primary/10 text-primary' },
  { id: 't2', name: '个性化作业', description: '根据薄弱点定制练习', icon: Sparkles, color: 'bg-accent/10 text-accent' },
  { id: 't3', name: '学习路径', description: '智能推荐学习顺序', icon: TrendingUp, color: 'bg-secondary/10 text-secondary' },
  { id: 't4', name: '反馈机制', description: '实时学习效果评估', icon: Activity, color: 'bg-warning/10 text-warning' },
]

export function Personalization() {
  const { addGrowthRecord } = useAppStore()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'strategies'>('overview')

  const handleApplyStrategy = () => {
    addGrowthRecord({
      type: 'practice',
      title: '应用差异化教学策略',
      description: '为学生制定个性化学习方案',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">个性化教育</h1>
          <p className="text-text-secondary mt-1">基于学生画像的差异化教学支持</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">班级人数</p>
              <p className="text-3xl font-bold mt-2">45</p>
            </div>
            <User className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-accent to-secondary rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">平均成绩</p>
              <p className="text-3xl font-bold mt-2">82</p>
            </div>
            <BarChart3 className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-success to-success-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">优秀率</p>
              <p className="text-3xl font-bold mt-2">28%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-warning to-warning-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">待关注</p>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>
            <AlertCircle className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
      </div>

      <div className="bg-surface rounded-xl border border-border">
        <div className="flex gap-2 p-1 bg-surface-tertiary rounded-xl mb-6">
          {[
            { id: 'overview', label: '班级概览', icon: BarChart3 },
            { id: 'students', label: '学生画像', icon: User },
            { id: 'strategies', label: '教学策略', icon: Lightbulb },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface-tertiary rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4">知识掌握分布</h4>
                <div className="space-y-4">
                  {Object.entries(mockStudentProfile.knowledgeMastery).map(([name, score]) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">{name}</span>
                        <span className="font-medium text-text-primary">{score}%</span>
                      </div>
                      <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${score >= 80 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-danger'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-tertiary rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4">学习风格分布</h4>
                <div className="space-y-4">
                  {[
                    { name: '视觉型', percentage: 45, color: 'bg-primary' },
                    { name: '听觉型', percentage: 30, color: 'bg-accent' },
                    { name: '动觉型', percentage: 25, color: 'bg-secondary' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <span className="w-20 text-sm text-text-secondary">{item.name}</span>
                      <div className="flex-1 h-8 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full ${item.color} flex items-center justify-end pr-2`}
                        >
                          <span className="text-xs text-white font-medium">{item.percentage}%</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">AI智能分析建议</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '重点关注', content: '建议加强三角函数和导数的基础教学，约30%学生存在薄弱', icon: AlertCircle, color: 'text-warning' },
                  { title: '教学建议', content: '针对视觉型学习者增加图表和动画演示', icon: Lightbulb, color: 'text-primary' },
                  { title: '学习路径', content: '推荐先巩固函数基础再学习导数知识', icon: TrendingUp, color: 'text-success' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <Icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
                      <div>
                        <h5 className="font-medium text-text-primary">{item.title}</h5>
                        <p className="text-sm text-text-secondary mt-1">{item.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStudents.map((student) => (
                <motion.div
                  key={student.id}
                  whileHover={{ y: -2 }}
                  className="p-4 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30 cursor-pointer"
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{student.name}</h4>
                      <p className="text-xs text-text-tertiary">{student.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-text-secondary">综合评分</span>
                    <span className={`font-semibold ${student.score >= 85 ? 'text-success' : student.score >= 70 ? 'text-warning' : 'text-danger'}`}>
                      {student.score}
                    </span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${student.progress >= 80 ? 'bg-success' : student.progress >= 60 ? 'bg-warning' : 'bg-danger'}`}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {student.weakPoints.slice(0, 2).map((point) => (
                      <span key={point} className="px-2 py-0.5 bg-danger/10 text-danger text-xs rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teachingStrategies.map((strategy) => {
                const Icon = strategy.icon
                return (
                  <motion.div
                    key={strategy.id}
                    whileHover={{ y: -2 }}
                    className="p-6 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${strategy.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-1">{strategy.name}</h4>
                        <p className="text-sm text-text-secondary mb-4">{strategy.description}</p>
                        <button
                          onClick={handleApplyStrategy}
                          className="px-4 py-2 border border-primary text-primary rounded-lg text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                        >
                          应用策略
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-6 bg-surface-tertiary rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">差异化教学计划</h4>
              <div className="space-y-3">
                {[
                  { title: '基础巩固组', students: ['王芳', '刘洋'], focus: '三角函数、数列基础', status: 'active' },
                  { title: '进阶提升组', students: ['李明'], focus: '导数应用拓展', status: 'active' },
                  { title: '竞赛培优组', students: ['张伟'], focus: '数学竞赛专项', status: 'active' },
                ].map((group) => (
                  <div key={group.title} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">进行中</span>
                      <span className="font-medium text-text-primary">{group.title}</span>
                      <span className="text-sm text-text-secondary">({group.students.join(', ')})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-text-tertiary">{group.focus}</span>
                      <button className="text-primary hover:text-primary-dark">查看详情</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedStudent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl w-full max-w-lg"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                    {mockStudents.find(s => s.id === selectedStudent)?.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">
                      {mockStudents.find(s => s.id === selectedStudent)?.name}
                    </h2>
                    <p className="text-text-secondary">
                      {mockStudents.find(s => s.id === selectedStudent)?.grade}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-text-tertiary hover:text-text-primary">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-tertiary rounded-xl p-4">
                  <p className="text-sm text-text-secondary">综合评分</p>
                  {(() => {
                    const student = mockStudents.find(s => s.id === selectedStudent)
                    const score = student?.score || 0
                    return (
                      <p className={`text-2xl font-bold mt-1 ${score >= 85 ? 'text-success' : score >= 70 ? 'text-warning' : 'text-danger'}`}>
                        {score}
                      </p>
                    )
                  })()}
                </div>
                <div className="bg-surface-tertiary rounded-xl p-4">
                  <p className="text-sm text-text-secondary">学习进度</p>
                  <p className="text-2xl font-bold mt-1 text-primary">
                    {mockStudents.find(s => s.id === selectedStudent)?.progress}%
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">薄弱知识点</p>
                <div className="flex flex-wrap gap-2">
                  {mockStudents.find(s => s.id === selectedStudent)?.weakPoints.map((point) => (
                    <span key={point} className="px-3 py-1 bg-danger/10 text-danger rounded-lg text-sm">
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">学习风格</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-text-primary">
                    {mockStudents.find(s => s.id === selectedStudent)?.learningStyle}学习者
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                <p className="text-sm font-medium text-text-primary mb-2">个性化建议</p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    加强{mockStudents.find(s => s.id === selectedStudent)?.weakPoints.join('、')}的专项练习
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    推荐观看相关知识点的视频讲解
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    定期进行小测验巩固学习效果
                  </li>
                </ul>
              </div>

              <button
                onClick={handleApplyStrategy}
                className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                生成个性化学习方案
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
