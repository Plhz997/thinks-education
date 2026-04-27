import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Download, ChevronRight, Play, FileText, Tag, Lightbulb, ExternalLink } from 'lucide-react'
import { mockKnowledgePoints } from '@/data/mockData'

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

export function Knowledge() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('math')
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [selectedTextbook, setSelectedTextbook] = useState('m1')
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string | string[]>>({})
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(new Set())

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
            <label className="block text-sm font-medium text-text-secondary mb-2">学科选择</label>
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
