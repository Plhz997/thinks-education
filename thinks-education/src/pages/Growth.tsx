import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  Download, 
  Calendar, 
  Award, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Heart, 
  FileText,
  Clock,
  BadgeCheck,
  Star,
  Zap,
  Users
} from 'lucide-react'
import { useAppStore } from '@/store'
import { mockGrowthRecords, mockUsers } from '@/data/mockData'

const recordTypeIcons: Record<string, React.ReactNode> = {
  course: <BookOpen className="w-5 h-5" />,
  practice: <Video className="w-5 h-5" />,
  qa: <MessageCircle className="w-5 h-5" />,
  ethics: <Heart className="w-5 h-5" />,
  certification: <Award className="w-5 h-5" />,
  badge: <BadgeCheck className="w-5 h-5" />,
}

const recordTypeColors: Record<string, string> = {
  course: 'bg-primary/10 text-primary',
  practice: 'bg-secondary/10 text-secondary',
  qa: 'bg-accent/10 text-accent',
  ethics: 'bg-warning/10 text-warning',
  certification: 'bg-info/10 text-info',
  badge: 'bg-primary/10 text-primary',
}

export function Growth() {
  const { user, growthRecords, setUser } = useAppStore()
  const [activeTab, setActiveTab] = useState<'timeline' | 'certification'>('timeline')
  
  if (!user) {
    setUser(mockUsers.student)
    return null
  }

  const allRecords = growthRecords.length > 0 ? growthRecords : mockGrowthRecords

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">成长档案中心</h1>
          <p className="text-text-secondary mt-1">沉淀师范生完整成长证据</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
            <Calendar className="w-4 h-4" />
            筛选时间
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            导出PDF档案
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        {[
          { id: 'timeline', label: '时间轴', icon: Clock },
          { id: 'certification', label: '资质视角', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'timeline' | 'certification')}
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

      {activeTab === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                
                <div className="space-y-6">
                  {allRecords.map((record, idx) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12"
                    >
                      <div className={`absolute left-4 top-0 w-5 h-5 rounded-full ${recordTypeColors[record.type]} flex items-center justify-center`}>
                        {recordTypeIcons[record.type]}
                      </div>
                      
                      <div className="p-4 bg-surface-tertiary rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${recordTypeColors[record.type]}`}>
                            {record.type === 'course' ? '课程学习' : 
                             record.type === 'practice' ? '试讲训练' : 
                             record.type === 'qa' ? 'AI问答' : 
                             record.type === 'ethics' ? '师德训练' : 
                             record.type === 'certification' ? '证书认证' : '荣誉徽章'}
                          </span>
                          <span className="text-xs text-text-tertiary">
                            {new Date(record.timestamp).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                        <h4 className="font-medium text-text-primary">{record.title}</h4>
                        <p className="text-sm text-text-secondary mt-1">{record.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">档案统计</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '学习记录', value: '48', color: 'text-primary' },
                  { label: '试讲次数', value: '12', color: 'text-secondary' },
                  { label: '获得徽章', value: '8', color: 'text-accent' },
                  { label: '证书认证', value: '3', color: 'text-warning' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 bg-surface-tertiary rounded-xl text-center">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">成就徽章</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: '学习之星', icon: Star },
                  { name: '实践能手', icon: Award },
                  { name: '师德标兵', icon: Heart },
                  { name: '技术达人', icon: Zap },
                  { name: '反思之星', icon: FileText },
                  { name: '协作伙伴', icon: Users },
                ].map((badge) => (
                  <div key={badge.name} className="p-3 bg-surface-tertiary rounded-xl text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <badge.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs text-text-secondary">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'certification' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4">教师资格认定材料</h3>
            <div className="space-y-4">
              {[
                { name: '普通话证书', status: '已获得', score: '二级甲等' },
                { name: '教育学成绩', status: '已通过', score: '88分' },
                { name: '教育心理学成绩', status: '已通过', score: '92分' },
                { name: '教育实习鉴定', status: '待完成', score: '' },
                { name: '体检报告', status: '待上传', score: '' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-surface-tertiary rounded-xl">
                  <div>
                    <p className="font-medium text-text-primary">{item.name}</p>
                    {item.score && <p className="text-sm text-text-secondary">{item.score}</p>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === '已获得' || item.status === '已通过'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4">就业推荐材料</h3>
            <div className="space-y-4">
              {[
                { name: '个人简历', status: '已完善', progress: 100 },
                { name: '自我介绍视频', status: '待上传', progress: 0 },
                { name: '教学作品集', status: '已完善', progress: 100 },
                { name: '获奖证书', status: '部分完善', progress: 60 },
                { name: '推荐信', status: '待获取', progress: 0 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-text-primary">{item.name}</p>
                      <p className="text-sm text-text-secondary">{item.status}</p>
                    </div>
                    <span className="text-sm font-medium text-primary">{item.progress}%</span>
                  </div>
                  <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.progress === 100 ? 'bg-accent' : item.progress > 0 ? 'bg-primary' : 'bg-border'}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
