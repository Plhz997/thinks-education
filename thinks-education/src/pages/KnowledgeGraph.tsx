import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, ZoomIn, ZoomOut, Maximize2, Minimize2, ArrowRight, Lightbulb, BookOpen, Link2, Database, Network, Map, FileText, ExternalLink, Sparkles, Target, Wand2 } from 'lucide-react'
import { mockKnowledgePoints } from '@/data/mockData'
import { useAppStore } from '@/store'

interface GraphNode {
  id: string
  name: string
  x: number
  y: number
  type: string
  relatedIds: string[]
  subject: string
}

interface GraphLink {
  source: string
  target: string
  label?: string
}

const subjectOptions = [
  { value: 'all', label: '全部' },
  { value: 'math', label: '数学' },
  { value: 'chinese', label: '语文' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'biology', label: '生物' },
  { value: 'computer', label: '计算机' },
]

const subjectColors: Record<string, string> = {
  math: '#8b5cf6',
  chinese: '#f59e0b',
  physics: '#3b82f6',
  chemistry: '#10b981',
  biology: '#ec4899',
  computer: '#06b6d4',
}

export function KnowledgeGraph() {
  const { addGrowthRecord } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph')
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showPathfinder, setShowPathfinder] = useState(false)
  const [pathStart, setPathStart] = useState<string | null>(null)
  const [pathEnd, setPathEnd] = useState<string | null>(null)
  const [highlightedPath, setHighlightedPath] = useState<string[]>([])
  const graphRef = useRef<HTMLDivElement>(null)

  const filteredKnowledgePoints = selectedSubject === 'all'
    ? mockKnowledgePoints
    : mockKnowledgePoints.filter(p => p.subject === selectedSubject)

  const graphNodes: GraphNode[] = filteredKnowledgePoints.map((point, index) => {
    const angle = (index * 2 * Math.PI) / filteredKnowledgePoints.length
    const radius = Math.min(180, 180 * (filteredKnowledgePoints.length / 20))
    return {
      id: point.id,
      name: point.name,
      x: 400 + radius * Math.cos(angle),
      y: 300 + radius * Math.sin(angle),
      type: 'knowledge',
      relatedIds: point.relatedPoints,
      subject: point.subject
    }
  })

  const graphLinks: GraphLink[] = []
  filteredKnowledgePoints.forEach(point => {
    point.relatedPoints.forEach(relatedId => {
      if (filteredKnowledgePoints.find(p => p.id === relatedId) && point.id < relatedId) {
        graphLinks.push({ source: point.id, target: relatedId })
      }
    })
  })

  const selectedPointData = mockKnowledgePoints.find(p => p.id === selectedNode)

  const relatedPoints = selectedPointData 
    ? mockKnowledgePoints.filter(p => selectedPointData.relatedPoints.includes(p.id))
    : []

  const filteredNodes = searchQuery
    ? graphNodes.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : graphNodes

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5))

  const handlePathfinder = () => {
    if (pathStart && pathEnd) {
      const path = findPath(pathStart, pathEnd)
      setHighlightedPath(path)
    }
  }

  const findPath = (start: string, end: string): string[] => {
    const visited = new Set<string>()
    const queue: string[][] = [[start]]
    
    while (queue.length > 0) {
      const path = queue.shift()!
      const current = path[path.length - 1]
      
      if (current === end) return path
      if (visited.has(current)) continue
      
      visited.add(current)
      const node = mockKnowledgePoints.find(p => p.id === current)
      if (node) {
        node.relatedPoints.forEach(relId => {
          if (!visited.has(relId)) {
            queue.push([...path, relId])
          }
        })
      }
    }
    return []
  }

  const handleAddToLessonPlan = () => {
    if (selectedPointData) {
      addGrowthRecord({
        type: 'practice',
        title: '知识点添加到教案',
        description: `将「${selectedPointData.name}」添加到教学设计中`,
        timestamp: new Date().toISOString()
      })
    }
  }

  const getNodeColor = (subject: string) => subjectColors[subject] || '#64748b'

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Network className="w-7 h-7 text-purple-600" />
            知识图谱支持
          </h1>
          <p className="text-text-secondary mt-1">可视化展示学科知识结构，探索知识点关联关系，支持教学设计</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPathfinder(!showPathfinder)}
            className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
              showPathfinder ? 'bg-primary text-white' : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            <Target className="w-5 h-5" />
            路径查找
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'graph' ? 'list' : 'graph')}
            className="px-4 py-2 bg-surface-tertiary rounded-xl font-medium flex items-center gap-2 hover:text-text-primary transition-all"
          >
            {viewMode === 'graph' ? (
              <>
                <Database className="w-5 h-5" />
                列表视图
              </>
            ) : (
              <>
                <Map className="w-5 h-5" />
                图谱视图
              </>
            )}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        <motion.div 
          className="col-span-3 bg-surface rounded-xl border border-border p-4 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">学科筛选</label>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map((subject) => (
                <button
                  key={subject.value}
                  onClick={() => {
                    setSelectedSubject(subject.value)
                    setSelectedNode(null)
                  }}
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

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">搜索知识点</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="搜索知识点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-tertiary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {showPathfinder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4"
            >
              <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                知识点路径查找
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-text-secondary mb-1 block">起点知识点</label>
                  <select
                    value={pathStart || ''}
                    onChange={(e) => setPathStart(e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">选择起点</option>
                    {filteredKnowledgePoints.map(point => (
                      <option key={point.id} value={point.id}>{point.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-secondary mb-1 block">终点知识点</label>
                  <select
                    value={pathEnd || ''}
                    onChange={(e) => setPathEnd(e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">选择终点</option>
                    {filteredKnowledgePoints.map(point => (
                      <option key={point.id} value={point.id}>{point.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handlePathfinder}
                  disabled={!pathStart || !pathEnd}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  查找路径
                </button>
              </div>
              {highlightedPath.length > 0 && (
                <div className="mt-3 p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-secondary mb-2">路径结果:</p>
                  <div className="flex flex-wrap gap-1">
                    {highlightedPath.map((nodeId, index) => {
                      const node = mockKnowledgePoints.find(p => p.id === nodeId)
                      return (
                        <span key={nodeId}>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs">
                            {node?.name || nodeId}
                          </span>
                          {index < highlightedPath.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-purple-400 inline mx-1" />
                          )}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              图谱统计
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">知识点总数</span>
                <span className="font-semibold text-text-primary">{filteredKnowledgePoints.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">关联关系数</span>
                <span className="font-semibold text-text-primary">{graphLinks.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">学科覆盖</span>
                <span className="font-semibold text-text-primary">
                  {selectedSubject === 'all' ? '6个' : '1个'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={`${viewMode === 'graph' ? 'col-span-9' : 'col-span-12'} bg-surface rounded-xl border border-border`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {viewMode === 'graph' ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors"
                    title="放大"
                  >
                    <ZoomIn className="w-5 h-5 text-text-secondary" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors"
                    title="缩小"
                  >
                    <ZoomOut className="w-5 h-5 text-text-secondary" />
                  </button>
                  <span className="ml-2 text-sm text-text-secondary">缩放: {Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale(1)}
                    className="ml-2 px-3 py-1 text-sm bg-surface-tertiary hover:bg-surface rounded-lg transition-colors"
                  >
                    重置
                  </button>
                </div>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors"
                  title={isFullscreen ? '退出全屏' : '全屏'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-text-secondary" />
                  )}
                </button>
              </div>

              <div 
                ref={graphRef}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
                style={{ 
                  height: isFullscreen ? '600px' : '500px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 800 600">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {graphLinks.map((link, index) => {
                    const sourceNode = graphNodes.find(n => n.id === link.source)
                    const targetNode = graphNodes.find(n => n.id === link.target)
                    if (!sourceNode || !targetNode) return null
                    
                    const isHighlighted = highlightedPath.length > 0 && 
                      highlightedPath.includes(link.source) && 
                      highlightedPath.includes(link.target)

                    return (
                      <motion.line
                        key={`${link.source}-${link.target}`}
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke={isHighlighted ? '#f59e0b' : '#cbd5e1'}
                        strokeWidth={isHighlighted ? 3 : 1}
                        strokeDasharray={isHighlighted ? 'none' : '5,5'}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="transition-colors"
                      />
                    )
                  })}

                  {filteredNodes.map((node) => {
                    const isSelected = selectedNode === node.id
                    const isConnected = selectedNode 
                      ? selectedPointData?.relatedPoints.includes(node.id) || node.id === selectedNode
                      : true
                    const isHighlighted = highlightedPath.includes(node.id)

                    return (
                      <g key={node.id}>
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected || isHighlighted ? 32 : 28}
                          fill={isSelected || isHighlighted ? getNodeColor(node.subject) : '#ffffff'}
                          stroke={isSelected || isHighlighted ? getNodeColor(node.subject) : getNodeColor(node.subject)}
                          strokeWidth={isSelected || isHighlighted ? 3 : 2}
                          filter="url(#glow)"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: isConnected ? 1 : 0.6,
                            opacity: isConnected ? 1 : 0.4
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          onClick={() => setSelectedNode(isSelected ? null : node.id)}
                          className="cursor-pointer"
                        />
                        <text
                          x={node.x}
                          y={node.y - 4}
                          textAnchor="middle"
                          fill={isSelected || isHighlighted ? '#ffffff' : '#1f2937'}
                          fontSize="12"
                          fontWeight={isSelected || isHighlighted ? '600' : '500'}
                          className="pointer-events-none select-none"
                        >
                          {node.name}
                        </text>
                        <text
                          x={node.x}
                          y={node.y + 12}
                          textAnchor="middle"
                          fill={isSelected || isHighlighted ? '#e9d5ff' : '#6b7280'}
                          fontSize="10"
                          className="pointer-events-none select-none"
                        >
                          点击查看
                        </text>
                      </g>
                    )
                  })}
                </svg>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      <span className="text-text-secondary">已选中</span>
                    </div>
                    {subjectOptions.slice(1).map(subject => (
                      <div key={subject.value} className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getNodeColor(subject.value) }}
                        ></div>
                        <span className="text-text-secondary">{subject.label}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-0.5 bg-gray-300"></div>
                      <span className="text-text-secondary">关联关系</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {filteredKnowledgePoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                      selectedNode === point.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedNode(point.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${getNodeColor(point.subject)}20` }}
                          >
                            <Lightbulb className="w-4 h-4" style={{ color: getNodeColor(point.subject) }} />
                          </div>
                          <h3 className="font-semibold text-text-primary">{point.name}</h3>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ backgroundColor: `${getNodeColor(point.subject)}15`, color: getNodeColor(point.subject) }}
                          >
                            {subjectOptions.find(s => s.value === point.subject)?.label}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm">{point.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {point.relatedPoints.slice(0, 3).map(relId => {
                            const relPoint = mockKnowledgePoints.find(p => p.id === relId)
                            return relPoint ? (
                              <span key={relId} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {relPoint.name}
                              </span>
                            ) : null
                          })}
                          {point.relatedPoints.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-400 rounded-full text-xs">
                              +{point.relatedPoints.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-colors ${selectedNode === point.id ? 'text-purple-600' : 'text-gray-300'}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {viewMode === 'graph' && selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3 space-y-4"
          >
            <div className="bg-surface rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  知识点详情
                </h3>
                <button
                  onClick={handleAddToLessonPlan}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                >
                  <Wand2 className="w-4 h-4" />
                  添加到教案
                </button>
              </div>
              {selectedPointData && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getNodeColor(selectedPointData.subject) }}
                    ></div>
                    <span className="text-xs text-text-secondary">
                      {subjectOptions.find(s => s.value === selectedPointData.subject)?.label}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-text-primary mb-2">{selectedPointData.name}</h4>
                  <p className="text-text-secondary text-sm mb-4">{selectedPointData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-tertiary rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{selectedPointData.resources.length}</p>
                      <p className="text-xs text-text-secondary">学习资源</p>
                    </div>
                    <div className="bg-surface-tertiary rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-secondary">{selectedPointData.exercises.length}</p>
                      <p className="text-xs text-text-secondary">练习题</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-surface rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-text-primary">关联知识点</h3>
              </div>
              {relatedPoints.length > 0 ? (
                <div className="space-y-2">
                  {relatedPoints.map((point, index) => (
                    <motion.button
                      key={point.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedNode(point.id)}
                      className="w-full text-left p-3 bg-surface-tertiary hover:bg-purple-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${getNodeColor(point.subject)}20` }}
                          >
                            <Link2 className="w-4 h-4" style={{ color: getNodeColor(point.subject) }} />
                          </div>
                          <span className="text-sm font-medium text-text-primary group-hover:text-purple-600">
                            {point.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-purple-500" />
                      </div>
                      <p className="text-xs text-text-tertiary mt-1 ml-10 line-clamp-1">{point.description}</p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-secondary text-center py-4">暂无关联知识点</p>
              )}
            </div>

            {selectedPointData && selectedPointData.resources.length > 0 && (
              <div className="bg-surface rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-text-primary">学习资源</h3>
                </div>
                <div className="space-y-2">
                  {selectedPointData.resources.slice(0, 3).map((resource, index) => (
                    <motion.a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-surface-tertiary hover:bg-purple-50 rounded-lg transition-colors group"
                    >
                      {resource.type === 'video' ? (
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary group-hover:text-purple-600 truncate">
                          {resource.title}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {resource.type === 'video' ? `${resource.duration}分钟` : '文档'}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-purple-500" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {selectedPointData && selectedPointData.exercises.length > 0 && (
              <div className="bg-surface rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-text-primary">练习题预览</h3>
                </div>
                <div className="space-y-2">
                  {selectedPointData.exercises.slice(0, 2).map((exercise) => (
                    <div key={exercise.id} className="p-3 bg-surface-tertiary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded">
                          {exercise.type === 'single' ? '单选' : exercise.type === 'multiple' ? '多选' : '填空'}
                        </span>
                      </div>
                      <p className="text-sm text-text-primary line-clamp-2">{exercise.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
