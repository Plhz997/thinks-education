import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, HelpCircle, LogOut } from 'lucide-react'
import { useAppStore } from '@/store'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索课程、知识点、案例..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-tertiary border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all"
        >
          <HelpCircle className="w-5 h-5" />
        </motion.button>

        <div className="h-6 w-px bg-border"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-text-primary">{user?.name}</p>
            <p className="text-xs text-text-tertiary">
              {user?.role === 'student' ? '师范生' : user?.role === 'teacher' ? '指导教师' : '管理员'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0)}
          </div>
        </div>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-xl transition-all"
          title="退出登录"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  )
}
