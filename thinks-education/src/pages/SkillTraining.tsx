import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, PenTool, Video, Play, Download, Edit3, Save, Eye, CheckCircle, Clock, Lightbulb, Layout, Bold, Italic, List, AlignLeft, Target, Sparkles, Wand2, BarChart3, TrendingUp } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockKnowledgePoints } from '@/data/mockData'

const mockLessonPlans = [
  { id: 'lp1', title: '三角函数的图像与性质', subject: '数学', grade: '高一', status: 'draft', lastModified: '2024-04-22' },
  { id: 'lp2', title: '导数的概念', subject: '数学', grade: '高二', status: 'review', lastModified: '2024-04-20' },
  { id: 'lp3', title: '等差数列', subject: '数学', grade: '高一', status: 'approved', lastModified: '2024-04-18' },
  { id: 'lp4', title: '现代文阅读技巧', subject: '语文', grade: '高二', status: 'approved', lastModified: '2024-04-15' },
  { id: 'lp5', title: '牛顿运动定律', subject: '物理', grade: '高一', status: 'draft', lastModified: '2024-04-23' },
]

const mockBoardworks = [
  { id: 'b1', title: '二次函数图像', views: 128, likes: 24, date: '2024-04-21' },
  { id: 'b2', title: '立体几何三视图', views: 96, likes: 18, date: '2024-04-19' },
  { id: 'b3', title: '概率树状图', views: 74, likes: 15, date: '2024-04-15' },
]

const mockMicrocourses = [
  { id: 'm1', title: '微课 - 函数单调性', duration: 8, views: 256, status: 'published' },
  { id: 'm2', title: '微课 - 数列求和', duration: 10, views: 189, status: 'draft' },
]

const subjectOptions = [
  { value: 'math', label: '数学' },
  { value: 'chinese', label: '语文' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'biology', label: '生物' },
]

export function SkillTraining() {
  const { addGrowthRecord } = useAppStore()
  const [activeTab, setActiveTab] = useState<'lesson-plan' | 'boardwork' | 'microcourse'>('lesson-plan')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState('math')
  const [selectedGrade, setSelectedGrade] = useState('高一')
  const [teachingObjectiveInput, setTeachingObjectiveInput] = useState('')
  const [selectedKnowledgePoints, setSelectedKnowledgePoints] = useState<string[]>([])
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [editorContent, setEditorContent] = useState(`# 教学目标\n\n## 知识与技能\n- 理解三角函数的基本概念\n- 掌握三角函数的图像特征\n\n## 过程与方法\n- 通过图像观察，培养学生的直观想象能力\n- 通过小组讨论，培养学生的合作交流能力\n\n## 情感态度与价值观\n- 激发学生对数学的兴趣\n- 培养学生的科学探究精神\n\n# 教学重难点\n\n**重点：**\n- 三角函数的图像绘制\n- 三角函数的周期性\n\n**难点：**\n- 三角函数图像的变换\n- 实际问题中的三角函数应用\n\n# 教学方法\n- 讲授法\n- 演示法\n- 小组讨论法\n\n# 教学过程\n## 导入（5分钟）\n通过生活中的周期现象引入课题\n\n## 新授（25分钟）\n1. 三角函数的定义\n2. 三角函数的图像\n3. 三角函数的性质\n\n## 巩固练习（10分钟）\n课堂练习与提问\n\n## 课堂小结（5分钟）\n总结本节课内容`)

  const gradeOptions = ['高一', '高二', '高三']
  const subjectKnowledgePoints = mockKnowledgePoints.filter(p => p.subject === selectedSubject)

  const handleKnowledgePointToggle = (pointId: string) => {
    setSelectedKnowledgePoints(prev => prev.includes(pointId) ? prev.filter(id => id !== pointId) : [...prev, pointId])
  }

  const handleAnalyzeRequirements = () => {
    const subjectName = subjectOptions.find(s => s.value === selectedSubject)?.label || '数学'
    const selectedPoints = selectedKnowledgePoints.map(id => {
      const point = mockKnowledgePoints.find(p => p.id === id)
      return point?.name || id
    }).join('、')

    const result = `## 教学设计分析报告\n\n### 一、教学目标解析\n\n**学科：** ${subjectName}\n**年级：** ${selectedGrade}\n**目标描述：** ${teachingObjectiveInput || '未输入具体目标'}\n\n### 二、知识点匹配结果\n\n${selectedPoints || '未选择知识点'}\n\n### 三、课程要求分析\n\n1. **课程标准要求**：根据《普通高中课程标准》，${subjectName}学科在${selectedGrade}阶段应达到${selectedGrade === '高一' ? '基础认知' : selectedGrade === '高二' ? '能力提升' : '综合应用'}水平\n\n2. **考试大纲对应**：本次教学内容涉及${selectedPoints ? '以下考点：' + selectedPoints : '相关考点'}，占考试分值约15-20%\n\n3. **学校教学计划**：本单元计划${selectedGrade === '高一' ? '4-6' : selectedGrade === '高二' ? '6-8' : '8-10'}课时完成\n\n### 四、教学建议\n\n**教学方法：** 建议采用讲授法与探究法相结合\n\n**课时安排：** 建议${selectedGrade === '高一' ? '4' : selectedGrade === '高二' ? '5' : '6'}课时\n\n**重点关注：** ${selectedPoints ? '重点讲解' + selectedPoints : '根据教学目标确定重点内容'}\n\n### 五、资源推荐\n\n- 教材章节：${subjectName}必修${selectedGrade === '高一' ? '一' : selectedGrade === '高二' ? '二' : '三'}第${selectedGrade === '高一' ? '3' : selectedGrade === '高二' ? '5' : '7'}章\n- 参考资料：${subjectName}课程标准解读、教学指导用书\n\n### 六、评价建议\n\n形成性评价：课堂提问、小组讨论、课堂练习\n终结性评价：单元测验、作业完成情况`

    setAnalysisResult(result)
    setShowAnalysis(true)
  }

  const handleGeneratePlan = () => {
    const subjectName = subjectOptions.find(s => s.value === selectedSubject)?.label || '数学'
    const selectedPoints = selectedKnowledgePoints.map(id => {
      const point = mockKnowledgePoints.find(p => p.id === id)
      return point?.name || id
    }).join('、')

    const plan = `# ${subjectName}教学设计方案\n\n## 一、课程信息\n- **学科：** ${subjectName}\n- **年级：** ${selectedGrade}\n- **课题：** ${selectedPoints || '待定'}\n- **课时：** ${selectedGrade === '高一' ? '4' : selectedGrade === '高二' ? '5' : '6'}课时\n\n## 二、教学目标\n\n### 知识与技能\n${selectedPoints ? `- 理解和掌握${selectedPoints}` : '- 根据课程标准确定知识目标'}\n- 培养学生分析问题和解决问题的能力\n\n### 过程与方法\n- 通过${selectedGrade === '高一' ? '观察、比较' : selectedGrade === '高二' ? '探究、讨论' : '综合、应用'}等方法\n- 培养学生自主学习和合作学习能力\n\n### 情感态度与价值观\n- 激发学生学习${subjectName}的兴趣\n- 培养学生严谨的科学态度\n\n## 三、教学重难点\n\n**重点：**\n${selectedPoints ? `- ${selectedPoints}` : '- 根据教学内容确定'}\n\n**难点：**\n${selectedPoints ? `- ${selectedPoints}的综合应用` : '- 根据教学内容确定'}\n\n## 四、教学方法\n- 讲授法\n- ${selectedGrade === '高一' ? '演示法' : selectedGrade === '高二' ? '探究法' : '案例教学法'}\n- 小组讨论法\n\n## 五、教学过程\n\n### 第一课时：导入与基础概念\n1. 情境导入（5分钟）\n2. 基本概念讲解（20分钟）\n3. 课堂练习（15分钟）\n4. 小结（5分钟）\n\n### 第二课时：深入探究\n1. 复习回顾（5分钟）\n2. 重点内容讲解（25分钟）\n3. 小组讨论（10分钟）\n4. 总结（5分钟）\n\n### 第三课时：应用拓展\n1. 案例分析（15分钟）\n2. 拓展练习（20分钟）\n3. 课堂小结（10分钟）\n\n## 六、教学资源\n- 教材：${subjectName}必修${selectedGrade === '高一' ? '一' : selectedGrade === '高二' ? '二' : '三'}\n- 多媒体课件\n- 练习题集\n\n## 七、评价方式\n- 形成性评价：课堂参与度、作业完成质量\n- 终结性评价：单元测试\n\n## 八、教学反思\n（课后填写）`

    setEditorContent(plan)
    setSelectedPlan('generated')
    addGrowthRecord({ type: 'practice', title: 'AI教案生成', description: '使用AI生成教案设计', timestamp: new Date().toISOString() })
  }

  const handleSavePlan = () => {
    addGrowthRecord({ type: 'practice', title: '教案保存', description: '保存了教案设计', timestamp: new Date().toISOString() })
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教学设计辅助</h1>
          <p className="text-text-secondary mt-1">AI辅助教案生成、教学目标解析、知识点匹配与课程要求分析</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -4 }} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${activeTab === 'lesson-plan' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`} onClick={() => setActiveTab('lesson-plan')}>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">教案设计</h3>
          <p className="text-sm text-text-secondary">AI辅助教案生成与管理</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-surface-tertiary rounded-lg text-text-tertiary">{mockLessonPlans.length} 份教案</span>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${activeTab === 'boardwork' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`} onClick={() => setActiveTab('boardwork')}>
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <PenTool className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">板书练习</h3>
          <p className="text-sm text-text-secondary">规范书写与板书设计训练</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-surface-tertiary rounded-lg text-text-tertiary">8 次练习</span>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${activeTab === 'microcourse' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`} onClick={() => setActiveTab('microcourse')}>
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">微课制作</h3>
          <p className="text-sm text-text-secondary">录制和编辑教学微视频</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-surface-tertiary rounded-lg text-text-tertiary">2 个微课</span>
          </div>
        </motion.div>
      </div>

      {activeTab === 'lesson-plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-surface rounded-xl border border-border p-4">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                教学设计助手
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">学科选择</label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjectOptions.map((subject) => (
                      <button key={subject.value} onClick={() => { setSelectedSubject(subject.value); setSelectedKnowledgePoints([]); }} className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedSubject === subject.value ? 'bg-primary text-white' : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'}`}>
                        {subject.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">年级选择</label>
                  <div className="flex gap-2">
                    {gradeOptions.map((grade) => (
                      <button key={grade} onClick={() => setSelectedGrade(grade)} className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedGrade === grade ? 'bg-secondary text-white' : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'}`}>
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">教学目标描述</label>
                  <textarea value={teachingObjectiveInput} onChange={(e) => setTeachingObjectiveInput(e.target.value)} placeholder="请输入教学目标描述..." className="w-full h-20 px-3 py-2 bg-surface-tertiary border border-border rounded-lg focus:border-primary focus:outline-none resize-none text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">知识点选择</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {subjectKnowledgePoints.map((point) => (
                      <label key={point.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${selectedKnowledgePoints.includes(point.id) ? 'bg-primary/10 border border-primary/30' : 'bg-surface-tertiary hover:bg-surface'}`}>
                        <input type="checkbox" checked={selectedKnowledgePoints.includes(point.id)} onChange={() => handleKnowledgePointToggle(point.id)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">{point.name}</p>
                          <p className="text-xs text-text-tertiary line-clamp-1">{point.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={handleAnalyzeRequirements} className="w-full py-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  分析课程要求
                </button>

                <motion.button onClick={handleGeneratePlan} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI生成教案
                </motion.button>
              </div>
            </div>

            {showAnalysis && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-surface rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    分析结果
                  </h3>
                  <button onClick={() => setShowAnalysis(false)} className="text-text-tertiary hover:text-text-primary">✕</button>
                </div>
                <div className="text-sm text-text-secondary whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {analysisResult}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">我的教案</h3>
                <button onClick={() => setSelectedPlan('new')} className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors">
                  <Edit3 className="w-4 h-4" />
                  新建教案
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockLessonPlans.map((plan) => (
                    <motion.div key={plan.id} whileHover={{ y: -2 }} className="p-4 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30 cursor-pointer" onClick={() => setSelectedPlan(plan.id)}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{plan.title}</h4>
                        {plan.status === 'approved' && <CheckCircle className="w-5 h-5 text-success" />}
                        {plan.status === 'review' && <Clock className="w-5 h-5 text-warning" />}
                        {plan.status === 'draft' && <Edit3 className="w-5 h-5 text-text-tertiary" />}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-text-secondary">
                        <span>{plan.subject}</span>
                        <span>·</span>
                        <span>{plan.grade}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                        <span className="text-text-tertiary">修改于 {plan.lastModified}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-surface rounded-lg">
                            <Eye className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button className="p-1.5 hover:bg-surface rounded-lg">
                            <Edit3 className="w-4 h-4 text-text-secondary" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                教学设计智能建议
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '教学目标匹配度', value: '85%', desc: '与课程标准的匹配程度', color: 'bg-primary' },
                  { title: '知识点覆盖', value: '78%', desc: '核心知识点覆盖率', color: 'bg-secondary' },
                  { title: '教学方法多样性', value: '65%', desc: '建议增加互动环节', color: 'bg-accent' },
                ].map((item) => (
                  <div key={item.title} className="bg-surface rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                        <span className="text-xl font-bold text-white">{item.value}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.title}</p>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boardwork' && (
        <div className="bg-surface rounded-xl border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">板书练习记录</h3>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors">
              <PenTool className="w-4 h-4" />
              开始练习
            </button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBoardworks.map((boardwork) => (
                <motion.div key={boardwork.id} whileHover={{ y: -2 }} className="bg-surface-tertiary rounded-xl overflow-hidden border border-border">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                      <Layout className="w-12 h-12 text-text-tertiary mx-auto mb-2" />
                      <p className="text-text-secondary text-sm">{boardwork.title}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>{boardwork.views} 次观看</span>
                        <span>{boardwork.likes} 赞</span>
                      </div>
                      <span className="text-xs text-text-tertiary">{boardwork.date}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                        查看
                      </button>
                      <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                        练习
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'microcourse' && (
        <div className="bg-surface rounded-xl border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">我的微课</h3>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors">
              <Video className="w-4 h-4" />
              录制微课
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {mockMicrocourses.map((microcourse) => (
                <div key={microcourse.id} className="flex items-center gap-4 p-4 bg-surface-tertiary rounded-xl">
                  <div className="w-24 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{microcourse.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-text-secondary">
                      <span>{microcourse.duration} 分钟</span>
                      <span>{microcourse.views} 次观看</span>
                      {microcourse.status === 'published' && <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded">已发布</span>}
                      {microcourse.status === 'draft' && <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded">草稿</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-surface rounded-lg">
                      <Play className="w-5 h-5 text-text-secondary" />
                    </button>
                    <button className="p-2 hover:bg-surface rounded-lg">
                      <Edit3 className="w-5 h-5 text-text-secondary" />
                    </button>
                    <button className="p-2 hover:bg-surface rounded-lg">
                      <Download className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPlan && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPlan(null)}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="bg-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-text-primary">教案编辑器</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleGeneratePlan} className="px-3 py-1.5 border border-primary text-primary rounded-lg text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors">
                  <Lightbulb className="w-4 h-4" />
                  AI生成
                </button>
                <button onClick={handleSavePlan} className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors">
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button onClick={() => setSelectedPlan(null)} className="text-text-tertiary hover:text-text-primary">✕</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-surface-tertiary rounded-xl border border-border overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-border bg-surface">
                  <button className="p-1.5 hover:bg-surface-tertiary rounded-lg">
                    <Bold className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button className="p-1.5 hover:bg-surface-tertiary rounded-lg">
                    <Italic className="w-4 h-4 text-text-secondary" />
                  </button>
                  <div className="w-px h-6 bg-border mx-2"></div>
                  <button className="p-1.5 hover:bg-surface-tertiary rounded-lg">
                    <List className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button className="p-1.5 hover:bg-surface-tertiary rounded-lg">
                    <AlignLeft className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
                <textarea value={editorContent} onChange={(e) => setEditorContent(e.target.value)} className="w-full h-[500px] p-4 bg-transparent focus:outline-none resize-none font-mono text-sm text-text-primary leading-relaxed" placeholder="开始编写教案..." />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
