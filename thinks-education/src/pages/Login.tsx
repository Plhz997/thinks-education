import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Mail, ChevronDown, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/store'
import { mockUsers, majorNames } from '@/data/mockData'
import type { Role, Major } from '@/types'

const roles: { value: Role; label: string; icon: React.ReactNode }[] = [
  { value: 'student', label: '师范生', icon: <User className="w-5 h-5" /> },
  { value: 'teacher', label: '指导教师', icon: <User className="w-5 h-5" /> },
  { value: 'admin', label: '教学院管理员', icon: <User className="w-5 h-5" /> },
]

const majors: { value: Major; label: string }[] = [
  { value: 'primary-education', label: '小学教育' },
  { value: 'preschool-education', label: '学前教育' },
  { value: 'physical-education', label: '体育教育' },
  { value: 'educational-technology', label: '教育技术学' },
  { value: 'chinese', label: '语文教育' },
  { value: 'math', label: '数学教育' },
  { value: 'computer-education', label: '计算机师范' },
  { value: 'special-education', label: '特殊教育' },
]

export function Login() {
  const [selectedRole, setSelectedRole] = useState<Role>('student')
  const [selectedMajor, setSelectedMajor] = useState<Major>('math')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showMajorDropdown, setShowMajorDropdown] = useState(false)
  const { setUser } = useAppStore()

  const handleLogin = () => {
    const mockUser = { ...mockUsers[selectedRole], major: selectedMajor }
    setUser(mockUser)
    window.location.href = '/dashboard'
  }

  const handleQuickLogin = (role: Role) => {
    setSelectedRole(role)
    setEmail(mockUsers[role].email)
    setPassword('123456')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">T</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Thinks行世教育</h1>
                <p className="text-text-secondary">AI智联体赋能强师工程</p>
              </div>
            </div>
            <p className="text-text-secondary text-lg">
              面向师范生的专业教育服务平台，提供从理论学习到实践技能提升的一站式智能培养解决方案。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['课程学习', '实践训练', '职业发展'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-surface rounded-xl p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <p className="font-medium text-text-primary">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  强师工程
                </div>
                <p className="text-text-secondary">重构师范教育"教、学、评"闭环</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-2">欢迎登录</h2>
            <p className="text-text-secondary">请选择您的身份并登录</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-text-secondary mb-3">选择身份</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 text-text-secondary'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedRole === role.value ? 'bg-primary/10' : 'bg-surface-tertiary'
                  }`}>
                    {role.icon}
                  </div>
                  <span className="text-sm font-medium">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-text-secondary mb-3">选择专业方向</p>
            <div className="relative">
              <button
                onClick={() => setShowMajorDropdown(!showMajorDropdown)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-surface flex items-center justify-between text-text-primary hover:border-primary/50 transition-colors"
              >
                <span>{majorNames[selectedMajor]}</span>
                <ChevronDown className={`w-5 h-5 text-text-tertiary transition-transform ${showMajorDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showMajorDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg z-10 overflow-hidden"
                >
                  {majors.map((major) => (
                    <button
                      key={major.value}
                      onClick={() => {
                        setSelectedMajor(major.value)
                        setShowMajorDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-surface-tertiary transition-colors ${
                        selectedMajor === major.value ? 'bg-primary/5 text-primary' : 'text-text-primary'
                      }`}
                    >
                      {major.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">邮箱</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">密码</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-border bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full h-12 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>登录</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-text-secondary mb-3 text-center">快速登录</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleQuickLogin(role.value)}
                  className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-text-secondary hover:text-primary"
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
