import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Video, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  PlayCircle, 
  ChevronRight,
  Clock,
  Users,
  PenTool,
  Lightbulb,
  Filter
} from 'lucide-react'

const gradeOptions = ['全部', '小学', '初中', '高中']
const subjectOptions = ['全部', '语文', '数学', '英语', '物理', '化学', '生物']

const mockVideos = [
  { id: 'v1', title: '高中数学 - 三角函数的图像与性质', teacher: '李明', grade: '高中', subject: '数学', duration: '45:32', views: 1256, rating: 4.8 },
  { id: 'v2', title: '小学语文 - 古诗鉴赏方法', teacher: '王芳', grade: '小学', subject: '语文', duration: '38:15', views: 987, rating: 4.9 },
  { id: 'v3', title: '初中物理 - 牛顿第二定律', teacher: '张伟', grade: '初中', subject: '物理', duration: '52:40', views: 1534, rating: 4.7 },
]

const mockComments = [
  { id: 'c1', user: '张华', content: '教学思路清晰，课堂互动很好！', time: '2小时前' },
  { id: 'c2', user: '李丽', content: '板书设计很有特色，值得学习', time: '5小时前' },
]

const highlightKeywords = ['教学目标明确', '互动频繁', '板书清晰', '时间把控好', '重难点突出']

export function Observation() {
  const [activeTab, setActiveTab] = useState<'videos' | 'review' | 'reflect'>('videos')
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0])
  const [selectedGrade, setSelectedGrade] = useState('全部')
  const [selectedSubject, setSelectedSubject] = useState('全部')
  const [reviewText, setReviewText] = useState('')
  const [reflectText, setReflectText] = useState('')

  const filteredVideos = mockVideos.filter(video => 
    (selectedGrade === '全部' || video.grade === selectedGrade) &&
    (selectedSubject === '全部' || video.subject === selectedSubject)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">教育见习与评课系统</h1>
          <p className="text-text-secondary mt-1">支持听课观摩、评课、说课与教学反思</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        {[
          { id: 'videos', label: '名师课堂', icon: Video },
          { id: 'review', label: '评课训练', icon: MessageSquare },
          { id: 'reflect', label: '教学反思', icon: PenTool },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'videos' | 'review' | 'reflect')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-surface-tertiary'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'videos' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="relative h-80 bg-surface-tertiary rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-text-secondary">{selectedVideo.title}</p>
                  <p className="text-sm text-text-tertiary">点击播放</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedVideo.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedVideo.teacher}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedVideo.duration}
                    </span>
                    <span>{selectedVideo.views} 次观看</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="font-medium">{selectedVideo.rating}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  <ThumbsUp className="w-4 h-4" />
                  点赞
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
                  <Bookmark className="w-4 h-4" />
                  收藏
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-text-primary">教学亮点自动标注</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {highlightKeywords.map((keyword) => (
                    <span key={keyword} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-text-primary mb-4">评论 ({mockComments.length})</h4>
                <div className="space-y-3">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-surface-tertiary rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text-primary">{comment.user}</span>
                        <span className="text-xs text-text-tertiary">{comment.time}</span>
                      </div>
                      <p className="text-text-secondary">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-text-secondary" />
                <span className="font-medium text-text-primary">筛选</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学段</label>
                  <div className="flex flex-wrap gap-2">
                    {gradeOptions.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedGrade === grade
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学科</label>
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          selectedSubject === subject
                            ? 'bg-primary text-white'
                            : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">课堂列表</h3>
                <span className="text-sm text-text-secondary">{filteredVideos.length}节课程</span>
              </div>
              <div className="space-y-3">
                {filteredVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      selectedVideo.id === video.id
                        ? 'bg-primary/5 border border-primary'
                        : 'bg-surface-tertiary border border-transparent hover:border-primary/50'
                    }`}
                  >
                    <div className="w-20 h-12 bg-surface rounded-lg flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary truncate">{video.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-tertiary">{video.teacher}</span>
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{video.grade}</span>
                        <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded">{video.subject}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'review' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">评课输入</h3>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="请输入您对本节课的评价..."
                className="w-full h-48 px-4 py-3 bg-surface-tertiary border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-text-tertiary">{reviewText.length} 字</p>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  生成评课报告
                </button>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">AI聚类关键词</h3>
              <div className="flex flex-wrap gap-2">
                {['教学方法', '课堂互动', '学生参与', '时间管理', '目标达成', '作业设计', '评价方式', '技术应用'].map((keyword) => (
                  <span key={keyword} className="px-3 py-1.5 bg-surface-tertiary text-text-primary rounded-lg text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">评课报告模板</h3>
              <div className="p-4 bg-surface-tertiary rounded-xl space-y-4">
                <div>
                  <p className="font-medium text-text-primary mb-2">一、教学亮点</p>
                  <p className="text-sm text-text-secondary">1. 教学目标明确，重难点突出...</p>
                  <p className="text-sm text-text-secondary">2. 课堂互动积极，学生参与度高...</p>
                </div>
                <div>
                  <p className="font-medium text-text-primary mb-2">二、改进建议</p>
                  <p className="text-sm text-text-secondary">1. 建议增加课堂练习时间...</p>
                  <p className="text-sm text-text-secondary">2. 板书设计可以更加清晰...</p>
                </div>
                <div>
                  <p className="font-medium text-text-primary mb-2">三、总体评价</p>
                  <p className="text-sm text-text-secondary">本节课整体效果良好，建议继续保持...</p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">说课训练</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">课程目标</label>
                  <input
                    type="text"
                    placeholder="请输入课程目标..."
                    className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <button className="w-full py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  生成说课框架
                </button>
                <div className="p-4 bg-accent/10 rounded-xl">
                  <p className="text-sm text-accent">
                    说课框架已生成：教学目标、教学重难点、教学方法、教学流程、教学评价
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'reflect' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4">教学反思写作</h3>
            <div className="p-4 bg-primary/5 rounded-xl mb-4">
              <p className="text-sm text-text-secondary">
                <strong>引导问题：</strong><br />
                1. 本节课的教学目标是否达成？<br />
                2. 学生的参与度如何？<br />
                3. 教学方法是否有效？<br />
                4. 下次教学如何改进？
              </p>
            </div>
            <textarea
              value={reflectText}
              onChange={(e) => setReflectText(e.target.value)}
              placeholder="请根据引导问题撰写教学反思..."
              className="w-full h-64 px-4 py-3 bg-surface-tertiary border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
              保存反思
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">反思结构建议</h3>
              <div className="space-y-3">
                {[
                  { title: '教学目标反思', desc: '评估教学目标的合理性和达成情况' },
                  { title: '教学过程反思', desc: '分析教学环节的设计和实施效果' },
                  { title: '学生表现反思', desc: '观察学生的学习状态和参与度' },
                  { title: '改进措施反思', desc: '提出具体的改进策略和行动计划' },
                ].map((item) => (
                  <div key={item.title} className="p-3 bg-surface-tertiary rounded-lg">
                    <p className="font-medium text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">相关教育理论推荐</h3>
              <div className="space-y-3">
                {[
                  { title: '建构主义学习理论', author: '皮亚杰', relevance: '高' },
                  { title: '多元智能理论', author: '加德纳', relevance: '中' },
                  { title: '最近发展区理论', author: '维果茨基', relevance: '高' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.author}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${item.relevance === '高' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>
                      相关性: {item.relevance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
