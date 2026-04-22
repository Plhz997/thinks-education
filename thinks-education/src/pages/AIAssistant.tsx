import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Mic, 
  Image, 
  FileText, 
  Sparkles,
  BookOpen,
  Layout,
  Users,
  FileEdit,
  CheckSquare,
  Code,
  HelpCircle,
  Bot,
  Clock
} from 'lucide-react'
import { useAppStore } from '@/store'

const quickQuestions = [
  { id: 'theory', label: '教育学理论', icon: BookOpen, color: 'bg-primary' },
  { id: 'design', label: '课程设计', icon: Layout, color: 'bg-secondary' },
  { id: 'management', label: '课堂管理', icon: Users, color: 'bg-accent' },
  { id: 'lesson-plan', label: '教案优化', icon: FileEdit, color: 'bg-warning' },
  { id: 'grading', label: '作业批改', icon: CheckSquare, color: 'bg-info' },
  { id: 'code', label: '代码纠错', icon: Code, color: 'bg-danger' },
]

const mockResponses: Record<string, string> = {
  theory: '建构主义学习理论强调学习者在原有知识经验基础上主动构建新知识。核心观点包括：1）学习是主动的建构过程；2）知识是个人经验的合理化；3）学习具有社会性；4）学习应在真实情境中进行。在教学设计中应用：项目式学习、探究式教学、合作学习等。',
  design: '设计一节数学探究课的建议：\n\n1. **教学目标**：明确知识目标、能力目标、情感目标\n2. **情境导入**：创设生活情境，激发兴趣\n3. **探究活动**：提供探究材料，引导自主发现\n4. **小组合作**：组织小组讨论，促进思维碰撞\n5. **成果展示**：鼓励分享交流，培养表达能力\n6. **总结提升**：归纳核心知识点，拓展延伸',
  management: '课堂管理策略：\n\n1. **建立规则**：开学初共同制定课堂规则\n2. **积极强化**：及时表扬正向行为\n3. **眼神交流**：用眼神管理课堂节奏\n4. **灵活分组**：根据学习任务调整分组方式\n5. **时间管理**：合理分配各环节时间\n6. **应对冲突**：冷静处理，公平公正',
  'lesson-plan': '教案优化建议：\n\n1. **教学目标具体化**：使用可观察、可测量的动词\n2. **教学流程清晰化**：环节衔接自然流畅\n3. **活动设计多样化**：结合讲授、讨论、实践\n4. **评价方式多元化**：过程性评价与终结性评价结合\n5. **技术整合恰当化**：选择合适的教学工具\n6. **反思预留**：课后反思与改进空间',
  grading: '作业批改反馈建议：\n\n1. **及时性**：及时批改，及时反馈\n2. **针对性**：指出具体问题，提供改进建议\n3. **鼓励性**：肯定优点，激发学习动力\n4. **分层反馈**：根据学生水平提供差异化指导\n5. **范例展示**：分享优秀作业，树立标杆',
  code: '代码纠错思路：\n\n1. **语法检查**：检查拼写错误、括号匹配\n2. **逻辑分析**：梳理执行流程，找出逻辑漏洞\n3. **调试技巧**：添加断点，逐步调试\n4. **代码规范**：遵循PEP8等编码规范\n5. **优化建议**：改进算法复杂度、代码可读性',
}

export function AIAssistant() {
  const { addQAMessage, addLearningRecord, qaMessages } = useAppStore()
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (content: string, type?: string) => {
    if (!content.trim()) return

    setIsTyping(true)
    addQAMessage({ content, sender: 'user', timestamp: new Date().toISOString(), type: type as any })
    
    addLearningRecord({
      type: 'qa',
      title: `AI助教问答 - ${content.slice(0, 20)}${content.length > 20 ? '...' : ''}`,
      timestamp: new Date().toISOString(),
      duration: 5
    })

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const responseContent = type ? mockResponses[type] : '感谢您的提问！我来为您分析解答。根据您的问题，以下是我的建议：\n\n1. 首先分析问题的核心要点\n2. 结合教育理论进行思考\n3. 提供具体的实践策略\n4. 给出可操作的步骤\n\n希望这些内容对您有帮助！'
    
    addQAMessage({ content: responseContent, sender: 'ai', timestamp: new Date().toISOString(), type: type as any })
    setIsTyping(false)
    setInputMessage('')
  }

  const quickActions = [
    { id: 'questions', label: '生成题目', icon: HelpCircle },
    { id: 'lesson-plan', label: '生成教案初稿', icon: FileEdit },
    { id: 'explain', label: '解释知识点', icon: BookOpen },
    { id: 'review', label: '生成评课建议', icon: CheckSquare },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI助教</h1>
          <p className="text-text-secondary mt-1">为师范生提供教育学、学科知识、教案、作业、问答支持</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI 已减轻教师重复工作约 60%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSend(`请帮我${action.label}`, action.id === 'lesson-plan' ? 'lesson-plan' : undefined)}
            className="p-4 bg-surface rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <action.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="font-medium text-text-primary">{action.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-text-primary">典型问题</h2>
            </div>
            <div className="space-y-2">
              {quickQuestions.map((question) => {
                const Icon = question.icon
                return (
                  <button
                    key={question.id}
                    onClick={() => handleSend(`请讲解${question.label}相关内容`, question.id)}
                    className="w-full p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${question.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${question.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="text-sm text-text-primary">{question.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-text-primary">推理过程概览</h3>
            </div>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>分析问题意图与上下文</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>检索教育知识库匹配</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>生成结构化回答</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span>优化语言表达与格式</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-surface rounded-xl border border-border h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {qaMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-text-tertiary">
                    <Bot className="w-12 h-12 mb-4" />
                    <p className="text-lg font-medium">欢迎使用AI助教</p>
                    <p className="text-sm">我可以帮助您解答教育学问题、设计课程、优化教案等</p>
                  </div>
                ) : (
                  qaMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-primary text-white' : 'bg-surface-tertiary text-primary'
                      }`}>
                        {message.sender === 'user' ? (
                          <MessageCircle className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                        <div className={`px-4 py-2 rounded-xl ${
                          message.sender === 'user' 
                            ? 'bg-primary text-white rounded-tr-sm' 
                            : 'bg-surface-tertiary text-text-primary rounded-tl-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <p className="text-xs text-text-tertiary mt-1">
                          {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-tertiary text-primary flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 bg-surface-tertiary rounded-xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <motion.div className="w-2 h-2 rounded-full bg-text-tertiary" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-text-tertiary" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-text-tertiary" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors">
                    <Mic className="w-5 h-5 text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors">
                    <Image className="w-5 h-5 text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors">
                    <FileText className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputMessage)}
                    placeholder="输入您的问题..."
                    className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <button
                  onClick={() => handleSend(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  平均响应时间 &lt; 3秒
                </span>
                <span>支持文本、语音、图片输入</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
