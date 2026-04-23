import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Video, 
  MessageCircle, 
  Heart, 
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Play,
  FileText,
  Award
} from 'lucide-react'
import { useAppStore } from '@/store'
import { mockUsers, mockCourses, mockTasks, mockLearningRecords, majorNames } from '@/data/mockData'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer as LineResponsiveContainer } from 'recharts'

const learningTrendData = [
  { week: '第1周', hours: 12, score: 75 },
  { week: '第2周', hours: 15, score: 78 },
  { week: '第3周', hours: 18, score: 82 },
  { week: '第4周', hours: 14, score: 80 },
  { week: '第5周', hours: 20, score: 85 },
  { week: '第6周', hours: 16, score: 88 },
  { week: '第7周', hours: 19, score: 86 },
  { week: '当前周', hours: 17, score: 90 },
]

export function Dashboard() {
  const { user, growthDimensions, courses, tasks, learningRecords, setUser, closedLoopProgress } = useAppStore()

  if (!user) {
    setUser(mockUsers.student)
    return null
  }

  const pendingTasks = tasks.length > 0 ? tasks.filter(t => t.status !== 'completed') : mockTasks.filter(t => t.status !== 'completed')
  const recentRecords = learningRecords.length > 0 ? learningRecords.slice(0, 5) : mockLearningRecords.slice(0, 5)
  const userCourses = courses.length > 0 ? courses.filter(c => c.major === user.major || !c.major) : mockCourses.filter(c => c.major === user.major || !c.major)
  
  const totalProgress = userCourses.reduce((acc, c) => acc + c.progress, 0) / userCourses.length

  const studentQuickActions = [
    { id: 'practice', label: '去试讲', icon: Video, color: 'bg-primary' },
    { id: 'qa', label: '去问答', icon: MessageCircle, color: 'bg-secondary' },
    { id: 'review', label: '去评课', icon: FileText, color: 'bg-accent' },
    { id: 'ethics', label: '师德训练', icon: Heart, color: 'bg-warning' },
  ]

  const teacherQuickActions = [
    { id: 'observation', label: '课堂观察', icon: Video, color: 'bg-primary' },
    { id: 'assessment', label: '实训评估', icon: FileText, color: 'bg-secondary' },
    { id: 'students', label: '学生管理', icon: Target, color: 'bg-accent' },
    { id: 'qa', label: '答疑辅导', icon: MessageCircle, color: 'bg-success' },
  ]

  const adminQuickActions = [
    { id: 'users', label: '用户管理', icon: Target, color: 'bg-primary' },
    { id: 'courses', label: '课程管理', icon: BookOpen, color: 'bg-secondary' },
    { id: 'statistics', label: '数据统计', icon: TrendingUp, color: 'bg-accent' },
    { id: 'system', label: '系统配置', icon: Award, color: 'bg-warning' },
  ]

  const quickActions = user.role === 'student' ? studentQuickActions : user.role === 'teacher' ? teacherQuickActions : adminQuickActions

  const priorityColors: Record<string, string> = {
    high: 'bg-danger/10 text-danger',
    medium: 'bg-warning/10 text-warning',
    low: 'bg-info/10 text-info'
  }

  const getWelcomeMessage = () => {
    if (user.role === 'student') {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">欢迎回来，{user.name}</p>
              <h1 className="text-2xl font-bold mb-2">{majorNames[user.major]}专业</h1>
              <p className="text-white/80">{user.class} | {user.semester}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{totalProgress.toFixed(0)}%</p>
              <p className="text-white/80 text-sm">课程完成度</p>
            </div>
          </div>
        </motion.div>
      )
    } else if (user.role === 'teacher') {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent to-secondary rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">欢迎回来，{user.name}</p>
              <h1 className="text-2xl font-bold mb-2">指导教师工作台</h1>
              <p className="text-white/80">{user.school} | {user.department}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">12</p>
              <p className="text-white/80 text-sm">指导学生数</p>
            </div>
          </div>
        </motion.div>
      )
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-warning to-warning-dark rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">欢迎回来，{user.name}</p>
              <h1 className="text-2xl font-bold mb-2">管理员控制台</h1>
              <p className="text-white/80">{user.school} | 教务处</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">256</p>
              <p className="text-white/80 text-sm">平台用户数</p>
            </div>
          </div>
        </motion.div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {getWelcomeMessage()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: '已修课程', value: `${userCourses.filter(c => c.status === 'completed').length}/${userCourses.length}`, color: 'from-primary to-primary-light' },
          { icon: Video, label: '见习次数', value: '12次', color: 'from-secondary to-secondary-light' },
          { icon: MessageCircle, label: 'AI助教使用', value: '45次', color: 'from-accent to-accent-light' },
          { icon: Heart, label: '师德训练', value: '85%', color: 'from-warning to-amber-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-surface rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">学习成长雷达</h2>
            <span className="text-sm text-text-secondary">本学年数据</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={growthDimensions.map(d => ({ name: d.name, value: d.score, fullMark: 100 }))}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <Radar name="成长值" dataKey="value" stroke="#5B21B6" fill="#5B21B6" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">本周待办</h2>
            <span className="text-sm text-text-secondary">{pendingTasks.length}项待完成</span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-surface-tertiary rounded-lg">
                <div className={`w-6 h-6 rounded-full ${task.priority === 'high' ? 'bg-danger' : task.priority === 'medium' ? 'bg-warning' : 'bg-info'} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-text-tertiary" />
                    <span className="text-xs text-text-tertiary">{task.dueDate}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">学习趋势</h2>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="h-48">
            <LineResponsiveContainer width="100%" height="100%">
              <LineChart data={learningTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                  formatter={(value) => [`${Number(value)}小时`, '学习时长']}
                />
                <Legend />
                <Line type="monotone" dataKey="hours" name="学习时长" stroke="#5B21B6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="score" name="平均成绩" stroke="#0891B2" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </LineResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">最近学习记录</h2>
            <span className="text-sm text-text-secondary">查看全部</span>
          </div>
          <div className="space-y-3">
            {recentRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-3 p-3 hover:bg-surface-tertiary rounded-lg transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  record.type === 'course' ? 'bg-primary/10 text-primary' :
                  record.type === 'practice' ? 'bg-secondary/10 text-secondary' :
                  record.type === 'qa' ? 'bg-accent/10 text-accent' :
                  'bg-warning/10 text-warning'
                }`}>
                  {record.type === 'course' && <BookOpen className="w-5 h-5" />}
                  {record.type === 'practice' && <Video className="w-5 h-5" />}
                  {record.type === 'qa' && <MessageCircle className="w-5 h-5" />}
                  {record.type === 'ethics' && <Heart className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{record.title}</p>
                  <p className="text-xs text-text-tertiary">
                    {new Date(record.timestamp).toLocaleDateString('zh-CN')}
                    {record.duration && ` · ${record.duration}分钟`}
                  </p>
                </div>
                {record.score && (
                  <span className="text-sm font-medium text-accent">{record.score}分</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">快捷入口</h2>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => window.location.href = `/${action.id === 'practice' ? 'skill-training' : action.id === 'qa' ? 'ai-assistant' : action.id === 'review' ? 'observation' : 'ethics'}`}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-text-primary">{action.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium text-text-primary">学习闭环完成度</span>
            </div>
            <div className="relative h-3 bg-surface-tertiary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${closedLoopProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
            <p className="text-right text-sm font-medium text-primary mt-2">{closedLoopProgress}%</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold text-text-primary">个性化推荐</h2>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">AI推荐</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: '导数应用专题', type: '课程', progress: 0, action: '开始学习' },
            { title: '名师课堂 - 三角函数', type: '视频', progress: 0, action: '观看' },
            { title: '探究式教学案例', type: '案例', progress: 0, action: '查看' },
            { title: '数学思维训练', type: '练习', progress: 0, action: '开始' },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-surface-tertiary rounded-xl hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 bg-info/10 text-info rounded-full">{item.type}</span>
                <Play className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-medium text-text-primary mb-3">{item.title}</p>
              <div className="flex items-center justify-between">
                <div className="w-20 h-1.5 bg-surface rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full`} style={{ width: `${item.progress}%` }} />
                </div>
                <span className="text-sm text-primary font-medium">{item.action}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
