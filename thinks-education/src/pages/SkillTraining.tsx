import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, PenTool, Video, Play, Download, Edit3, Save, Eye, CheckCircle, Clock, Lightbulb, Layout, Bold, Italic, List, AlignLeft } from 'lucide-react'
import { useAppStore } from '@/store'

const mockLessonPlans = [
  { id: 'lp1', title: '三角函数的图像与性质', subject: '数学', grade: '高一', status: 'draft', lastModified: '2024-04-22' },
  { id: 'lp2', title: '导数的概念', subject: '数学', grade: '高二', status: 'review', lastModified: '2024-04-20' },
  { id: 'lp3', title: '等差数列', subject: '数学', grade: '高一', status: 'approved', lastModified: '2024-04-18' },
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

export function SkillTraining() {
  const { addGrowthRecord } = useAppStore()
  const [activeTab, setActiveTab] = useState<'lesson-plan' | 'boardwork' | 'microcourse'>('lesson-plan')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState(`# 教学目标

## 知识与技能
- 理解三角函数的基本概念
- 掌握三角函数的图像特征

## 过程与方法
- 通过图像观察，培养学生的直观想象能力
- 通过小组讨论，培养学生的合作交流能力

## 情感态度与价值观
- 激发学生对数学的兴趣
- 培养学生的科学探究精神

# 教学重难点

**重点：**
- 三角函数的图像绘制
- 三角函数的周期性

**难点：**
- 三角函数图像的变换
- 实际问题中的三角函数应用

# 教学方法
- 讲授法
- 演示法
- 小组讨论法

# 教学过程
## 导入（5分钟）
通过生活中的周期现象引入课题

## 新授（25分钟）
1. 三角函数的定义
2. 三角函数的图像
3. 三角函数的性质

## 巩固练习（10分钟）
课堂练习与提问

## 课堂小结（5分钟）
总结本节课内容`)

  const handleSavePlan = () => {
    addGrowthRecord({
      type: 'practice',
      title: '教案保存',
      description: '保存了教案设计',
      timestamp: new Date().toISOString()
    })
  }

  const handleGeneratePlan = () => {
    setEditorContent(`# 教案生成结果

## 教学目标
- 知识目标：理解并掌握导数的概念
- 能力目标：培养学生的抽象思维能力
- 情感目标：激发学生的求知欲

## 教学内容
1. 导数的定义
2. 导数的几何意义
3. 导数的计算

## 教学过程
采用启发式教学，引导学生自主探究`)
    addGrowthRecord({
      type: 'practice',
      title: 'AI教案生成',
      description: '使用AI生成教案设计',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">技能实训</h1>
          <p className="text-text-secondary mt-1">提升教学技能，包括教案设计、板书练习、微课制作</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            activeTab === 'lesson-plan' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
          }`}
          onClick={() => setActiveTab('lesson-plan')}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">教案设计</h3>
          <p className="text-sm text-text-secondary">AI辅助教案生成与管理</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-surface-tertiary rounded-lg text-text-tertiary">3 份教案</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            activeTab === 'boardwork' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
          }`}
          onClick={() => setActiveTab('boardwork')}
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <PenTool className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">板书练习</h3>
          <p className="text-sm text-text-secondary">规范书写与板书设计训练</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-surface-tertiary rounded-lg text-text-tertiary">8 次练习</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            activeTab === 'microcourse' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
          }`}
          onClick={() => setActiveTab('microcourse')}
        >
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

      <div className="bg-surface rounded-xl border border-border">
        {activeTab === 'lesson-plan' && (
          <div>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">我的教案</h3>
              <button 
                onClick={() => setSelectedPlan('new')}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                新建教案
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockLessonPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -2 }}
                    className="p-4 bg-surface-tertiary rounded-xl border border-border hover:border-primary/30 cursor-pointer"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
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
        )}

        {activeTab === 'boardwork' && (
          <div>
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
                  <motion.div
                    key={boardwork.id}
                    whileHover={{ y: -2 }}
                    className="bg-surface-tertiary rounded-xl overflow-hidden border border-border"
                  >
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
          <div>
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
      </div>

      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPlan(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-text-primary">教案编辑器</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGeneratePlan}
                  className="px-3 py-1.5 border border-primary text-primary rounded-lg text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  AI生成
                </button>
                <button
                  onClick={handleSavePlan}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button onClick={() => setSelectedPlan(null)} className="text-text-tertiary hover:text-text-primary">
                  ✕
                </button>
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
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full h-[500px] p-4 bg-transparent focus:outline-none resize-none font-mono text-sm text-text-primary leading-relaxed"
                  placeholder="开始编写教案..."
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
