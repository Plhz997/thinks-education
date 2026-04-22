import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Link2, Video, FileText, Download, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { mockKnowledgePoints, majorNames } from '@/data/mockData'
import { useAppStore } from '@/store'

const subjectOptions = [
  { value: 'math', label: '数学' },
  { value: 'chinese', label: '语文' },
  { value: 'english', label: '英语' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'biology', label: '生物' },
  { value: 'history', label: '历史' },
  { value: 'geography', label: '地理' },
]

export function Knowledge() {
  const { user } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('math')
  const [selectedPoint, setSelectedPoint] = useState(mockKnowledgePoints[0])
  const [graphScale, setGraphScale] = useState(1)

  const filteredPoints = mockKnowledgePoints.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderGraphNode = (point: typeof mockKnowledgePoints[0], x: number, y: number) => {
    const isSelected = selectedPoint?.id === point.id
    return (
      <g key={point.id}>
        {selectedPoint && selectedPoint.relatedPoints.includes(point.id) && (
          <motion.line
            x1={200}
            y1={200}
            x2={x}
            y2={y}
            stroke="#5B21B6"
            strokeWidth={2}
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <motion.g
          onClick={() => setSelectedPoint(point)}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <circle
            cx={x}
            cy={y}
            r={isSelected ? 35 : 30}
            fill={isSelected ? '#5B21B6' : '#0891B2'}
            className="transition-all"
          />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fill="white"
            fontSize={isSelected ? 14 : 12}
            fontWeight="bold"
          >
            {point.name.slice(0, 4)}
          </text>
        </motion.g>
      </g>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教育教材导向课程匹配</h1>
          <p className="text-text-secondary mt-1">基于教材和课程标准，进行知识脉络匹配与强化学习</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          导出知识大纲
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">学科选择</label>
              <div className="grid grid-cols-2 gap-2">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject.value}
                    onClick={() => setSelectedSubject(subject.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedSubject === subject.value
                        ? 'bg-primary text-white'
                        : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {subject.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索知识点..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-text-secondary mb-2">知识点列表</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredPoints.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedPoint?.id === point.id
                        ? 'bg-primary text-white'
                        : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    <p className="font-medium">{point.name}</p>
                    <p className="text-xs opacity-70">{point.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-9 space-y-6"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-semibold text-text-primary">知识图谱</h2>
                <span className="text-sm text-text-secondary">{majorNames[user?.major || 'math']}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGraphScale(Math.max(0.5, graphScale - 0.1))}
                  className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGraphScale(Math.min(1.5, graphScale + 0.1))}
                  className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGraphScale(1)}
                  className="p-2 rounded-lg bg-surface-tertiary hover:bg-primary/5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="relative h-80 bg-surface-tertiary rounded-xl overflow-hidden">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full"
                style={{ transform: `scale(${graphScale})`, transformOrigin: 'center' }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <circle cx="200" cy="200" r="150" fill="#5B21B6" fillOpacity="0.05" />
                <circle cx="200" cy="200" r="100" fill="#0891B2" fillOpacity="0.05" />
                <circle cx="200" cy="200" r="50" fill="#10B981" fillOpacity="0.05" />
                
                {selectedPoint && renderGraphNode(selectedPoint, 200, 200)}
                {mockKnowledgePoints.filter(p => p.id !== selectedPoint?.id).map((point, index) => {
                  const angle = (index * Math.PI * 2) / (mockKnowledgePoints.length - 1)
                  const radius = 120
                  const x = 200 + radius * Math.cos(angle)
                  const y = 200 + radius * Math.sin(angle)
                  return renderGraphNode(point, x, y)
                })}
              </svg>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>核心知识点</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span>关联知识点</span>
                </div>
              </div>
            </div>
          </div>

          {selectedPoint && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-text-primary mb-4">{selectedPoint.name}</h3>
                <p className="text-text-secondary mb-4">{selectedPoint.description}</p>
                
                {selectedPoint.relatedPoints.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-2">关联知识点</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.relatedPoints.map((rpId) => {
                        const relatedPoint = mockKnowledgePoints.find(p => p.id === rpId)
                        return relatedPoint ? (
                          <button
                            key={rpId}
                            onClick={() => setSelectedPoint(relatedPoint)}
                            className="px-3 py-1 bg-surface-tertiary rounded-lg text-sm text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {relatedPoint.name}
                          </button>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-text-primary mb-4">学习资源</h3>
                <div className="space-y-3">
                  {selectedPoint.resources.length > 0 ? (
                    selectedPoint.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center gap-3 p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                        {resource.type === 'video' && <Video className="w-5 h-5 text-secondary" />}
                        {resource.type === 'document' && <FileText className="w-5 h-5 text-primary" />}
                        {resource.type === 'link' && <Link2 className="w-5 h-5 text-accent" />}
                        <div className="flex-1">
                          <p className="font-medium text-text-primary">{resource.title}</p>
                          {resource.duration && (
                            <p className="text-xs text-text-tertiary">{resource.duration}分钟</p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-tertiary" />
                      </div>
                    ))
                  ) : (
                    <p className="text-text-tertiary text-center py-4">暂无资源</p>
                  )}
                </div>
              </motion.div>

              {selectedPoint.exercises.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-2 bg-surface rounded-xl border border-border p-6"
                >
                  <h3 className="font-semibold text-text-primary mb-4">推荐练习</h3>
                  <div className="space-y-4">
                    {selectedPoint.exercises.map((exercise) => (
                      <div key={exercise.id} className="p-4 bg-surface-tertiary rounded-xl">
                        <p className="text-text-primary mb-3">{exercise.question}</p>
                        {exercise.options && (
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {exercise.options.map((option, idx) => (
                              <button
                                key={idx}
                                className={`p-2 rounded-lg text-left transition-all ${
                                  String.fromCharCode(65 + idx) === exercise.answer
                                    ? 'bg-accent/10 text-accent border border-accent'
                                    : 'bg-surface border border-border hover:border-primary/50'
                                }`}
                              >
                                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="p-3 bg-accent/5 rounded-lg">
                          <p className="text-sm text-accent font-medium">解析：{exercise.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
