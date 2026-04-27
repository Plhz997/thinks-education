import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, FileText, CheckCircle, Send, History, Star } from 'lucide-react'
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
  gift: 'bg-warning/10 text-warning',
  conflict: 'bg-danger/10 text-danger',
  fairness: 'bg-info/10 text-info',
  'special-care': 'bg-accent/10 text-accent',
  professional: 'bg-primary/10 text-primary'
}

export function Ethics() {
  const { addEthicsResponse, addGrowthRecord, ethicsResponses } = useAppStore()
  const [activeTab, setActiveTab] = useState<'scenarios' | 'history' | 'report'>('scenarios')
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [evaluation, setEvaluation] = useState<{
    educationIdeal: number
    educationFairness: number
    careStudents: number
    professionalDiscipline: number
  } | null>(null)
  const [exportSuccess, setExportSuccess] = useState(false)

  const handleSubmitAnswer = () => {
    if (!selectedScenario || !userAnswer.trim()) return
    
    const mockEvaluation = {
      educationIdeal: Math.floor(Math.random() * 30) + 70,
      educationFairness: Math.floor(Math.random() * 30) + 70,
      careStudents: Math.floor(Math.random() * 30) + 70,
      professionalDiscipline: Math.floor(Math.random() * 30) + 70
    }
    
    setEvaluation(mockEvaluation)
    setShowEvaluation(true)
    
    addEthicsResponse({
      scenarioId: selectedScenario,
      userId: 'u1',
      answer: userAnswer,
      evaluation: mockEvaluation
    })
    
    addGrowthRecord({
      type: 'ethics',
      title: '师德情境训练完成',
      description: `完成了「${mockEthicsScenarios.find(s => s.id === selectedScenario)?.title}」情境训练`,
      timestamp: new Date().toISOString()
    })
  }

  const exportTrainingReport = () => {
    if (!selectedScenario || !evaluation) return
    
    const scenario = mockEthicsScenarios.find(s => s.id === selectedScenario)
    const reportContent = `
========================================
    师德训练报告
========================================

【报告基本信息】
生成时间：${new Date().toLocaleString('zh-CN')}
训练情境：${scenario?.title}
情境类别：${categoryLabels[scenario?.category || 'professional']}

【情境描述】
${scenario?.description}

【我的回答】
${userAnswer}

【AI分析结果】
综合评分：${Math.round((evaluation.educationIdeal + evaluation.educationFairness + evaluation.careStudents + evaluation.professionalDiscipline) / 4)} 分
评价等级：${Math.round((evaluation.educationIdeal + evaluation.educationFairness + evaluation.careStudents + evaluation.professionalDiscipline) / 4) >= 85 ? '优秀' : Math.round((evaluation.educationIdeal + evaluation.educationFairness + evaluation.careStudents + evaluation.professionalDiscipline) / 4) >= 70 ? '良好' : '需改进'}

【维度得分】
教育理想：${evaluation.educationIdeal} 分
教育公平：${evaluation.educationFairness} 分
关爱学生：${evaluation.careStudents} 分
专业自律：${evaluation.professionalDiscipline} 分

【伦理决策报告摘要】
您的回答充分体现了作为一名未来教师应有的职业素养。在教育理想维度表现突出，展现了对教育事业的热爱和追求。建议在关爱学生方面进一步加强沟通技巧的学习，以更好地理解学生需求。

【改进建议】
1. 继续保持对教育事业的热情和追求
2. 加强与学生的沟通能力培养
3. 注重教育公平理念的实践
4. 保持专业自律精神

========================================
    Thinks行世教育 · AI智联体
========================================
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `师德训练报告_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setExportSuccess(true)
    setTimeout(() => setExportSuccess(false), 2000)
  }

  const exportSummaryReport = () => {
    const avgEducationIdeal = ethicsResponses.length > 0 
      ? Math.round(ethicsResponses.reduce((sum, r) => sum + r.evaluation.educationIdeal, 0) / ethicsResponses.length)
      : 85
    const avgEducationFairness = ethicsResponses.length > 0
      ? Math.round(ethicsResponses.reduce((sum, r) => sum + r.evaluation.educationFairness, 0) / ethicsResponses.length)
      : 82
    const avgCareStudents = ethicsResponses.length > 0
      ? Math.round(ethicsResponses.reduce((sum, r) => sum + r.evaluation.careStudents, 0) / ethicsResponses.length)
      : 80
    const avgProfessionalDiscipline = ethicsResponses.length > 0
      ? Math.round(ethicsResponses.reduce((sum, r) => sum + r.evaluation.professionalDiscipline, 0) / ethicsResponses.length)
      : 88

    const reportContent = `
========================================
    伦理决策汇总报告
========================================

【报告基本信息】
生成时间：${new Date().toLocaleString('zh-CN')}
完成训练次数：${ethicsResponses.length || 3} 次
师德档案完整性：${Math.min(100, (ethicsResponses.length || 3) * 25)}%

【平均维度得分】
教育理想：${avgEducationIdeal} 分
教育公平：${avgEducationFairness} 分
关爱学生：${avgCareStudents} 分
专业自律：${avgProfessionalDiscipline} 分

【训练历史记录】
${ethicsResponses.map((response, index) => {
  const scenario = mockEthicsScenarios.find(s => s.id === response.scenarioId)
  const avgScore = Math.round((response.evaluation.educationIdeal + response.evaluation.educationFairness + response.evaluation.careStudents + response.evaluation.professionalDiscipline) / 4)
  return `${index + 1}. ${scenario?.title || '未知情境'} - 评分：${avgScore}分 - ${new Date(response.timestamp).toLocaleDateString('zh-CN')}`
}).join('\n') || '暂无训练记录'}

【师德发展趋势】
第1月：65分
第2月：72分
第3月：78分
第4月：82分
第5月：85分

【发展建议】
1. 继续保持良好的师德修养
2. 加强教育公平理念的学习
3. 注重与学生的沟通交流
4. 定期进行自我反思和提升

========================================
    Thinks行世教育 · AI智联体
========================================
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `伦理决策汇总报告_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setExportSuccess(true)
    setTimeout(() => setExportSuccess(false), 2000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-warning/10 to-primary/10 rounded-2xl p-6 border border-warning/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warning to-amber-400 flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">教师职业信念培养</h1>
            <p className="text-text-secondary text-sm">践行"四有好老师"标准，培养高尚师德情操</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border w-fit">
        {[
          { id: 'scenarios', label: '情境训练', icon: Heart },
          { id: 'history', label: '训练记录', icon: History },
          { id: 'report', label: '伦理报告', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab)
                setSelectedScenario(null)
                setShowEvaluation(false)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'scenarios' && (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-semibold text-text-primary">选择训练情境</h3>
              {mockEthicsScenarios.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario.id)
                    setShowEvaluation(false)
                    setUserAnswer('')
                  }}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[scenario.category]}`}>
                      {categoryLabels[scenario.category]}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: scenario.difficulty }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="font-medium text-text-primary mb-1">{scenario.title}</p>
                  <p className="text-sm text-text-secondary line-clamp-2">{scenario.description}</p>
                </motion.button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedScenario ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface rounded-xl border border-border p-6"
                >
                  {!showEvaluation ? (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[mockEthicsScenarios.find(s => s.id === selectedScenario)!.category]}`}>
                            {categoryLabels[mockEthicsScenarios.find(s => s.id === selectedScenario)!.category]}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                          {mockEthicsScenarios.find(s => s.id === selectedScenario)!.title}
                        </h3>
                        <p className="text-text-secondary">
                          {mockEthicsScenarios.find(s => s.id === selectedScenario)!.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-text-secondary mb-2">请描述你的处理思路</label>
                        <textarea
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="请详细描述您在该情境下的处理思路和具体做法..."
                          className="w-full h-32 p-4 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>

                      <div className="bg-secondary/5 rounded-xl p-4 mb-6">
                        <h4 className="text-sm font-medium text-secondary mb-2">思考提示</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• 如何体现教育公平原则？</li>
                          <li>• 如何兼顾学生的个体差异？</li>
                          <li>• 如何维护良好的师生关系？</li>
                          <li>• 如何保持专业自律精神？</li>
                        </ul>
                      </div>

                      <motion.button
                        onClick={handleSubmitAnswer}
                        disabled={!userAnswer.trim()}
                        whileHover={userAnswer.trim() ? { scale: 1.02 } : {}}
                        whileTap={userAnswer.trim() ? { scale: 0.98 } : {}}
                        className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                          userAnswer.trim()
                            ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/25'
                            : 'bg-surface-tertiary text-text-tertiary cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-5 h-5" />
                        提交回答并获取评价
                      </motion.button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        <span className="font-semibold text-text-primary">评价结果已生成</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: '教育理想', value: evaluation!.educationIdeal, color: 'from-primary to-primary-light' },
                          { label: '教育公平', value: evaluation!.educationFairness, color: 'from-secondary to-secondary-light' },
                          { label: '关爱学生', value: evaluation!.careStudents, color: 'from-accent to-accent-light' },
                          { label: '专业自律', value: evaluation!.professionalDiscipline, color: 'from-warning to-amber-400' },
                        ].map((item) => (
                          <div key={item.label} className="bg-surface-tertiary rounded-xl p-4">
                            <p className="text-sm text-text-secondary mb-2">{item.label}</p>
                            <div className="flex items-center gap-3">
                              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                <span className="text-2xl font-bold text-white">{item.value}</span>
                              </div>
                              <div className="flex-1">
                                <div className="h-2 bg-surface rounded-full overflow-hidden mb-1">
                                  <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                                </div>
                                <p className="text-xs text-text-tertiary">{item.value >= 85 ? '优秀' : item.value >= 70 ? '良好' : '需改进'}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-primary/5 rounded-xl p-4">
                        <h4 className="font-semibold text-primary mb-2">伦理决策报告摘要</h4>
                        <p className="text-sm text-text-secondary">
                          您的回答充分体现了作为一名未来教师应有的职业素养。在教育理想维度表现突出，展现了对教育事业的热爱和追求。建议在关爱学生方面进一步加强沟通技巧的学习，以更好地理解学生需求。整体评价：良好
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowEvaluation(false)
                            setSelectedScenario(null)
                          }}
                          className="flex-1 h-12 border border-border rounded-xl font-medium hover:bg-surface-tertiary transition-all"
                        >
                          返回选择
                        </button>
                        <button
                          onClick={exportTrainingReport}
                          className={`flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                            exportSuccess
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-white hover:bg-primary-dark'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          {exportSuccess ? '下载成功' : '下载训练报告'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="bg-surface rounded-xl border border-border p-12 text-center">
                  <Heart className="w-16 h-16 text-warning/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">选择一个情境开始训练</h3>
                  <p className="text-text-secondary">从左侧列表中选择一个师德情境进行模拟训练</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-surface rounded-xl border border-border p-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">训练历史记录</h3>
            {ethicsResponses.length > 0 ? (
              <div className="space-y-3">
                {ethicsResponses.map((response) => (
                  <div key={response.id} className="flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">
                        {mockEthicsScenarios.find(s => s.id === response.scenarioId)?.title}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        {new Date(response.timestamp).toLocaleString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {Math.round((response.evaluation.educationIdeal + response.evaluation.educationFairness + response.evaluation.careStudents + response.evaluation.professionalDiscipline) / 4)}
                      </p>
                      <p className="text-xs text-text-tertiary">综合评分</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-text-tertiary/30 mx-auto mb-4" />
                <p className="text-text-secondary">暂无训练记录</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-surface rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-text-primary">伦理决策报告</h3>
              <button
                onClick={exportSummaryReport}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  exportSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">{exportSuccess ? '导出成功' : '导出报告'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: '完成训练次数', value: ethicsResponses.length || 3, unit: '次' },
                { label: '平均教育理想评分', value: 85, unit: '分' },
                { label: '平均教育公平评分', value: 82, unit: '分' },
                { label: '师德档案完整性', value: 78, unit: '%' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-tertiary rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary mb-1">{stat.value}{stat.unit}</p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">师德发展趋势</h4>
              <div className="flex items-end gap-4 h-32">
                {[65, 72, 78, 82, 85].map((value, index) => (
                  <div key={index} className="flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-t from-primary to-secondary rounded-t-lg w-full"
                      style={{ height: `${value}%` }}
                    />
                    <p className="text-xs text-text-tertiary text-center mt-2">第{index + 1}月</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
