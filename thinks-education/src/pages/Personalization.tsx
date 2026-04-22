import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  BookOpen, 
  Target, 
  Star,
  Heart,
  Zap,
  Lightbulb,
  ChevronRight,
  Award,
  CheckCircle
} from 'lucide-react'
import { mockStudentProfile } from '@/data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockRecommendations = [
  { id: 'r1', type: 'course', title: '教育大数据分析', progress: 0, reason: '基于您对教育技术的兴趣' },
  { id: 'r2', type: 'video', title: '名师课堂 - 项目式学习', progress: 0, reason: '推荐您学习创新教学方法' },
  { id: 'r3', type: 'practice', title: '编程教学实训', progress: 0, reason: '补充您的技术教学能力' },
  { id: 'r4', type: 'resource', title: '教育心理学案例集', progress: 0, reason: '强化您的理论基础' },
]

const heatmapData = [
  { name: '函数与导数', value: 85 },
  { name: '三角函数', value: 78 },
  { name: '概率统计', value: 65 },
  { name: '立体几何', value: 72 },
  { name: '数列', value: 80 },
  { name: '解析几何', value: 58 },
]

const growthData = [
  { month: '1月', score: 65 },
  { month: '2月', score: 68 },
  { month: '3月', score: 72 },
  { month: '4月', score: 75 },
  { month: '5月', score: 78 },
  { month: '6月', score: 82 },
]

export function Personalization() {
  const [activeTab, setActiveTab] = useState<'profile' | 'recommend'>('profile')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI赋能个性化教育</h1>
          <p className="text-text-secondary mt-1">构建学生画像、个性化推荐与成长分析</p>
        </div>
        <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
          {[
            { id: 'profile', label: '学生画像', icon: User },
            { id: 'recommend', label: '智能推荐', icon: Lightbulb },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'profile' | 'recommend')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-surface-tertiary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">张明</h3>
                <p className="text-text-secondary">数学教育专业 · 大三</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{mockStudentProfile.learningProgress}%</p>
                    <p className="text-sm text-text-secondary">学习进度</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-accent">{mockStudentProfile.activityLevel}%</p>
                    <p className="text-sm text-text-secondary">活跃度</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">兴趣偏好</h3>
              <div className="flex flex-wrap gap-2">
                {mockStudentProfile.interests.map((interest) => (
                  <span key={interest} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">实习倾向</h3>
              <div className="space-y-2">
                {mockStudentProfile.internshipPreference.map((pref) => (
                  <div key={pref} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                    <span className="text-sm text-text-primary">{pref}</span>
                    <Star className="w-4 h-4 text-warning fill-warning" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">知识掌握热力图</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={heatmapData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`${Number(value)}%`, '掌握程度']} />
                    <Bar 
                      dataKey="value" 
                      fill="#5B21B6" 
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">成长曲线</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`${Number(value)}分`, '综合评分']} />
                    <Bar 
                      dataKey="score" 
                      fill="#0891B2" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">画像维度</h3>
              <div className="space-y-4">
                {[
                  { name: '学习进度', score: mockStudentProfile.learningProgress, icon: BookOpen, color: 'bg-primary' },
                  { name: '知识掌握', score: 76, icon: Target, color: 'bg-secondary' },
                  { name: '教学技能', score: 78, icon: Award, color: 'bg-accent' },
                  { name: '师德发展', score: mockStudentProfile.ethicsDevelopment, icon: Heart, color: 'bg-warning' },
                  { name: '互动活跃度', score: mockStudentProfile.activityLevel, icon: Zap, color: 'bg-info' },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${item.color}/10 flex items-center justify-center`}>
                          <item.icon className={`w-4 h-4 ${item.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="text-sm text-text-primary">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{item.score}%</span>
                    </div>
                    <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">专项短板</h3>
              <div className="space-y-3">
                {[
                  { name: '学习迁移理论', gap: 35, suggestion: '建议加强学习' },
                  { name: '课堂管理技巧', gap: 22, suggestion: '建议实践提升' },
                  { name: '教育评价设计', gap: 18, suggestion: '建议补充学习' },
                ].map((item) => (
                  <div key={item.name} className="p-3 bg-danger/10 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-primary">{item.name}</span>
                      <span className="text-xs text-danger">{item.gap}%差距</span>
                    </div>
                    <p className="text-xs text-text-secondary">{item.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'recommend' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">智能推荐</h3>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">AI驱动</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 bg-surface-tertiary rounded-xl hover:border-primary/50 border border-transparent transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        rec.type === 'course' ? 'bg-primary/10 text-primary' :
                        rec.type === 'video' ? 'bg-secondary/10 text-secondary' :
                        rec.type === 'practice' ? 'bg-accent/10 text-accent' :
                        'bg-info/10 text-info'
                      }`}>
                        {rec.type === 'course' ? '课程' : rec.type === 'video' ? '视频' : rec.type === 'practice' ? '实训' : '资源'}
                      </span>
                    </div>
                    <p className="font-medium text-text-primary mb-2">{rec.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-tertiary">{rec.reason}</p>
                      <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">推荐说明</h3>
              <div className="space-y-3">
                {[
                  '基于您的学习历史和兴趣',
                  '考虑您的知识掌握情况',
                  '结合您的职业发展目标',
                  '参考同专业优秀案例',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm">
                查看推荐理由详情
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">推荐偏好设置</h3>
              <div className="space-y-3">
                {['课程', '视频', '实训', '资源'].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">{type}</span>
                    <div className="w-12 h-6 bg-surface-tertiary rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-primary rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
