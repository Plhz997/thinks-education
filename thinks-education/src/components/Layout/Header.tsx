import { Bell, Search, User } from 'lucide-react'
import { useAppStore } from '@/store'
import { majorNames } from '@/data/mockData'

export function Header() {
  const { user, currentSemester } = useAppStore()

  if (!user) return null

  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索课程、知识点、案例..."
            className="w-64 h-10 pl-10 pr-4 rounded-lg bg-surface-tertiary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm text-text-secondary">{currentSemester}</p>
          <p className="text-xs text-text-tertiary">{majorNames[user.major]}</p>
        </div>

        <div className="relative">
          <Bell className="w-5 h-5 text-text-secondary cursor-pointer hover:text-primary transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary">{user.name}</p>
            <p className="text-xs text-text-tertiary">{user.department}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
