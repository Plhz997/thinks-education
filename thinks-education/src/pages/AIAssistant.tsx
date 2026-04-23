import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Mic, Image, FileText, Sparkles, Clock, Bot, ChevronDown, Target, Users, Lightbulb } from 'lucide-react'
import { useAppStore } from '@/store'

const quickQuestions = [
  { id: 'q1', label: '什么是建构主义学习理论？', type: 'theory' },
  { id: 'q2', label: '如何设计一节探究式数学课？', type: 'design' },
  { id: 'q3', label: '课堂上学生注意力不集中怎么办？', type: 'management' },
  { id: 'q4', label: '如何优化我的教案设计？', type: 'design' },
]

const mockAnswers: Record<string, { answer: string; reasoning: string; type: string }> = {
  q1: {
    answer: '建构主义学习理论认为，学习是学习者主动建构知识的过程，而不是被动接受信息。学习者基于已有的知识和经验，通过与环境的互动来构建新的理解。核心观点包括：1) 知识不是客观存在的，而是学习者建构的；2) 学习是主动的过程；3) 社会性互动对学习至关重要；4) 学习应在真实情境中进行。',
    reasoning: '分析用户问题后，首先识别出这是一个教育学理论问题。系统从教育理论知识库中检索建构主义的核心概念，包括其哲学基础、主要代表人物（如皮亚杰、维果茨基）以及在教学实践中的应用。生成回答时，采用结构化方式呈现核心观点，确保准确性和清晰度。',
    type: 'theory'
  },
  q2: {
    answer: '设计探究式数学课的步骤：1) 确定探究主题（如"如何测量不规则图形的面积"）；2) 创设问题情境，激发学生兴趣；3) 提供探究材料和工具；4) 引导学生提出假设并进行实验；5) 组织小组讨论和分享；6) 总结归纳，形成结论；7) 拓展应用，联系实际生活。关键是让学生经历"提出问题-猜想假设-实验验证-得出结论"的完整过程。',
    reasoning: '用户需要课程设计建议，系统首先分析数学学科特点和探究式教学的核心要素。结合数学课程标准要求，生成结构化的设计步骤，同时考虑学生认知水平和课堂时间安排。回答中包含具体示例，帮助用户更好地理解和应用。',
    type: 'design'
  },
  q3: {
    answer: '处理学生注意力不集中的策略：1) 采用多样化的教学方法（如小组活动、多媒体展示）；2) 设计互动环节，增加学生参与；3) 使用提问技巧，保持学生思维活跃；4) 合理安排课堂节奏，避免单调；5) 关注个别学生，给予适当关注；6) 建立课堂规则，明确行为期望。同时要分析学生分心的原因（如内容难度、兴趣点、身体因素等），采取针对性措施。',
    reasoning: '识别这是课堂管理问题后，系统从多个维度分析解决方案。考虑到不同年龄段学生的特点，提供多层次的策略建议。回答结构清晰，既有具体方法，又有背后的原理分析，帮助用户理解策略的适用场景和实施要点。',
    type: 'management'
  },
  q4: {
    answer: '优化教案设计的建议：1) 明确教学目标，确保目标可测量；2) 分析学生学情，设计差异化活动；3) 优化教学流程，合理分配时间；4) 增加互动环节，提高参与度；5) 设计有效的评价方式；6) 准备备选方案，应对突发情况；7) 课后反思，持续改进。建议参考优秀教案模板，结合学科特点和学生实际情况进行调整。',
    reasoning: '针对教案优化需求，系统从教学设计的核心要素入手。结合教育目标分类理论（如布鲁姆分类法）和课程设计模型（如ADDIE模型），提供系统化的优化建议。回答注重实用性和可操作性，帮助用户快速应用到实际教学中。',
    type: 'design'
  }
}

export function AIAssistant() {
  const { addQAMessage, addLearningRecord } = useAppStore()
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string; type?: string; reasoning?: string }[]>([])
  const [showReasoning, setShowReasoning] = useState(false)
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null)

  const handleSend = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: inputMessage
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    setTimeout(() => {
      const mockAnswer = {
        id: `msg-${Date.now()}`,
        role: 'assistant' as const,
        content: '这是一个很好的问题！根据您的提问，我为您整理了以下内容...\n\n作为一名师范生，掌握这些教育教学知识对于您未来的教学实践非常重要。建议您结合具体的教学情境进行思考和应用。',
        reasoning: '分析用户问题意图，从教育知识库中检索相关内容，整合多个权威来源的信息，确保回答的准确性和全面性。同时考虑到用户是师范生的身份，提供更加贴近教学实践的建议。',
        type: 'general'
      }
      setMessages(prev => [...prev, mockAnswer])
      setShowReasoning(true)

      addQAMessage({
        role: 'user',
        content: inputMessage,
        timestamp: new Date().toISOString()
      })

      addLearningRecord({
        type: 'qa',
        title: `AI助教问答 - ${inputMessage.substring(0, 30)}${inputMessage.length > 30 ? '...' : ''}`,
        timestamp: new Date().toISOString(),
        duration: 5
      })
    }, 1000)
  }

  const handleQuickQuestion = (questionId: string) => {
    setActiveQuickAction(questionId)
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: quickQuestions.find(q => q.id === questionId)?.label || ''
    }

    setMessages(prev => [...prev, userMessage])

    setTimeout(() => {
      const answerData = mockAnswers[questionId]
      if (answerData) {
        const assistantMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant' as const,
          content: answerData.answer,
          reasoning: answerData.reasoning,
          type: answerData.type
        }
        setMessages(prev => [...prev, assistantMessage])
        setShowReasoning(true)
      }
      setActiveQuickAction(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">AI 助教</h1>
            <p className="text-text-secondary text-sm">为师范生提供教育学、学科知识、教案、作业、问答支持</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="font-semibold text-text-primary mb-3">快捷问题</h3>
            <div className="space-y-2">
              {quickQuestions.map((question) => (
                <motion.button
                  key={question.id}
                  onClick={() => handleQuickQuestion(question.id)}
                  whileHover={{ x: 4 }}
                  disabled={activeQuickAction !== null}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeQuickAction === question.id
                      ? 'bg-primary/10 border border-primary/30'
                      : 'hover:bg-surface-tertiary border border-transparent'
                  } ${activeQuickAction !== null && activeQuickAction !== question.id ? 'opacity-50' : ''}`}
                >
                  <p className="text-sm text-text-primary line-clamp-2">{question.label}</p>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                    question.type === 'theory' ? 'bg-primary/10 text-primary' :
                    question.type === 'design' ? 'bg-secondary/10 text-secondary' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {question.type === 'theory' ? '理论' : question.type === 'design' ? '设计' : '管理'}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="font-semibold text-text-primary mb-3">快捷功能</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '生成题目', icon: Target, color: 'bg-primary' },
                { label: '生成教案', icon: FileText, color: 'bg-secondary' },
                { label: '解释知识点', icon: Lightbulb, color: 'bg-accent' },
                { label: '评课建议', icon: Users, color: 'bg-warning' },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    className="p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-2"
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-text-secondary">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium text-text-primary">产品价值</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-tertiary" />
                <span className="text-text-secondary">平均响应时间 &lt; 3秒</span>
              </div>
              <div className="text-text-secondary">支持文本、语音、图片输入</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-surface rounded-xl border border-border h-[600px] flex flex-col">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">AI 助教</p>
                <p className="text-xs text-text-tertiary">全天候为您提供专业教育支持</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {message.role === 'user' ? (
                        <span className="text-sm font-semibold">{message.content.charAt(0)}</span>
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-4 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-primary text-white rounded-tr-sm'
                          : 'bg-surface-tertiary text-text-primary rounded-tl-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'assistant' && message.type && (
                        <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                          message.type === 'theory' ? 'bg-primary/10 text-primary' :
                          message.type === 'design' ? 'bg-secondary/10 text-secondary' :
                          message.type === 'management' ? 'bg-accent/10 text-accent' :
                          'bg-info/10 text-info'
                        }`}>
                          {message.type === 'theory' ? '教育学理论' : 
                           message.type === 'design' ? '课程设计' : 
                           message.type === 'management' ? '课堂管理' : '综合'}
                        </span>
                      )}
                      {message.role === 'assistant' && message.reasoning && showReasoning && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-2 bg-primary/5 rounded-xl p-4"
                        >
                          <button
                            onClick={() => setShowReasoning(false)}
                            className="flex items-center gap-1 text-xs text-primary mb-2"
                          >
                            <span>推理过程概览</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          <p className="text-sm text-text-secondary">{message.reasoning}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-4">
                    <MessageCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">欢迎使用 AI 助教</h3>
                  <p className="text-text-secondary mb-4">我可以帮助您解答教育学问题、设计课程、优化教案等</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['教育学理论', '课程设计', '课堂管理', '教案优化'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-surface-tertiary text-text-secondary rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <Mic className="w-5 h-5 text-text-secondary" />
                </button>
                <button className="p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <Image className="w-5 h-5 text-text-secondary" />
                </button>
                <button className="p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <FileText className="w-5 h-5 text-text-secondary" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入您的问题，我来帮您解答..."
                    className="w-full h-12 px-4 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 pr-12"
                  />
                </div>
                <motion.button
                  onClick={handleSend}
                  disabled={!inputMessage.trim()}
                  whileHover={inputMessage.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputMessage.trim() ? { scale: 0.95 } : {}}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    inputMessage.trim()
                      ? 'bg-primary text-white'
                      : 'bg-surface-tertiary text-text-tertiary cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
