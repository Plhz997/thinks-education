import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  MapPin, 
  Star, 
  Calendar, 
  Filter,
  Bookmark,
  ChevronRight,
  ArrowUpRight,
  Users,
  Target,
  TrendingUp
} from 'lucide-react'
import { mockInternships } from '@/data/mockData'

const schoolOptions = ['全部', '重点中学', '普通中学', '小学', '特殊教育学校']
const regionOptions = ['全部', '北京', '上海', '广州', '深圳', '成都', '杭州']
const gradeOptions = ['全部', '小学', '初中', '高中']

export function Internship() {
  const [selectedSchool, setSelectedSchool] = useState('全部')
  const [selectedRegion, setSelectedRegion] = useState('全部')
  const [selectedGrade, setSelectedGrade] = useState('全部')
  const [activeTab, setActiveTab] = useState<'opportunities' | 'recommendations'>('opportunities')

  const filteredInternships = mockInternships.filter(item => 
    (selectedSchool === '全部' || item.school.includes(selectedSchool)) &&
    (selectedRegion === '全部' || item.location.includes(selectedRegion)) &&
    (selectedGrade === '全部' || item.grade === selectedGrade)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">实习与就业支持</h1>
          <p className="text-text-secondary mt-1">从培养走向岗位与实习机会匹配</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        {[
          { id: 'opportunities', label: '实习机会', icon: Briefcase },
          { id: 'recommendations', label: '职业发展', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'opportunities' | 'recommendations')}
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

      {activeTab === 'opportunities' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-text-secondary" />
                <span className="font-medium text-text-primary">筛选条件</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学校类型</label>
                  <div className="flex flex-wrap gap-2">
                    {schoolOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedSchool(option)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedSchool === option
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">地区</label>
                  <div className="flex flex-wrap gap-2">
                    {regionOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedRegion(option)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedRegion === option
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学段</label>
                  <div className="flex flex-wrap gap-2">
                    {gradeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedGrade(option)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedGrade === option
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">定向推荐</h3>
              </div>
              <div className="space-y-3">
                {['乡村教育', '基层教育', '特殊教育'].map((option) => (
                  <button
                    key={option}
                    className="w-full flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-sm text-text-primary">{option}</span>
                    <ChevronRight className="w-4 h-4 text-text-tertiary" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInternships.map((internship) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface rounded-xl border border-border p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-text-primary">{internship.title}</h4>
                      <p className="text-sm text-text-secondary">{internship.school}</p>
                    </div>
                    <button className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors">
                      <Bookmark className="w-5 h-5 text-text-tertiary" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {internship.grade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {internship.duration}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-text-secondary mb-2">任职要求</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.requirements.map((req) => (
                        <span key={req} className="px-2 py-1 bg-surface-tertiary text-text-primary text-xs rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium text-primary">{internship.matchScore}%</span>
                      <span className="text-xs text-text-tertiary">匹配度</span>
                    </div>
                    <button className="flex items-center gap-1 text-primary text-sm hover:underline">
                      申请
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">教师职业发展路径</h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
                
                {[
                  { stage: '师范生', duration: '1-4年', description: '专业学习与技能训练', color: 'bg-primary' },
                  { stage: '实习教师', duration: '6-12个月', description: '实践教学与指导', color: 'bg-secondary' },
                  { stage: '初级教师', duration: '1-3年', description: '独立教学与班级管理', color: 'bg-accent' },
                  { stage: '骨干教师', duration: '3-5年', description: '学科带头人', color: 'bg-warning' },
                  { stage: '高级教师', duration: '5年以上', description: '教学专家与研究', color: 'bg-info' },
                ].map((item, idx) => (
                  <div key={item.stage} className="relative pl-20 py-4">
                    <div className={`absolute left-6 top-4 w-5 h-5 rounded-full ${item.color} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-text-primary">{item.stage}</h4>
                        <span className="text-xs px-2 py-0.5 bg-surface-tertiary text-text-secondary rounded">{item.duration}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">简历优化建议</h3>
              <div className="space-y-3">
                {[
                  '突出教学实践经历',
                  '量化教学成果',
                  '展示教育技术能力',
                  '添加获奖证书',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                获取优化建议
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">面试准备建议</h3>
              <div className="space-y-3">
                {[
                  { question: '自我介绍', tips: '突出师范专业优势' },
                  { question: '为什么想当老师', tips: '体现教育理想' },
                  { question: '课堂管理策略', tips: '准备具体案例' },
                  { question: '职业规划', tips: '展示发展方向' },
                ].map((item) => (
                  <div key={item.question} className="p-3 bg-surface-tertiary rounded-lg">
                    <p className="font-medium text-text-primary text-sm">{item.question}</p>
                    <p className="text-xs text-text-secondary mt-1">{item.tips}</p>
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
