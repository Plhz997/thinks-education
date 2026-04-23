import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, Star, User, FileText, ArrowRight, MessageSquare, Building2, CheckCircle } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockInternships } from '@/data/mockData'

const mockCareerResources = [
  { id: 'r1', title: '教师招聘考试指南', type: 'guide', views: 1256 },
  { id: 'r2', title: '简历写作技巧', type: 'skill', views: 892 },
  { id: 'r3', title: '面试常见问题', type: 'skill', views: 1567 },
  { id: 'r4', title: '教师职业发展规划', type: 'guide', views: 654 },
]

const mockApplications = [
  { id: 'a1', company: '第一中学', position: '数学教师', date: '2024-04-20', status: 'interview' },
  { id: 'a2', company: '实验小学', position: '数学教师', date: '2024-04-18', status: 'pending' },
  { id: 'a3', company: '第三中学', position: '信息技术教师', date: '2024-04-15', status: 'rejected' },
]

export function Internship() {
  const { addGrowthRecord } = useAppStore()
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'opportunities' | 'applications' | 'resources'>('opportunities')
  const [filterMajor, setFilterMajor] = useState('all')

  const handleApply = () => {
    addGrowthRecord({
      type: 'practice',
      title: '实习申请',
      description: `申请了「${mockInternships.find(i => i.id === selectedInternship)?.title}」实习岗位`,
      timestamp: new Date().toISOString()
    })
    setSelectedInternship(null)
  }

  const filteredInternships = filterMajor === 'all' 
    ? mockInternships 
    : mockInternships.filter(i => i.subject.includes('数学'))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">实习就业</h1>
          <p className="text-text-secondary mt-1">寻找实习机会，规划职业发展</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <FileText className="w-4 h-4" />
          上传简历
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">已申请岗位</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <Briefcase className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-accent to-secondary rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">面试邀请</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>
            <MessageSquare className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-success to-success-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">匹配度最高</p>
              <p className="text-3xl font-bold mt-2">92%</p>
            </div>
            <Star className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
      </div>

      <div className="bg-surface rounded-xl border border-border">
        <div className="flex gap-2 p-1 bg-surface-tertiary rounded-xl mb-6">
          {[
            { id: 'opportunities', label: '实习机会', icon: Briefcase },
            { id: 'applications', label: '我的申请', icon: FileText },
            { id: 'resources', label: '就业资源', icon: Building2 },
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

        {activeTab === 'opportunities' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <select
                  value={filterMajor}
                  onChange={(e) => setFilterMajor(e.target.value)}
                  className="px-4 py-2 bg-surface-tertiary border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">全部学科</option>
                  <option value="math">数学</option>
                  <option value="chinese">语文</option>
                  <option value="it">信息技术</option>
                </select>
                <select className="px-4 py-2 bg-surface-tertiary border border-border rounded-xl text-sm focus:outline-none focus:border-primary">
                  <option value="all">全部地区</option>
                  <option value="beijing">北京</option>
                  <option value="shanghai">上海</option>
                  <option value="guangzhou">广州</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm">
                  智能推荐
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredInternships.map((internship) => (
                <motion.div
                  key={internship.id}
                  whileHover={{ y: -2 }}
                  className="p-6 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-text-primary text-lg">{internship.title}</h3>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          {internship.subject}
                        </span>
                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded">
                          匹配度 {internship.matchScore}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {internship.school}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {internship.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {internship.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {internship.grade}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-text-secondary mb-2">任职要求：</p>
                        <div className="flex flex-wrap gap-2">
                          {internship.requirements.map((req, idx) => (
                            <span key={idx} className="px-2 py-1 bg-surface rounded-lg text-xs text-text-secondary">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedInternship(internship.id)}
                        className="px-6 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors"
                      >
                        立即申请
                      </button>
                      <button className="px-6 py-2 border border-border text-text-primary rounded-xl text-sm hover:bg-surface transition-colors">
                        收藏
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="p-6">
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-6 bg-surface-tertiary rounded-xl border border-border">
                  <div>
                    <h4 className="font-semibold text-text-primary">{application.company}</h4>
                    <p className="text-sm text-text-secondary">{application.position}</p>
                    <p className="text-xs text-text-tertiary mt-1">申请时间：{application.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {application.status === 'interview' && (
                      <>
                        <span className="px-3 py-1 bg-warning/10 text-warning text-sm rounded-lg">面试通知</span>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors">
                          查看详情
                        </button>
                      </>
                    )}
                    {application.status === 'pending' && (
                      <span className="px-3 py-1 bg-info/10 text-info text-sm rounded-lg">待审核</span>
                    )}
                    {application.status === 'rejected' && (
                      <span className="px-3 py-1 bg-danger/10 text-danger text-sm rounded-lg">未通过</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCareerResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ y: -2 }}
                  className="p-4 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.type === 'guide' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                        {resource.type === 'guide' ? <FileText className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{resource.title}</h4>
                        <p className="text-sm text-text-secondary">{resource.views} 次浏览</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">就业指导服务</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '简历辅导', desc: '专业导师一对一简历优化', icon: FileText },
                  { title: '面试模拟', desc: '真实场景面试演练', icon: MessageSquare },
                  { title: '职业规划', desc: '个性化职业发展建议', icon: Briefcase },
                ].map((service) => {
                  const Icon = service.icon
                  return (
                    <div key={service.title} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">{service.title}</h5>
                        <p className="text-sm text-text-secondary">{service.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedInternship && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInternship(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl w-full max-w-lg"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">
                    {mockInternships.find(i => i.id === selectedInternship)?.title}
                  </h2>
                  <p className="text-text-secondary">
                    {mockInternships.find(i => i.id === selectedInternship)?.school}
                  </p>
                </div>
                <button onClick={() => setSelectedInternship(null)} className="text-text-tertiary hover:text-text-primary">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-tertiary rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                    <MapPin className="w-4 h-4" />
                    工作地点
                  </div>
                  <p className="font-medium text-text-primary">
                    {mockInternships.find(i => i.id === selectedInternship)?.location}
                  </p>
                </div>
                <div className="bg-surface-tertiary rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                    <Clock className="w-4 h-4" />
                    实习时长
                  </div>
                  <p className="font-medium text-text-primary">
                    {mockInternships.find(i => i.id === selectedInternship)?.duration}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">任职要求</p>
                <ul className="space-y-2">
                  {mockInternships.find(i => i.id === selectedInternship)?.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                <p className="text-sm font-medium text-text-primary mb-2">匹配分析</p>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">
                      {mockInternships.find(i => i.id === selectedInternship)?.matchScore}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary">
                      您的专业背景和技能与该岗位高度匹配，建议尽快申请！
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="flex-1 py-3 border border-border text-text-primary rounded-xl hover:bg-surface-tertiary transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  确认申请
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
