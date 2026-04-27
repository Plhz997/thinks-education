import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  RefreshCw, 
  Video, 
  PenTool, 
  Target, 
  FolderOpen, 
  Briefcase, 
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  BarChart3,
  FileCheck,
  Database
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const menuItemsByRole = {
  student: [
    { id: '', label: '总览仪表盘', icon: LayoutDashboard },
    { id: 'ethics', label: '职业信念培养', icon: Heart },
    { id: 'knowledge', label: '课程匹配', icon: BookOpen },
    { id: 'knowledge-graph', label: '知识图谱', icon: Database },
    { id: 'ai-assistant', label: 'AI助教', icon: MessageCircle },
    { id: 'learning-loop', label: '学习闭环', icon: RefreshCw },
    { id: 'observation', label: '见习评课', icon: Video },
    { id: 'skill-training', label: '技能实训', icon: PenTool },
    { id: 'personalization', label: '个性化教育', icon: Target },
    { id: 'growth', label: '成长档案', icon: FolderOpen },
    { id: 'internship', label: '实习就业', icon: Briefcase },
    { id: 'settings', label: '系统设置', icon: Settings },
  ],
  teacher: [
    { id: '', label: '总览仪表盘', icon: LayoutDashboard },
    { id: 'observation', label: '课堂观察', icon: Video },
    { id: 'skill-training', label: '实训指导', icon: PenTool },
    { id: 'personalization', label: '学生管理', icon: Users },
    { id: 'growth', label: '成长评估', icon: FileCheck },
    { id: 'ai-assistant', label: 'AI助教', icon: MessageCircle },
    { id: 'knowledge', label: '课程管理', icon: BookOpen },
    { id: 'ethics', label: '师德评估', icon: Heart },
    { id: 'settings', label: '系统设置', icon: Settings },
  ],
  admin: [
    { id: '', label: '总览仪表盘', icon: LayoutDashboard },
    { id: 'personalization', label: '用户管理', icon: Users },
    { id: 'knowledge', label: '课程管理', icon: BookOpen },
    { id: 'growth', label: '数据统计', icon: BarChart3 },
    { id: 'skill-training', label: '实训管理', icon: PenTool },
    { id: 'ethics', label: '师德考核', icon: Heart },
    { id: 'observation', label: '评估管理', icon: FileCheck },
    { id: 'internship', label: '实习管理', icon: Briefcase },
    { id: 'settings', label: '系统配置', icon: Database },
  ],
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAppStore()

  const activeItem = location.pathname === '/' ? '' : location.pathname.split('/')[1] || ''
  const menuItems = user ? menuItemsByRole[user.role as keyof typeof menuItemsByRole] || menuItemsByRole.student : menuItemsByRole.student

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-surface border-r border-border h-screen flex flex-col fixed left-0 top-0 z-50"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-text-primary text-sm">Thinks行世教育</h1>
                <p className="text-xs text-text-tertiary">{user?.role === 'student' ? '师范生端' : user?.role === 'teacher' ? '教师端' : '管理端'}</p>
              </div>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 text-text-secondary hover:text-text-primary hover:bg-surface-tertiary rounded-xl transition-all"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        {!collapsed && user && (
          <div className="mt-3 p-3 bg-surface-tertiary rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                <p className="text-xs text-text-tertiary">{user.role === 'student' ? '师范生' : user.role === 'teacher' ? '指导教师' : '管理员'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
