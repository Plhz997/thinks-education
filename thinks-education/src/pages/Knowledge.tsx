import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Download, ChevronRight, Play, FileText, Tag, Lightbulb, ExternalLink, Sparkles, Wand2, Brain, Zap } from 'lucide-react'
import { mockKnowledgePoints } from '@/data/mockData'
import { useAppStore } from '@/store'

const subjectOptions = [
  { value: 'math', label: '数学' },
  { value: 'chinese', label: '语文' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'biology', label: '生物' },
  { value: 'computer', label: '计算机' },
]

const textbookVersions = [
  { id: 'm1', name: '人教版高中数学必修一', subject: 'math' },
  { id: 'm2', name: '北师大版高中数学', subject: 'math' },
  { id: 'm3', name: '苏教版高中数学', subject: 'math' },
  { id: 'c1', name: '人教版高中语文必修一', subject: 'chinese' },
  { id: 'c2', name: '苏教版高中语文', subject: 'chinese' },
  { id: 'c3', name: '粤教版高中语文', subject: 'chinese' },
  { id: 'p1', name: '人教版高中物理必修一', subject: 'physics' },
  { id: 'p2', name: '教科版高中物理', subject: 'physics' },
  { id: 'p3', name: '沪科版高中物理', subject: 'physics' },
  { id: 'ch1', name: '人教版高中化学必修一', subject: 'chemistry' },
  { id: 'ch2', name: '苏教版高中化学', subject: 'chemistry' },
  { id: 'ch3', name: '鲁科版高中化学', subject: 'chemistry' },
  { id: 'b1', name: '人教版高中生物必修一', subject: 'biology' },
  { id: 'b2', name: '苏教版高中生物', subject: 'biology' },
  { id: 'b3', name: '浙科版高中生物', subject: 'biology' },
  { id: 'co1', name: '人教版信息技术必修', subject: 'computer' },
  { id: 'co2', name: '粤教版信息技术', subject: 'computer' },
  { id: 'co3', name: '教科版信息技术', subject: 'computer' },
]

const majorToSubject: Record<string, string> = {
  'math': 'math',
  'chinese': 'chinese',
  'physics': 'physics',
  'chemistry': 'chemistry',
  'biology': 'biology',
  'english': 'chinese',
  'history': 'chinese',
  'geography': 'physics',
  'music': 'computer',
  'art': 'computer',
  'pe': 'biology',
  'tech': 'computer',
  'primary': 'math',
  'preschool': 'math',
  'computer': 'computer',
  'special': 'math',
  'primary-education': 'math',
  'preschool-education': 'math',
  'physical-education': 'biology',
  'educational-technology': 'computer',
  'computer-education': 'computer',
  'special-education': 'math'
}

export function Knowledge() {
  const { user } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('math')
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [selectedTextbook, setSelectedTextbook] = useState('m1')
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string | string[]>>({})
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(new Set())
  const [showContentGenerator, setShowContentGenerator] = useState(false)
  const [contentPrompt, setContentPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendations, setRecommendations] = useState<Array<{ title: string; type: string; score: number; description: string }>>([])

  useEffect(() => {
    if (user) {
      const subject = majorToSubject[user.major] || 'math'
      setSelectedSubject(subject)
      const subjectTextbooks = textbookVersions.filter(v => v.subject === subject)
      if (subjectTextbooks.length > 0) {
        setSelectedTextbook(subjectTextbooks[0].id)
      }
    }
  }, [user])

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject)
    const subjectTextbooks = textbookVersions.filter(v => v.subject === subject)
    if (subjectTextbooks.length > 0) {
      setSelectedTextbook(subjectTextbooks[0].id)
    }
    setSelectedPoint(null)
    setExerciseAnswers({})
    setSubmittedExercises(new Set())
  }

  const userSubject = user ? majorToSubject[user.major] : null
  const isSubjectLocked = !!userSubject

  const handleOptionSelect = (exerciseId: string, option: string) => {
    const currentAnswer = exerciseAnswers[exerciseId]
    const exercise = selectedPointData?.exercises.find(e => e.id === exerciseId)
    if (exercise?.type === 'multiple') {
      const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : []
      if (currentAnswers.includes(option)) {
        setExerciseAnswers({
          ...exerciseAnswers,
          [exerciseId]: currentAnswers.filter(o => o !== option)
        })
      } else {
        setExerciseAnswers({
          ...exerciseAnswers,
          [exerciseId]: [...currentAnswers, option].sort()
        })
      }
    } else {
      setExerciseAnswers({
        ...exerciseAnswers,
        [exerciseId]: option
      })
    }
  }

  const handleFillInput = (exerciseId: string, value: string) => {
    setExerciseAnswers({
      ...exerciseAnswers,
      [exerciseId]: value
    })
  }

  const handleSubmitExercise = (exerciseId: string) => {
    setSubmittedExercises(prev => new Set([...prev, exerciseId]))
  }

  const handleResetExercise = (exerciseId: string) => {
    setSubmittedExercises(prev => {
      const newSet = new Set(prev)
      newSet.delete(exerciseId)
      return newSet
    })
    setExerciseAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[exerciseId]
      return newAnswers
    })
  }

  const handleGenerateContent = () => {
    if (!contentPrompt.trim()) return
    setIsGenerating(true)
    
    setTimeout(() => {
      const subjectName = subjectOptions.find(s => s.value === selectedSubject)?.label || '数学'
      const pointName = selectedPointData?.name || '知识点'
      
      const mockContent = `## AI生成内容：${contentPrompt}\n\n### 一、核心知识点梳理\n\n${pointName}是${subjectName}学科中的重要内容，主要包括以下几个方面：\n\n1. **基本概念**：\n   - 定义和内涵\n   - 核心要素和特征\n   - 与相关概念的区别与联系\n\n2. **教学重点**：\n   - 关键知识点和技能点\n   - 学生容易混淆的地方\n   - 教学难点及突破方法\n\n### 二、教学设计建议\n\n**教学目标：**\n- 知识与技能：理解并掌握${pointName}的基本概念和应用方法\n- 过程与方法：通过探究活动培养学生的思维能力\n- 情感态度与价值观：激发学生学习${subjectName}的兴趣\n\n**教学方法：**\n- 讲授法：讲解核心概念和原理\n- 探究法：引导学生自主探究\n- 讨论法：组织小组讨论交流\n\n### 三、教学案例\n\n以下是一个简单的${pointName}教学案例：\n\n**导入环节（5分钟）：**\n通过生活实例引入课题，激发学生兴趣\n\n**新授环节（25分钟）：**\n1. 讲解基本概念（10分钟）\n2. 演示典型例题（10分钟）\n3. 学生尝试练习（5分钟）\n\n**巩固环节（10分钟）：**\n小组讨论并展示成果\n\n### 四、拓展延伸\n\n- 推荐阅读材料\n- 相关拓展资源链接\n- 课后练习建议\n\n---\n以上内容由AI根据您的需求自动生成，建议结合实际教学情况进行调整。`

      setGeneratedContent(mockContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handleGetRecommendations = () => {
    const subjectName = subjectOptions.find(s => s.value === selectedSubject)?.label || '数学'
    const pointName = selectedPointData?.name || '知识点'
    
    const mockRecs = [
      { title: `${subjectName}课程标准解读`, type: '文档', score: 95, description: '深入理解课程标准对本知识点的要求' },
      { title: `${pointName}教学案例集`, type: '文档', score: 92, description: '精选优秀教学案例供参考' },
      { title: `${pointName}微课视频`, type: '视频', score: 88, description: '名师讲解视频，深入浅出' },
      { title: `${pointName}习题精选`, type: '练习', score: 85, description: '针对性练习题和答案解析' },
      { title: `${pointName}教学PPT模板`, type: '资源', score: 82, description: '精美教学课件模板' },
    ]
    
    setRecommendations(mockRecs)
  }

  const isAnswerCorrect = (exerciseId: string): boolean | null => {
    const exercise = selectedPointData?.exercises.find(e => e.id === exerciseId)
    const userAnswer = exerciseAnswers[exerciseId]
    if (!exercise || userAnswer === undefined) return null
    
    if (Array.isArray(exercise.answer)) {
      return Array.isArray(userAnswer) && 
        exercise.answer.length === userAnswer.length &&
        exercise.answer.every(a => userAnswer.includes(a))
    }
    return userAnswer === exercise.answer
  }

  const filteredPoints = mockKnowledgePoints.filter(p => 
    p.subject === selectedSubject && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const selectedPointData = mockKnowledgePoints.find(p => p.id === selectedPoint)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-secondary to-secondary-light rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">教育教材导向课程匹配</h1>
            <p className="text-white/80 text-sm">基于教材和课程标准的知识脉络匹配与强化学习</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              导出大纲
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface rounded-xl border border-border p-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {isSubjectLocked ? '我的专业' : '学科选择'}
            </label>
            {isSubjectLocked ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-primary text-white rounded-lg text-sm">
                  {subjectOptions.find(s => s.value === userSubject)?.label || '数学'}
                </div>
                <span className="text-xs text-text-tertiary">已根据专业自动匹配</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject.value}
                    onClick={() => handleSubjectChange(subject.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedSubject === subject.value
                        ? 'bg-primary text-white'
                        : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {subject.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">教材版本</label>
            <select
              value={selectedTextbook}
              onChange={(e) => setSelectedTextbook(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {textbookVersions.filter(v => v.subject === selectedSubject).map((version) => (
                <option key={version.id} value={version.id}>{version.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索知识点..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-text-primary">知识图谱</h3>
            </div>
            <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
              {filteredPoints.map((point) => (
                <motion.button
                  key={point.id}
                  onClick={() => setSelectedPoint(point.id)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPoint === point.id
                      ? 'bg-primary/10 border border-primary/30'
                      : 'hover:bg-surface-tertiary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary text-sm">{point.name}</span>
                    <ChevronRight className={`w-4 h-4 ${selectedPoint === point.id ? 'text-primary' : 'text-text-tertiary'}`} />
                  </div>
                  <p className="text-xs text-text-tertiary mt-1 line-clamp-1">{point.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4">
            <button
              onClick={handleGetRecommendations}
              className="w-full p-3 bg-surface-tertiary rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-3"
            >
              <Brain className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-text-primary text-sm">智能资源推荐</p>
                <p className="text-xs text-text-tertiary">基于语义分析获取相关资源</p>
              </div>
            </button>
          </div>

          <motion.button
            onClick={() => setShowContentGenerator(!showContentGenerator)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center gap-3"
          >
            <Wand2 className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">AI内容生成</p>
              <p className="text-xs text-white/70">输入需求，智能生成教学材料</p>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${showContentGenerator ? 'rotate-90' : ''}`} />
          </motion.button>

          {showContentGenerator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-surface rounded-xl border border-border p-4"
            >
              <div className="space-y-3">
                <textarea
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder="请输入您的内容需求，例如：\n- 生成一份导数概念的教学设计\n- 编写三角函数的教学案例\n- 设计概率统计的课堂活动"
                  className="w-full h-24 px-3 py-2 bg-surface-tertiary border border-border rounded-lg focus:border-primary focus:outline-none resize-none text-sm"
                />
                <button
                  onClick={handleGenerateContent}
                  disabled={isGenerating || !contentPrompt.trim()}
                  className="w-full py-2 bg-primary text-white rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:bg-gray-300"
                >
                  {isGenerating ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      AI生成内容
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-3">
          {selectedPointData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary">知识点</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">{selectedPointData.name}</h2>
                  </div>
                  <button className="flex items-center gap-2 text-secondary hover:text-secondary-dark transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">查看详情</span>
                  </button>
                </div>
                <p className="text-text-secondary mb-4">{selectedPointData.description}</p>

                {selectedPointData.relatedPoints.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-text-secondary">关联知识点：</span>
                    {selectedPointData.relatedPoints.map((rp) => {
                      const related = mockKnowledgePoints.find(p => p.id === rp)
                      return related ? (
                        <button
                          key={rp}
                          onClick={() => setSelectedPoint(rp)}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                        >
                          {related.name}
                        </button>
                      ) : null
                    })}
                  </div>
                )}
              </div>

              {selectedPointData.resources.length > 0 && (
                <div className="bg-surface rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    学习资源
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPointData.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer group border border-transparent"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          resource.type === 'video' ? 'bg-secondary/10 text-secondary' : 'bg-info/10 text-info'
                        }`}>
                          {resource.type === 'video' ? <Play className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text-primary group-hover:text-primary transition-colors">{resource.title}</p>
                          <p className="text-sm text-text-tertiary">
                            {resource.type === 'video' ? `${resource.duration}分钟视频` : '文档资料'}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      智能资源推荐
                    </h3>
                    <button onClick={() => setRecommendations([])} className="text-sm text-text-tertiary hover:text-text-primary">
                      清空
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          rec.type === '视频' ? 'bg-secondary/10 text-secondary' :
                          rec.type === '文档' ? 'bg-info/10 text-info' :
                          rec.type === '练习' ? 'bg-accent/10 text-accent' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {rec.type === '视频' && <Play className="w-5 h-5" />}
                          {rec.type === '文档' && <FileText className="w-5 h-5" />}
                          {rec.type === '练习' && <Lightbulb className="w-5 h-5" />}
                          {rec.type === '资源' && <BookOpen className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text-primary text-sm">{rec.title}</p>
                          <p className="text-xs text-text-tertiary">{rec.description}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${rec.score >= 90 ? 'text-accent' : rec.score >= 80 ? 'text-primary' : 'text-warning'}`}>
                            {rec.score}
                          </p>
                          <p className="text-xs text-text-tertiary">匹配度</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {generatedContent && (
                <div className="bg-surface rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      AI生成内容
                    </h3>
                    <button onClick={() => setGeneratedContent('')} className="text-sm text-text-tertiary hover:text-text-primary">
                      清空
                    </button>
                  </div>
                  <div className="bg-surface-tertiary rounded-xl p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-text-primary whitespace-pre-wrap font-mono">{generatedContent}</pre>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                    复制内容
                  </button>
                </div>
              )}

              {selectedPointData.exercises.length > 0 && (
                <div className="bg-surface rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    推荐练习
                  </h3>
                  <div className="space-y-4">
                    {selectedPointData.exercises.map((exercise) => {
                      const submitted = submittedExercises.has(exercise.id)
                      const correct = isAnswerCorrect(exercise.id)
                      const userAnswer = exerciseAnswers[exercise.id]
                      const optionLabels = ['A', 'B', 'C', 'D']
                      
                      return (
                        <div key={exercise.id} className="p-4 bg-surface-tertiary rounded-xl">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                submitted && correct === true ? 'bg-green-100 text-green-600' :
                                submitted && correct === false ? 'bg-red-100 text-red-600' :
                                'bg-primary/10 text-primary'
                              }`}>
                                {submitted && correct === true ? '✓' : submitted && correct === false ? '✗' : '?'}
                              </span>
                              <span className="text-xs text-text-tertiary">{exercise.type === 'single' ? '单选题' : exercise.type === 'multiple' ? '多选题' : '填空题'}</span>
                            </div>
                          </div>
                          
                          <p className="text-text-primary mb-3">{exercise.question}</p>
                          
                          {exercise.type === 'fill' ? (
                            <div className="mb-3">
                              <input
                                type="text"
                                value={(userAnswer as string) || ''}
                                onChange={(e) => handleFillInput(exercise.id, e.target.value)}
                                disabled={submitted}
                                placeholder="请输入答案"
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                          ) : exercise.options ? (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {exercise.options.map((option, idx) => {
                                const optionLabel = optionLabels[idx]
                                const isSelected = Array.isArray(userAnswer) ? userAnswer.includes(optionLabel) : userAnswer === optionLabel
                                const isCorrectOption = Array.isArray(exercise.answer) 
                                  ? exercise.answer.includes(optionLabel) 
                                  : exercise.answer === optionLabel
                                
                                let buttonClass = 'px-4 py-2 rounded-lg text-sm transition-all border'
                                if (submitted) {
                                  if (isCorrectOption) {
                                    buttonClass += ' bg-green-100 text-green-700 border-green-300'
                                  } else if (isSelected && !isCorrectOption) {
                                    buttonClass += ' bg-red-100 text-red-700 border-red-300'
                                  } else {
                                    buttonClass += ' bg-surface border-border text-text-secondary'
                                  }
                                } else {
                                  if (isSelected) {
                                    buttonClass += ' bg-primary/10 text-primary border-primary/30'
                                  } else {
                                    buttonClass += ' bg-surface border-border hover:border-primary/50 text-text-primary'
                                  }
                                }
                                
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => !submitted && handleOptionSelect(exercise.id, optionLabel)}
                                    disabled={submitted}
                                    className={buttonClass}
                                  >
                                    {optionLabel}. {option}
                                  </button>
                                )
                              })}
                            </div>
                          ) : null}
                          
                          <div className="flex items-center gap-2 mb-3">
                            {!submitted ? (
                              <button
                                onClick={() => handleSubmitExercise(exercise.id)}
                                disabled={!userAnswer}
                                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                提交答案
                              </button>
                            ) : (
                              <button
                                onClick={() => handleResetExercise(exercise.id)}
                                className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-surface transition-colors"
                              >
                                重新答题
                              </button>
                            )}
                          </div>
                          
                          {submitted && (
                            <div className={`rounded-lg p-3 ${
                              correct === true ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-sm font-medium ${correct === true ? 'text-green-700' : 'text-red-700'}`}>
                                  {correct === true ? '回答正确！' : '回答错误'}
                                </span>
                                {exercise.answer && (
                                  <span className="text-sm text-text-secondary">
                                    正确答案：{Array.isArray(exercise.answer) ? exercise.answer.join(', ') : exercise.answer}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-text-secondary">{exercise.explanation}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="bg-surface rounded-xl border border-border p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">选择一个知识点</h3>
              <p className="text-text-secondary">从左侧知识图谱中选择一个知识点查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
