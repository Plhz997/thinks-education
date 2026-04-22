import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  GraduationCap, 
  Video, 
  Code, 
  Sparkles, 
  FolderOpen, 
  Briefcase, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  User
} from 'lucide-react'
import { useAppStore } from '@/store'
import { roleNames } from '@/data/mockData'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { id: 'dashboard', label: '总览仪表盘', icon: LayoutDashboard },
  { id: 'ethics', label: '教师职业信念培养', icon: Heart },
  { id: 'knowledge', label: '教育教材导向课程匹配', icon: BookOpen },
  { id: 'ai-assistant', label: 'AI助教', icon: MessageCircle },
  { id: 'learning-loop', label: '学习全过程闭环', icon: GraduationCap },
  { id: 'observation', label: '教育见习与评课系统', icon: Video },
  { id: 'skill-training', label: '教学技能实训平台', icon: Code },
  { id: 'code-learning', label: '智能编程学习', icon: Sparkles },
  { id: 'personalization', label: 'AI赋能个性化教育', icon: FolderOpen },
  { id: 'growth', label: '成长档案中心', icon: Briefcase },
  { id: 'internship', label: '实习与就业支持', icon: Briefcase },
  { id: 'settings', label: '系统设置', icon: Settings },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAppStore()
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      className="h-screen bg-surface border-r border-border flex flex-col relative"
    >
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <h1 className="font-bold text-text-primary text-lg">Thinks行世教育</h1>
              <p className="text-xs text-text-tertiary">AI智联体</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-medium text-text-primary text-sm">{user.name}</p>
                  <p className="text-xs text-text-tertiary">{roleNames[user.role]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id)
                window.location.href = `/${item.id}`
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors relative group ${
                isActive ? 'text-primary bg-primary/5' : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r"
                />
              )}
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && (
                <span className="ml-auto text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {user && (
        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-danger hover:bg-danger/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">退出登录</span>}
          </button>
        </div>
      )}

      <button
        onClick={onToggle}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  )
}
