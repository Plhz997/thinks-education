import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Star, BookOpen, CheckCircle, Calendar, TrendingUp, Target, FileText, Download, Share2, ChevronRight } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockGrowthRecords } from '@/data/mockData'

const mockCertificates = [
  { id: 'c1', name: '普通话二级甲等', issuer: '国家语言文字工作委员会', date: '2024-01-20', status: 'verified' },
  { id: 'c2', name: '教师资格证（高中数学）', issuer: '教育部', date: '2024-06-15', status: 'pending' },
  { id: 'c3', name: '教育技术能力证书', issuer: '教育部教育信息化技术标准委员会', date: '2024-03-10', status: 'verified' },
]

const mockBadges = [
  { id: 'b1', name: '学习之星', description: '连续四周完成学习任务', icon: Star, color: 'bg-warning/10 text-warning' },
  { id: 'b2', name: '师德标兵', description: '师德情境训练全部优秀', icon: Award, color: 'bg-primary/10 text-primary' },
  { id: 'b3', name: '实践能手', description: '完成10次以上教学实践', icon: CheckCircle, color: 'bg-success/10 text-success' },
  { id: 'b4', name: '知识达人', description: '完成全部课程学习', icon: BookOpen, color: 'bg-accent/10 text-accent' },
]

const skillGrowth = [
  { month: '1月', teachingDesign: 65, classroomManagement: 55, teachingEvaluation: 50, itSkills: 70 },
  { month: '2月', teachingDesign: 70, classroomManagement: 60, teachingEvaluation: 55, itSkills: 75 },
  { month: '3月', teachingDesign: 75, classroomManagement: 68, teachingEvaluation: 62, itSkills: 82 },
  { month: '4月', teachingDesign: 82, classroomManagement: 75, teachingEvaluation: 70, itSkills: 88 },
]

export function Growth() {
  const { growthRecords, user } = useAppStore()
  const [activeTab, setActiveTab] = useState<'timeline' | 'skills' | 'achievements'>('timeline')

  const allRecords = [...mockGrowthRecords, ...growthRecords].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen
      case 'practice': return Target
      case 'ethics': return Award
      case 'certification': return FileText
      case 'badge': return Star
      default: return CheckCircle
    }
  }

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-primary/10 text-primary border-primary/20'
      case 'practice': return 'bg-accent/10 text-accent border-accent/20'
      case 'ethics': return 'bg-warning/10 text-warning border-warning/20'
      case 'certification': return 'bg-success/10 text-success border-success/20'
      case 'badge': return 'bg-secondary/10 text-secondary border-secondary/20'
      default: return 'bg-surface-tertiary text-text-secondary border-border'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">成长档案</h1>
          <p className="text-text-secondary mt-1">记录你的师范生成长轨迹</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-border text-text-primary rounded-xl flex items-center gap-2 hover:bg-surface-tertiary transition-colors">
            <Share2 className="w-4 h-4" />
            分享档案
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors">
            <Download className="w-4 h-4" />
            导出PDF
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">总学习时长</p>
              <p className="text-3xl font-bold mt-2">128 小时</p>
            </div>
            <BookOpen className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-accent to-secondary rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">获得徽章</p>
              <p className="text-3xl font-bold mt-2">4 枚</p>
            </div>
            <Star className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-success to-success-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">证书数量</p>
              <p className="text-3xl font-bold mt-2">3 个</p>
            </div>
            <Award className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-warning to-warning-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">实践次数</p>
              <p className="text-3xl font-bold mt-2">15 次</p>
            </div>
            <Target className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border">
          <div className="flex gap-2 p-1 bg-surface-tertiary rounded-xl mb-6">
            {[
              { id: 'timeline', label: '成长时间线', icon: Calendar },
              { id: 'skills', label: '能力成长', icon: TrendingUp },
              { id: 'achievements', label: '成就展示', icon: Award },
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

          {activeTab === 'timeline' && (
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                <div className="space-y-6">
                  {allRecords.map((record, index) => {
                    const Icon = getRecordIcon(record.type)
                    return (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-12"
                      >
                        <div className={`absolute left-0 w-8 h-8 rounded-full ${getRecordColor(record.type)} flex items-center justify-center border`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="bg-surface-tertiary rounded-xl p-4 border border-border">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-text-primary">{record.title}</h4>
                              <p className="text-sm text-text-secondary mt-1">{record.description}</p>
                            </div>
                            <span className="text-xs text-text-tertiary whitespace-nowrap">
                              {new Date(record.timestamp).toLocaleDateString('zh-CN')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: '教学设计', current: 82, target: 90, color: 'bg-primary' },
                  { name: '课堂管理', current: 75, target: 85, color: 'bg-accent' },
                  { name: '教学评价', current: 68, target: 80, color: 'bg-secondary' },
                  { name: '信息技术', current: 90, target: 95, color: 'bg-success' },
                ].map((skill) => (
                  <div key={skill.name} className="bg-surface-tertiary rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{skill.name}</span>
                      <span className="text-sm text-text-secondary">{skill.current} / {skill.target}</span>
                    </div>
                    <div className="h-3 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.current}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-text-tertiary">
                      <span>当前水平</span>
                      <span>目标水平</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-surface-tertiary rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4">能力成长趋势</h4>
                <div className="flex items-end justify-between h-48 gap-4">
                  {skillGrowth.map((monthData) => (
                    <div key={monthData.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex gap-1 h-32">
                        <div className="w-3 rounded-t-lg bg-primary" style={{ height: `${monthData.teachingDesign}%` }} title="教学设计"></div>
                        <div className="w-3 rounded-t-lg bg-accent" style={{ height: `${monthData.classroomManagement}%` }} title="课堂管理"></div>
                        <div className="w-3 rounded-t-lg bg-secondary" style={{ height: `${monthData.teachingEvaluation}%` }} title="教学评价"></div>
                        <div className="w-3 rounded-t-lg bg-success" style={{ height: `${monthData.itSkills}%` }} title="信息技术"></div>
                      </div>
                      <span className="text-sm text-text-secondary">{monthData.month}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <span className="text-text-secondary">教学设计</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent"></div>
                    <span className="text-text-secondary">课堂管理</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-secondary"></div>
                    <span className="text-text-secondary">教学评价</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-success"></div>
                    <span className="text-text-secondary">信息技术</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockBadges.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ y: -4 }}
                      className={`p-4 rounded-xl border ${badge.color} border-current`}
                    >
                      <Icon className="w-10 h-10 mx-auto mb-2" />
                      <h4 className="font-semibold text-center">{badge.name}</h4>
                      <p className="text-xs text-center mt-1 opacity-70">{badge.description}</p>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-text-primary mb-4">证书列表</h4>
                <div className="space-y-3">
                  {mockCertificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 bg-surface-tertiary rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cert.status === 'verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                          {cert.status === 'verified' ? <CheckCircle className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="font-medium text-text-primary">{cert.name}</h5>
                          <p className="text-sm text-text-secondary">{cert.issuer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-tertiary">{cert.date}</p>
                        {cert.status === 'verified' && (
                          <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded">已认证</span>
                        )}
                        {cert.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded">待认证</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{user?.name}</h3>
                <p className="text-white/80 text-sm">{user?.school} · {user?.department}</p>
                <p className="text-white/60 text-xs">{user?.class}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold">3.8</p>
                <p className="text-xs text-white/80">平均绩点</p>
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-white/80">综合评分</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-white/80">获得奖项</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <h4 className="font-semibold text-text-primary mb-4">成长里程碑</h4>
            <div className="space-y-3">
              {[
                { title: '完成全部必修课程', progress: 90, status: 'active' },
                { title: '获得教师资格证', progress: 60, status: 'active' },
                { title: '完成教育实习', progress: 30, status: 'pending' },
                { title: '成为正式教师', progress: 10, status: 'pending' },
              ].map((milestone) => (
                <div key={milestone.title}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">{milestone.title}</span>
                    <span className="text-sm font-medium text-text-primary">{milestone.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${milestone.progress}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${milestone.status === 'active' ? 'bg-primary' : 'bg-border'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <h4 className="font-semibold text-text-primary mb-4">下一步目标</h4>
            <div className="space-y-3">
              {[
                '完成教育心理学课程',
                '参加校级教学技能竞赛',
                '完成10次试讲训练',
                '完善个人实习简历',
              ].map((goal, index) => (
                <div key={goal} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${index < 2 ? 'bg-primary text-white' : 'bg-surface-tertiary text-text-secondary'}`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-text-secondary">{goal}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors">
              查看全部目标
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
