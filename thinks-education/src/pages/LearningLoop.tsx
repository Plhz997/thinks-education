import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  FileText, 
  CheckCircle,
  Clock,
  ChevronRight,
  Target,
  BookMarked,
  Video,
  PenTool,
  HelpCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react'
import { useAppStore } from '@/store'

const tabs = [
  { id: 'pre-class', label: '课前预习', icon: BookMarked },
  { id: 'in-class', label: '课中学习', icon: Video },
  { id: 'post-class', label: '课后复习', icon: PenTool },
  { id: 'qa', label: 'AI答疑', icon: HelpCircle },
]

const mockPreviewResources = [
  { id: 'r1', title: '第三章教育心理学概述', type: 'video', duration: 15 },
  { id: 'r2', title: '认知学习理论要点', type: 'document' },
  { id: 'r3', title: '预习思考题', type: 'exercise' },
]

const mockQuizQuestions = [
  { id: 'q1', question: '下列哪项不是建构主义学习理论的核心观点？', options: ['知识是客观存在的', '学习是主动建构', '社会性互动重要', '真实情境学习'], answer: 'A', completed: false },
  { id: 'q2', question: '维果茨基提出的"最近发展区"理论强调什么？', options: ['学生的现有水平', '潜在发展水平', '教师的指导作用', '以上都是'], answer: 'D', completed: true },
]

const mockWeakPoints = [
  { name: '教育心理学', score: 65, suggestions: ['复习第三章内容', '完成相关练习题', '观看讲解视频'] },
  { name: '教学设计', score: 72, suggestions: ['学习优秀案例', '进行实践练习', '请教指导老师'] },
  { name: '课堂管理', score: 78, suggestions: ['观摩名师课堂', '模拟课堂练习', '阅读相关文献'] },
]

export function LearningLoop() {
  const { updateClosedLoopProgress, closedLoopProgress } = useAppStore()
  const [activeTab, setActiveTab] = useState<'pre-class' | 'in-class' | 'post-class' | 'qa'>('pre-class')
  const [progress, setProgress] = useState({ preClass: 75, inClass: 60, postClass: 40, qa: 80 })

  const handleComplete = (type: 'pre-class' | 'in-class' | 'post-class' | 'qa') => {
    const key = type === 'pre-class' ? 'preClass' : type === 'in-class' ? 'inClass' : type === 'post-class' ? 'postClass' : 'qa'
    setProgress(prev => ({ ...prev, [key]: 100 }))
    const newProgress = Math.round((progress.preClass + progress.inClass + progress.postClass + progress.qa) / 4)
    updateClosedLoopProgress(newProgress)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-info/10 to-secondary/10 rounded-2xl p-6 border border-info/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-info to-secondary flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">师范生学习全过程闭环</h1>
              <p className="text-text-secondary text-sm">课前预习 — 课中学习 — 课后复习 — 答疑反馈</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{closedLoopProgress}%</p>
            <p className="text-text-secondary text-sm">闭环完成度</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {tabs.map((tab, index) => {
            const key = tab.id === 'pre-class' ? 'preClass' : tab.id === 'in-class' ? 'inClass' : tab.id === 'post-class' ? 'postClass' : 'qa'
            return (
              <div key={tab.id} className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">{tab.label}</span>
                  <span className="text-primary font-medium">{progress[key]}%</span>
                </div>
                <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress[key]}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-info to-secondary rounded-full"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {activeTab === 'pre-class' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">预习资料包</h3>
                <span className="text-sm text-text-secondary">教育心理学 - 第三章</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPreviewResources.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      resource.type === 'video' ? 'bg-secondary/10 text-secondary' :
                      resource.type === 'document' ? 'bg-info/10 text-info' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {resource.type === 'video' && <PlayCircle className="w-5 h-5" />}
                      {resource.type === 'document' && <FileText className="w-5 h-5" />}
                      {resource.type === 'exercise' && <PenTool className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{resource.title}</p>
                      <p className="text-sm text-text-tertiary">
                        {resource.type === 'video' ? `${resource.duration}分钟视频` :
                         resource.type === 'document' ? '阅读材料' : '练习题'}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-text-primary">知识点大纲</h3>
              </div>
              <div className="space-y-3">
                {['3.1 认知学习理论概述', '3.2 皮亚杰的认知发展理论', '3.3 维果茨基的社会文化理论', '3.4 建构主义学习理论'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index < 2 ? 'bg-accent/10 text-accent' : 'bg-surface-tertiary text-text-tertiary'
                    }`}>
                      {index < 2 ? <CheckCircle className="w-4 h-4" /> : <span>{index + 1}</span>}
                    </div>
                    <span className={index < 2 ? 'text-text-primary' : 'text-text-secondary'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">预习自测</h3>
                <span className="text-sm text-primary">{mockQuizQuestions.filter(q => q.completed).length}/{mockQuizQuestions.length}已完成</span>
              </div>
              <div className="space-y-4">
                {mockQuizQuestions.map((question) => (
                  <div key={question.id} className={`p-4 rounded-xl ${question.completed ? 'bg-accent/10 border border-accent/30' : 'bg-surface-tertiary'}`}>
                    <p className="text-sm text-text-primary mb-3">{question.question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, idx) => (
                        <button
                          key={idx}
                          className={`px-3 py-2 rounded-lg text-sm transition-all ${
                            question.completed && question.answer === String.fromCharCode(65 + idx)
                              ? 'bg-accent/20 text-accent'
                              : 'bg-surface border border-border hover:border-primary/50'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-3">疑问点标记</h3>
              <textarea
                placeholder="记录预习过程中的疑问..."
                className="w-full h-24 p-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm"
              />
              <button className="mt-3 w-full h-10 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                保存疑问
              </button>
            </div>

            <button
              onClick={() => handleComplete('pre-class')}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              完成预习
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'in-class' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <PlayCircle className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-text-primary font-medium">直播课占位区域</p>
                  <p className="text-text-secondary text-sm">点击播放开始学习</p>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">教育心理学第三章 - 认知学习理论</p>
                    <p className="text-sm text-text-secondary">李教授 · 第3讲</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      45分钟
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">实时白板协作</h3>
              <div className="h-48 bg-surface-tertiary rounded-xl flex items-center justify-center">
                <p className="text-text-secondary">白板协作区域</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">随堂测试</h3>
                <span className="text-sm text-warning">进行中</span>
              </div>
              <div className="p-4 bg-warning/10 rounded-xl">
                <p className="text-sm text-text-primary mb-3">下列哪个理论强调"最近发展区"？</p>
                <div className="space-y-2">
                  {['行为主义', '认知主义', '建构主义', '社会文化理论'].map((option, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 transition-all text-sm"
                    >
                      {String.fromCharCode(65 + idx)}. {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">课堂参与度</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">85%</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">发言次数</span>
                    <span className="text-text-primary">5次</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">答题正确率</span>
                    <span className="text-text-primary">80%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">互动时长</span>
                    <span className="text-text-primary">20分钟</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">提问记录</h3>
              <div className="space-y-3">
                {[
                  { question: '维果茨基的理论和皮亚杰有什么区别？', time: '10:30', answered: true },
                  { question: '如何应用最近发展区理论？', time: '25:15', answered: false },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${item.answered ? 'bg-accent/10' : 'bg-surface-tertiary'}`}>
                    <MessageCircle className={`w-5 h-5 flex-shrink-0 ${item.answered ? 'text-accent' : 'text-text-tertiary'}`} />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{item.question}</p>
                      <p className="text-xs text-text-tertiary">{item.time}</p>
                    </div>
                    {item.answered && <CheckCircle className="w-4 h-4 text-accent" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'post-class' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-text-primary">薄弱知识点专项练习</h3>
              </div>
              <div className="space-y-4">
                {mockWeakPoints.map((point) => (
                  <div key={point.name} className="p-4 bg-surface-tertiary rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-text-primary">{point.name}</span>
                      <span className={`text-lg font-bold ${point.score < 70 ? 'text-danger' : point.score < 80 ? 'text-warning' : 'text-accent'}`}>
                        {point.score}分
                      </span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden mb-3">
                      <div className={`h-full rounded-full ${point.score < 70 ? 'bg-danger' : point.score < 80 ? 'bg-warning' : 'bg-accent'}`} style={{ width: `${point.score}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {point.suggestions.map((suggestion, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">错题重做</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { subject: '教育心理学', count: 8, accuracy: 62 },
                  { subject: '教学设计', count: 5, accuracy: 75 },
                  { subject: '课堂管理', count: 3, accuracy: 80 },
                ].map((item) => (
                  <div key={item.subject} className="p-4 bg-surface-tertiary rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{item.subject}</span>
                      <span className="text-sm text-text-secondary">{item.count}道错题</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${item.accuracy}%` }} />
                      </div>
                      <span className="text-sm text-accent">{item.accuracy}%</span>
                    </div>
                    <button className="mt-3 w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm">
                      开始重做
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">变式题训练</h3>
              <div className="space-y-3">
                {['选择题变式', '填空题变式', '应用题变式', '论述题变式'].map((type) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                    <span className="text-sm text-text-primary">{type}</span>
                    <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs hover:bg-primary-dark transition-colors">
                      开始
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary">复习提醒</h3>
              </div>
              <div className="space-y-2">
                {[
                  { subject: '教育心理学第三章', time: '今天', type: '新学内容' },
                  { subject: '教学设计第二章', time: '2天后', type: '复习巩固' },
                  { subject: '课堂管理第一章', time: '5天后', type: '强化记忆' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-surface rounded-lg">
                    <div>
                      <p className="text-sm text-text-primary">{item.subject}</p>
                      <p className="text-xs text-text-tertiary">{item.type}</p>
                    </div>
                    <span className="text-sm text-accent">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleComplete('post-class')}
              className="w-full h-12 bg-gradient-to-r from-accent to-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              完成复习
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'qa' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">24小时答疑区</h3>
              <div className="space-y-4">
                {[
                  { question: '如何理解建构主义学习理论中的"知识建构"？', answer: '建构主义认为知识不是被动接受的，而是学习者主动构建的...', time: '10分钟前', views: 128 },
                  { question: '最近发展区理论在教学中有哪些应用？', answer: '最近发展区理论强调教学应走在发展前面...', time: '30分钟前', views: 89 },
                  { question: '如何设计有效的探究式教学活动？', answer: '设计探究式教学需要注意以下几点...', time: '1小时前', views: 156 },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-surface-tertiary rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <p className="font-medium text-text-primary mb-2">{item.question}</p>
                    <p className="text-sm text-text-secondary line-clamp-2">{item.answer}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-text-tertiary">
                      <span>{item.time}</span>
                      <span>{item.views}次浏览</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">热门问题</h3>
              <div className="space-y-3">
                {['建构主义与行为主义的区别', '如何激发学生学习动机', '课堂管理策略有哪些', '什么是形成性评价'].map((question, idx) => (
                  <button key={idx} className="w-full text-left p-3 hover:bg-surface-tertiary rounded-lg transition-colors text-sm text-text-primary">
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">社区讨论</h3>
              <div className="space-y-3">
                {[
                  { title: '分享我的教学设计方案', author: '张同学', replies: 12 },
                  { title: '请教：如何处理课堂突发情况', author: '李同学', replies: 8 },
                  { title: '推荐几本教育心理学书籍', author: '王同学', replies: 15 },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-surface-tertiary rounded-lg">
                    <p className="text-sm text-text-primary">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-text-tertiary">{item.author}</span>
                      <span className="text-xs text-text-tertiary">{item.replies}回复</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm">
                进入社区
              </button>
            </div>

            <button
              onClick={() => handleComplete('qa')}
              className="w-full h-12 bg-gradient-to-r from-secondary to-info text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              完成答疑
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
