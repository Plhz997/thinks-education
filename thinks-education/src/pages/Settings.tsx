import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, LogOut, Mail, Phone, Moon, Sun, ChevronRight, Save, RotateCcw } from 'lucide-react'
import { useAppStore } from '@/store'

export function Settings() {
  const { user } = useAppStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'privacy'>('profile')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    achievements: true,
  })

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    school: user?.school || '',
    department: user?.department || '',
    grade: user?.grade || '',
    bio: '',
  })

  const handleSaveProfile = () => {
    alert('个人信息已保存')
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">系统设置</h1>
          <p className="text-text-secondary mt-1">管理您的账户和偏好设置</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl border border-border p-4">
            <div className="space-y-1">
              {[
                { id: 'profile', label: '个人信息', icon: User },
                { id: 'notifications', label: '通知设置', icon: Bell },
                { id: 'appearance', label: '外观主题', icon: Palette },
                { id: 'privacy', label: '隐私安全', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all">
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-6">个人信息</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-lg">{user?.name}</h4>
                  <p className="text-text-secondary">{user?.role === 'student' ? '师范生' : user?.role === 'teacher' ? '指导教师' : '管理员'}</p>
                  <button className="mt-2 text-primary text-sm hover:text-primary-dark">更换头像</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">姓名</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full h-12 px-4 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full h-12 px-12 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">手机号</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full h-12 px-12 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">学校</label>
                  <input
                    type="text"
                    value={profileForm.school}
                    onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                    className="w-full h-12 px-4 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">院系</label>
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full h-12 px-4 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">年级</label>
                  <input
                    type="text"
                    value={profileForm.grade}
                    onChange={(e) => setProfileForm({ ...profileForm, grade: e.target.value })}
                    className="w-full h-12 px-4 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">个人简介</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-tertiary border border-border rounded-xl focus:border-primary focus:outline-none resize-none"
                  placeholder="介绍一下你自己..."
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-primary text-white rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  保存更改
                </button>
                <button className="px-6 py-3 border border-border text-text-primary rounded-xl flex items-center gap-2 hover:bg-surface-tertiary transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  重置
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-6">通知设置</h3>

              <div className="space-y-4">
                {[
                  { key: 'email', label: '邮件通知', desc: '接收重要更新和消息的邮件通知' },
                  { key: 'push', label: '推送通知', desc: '在浏览器中接收实时推送通知' },
                  { key: 'weekly', label: '周报摘要', desc: '每周收到学习进度摘要邮件' },
                  { key: 'achievements', label: '成就通知', desc: '获得成就或徽章时收到通知' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-surface-tertiary rounded-xl">
                    <div>
                      <h4 className="font-medium text-text-primary">{item.label}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-border'
                      }`}
                    >
                      <motion.div
                        animate={{ x: notifications[item.key as keyof typeof notifications] ? 20 : 2 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-6">外观主题</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <h4 className="font-medium text-text-primary mb-2">主题模式</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                        !darkMode ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <Sun className="w-5 h-5 text-warning" />
                      <span className="text-sm">浅色模式</span>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                        darkMode ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <Moon className="w-5 h-5 text-primary" />
                      <span className="text-sm">深色模式</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <h4 className="font-medium text-text-primary mb-2">字号大小</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary">小</span>
                    <input
                      type="range"
                      min="12"
                      max="18"
                      defaultValue="14"
                      className="flex-1 h-2 bg-surface rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-sm text-text-secondary">大</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-surface-tertiary rounded-xl">
                <h4 className="font-medium text-text-primary mb-4">主题色</h4>
                <div className="flex gap-3">
                  {[
                    { color: 'bg-primary', label: '紫色' },
                    { color: 'bg-accent', label: '青色' },
                    { color: 'bg-secondary', label: '蓝色' },
                    { color: 'bg-success', label: '绿色' },
                    { color: 'bg-warning', label: '橙色' },
                    { color: 'bg-danger', label: '红色' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`w-10 h-10 rounded-full ${item.color} ring-2 ring-offset-2 ring-primary`}
                      title={item.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-6">隐私安全</h3>

              <div className="space-y-4">
                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">修改密码</h4>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <p className="text-sm text-text-secondary">定期更改密码以保护账户安全</p>
                </div>

                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">双重认证</h4>
                      <p className="text-sm text-text-secondary">为账户添加额外的安全保护</p>
                    </div>
                    <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-lg">已启用</span>
                  </div>
                </div>

                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">登录设备管理</h4>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <p className="text-sm text-text-secondary">查看和管理当前登录的设备</p>
                </div>

                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">数据导出</h4>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <p className="text-sm text-text-secondary">导出您的所有学习数据和记录</p>
                </div>

                <div className="p-4 bg-surface-tertiary rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">删除账户</h4>
                    <ChevronRight className="w-5 h-5 text-danger" />
                  </div>
                  <p className="text-sm text-danger">永久删除您的账户和所有数据</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
