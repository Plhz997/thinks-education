import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  GraduationCap, 
  BookOpen, 
  Settings,
  ChevronDown,
  Eye,
  EyeOff,
  LogIn
} from 'lucide-react'
import { useAppStore } from '@/store'
import { mockUsers, majorNames } from '@/data/mockData'
import { useNavigate } from 'react-router-dom'

const roleOptions = [
  { value: 'student', label: '师范生', icon: GraduationCap },
  { value: 'teacher', label: '指导教师', icon: BookOpen },
  { value: 'admin', label: '教学院管理员', icon: Settings },
]

const majorOptions = [
  { value: 'math', label: '数学教育' },
  { value: 'chinese', label: '语文教育' },
  { value: 'physics', label: '物理教育' },
  { value: 'chemistry', label: '化学教育' },
  { value: 'biology', label: '生物教育' },
  { value: 'english', label: '英语教育' },
  { value: 'history', label: '历史教育' },
  { value: 'geography', label: '地理教育' },
  { value: 'music', label: '音乐教育' },
  { value: 'art', label: '美术教育' },
  { value: 'pe', label: '体育教育' },
  { value: 'tech', label: '教育技术学' },
  { value: 'primary', label: '小学教育' },
  { value: 'preschool', label: '学前教育' },
  { value: 'computer', label: '计算机师范' },
  { value: 'special', label: '特殊教育' },
]

export function Login() {
  const [role, setRole] = useState('student')
  const [major, setMajor] = useState('math')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null)
  const [error, setError] = useState('')
  
  const { setUser } = useAppStore()
  const navigate = useNavigate()

  const handleLogin = () => {
    setError('')
    
    if (!email || !password) {
      setError('请输入邮箱和密码')
      return
    }
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const user = registeredUsers.find((u: any) => u.email === email && u.password === password)
    
    if (user) {
      setUser({ ...user, major: user.major || major })
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate('/')
    } else {
      const mockUser = mockUsers[role]
      if (mockUser && email === mockUser.email && password === '123456') {
        setUser({ ...mockUser, major })
        navigate('/')
      } else {
        setError('邮箱或密码错误')
      }
    }
  }

  const handleQuickLogin = (roleType: string) => {
    setRole(roleType)
    const user = mockUsers[roleType as keyof typeof mockUsers]
    if (user) {
      setUser({ ...user, major })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Thinks 行世教育</h1>
                <p className="text-white/80 text-sm">AI智联体 · 赋能强师工程</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">培养未来卓越教师</h2>
            <p className="text-white/80 mb-8">
              面向师范生的专业教育服务平台，提供从理论学习到实践技能提升的一站式智能培养解决方案。
            </p>

            <div className="space-y-4">
              {[
                { title: '师德素养', desc: '践行四有好老师标准' },
                { title: '教学技能', desc: '全方位实训提升' },
                { title: '智能助教', desc: 'AI驱动个性化学习' },
                { title: '成长档案', desc: '完整记录成长轨迹' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-3xl border border-border p-8"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-2">欢迎回来</h2>
            <p className="text-text-secondary mb-8">请选择身份并登录系统</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-secondary mb-3">选择身份</label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setRole(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        role === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${role === option.value ? 'text-primary' : 'text-text-secondary'}`} />
                      <p className={`text-sm font-medium ${role === option.value ? 'text-primary' : 'text-text-primary'}`}>
                        {option.label}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-secondary mb-3">专业方向</label>
              <div className="flex items-center gap-2 p-3 bg-surface-tertiary rounded-xl cursor-pointer" onClick={() => setSelectedMajor(selectedMajor === null ? 'open' : null)}>
                <span className="text-text-primary">{majorNames[major]}</span>
                <ChevronDown className={`w-5 h-5 text-text-tertiary transition-transform ${selectedMajor === 'open' ? 'rotate-180' : ''}`} />
              </div>
              {selectedMajor === 'open' && (
                <div className="mt-2 p-2 bg-surface border border-border rounded-xl max-h-48 overflow-y-auto">
                  {majorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setMajor(option.value)
                        setSelectedMajor(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        major === option.value ? 'bg-primary/10 text-primary' : 'hover:bg-surface-tertiary'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入邮箱"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full h-12 pl-10 pr-12 rounded-xl bg-surface-tertiary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <LogIn className="w-5 h-5" />
              登录
            </motion.button>

            <div className="mt-4 text-center">
              <span className="text-sm text-text-secondary">还没有账号？</span>
              <button
                onClick={() => navigate('/register')}
                className="ml-2 text-primary hover:text-primary-light font-medium"
              >
                立即注册
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-3 text-center">或快速登录（演示用）</p>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleQuickLogin(option.value)}
                      className="p-3 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-2"
                    >
                      <Icon className="w-5 h-5 text-text-secondary" />
                      <span className="text-xs text-text-secondary">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
