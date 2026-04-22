import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useAppStore } from '@/store'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAppStore()

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-surface-secondary overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
