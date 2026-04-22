import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '@/store'
import { Layout } from '@/components/Layout/Layout'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Ethics } from '@/pages/Ethics'
import { Knowledge } from '@/pages/Knowledge'
import { AIAssistant } from '@/pages/AIAssistant'
import { LearningLoop } from '@/pages/LearningLoop'
import { Observation } from '@/pages/Observation'
import { SkillTraining } from '@/pages/SkillTraining'
import { CodeLearning } from '@/pages/CodeLearning'
import { Personalization } from '@/pages/Personalization'
import { Growth } from '@/pages/Growth'
import { Internship } from '@/pages/Internship'
import { Settings } from '@/pages/Settings'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user)
  if (user) {
    return <Navigate to="/dashboard" />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout>
                <Outlet />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ethics" element={<Ethics />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="learning-loop" element={<LearningLoop />} />
          <Route path="observation" element={<Observation />} />
          <Route path="skill-training" element={<SkillTraining />} />
          <Route path="code-learning" element={<CodeLearning />} />
          <Route path="personalization" element={<Personalization />} />
          <Route path="growth" element={<Growth />} />
          <Route path="internship" element={<Internship />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
