import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, FileText, Star, Calendar, Clock, User, Play, Mic, MessageSquare, Eye, LineChart, BarChart3, CheckCircle, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store'

const mockObservations = [
  { id: 'o1', title: '三角函数的图像与性质', teacher: '王老师', school: '第一中学', date: '2024-04-20', duration: 45, status: 'completed', score: 88 },
  { id: 'o2', title: '导数的概念及其应用', teacher: '李老师', school: '第二中学', date: '2024-04-18', duration: 40, status: 'completed', score: 92 },
  { id: 'o3', title: '等差数列求和公式', teacher: '张老师', school: '第三中学', date: '2024-04-25', duration: 45, status: 'pending', score: null },
]

const mockClassRecordings = [
  { id: 'cr1', title: '名师课堂 - 函数单调性', duration: 42, views: 156, date: '2024-04-15' },
  { id: 'cr2', title: '优秀示范课 - 概率统计', duration: 45, views: 203, date: '2024-04-10' },
  { id: 'cr3', title: '新教师汇报课 - 立体几何', duration: 40, views: 89, date: '2024-04-08' },
]

const mockFeedbackMetrics = [
  { name: '语速稳定性', score: 85, maxScore: 100, suggestion: '语速适中，建议在重点内容处适当放慢', status: 'good' },
  { name: '表达清晰度', score: 88, maxScore: 100, suggestion: '语言表达清晰，逻辑连贯', status: 'good' },
  { name: '内容完整性', score: 75, maxScore: 100, suggestion: '内容覆盖较全面，建议增加实例说明', status: 'medium' },
  { name: '结构合理性', score: 82, maxScore: 100, suggestion: '整体结构合理，过渡自然', status: 'good' },
  { name: '互动有效性', score: 72, maxScore: 100, suggestion: '增加提问频率，鼓励学生参与', status: 'medium' },
  { name: '情绪感染力', score: 78, maxScore: 100, suggestion: '适当增加肢体语言和表情变化', status: 'medium' },
]

const mockTranscript = [
  { time: '00:00', text: '同学们好，今天我们来学习三角函数的图像与性质。', type: 'teacher' },
  { time: '00:15', text: '首先，请大家回忆一下什么是三角函数？', type: 'teacher' },
  { time: '00:30', text: '很好，三角函数包括正弦函数、余弦函数和正切函数。', type: 'teacher' },
  { time: '01:00', text: '下面我们来看正弦函数的图像。', type: 'teacher' },
  { time: '01:30', text: '从图像中我们可以看出，正弦函数是一个周期函数。', type: 'teacher' },
  { time: '02:00', text: '它的周期是2π，也就是360度。', type: 'teacher' },
]

export function Observation() {
  const { addGrowthRecord } = useAppStore()
  const [activeTab, setActiveTab] = useState<'my-observations' | 'class-library' | 'evaluation' | 'mock-teaching'>('my-observations')
  const [selectedObservation, setSelectedObservation] = useState<string | null>(null)
  const [evaluationForm, setEvaluationForm] = useState({
    teachingDesign: 85,
    teachingMethod: 80,
    studentEngagement: 78,
    teachingEffect: 82,
    overallComment: ''
  })
  const [isRecording, setIsRecording] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisData, setAnalysisData] = useState<typeof mockFeedbackMetrics>([])

  const handleSubmitEvaluation = () => {
    addGrowthRecord({
      type: 'practice',
      title: '评课完成',
      description: `完成了「${mockObservations.find(o => o.id === selectedObservation)?.title}」的评课`,
      timestamp: new Date().toISOString()
    })
    setSelectedObservation(null)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setShowAnalysis(true)
      setAnalysisData(mockFeedbackMetrics)
      addGrowthRecord({
        type: 'practice',
        title: '虚拟试讲练习',
        description: '完成了一次虚拟试讲并获得AI分析反馈',
        timestamp: new Date().toISOString()
      })
    }, 10000)
  }

  const averageScore = analysisData.length > 0
    ? Math.round(analysisData.reduce((sum, m) => sum + m.score, 0) / analysisData.length)
    : 0

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教学反馈与分析</h1>
          <p className="text-text-secondary mt-1">见习评课、虚拟试讲评估与多模态数据分析</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-primary text-white rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Video className="w-5 h-5" />
          预约听课
        </motion.button>
      </motion.div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex gap-2 p-1 bg-surface-tertiary rounded-xl mb-6">
          {[
            { id: 'my-observations', label: '我的听课记录', icon: FileText },
            { id: 'class-library', label: '课堂资源库', icon: Video },
            { id: 'evaluation', label: '评分标准', icon: Star },
            { id: 'mock-teaching', label: '虚拟试讲', icon: Mic },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab)
                  setShowAnalysis(false)
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'my-observations' && (
          <div className="space-y-4">
            {mockObservations.map((observation) => (
              <motion.div
                key={observation.id}
                whileHover={{ x: 4 }}
                className={`p-4 rounded-xl border ${
                  observation.status === 'completed' ? 'border-border bg-surface-tertiary/50' : 'border-primary/30 bg-primary/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-text-primary">{observation.title}</h3>
                      {observation.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-lg">已完成</span>
                      )}
                      {observation.status === 'pending' && (
                        <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-lg">待听课</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {observation.teacher}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {observation.school}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {observation.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {observation.duration}分钟
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {observation.score !== null && (
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-warning fill-warning" />
                        <span className="text-xl font-bold text-text-primary">{observation.score}</span>
                      </div>
                    )}
                    {observation.status === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2"
                        onClick={() => setSelectedObservation(observation.id)}
                      >
                        <Play className="w-4 h-4" />
                        开始听课
                      </motion.button>
                    )}
                    {observation.status === 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-surface-tertiary text-text-primary rounded-lg text-sm flex items-center gap-2 hover:bg-surface-secondary"
                        onClick={() => setSelectedObservation(observation.id)}
                      >
                        <FileText className="w-4 h-4" />
                        查看报告
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'class-library' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockClassRecordings.map((recording) => (
              <motion.div
                key={recording.id}
                whileHover={{ y: -4 }}
                className="bg-surface-tertiary rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </button>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {recording.duration}分钟
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-text-primary mb-2">{recording.title}</h3>
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>{recording.views} 次观看</span>
                    <span>{recording.date}</span>
                  </div>
                  <button className="mt-3 w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                    观看视频
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '教学设计', description: '教学目标明确，教学内容合理', weight: '20%' },
                { title: '教学方法', description: '教学方法多样，符合学生认知规律', weight: '25%' },
                { title: '学生参与', description: '学生积极参与，课堂氛围活跃', weight: '25%' },
                { title: '教学效果', description: '教学目标达成度高，学生学有所获', weight: '30%' },
              ].map((item, index) => (
                <div key={item.title} className="bg-surface-tertiary rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{item.title}</h4>
                    <span className="text-sm text-text-tertiary">{item.weight}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= Math.ceil((index + 1) * 1.2) ? 'text-warning fill-warning' : 'text-border'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">评课指标详解</h4>
              <div className="space-y-4">
                {[
                  { level: '优秀 (90-100)', desc: '教学目标明确，教学方法得当，学生参与度高，教学效果显著' },
                  { level: '良好 (75-89)', desc: '教学目标较明确，教学方法较得当，学生参与度较高，教学效果较好' },
                  { level: '合格 (60-74)', desc: '教学目标基本明确，教学方法基本得当，学生有一定参与度' },
                  { level: '需改进 (60以下)', desc: '教学目标不明确，教学方法不当，需加强学习和实践' },
                ].map((item) => (
                  <div key={item.level} className="flex items-start gap-3">
                    <span className="font-medium text-primary">{item.level}</span>
                    <span className="text-text-secondary text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mock-teaching' && (
          <div className="space-y-6">
            {!showAnalysis ? (
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">虚拟试讲评估</h3>
                <p className="text-text-secondary mb-8">点击下方按钮开始录制您的试讲，系统将对您的表现进行多维度分析</p>
                
                <motion.button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  whileHover={!isRecording ? { scale: 1.05 } : {}}
                  whileTap={!isRecording ? { scale: 0.95 } : {}}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 transition-all ${
                    isRecording
                      ? 'bg-danger animate-pulse'
                      : 'bg-gradient-to-br from-primary to-secondary hover:shadow-lg hover:shadow-primary/25'
                  } text-white`}
                >
                  {isRecording ? (
                    <>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                        <Mic className="w-10 h-10" />
                      </motion.div>
                      <span className="text-sm font-medium">录制中...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-10 h-10" />
                      <span className="text-sm font-medium">开始试讲</span>
                    </>
                  )}
                </motion.button>
                
                <p className="mt-6 text-text-tertiary text-sm">建议录制时长：5-10分钟</p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Mic, label: '语音分析', desc: '语速、语调、流畅度' },
                    { icon: MessageSquare, label: '内容分析', desc: '完整性、逻辑性、准确性' },
                    { icon: Eye, label: '行为分析', desc: '肢体语言、表情变化' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-4 bg-surface rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-text-primary">{item.label}</p>
                          <p className="text-sm text-text-tertiary">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">试讲分析报告</h3>
                      <p className="text-text-secondary text-sm mt-1">多模态数据分析结果</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-primary">{averageScore}</p>
                      <p className="text-text-tertiary text-sm">综合评分</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-surface rounded-xl border border-border p-6">
                    <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-primary" />
                      维度得分
                    </h4>
                    <div className="space-y-4">
                      {analysisData.map((metric) => (
                        <div key={metric.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-text-primary">{metric.name}</span>
                            <span className={`font-medium ${
                              metric.score >= 80 ? 'text-accent' : metric.score >= 70 ? 'text-warning' : 'text-danger'
                            }`}>
                              {metric.score}分
                            </span>
                          </div>
                          <div className="h-3 bg-surface-tertiary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.score}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`h-full rounded-full ${
                                metric.score >= 80 ? 'bg-accent' : metric.score >= 70 ? 'bg-warning' : 'bg-danger'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface rounded-xl border border-border p-6">
                    <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-secondary" />
                      分析建议
                    </h4>
                    <div className="space-y-3">
                      {analysisData.map((metric) => (
                        <div key={metric.name} className={`p-3 rounded-lg ${
                          metric.status === 'good' ? 'bg-green-50' : 'bg-yellow-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {metric.status === 'good' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            )}
                            <span className={`font-medium ${
                              metric.status === 'good' ? 'text-green-700' : 'text-yellow-700'
                            }`}>
                              {metric.name}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary ml-6">{metric.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl border border-border p-6">
                  <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-info" />
                    语音转写文本
                  </h4>
                  <div className="bg-surface-tertiary rounded-xl p-4 max-h-40 overflow-y-auto">
                    {mockTranscript.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 mb-2">
                        <span className="text-text-tertiary text-sm font-mono flex-shrink-0">{item.time}</span>
                        <span className={`text-text-primary text-sm ${
                          item.type === 'teacher' ? 'font-medium' : 'italic'
                        }`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAnalysis(false)}
                    className="flex-1 py-3 border border-border text-text-primary rounded-xl hover:bg-surface-tertiary transition-colors"
                  >
                    重新录制
                  </button>
                  <button className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                    保存报告
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {selectedObservation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedObservation(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">评课评分</h2>
                  <p className="text-text-secondary text-sm mt-1">
                    {mockObservations.find(o => o.id === selectedObservation)?.title}
                  </p>
                </div>
                <button onClick={() => setSelectedObservation(null)} className="text-text-tertiary hover:text-text-primary">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">教学设计评分</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={evaluationForm.teachingDesign}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, teachingDesign: Number(e.target.value) })}
                    className="w-full h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-text-tertiary mt-1">
                    <span>0</span>
                    <span className="font-medium text-primary">{evaluationForm.teachingDesign}分</span>
                    <span>100</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">教学方法评分</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={evaluationForm.teachingMethod}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, teachingMethod: Number(e.target.value) })}
                    className="w-full h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-text-tertiary mt-1">
                    <span>0</span>
                    <span className="font-medium text-primary">{evaluationForm.teachingMethod}分</span>
                    <span>100</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">学生参与评分</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={evaluationForm.studentEngagement}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, studentEngagement: Number(e.target.value) })}
                    className="w-full h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-text-tertiary mt-1">
                    <span>0</span>
                    <span className="font-medium text-primary">{evaluationForm.studentEngagement}分</span>
                    <span>100</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">教学效果评分</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={evaluationForm.teachingEffect}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, teachingEffect: Number(e.target.value) })}
                    className="w-full h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-text-tertiary mt-1">
                    <span>0</span>
                    <span className="font-medium text-primary">{evaluationForm.teachingEffect}分</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">评课评语</label>
                <textarea
                  value={evaluationForm.overallComment}
                  onChange={(e) => setEvaluationForm({ ...evaluationForm, overallComment: e.target.value })}
                  placeholder="请输入您的评课意见和建议..."
                  className="w-full h-24 p-4 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedObservation(null)}
                  className="flex-1 py-3 border border-border text-text-primary rounded-xl hover:bg-surface-tertiary transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  提交评课
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">已完成听课</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <Video className="w-12 h-12 text-white/30" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-accent to-secondary rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">平均评分</p>
              <p className="text-3xl font-bold mt-2">86</p>
            </div>
            <Star className="w-12 h-12 text-white/30" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-warning to-warning-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">待听课</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <Calendar className="w-12 h-12 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
