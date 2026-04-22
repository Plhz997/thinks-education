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
  HelpCircle
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

const mockOutline = [
  { id: 'o1', title: '认知学习理论', children: ['行为主义', '认知主义', '建构主义'] },
  { id: 'o2', title: '学习动机理论', children: ['需要层次理论', '成就动机理论'] },
  { id: 'o3', title: '学习迁移理论', children: ['形式训练说', '共同要素说'] },
]

const mockQuiz = {
  question: '以下哪个理论强调学习者主动构建知识？',
  options: ['行为主义', '认知主义', '建构主义', '人本主义'],
  answer: 'C',
}

const mockWeakPoints = [
  { name: '学习迁移理论', score: 55, suggestion: '建议复习迁移类型及影响因素' },
  { name: '成就动机理论', score: 62, suggestion: '建议理解期望-价值理论' },
  { name: '认知策略', score: 68, suggestion: '建议多做相关练习' },
]

const mockHotQuestions = [
  { id: 'q1', title: '如何激发学生的学习动机？', views: 156, answers: 23 },
  { id: 'q2', title: '建构主义在课堂中的应用', views: 142, answers: 18 },
  { id: 'q3', title: '如何处理学生的学习焦虑？', views: 128, answers: 31 },
]

export function LearningLoop() {
  const { closedLoopProgress, updateClosedLoopProgress } = useAppStore()
  const [activeTab, setActiveTab] = useState('pre-class')
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState('')

  const handleCompleteStep = (stepId: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepId]: true }))
    const newProgress = Math.min(100, closedLoopProgress + 10)
    updateClosedLoopProgress(newProgress)
  }

  const handleSubmitQuiz = () => {
    setShowQuizResult(true)
    if (quizAnswer === mockQuiz.answer) {
      handleCompleteStep('quiz')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">师范生学习全过程闭环</h1>
          <p className="text-text-secondary mt-1">实现课前预习—课中学习—课后复习—答疑反馈的完整闭环</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <span className="font-semibold text-text-primary">学习闭环完成度</span>
        </div>
        <div className="relative h-4 bg-surface-tertiary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${closedLoopProgress}%` }}
            transition={{ duration: 1 }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-text-secondary">课前预习</span>
          <span className="text-text-secondary">课中学习</span>
          <span className="text-text-secondary">课后复习</span>
          <span className="text-text-secondary">答疑反馈</span>
        </div>
        <p className="text-right text-lg font-bold text-primary mt-2">{closedLoopProgress}%</p>
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

      <div className="space-y-6">
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
                  <span className="text-sm text-text-secondary">{mockPreviewResources.length}份资料</span>
                </div>
                <div className="space-y-3">
                  {mockPreviewResources.map((resource) => (
                    <button
                      key={resource.id}
                      onClick={() => handleCompleteStep(`resource-${resource.id}`)}
                      className="w-full flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl hover:bg-primary/5 transition-colors group"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        resource.type === 'video' ? 'bg-secondary/10 text-secondary' :
                        resource.type === 'document' ? 'bg-primary/10 text-primary' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {resource.type === 'video' && <PlayCircle className="w-6 h-6" />}
                        {resource.type === 'document' && <FileText className="w-6 h-6" />}
                        {resource.type === 'exercise' && <PenTool className="w-6 h-6" />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-text-primary">{resource.title}</p>
                        {resource.duration && (
                          <p className="text-sm text-text-tertiary">{resource.duration}分钟</p>
                        )}
                      </div>
                      {completedSteps[`resource-${resource.id}`] ? (
                        <CheckCircle className="w-5 h-5 text-accent" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">预习自测题</h3>
                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <p className="text-text-primary mb-4">{mockQuiz.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mockQuiz.options.map((option, idx) => {
                      const letter = String.fromCharCode(65 + idx)
                      return (
                        <button
                          key={letter}
                          onClick={() => !showQuizResult && setQuizAnswer(letter)}
                          className={`p-3 rounded-lg text-left transition-all ${
                            showQuizResult
                              ? letter === mockQuiz.answer
                                ? 'bg-accent/10 text-accent border border-accent'
                                : letter === quizAnswer
                                  ? 'bg-danger/10 text-danger border border-danger'
                                  : 'bg-surface border border-border'
                              : quizAnswer === letter
                                ? 'bg-primary/10 text-primary border border-primary'
                                : 'bg-surface border border-border hover:border-primary/50'
                          }`}
                        >
                          <span className="font-medium mr-2">{letter}.</span>
                          {option}
                        </button>
                      )
                    })}
                  </div>
                  {!showQuizResult ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!quizAnswer}
                      className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      提交答案
                    </button>
                  ) : (
                    <div className={`mt-4 p-3 rounded-lg ${quizAnswer === mockQuiz.answer ? 'bg-accent/10' : 'bg-danger/10'}`}>
                      <p className={`font-medium ${quizAnswer === mockQuiz.answer ? 'text-accent' : 'text-danger'}`}>
                        {quizAnswer === mockQuiz.answer ? '回答正确！' : '回答错误，正确答案是 C'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">知识点大纲</h3>
                <div className="space-y-3">
                  {mockOutline.map((item) => (
                    <div key={item.id}>
                      <button className="w-full flex items-center justify-between p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors">
                        <span className="font-medium text-text-primary">{item.title}</span>
                        <ChevronRight className="w-5 h-5 text-text-tertiary" />
                      </button>
                      <div className="ml-4 space-y-2 mt-2">
                        {item.children.map((child) => (
                          <button key={child} className="w-full text-left p-2 text-sm text-text-secondary hover:text-primary hover:bg-surface-tertiary rounded transition-colors">
                            • {child}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">疑问点标记</h3>
                <textarea
                  placeholder="记录您在预习过程中的疑问..."
                  className="w-full h-32 px-4 py-3 bg-surface-tertiary border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button className="mt-3 w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
                  保存疑问
                </button>
              </div>
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
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">直播课程</h3>
                <div className="relative h-80 bg-surface-tertiary rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-text-secondary">课程直播区域</p>
                    <p className="text-sm text-text-tertiary">等待课程开始...</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">实时白板协作</h3>
                <div className="relative h-64 bg-surface-tertiary rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <PenTool className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-text-secondary">白板协作区域</p>
                    <p className="text-sm text-text-tertiary">支持多人实时协作</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">课堂参与度</h3>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                      <motion.circle
                        cx="64" cy="64" r="56" fill="none" stroke="#5B21B6" strokeWidth="12"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.75 }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">75%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-surface-tertiary rounded-lg">
                      <p className="text-sm text-text-secondary">发言次数</p>
                      <p className="text-xl font-bold text-primary">8</p>
                    </div>
                    <div className="p-3 bg-surface-tertiary rounded-lg">
                      <p className="text-sm text-text-secondary">答题正确</p>
                      <p className="text-xl font-bold text-accent">12/15</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">提问记录</h3>
                <div className="space-y-3">
                  {[
                    { id: 'q1', content: '请问建构主义和认知主义的区别是什么？', time: '14:30' },
                    { id: 'q2', content: '学习迁移有哪些类型？', time: '15:12' },
                  ].map((question) => (
                    <div key={question.id} className="p-3 bg-surface-tertiary rounded-lg">
                      <p className="text-sm text-text-primary">{question.content}</p>
                      <p className="text-xs text-text-tertiary mt-1">{question.time}</p>
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
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">薄弱知识点专项练习</h3>
                <div className="space-y-4">
                  {mockWeakPoints.map((point) => (
                    <div key={point.name} className="p-4 bg-surface-tertiary rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text-primary">{point.name}</span>
                        <span className={`text-sm font-medium ${point.score < 60 ? 'text-danger' : point.score < 70 ? 'text-warning' : 'text-accent'}`}>
                          {point.score}分
                        </span>
                      </div>
                      <div className="relative h-2 bg-surface rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full ${point.score < 60 ? 'bg-danger' : point.score < 70 ? 'bg-warning' : 'bg-accent'}`}
                          style={{ width: `${point.score}%` }}
                        />
                      </div>
                      <p className="text-sm text-text-secondary">{point.suggestion}</p>
                      <button className="mt-3 px-4 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors">
                        开始专项练习
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary">错题重做</h3>
                  <span className="text-sm text-accent">5道待重做</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <button key={i} className="w-full flex items-center gap-3 p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                        <span className="text-danger font-medium">{i}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-text-primary truncate">教育心理学第{i}章测验错题</p>
                        <p className="text-xs text-text-tertiary">错误次数: {i+1}次</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-tertiary" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">复习提醒</h3>
                <div className="p-4 bg-accent/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-accent">艾宾浩斯遗忘曲线提醒</p>
                      <p className="text-sm text-text-secondary">建议今天复习：认知学习理论</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity">
                  开始复习
                </button>
              </div>
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
                    { id: 'a1', question: '如何设计有效的课堂提问？', answer: '设计有效提问需要考虑：1）问题的目的性；2）问题的层次性；3）问题的启发性；4）问题的开放性。建议参考布鲁姆认知目标分类理论来设计不同层次的问题。', time: '2小时前' },
                    { id: 'a2', question: '如何处理课堂中的突发情况？', answer: '处理课堂突发情况的原则：1）保持冷静；2）快速评估；3）灵活应对；4）事后反思。具体策略包括转移注意力、冷处理、课后谈话等。', time: '5小时前' },
                  ].map((item) => (
                    <div key={item.id} className="p-4 bg-surface-tertiary rounded-xl">
                      <p className="font-medium text-text-primary mb-2">{item.question}</p>
                      <p className="text-sm text-text-secondary">{item.answer}</p>
                      <p className="text-xs text-text-tertiary mt-2">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">热门问题</h3>
                <div className="space-y-3">
                  {mockHotQuestions.map((question) => (
                    <button key={question.id} className="w-full flex items-center gap-3 p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors text-left">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{question.title}</p>
                        <p className="text-xs text-text-tertiary">{question.views}浏览 · {question.answers}回答</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">社区讨论</h3>
                <div className="p-4 bg-primary/5 rounded-xl">
                  <p className="text-sm text-text-secondary mb-3">有问题？加入社区与其他师范生一起讨论！</p>
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    进入社区
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
