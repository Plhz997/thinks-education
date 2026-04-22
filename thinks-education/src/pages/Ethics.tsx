import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, FileText, BookOpen, CheckCircle, ChevronRight, Send, History, Star, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockEthicsScenarios } from '@/data/mockData'

const categoryLabels: Record<string, string> = {
  gift: '廉洁从教',
  conflict: '冲突调解',
  fairness: '教育公平',
  'special-care': '特殊关怀',
  professional: '专业自律'
}

const categoryColors: Record<string, string> = {
  gift: 'bg-danger/10 text-danger',
  conflict: 'bg-warning/10 text-warning',
  fairness: 'bg-info/10 text-info',
  'special-care': 'bg-accent/10 text-accent',
  professional: 'bg-primary/10 text-primary'
}

export function Ethics() {
  const { addEthicsResponse, addGrowthRecord, ethicsResponses } = useAppStore()
  const [selectedScenario, setSelectedScenario] = useState(mockEthicsScenarios[0])
  const [userResponse, setUserResponse] = useState('')
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<{
    educationIdeal: number
    educationFairness: number
    careStudents: number
    professionalEthics: number
    report: string
  } | null>(null)
  const [activeTab, setActiveTab] = useState<'training' | 'history'>('training')

  const handleSubmitResponse = () => {
    if (!userResponse.trim()) return

    const mockEvaluation = {
      educationIdeal: Math.floor(Math.random() * 30) + 70,
      educationFairness: Math.floor(Math.random() * 30) + 70,
      careStudents: Math.floor(Math.random() * 30) + 70,
      professionalEthics: Math.floor(Math.random() * 30) + 70,
      report: `您的回答展现了良好的教育理念。在教育理想方面，您表现出对教育事业的热爱和追求；在教育公平方面，您考虑到了每个学生的平等权利；在关爱学生方面，您体现出对学生的关怀；在专业自律方面，您展现了良好的职业操守。建议您继续加强教育理论学习，不断提升自己的专业素养。`
    }

    setEvaluationResult(mockEvaluation)
    setShowEvaluation(true)
    
    addEthicsResponse({
      scenarioId: selectedScenario.id,
      userId: 'u1',
      response: userResponse,
      evaluation: {
        educationIdeal: mockEvaluation.educationIdeal,
        educationFairness: mockEvaluation.educationFairness,
        careStudents: mockEvaluation.careStudents,
        professionalEthics: mockEvaluation.professionalEthics
      },
      report: mockEvaluation.report
    })

    addGrowthRecord({
      type: 'ethics',
      title: `师德情境训练 - ${selectedScenario.title}`,
      description: `完成师德情境训练，获得综合评价`,
      timestamp: new Date().toISOString()
    })
  }

  const metrics = evaluationResult ? [
    { name: '教育理想', score: evaluationResult.educationIdeal, icon: Star },
    { name: '教育公平', score: evaluationResult.educationFairness, icon: Star },
    { name: '关爱学生', score: evaluationResult.careStudents, icon: Star },
    { name: '专业自律', score: evaluationResult.professionalEthics, icon: Star },
  ] : []

  const avgScore = evaluationResult 
    ? Math.round((evaluationResult.educationIdeal + evaluationResult.educationFairness + evaluationResult.careStudents + evaluationResult.professionalEthics) / 4)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教师职业信念培养</h1>
          <p className="text-text-secondary mt-1">基于"四有好老师"标准，进行师德师风与职业信念培养</p>
        </div>
        <div className="flex gap-2">
          {['training', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'training' | 'history')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-text-secondary hover:border-primary/50'
              }`}
            >
              {tab === 'training' ? '情境训练' : '历史记录'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'training' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-text-primary">选择训练场景</h2>
              </div>
              <div className="space-y-3">
                {mockEthicsScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario)
                      setUserResponse('')
                      setShowEvaluation(false)
                      setEvaluationResult(null)
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedScenario.id === scenario.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-surface-tertiary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[scenario.category]}`}>
                            {categoryLabels[scenario.category]}
                          </span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < scenario.difficulty ? 'text-warning fill-warning' : 'text-border'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="font-medium text-text-primary">{scenario.title}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${selectedScenario.id === scenario.id ? 'text-primary' : 'text-text-tertiary'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${categoryColors[selectedScenario.category]} flex items-center justify-center`}>
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedScenario.title}</h3>
                  <span className={`text-sm ${categoryColors[selectedScenario.category]}`}>
                    {categoryLabels[selectedScenario.category]}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-surface-tertiary rounded-xl">
                <p className="text-text-primary leading-relaxed">{selectedScenario.description}</p>
              </div>
            </div>

            {!showEvaluation ? (
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">请输入您的处理思路</h3>
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="请详细描述您会如何处理这个情境..."
                  className="w-full h-40 px-4 py-3 bg-surface-tertiary border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-text-tertiary">
                    {userResponse.length} 字
                  </p>
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!userResponse.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    提交
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-surface rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-text-primary">评价结果</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric) => (
                      <div key={metric.name} className="p-4 bg-surface-tertiary rounded-xl text-center">
                        <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-text-primary">{metric.score}</p>
                        <p className="text-sm text-text-secondary">{metric.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {avgScore}
                      </p>
                      <p className="text-text-secondary">综合评分</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-text-primary">伦理决策报告</h3>
                  </div>
                  <div className="p-4 bg-surface-tertiary rounded-xl">
                    <p className="text-text-primary leading-relaxed">{evaluationResult?.report}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setUserResponse('')
                      setShowEvaluation(false)
                      setEvaluationResult(null)
                    }}
                    className="px-6 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    继续训练
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-text-primary">训练历史记录</h2>
          </div>
          
          {ethicsResponses.length > 0 ? (
            <div className="space-y-4">
              {ethicsResponses.map((response) => {
                const scenario = mockEthicsScenarios.find(s => s.id === response.scenarioId)
                const avgScore = Math.round(
                  (response.evaluation.educationIdeal + 
                   response.evaluation.educationFairness + 
                   response.evaluation.careStudents + 
                   response.evaluation.professionalEthics) / 4
                )
                return (
                  <div key={response.id} className="p-4 bg-surface-tertiary rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{scenario?.title}</p>
                          <p className="text-sm text-text-tertiary">
                            {new Date(response.timestamp).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{avgScore}</p>
                        <p className="text-xs text-text-tertiary">综合评分</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2">{response.response}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">暂无训练记录</p>
              <button
                onClick={() => setActiveTab('training')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                开始训练
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
