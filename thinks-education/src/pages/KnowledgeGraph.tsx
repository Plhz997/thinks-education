import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, ZoomIn, ZoomOut, Maximize2, Minimize2, ArrowRight, Lightbulb, BookOpen, Link2, Database, Network, Map, FileText, ExternalLink } from 'lucide-react'
import { mockKnowledgePoints } from '@/data/mockData'

interface GraphNode {
  id: string
  name: string
  x: number
  y: number
  type: string
  relatedIds: string[]
}

interface GraphLink {
  source: string
  target: string
  label?: string
}

export function KnowledgeGraph() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph')
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const graphRef = useRef<HTMLDivElement>(null)

  const graphNodes: GraphNode[] = mockKnowledgePoints.map((point, index) => {
    const angle = (index * 2 * Math.PI) / mockKnowledgePoints.length
    const radius = 180
    return {
      id: point.id,
      name: point.name,
      x: 400 + radius * Math.cos(angle),
      y: 300 + radius * Math.sin(angle),
      type: 'knowledge',
      relatedIds: point.relatedPoints
    }
  })

  const graphLinks: GraphLink[] = []
  mockKnowledgePoints.forEach(point => {
    point.relatedPoints.forEach(relatedId => {
      if (point.id < relatedId) {
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

  const highlightColor = '#8b5cf6'
  const normalColor = '#64748b'
  const lineColor = '#cbd5e1'

  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Network className="w-7 h-7 text-purple-600" />
              知识图谱
            </h1>
            <p className="text-gray-500 mt-1">可视化展示学科知识结构，探索知识点关联关系</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('graph')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'graph' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Map className="w-4 h-4" />
                  图谱视图
                </span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Database className="w-4 h-4" />
                  列表视图
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索知识点..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <motion.div 
          className={`${viewMode === 'graph' ? 'col-span-9' : 'col-span-12'} bg-white rounded-xl shadow-sm border border-gray-100`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {viewMode === 'graph' ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="放大"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="缩小"
                  >
                    <ZoomOut className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="ml-2 text-sm text-gray-500">缩放: {Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale(1)}
                    className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    重置
                  </button>
                </div>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={isFullscreen ? '退出全屏' : '全屏'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-600" />
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
                    
                    const isHighlighted = selectedNode 
                      ? sourceNode.id === selectedNode || targetNode.id === selectedNode
                      : false

                    return (
                      <motion.line
                        key={`${link.source}-${link.target}`}
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke={isHighlighted ? highlightColor : lineColor}
                        strokeWidth={isHighlighted ? 2 : 1}
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

                    return (
                      <g key={node.id}>
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 32 : 28}
                          fill={isSelected ? highlightColor : '#ffffff'}
                          stroke={isSelected ? highlightColor : normalColor}
                          strokeWidth={isSelected ? 3 : 2}
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
                          fill={isSelected ? '#ffffff' : '#1f2937'}
                          fontSize="12"
                          fontWeight={isSelected ? '600' : '500'}
                          className="pointer-events-none select-none"
                        >
                          {node.name}
                        </text>
                        <text
                          x={node.x}
                          y={node.y + 12}
                          textAnchor="middle"
                          fill={isSelected ? '#e9d5ff' : '#6b7280'}
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
                      <span className="text-gray-600">已选中</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400"></div>
                      <span className="text-gray-600">知识点</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-0.5 bg-gray-300"></div>
                      <span className="text-gray-600">关联关系</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {mockKnowledgePoints.map((point, index) => (
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
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          <Lightbulb className={`w-5 h-5 ${selectedNode === point.id ? 'text-purple-600' : 'text-gray-400'}`} />
                          {point.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{point.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">关联知识点:</span>
                          {point.relatedPoints.map(relId => {
                            const relPoint = mockKnowledgePoints.find(p => p.id === relId)
                            return relPoint ? (
                              <span key={relId} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {relPoint.name}
                              </span>
                            ) : null
                          })}
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">知识点详情</h3>
              </div>
              {selectedPointData && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{selectedPointData.name}</h4>
                  <p className="text-gray-500 text-sm mb-4">{selectedPointData.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">相关资源: {selectedPointData.resources.length} 个</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">练习题: {selectedPointData.exercises.length} 道</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">关联知识点</h3>
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
                      className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                          {point.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{point.description}</p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">暂无关联知识点</p>
              )}
            </div>

            {selectedPointData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">学习资源</h3>
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
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
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
                        <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600 truncate">
                          {resource.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {resource.type === 'video' ? `${resource.duration}分钟` : '文档'}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                    </motion.a>
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
