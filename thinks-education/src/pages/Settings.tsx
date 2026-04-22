import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  FileText
} from 'lucide-react'
import { useAppStore } from '@/store'
import { mockUsers } from '@/data/mockData'

export function Settings() {
  const { user, logout, setUser } = useAppStore()
  const [activeTab, setActiveTab] = useState<'account' | 'privacy' | 'compliance'>('account')
  
  if (!user) {
    setUser(mockUsers.student)
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">系统设置</h1>
          <p className="text-text-secondary mt-1">账号管理、数据授权与合规设置</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl border border-border p-2">
            {[
              { id: 'account', label: '账号设置', icon: User },
              { id: 'privacy', label: '隐私设置', icon: Shield },
              { id: 'compliance', label: '合规中心', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'account' | 'privacy' | 'compliance')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-tertiary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6 bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">{user.name}</h4>
                <p className="text-sm text-text-secondary">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2 border border-danger text-danger rounded-lg hover:bg-danger/5 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'account' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-xl border border-border p-6 space-y-6"
            >
              <div>
                <h3 className="font-semibold text-text-primary mb-4">基本信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">姓名</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">邮箱</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">电话</label>
                    <input
                      type="tel"
                      placeholder="请输入手机号"
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">学校</label>
                    <input
                      type="text"
                      defaultValue={user.school}
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-4">密码安全</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">旧密码</label>
                    <input
                      type="password"
                      placeholder="请输入旧密码"
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">新密码</label>
                    <input
                      type="password"
                      placeholder="请输入新密码"
                      className="w-full h-10 px-4 rounded-xl bg-surface-tertiary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-6 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
                  取消
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  保存设置
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">数据授权设置</h3>
                <div className="space-y-4">
                  {[
                    { title: '学习数据分析', description: '用于个性化推荐和学习路径优化' },
                    { title: '行为数据收集', description: '用于改进平台功能和用户体验' },
                    { title: '匿名数据共享', description: '用于教育研究和产品改进' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 bg-surface-tertiary rounded-xl">
                      <div>
                        <p className="font-medium text-text-primary">{item.title}</p>
                        <p className="text-sm text-text-secondary">{item.description}</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">数据脱敏说明</h3>
                <div className="p-4 bg-primary/5 rounded-xl">
                  <p className="text-sm text-text-secondary">
                    我们采用行业领先的数据脱敏技术，对您的个人身份信息进行加密处理：
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li>• 姓名、手机号等敏感字段采用哈希算法加密存储</li>
                    <li>• 地理位置信息精确到城市级别，不包含具体地址</li>
                    <li>• 学习数据与身份信息分离存储，通过匿名ID关联</li>
                    <li>• 定期清理日志数据，保留期限不超过90天</li>
                  </ul>
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">数据来源追溯</h3>
                <div className="space-y-3">
                  {[
                    { source: '用户主动提交', type: '个人信息、学习成果' },
                    { source: '系统自动记录', type: '学习行为、访问日志' },
                    { source: '第三方集成', type: '认证证书、成绩数据' },
                    { source: 'AI生成内容', type: '推荐结果、分析报告' },
                  ].map((item) => (
                    <div key={item.source} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                      <span className="text-text-primary">{item.source}</span>
                      <span className="text-sm text-text-secondary">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'compliance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">最小必要采集说明</h3>
                <div className="p-4 bg-accent/10 rounded-xl">
                  <p className="text-sm text-text-secondary">
                    我们遵循"最小必要"原则，仅收集实现服务所需的最少数据：
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { item: '身份认证', status: '必要' },
                      { item: '学习进度', status: '必要' },
                      { item: '设备信息', status: '可选' },
                      { item: '位置信息', status: '可选' },
                    ].map((item) => (
                      <div key={item.item} className="flex items-center justify-between">
                        <span className="text-text-primary">{item.item}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === '必要' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">版权授权说明</h3>
                <div className="space-y-3">
                  {[
                    { resource: '教材内容', license: '教育使用授权' },
                    { resource: '教学视频', license: 'CC BY-NC-SA' },
                    { resource: '题库资源', license: '平台专有' },
                    { resource: '用户上传内容', license: '用户保留版权' },
                  ].map((item) => (
                    <div key={item.resource} className="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg">
                      <span className="text-text-primary">{item.resource}</span>
                      <span className="text-sm text-secondary">{item.license}</span>
                    </div>
                  ))}
                </div>
              </div>

              {user.role === 'admin' && (
                <div className="bg-surface rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-text-primary mb-4">管理员合规面板</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-3">数据保留策略</h4>
                      <div className="p-4 bg-surface-tertiary rounded-xl">
                        <p className="text-sm text-text-primary">默认保留期限：3年</p>
                        <p className="text-xs text-text-secondary mt-1">超过保留期的数据将自动归档</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-3">敏感信息字段</h4>
                      <div className="p-4 bg-surface-tertiary rounded-xl">
                        <p className="text-sm text-text-primary">已识别 8 个敏感字段</p>
                        <p className="text-xs text-text-secondary mt-1">均已加密存储</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
                    查看审计日志
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
