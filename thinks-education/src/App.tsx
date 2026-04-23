import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Ethics } from './pages/Ethics';
import { Knowledge } from './pages/Knowledge';
import { AIAssistant } from './pages/AIAssistant';
import { LearningLoop } from './pages/LearningLoop';
import { Observation } from './pages/Observation';
import { SkillTraining } from './pages/SkillTraining';
import { Personalization } from './pages/Personalization';
import { Growth } from './pages/Growth';
import { Internship } from './pages/Internship';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ethics" element={<Ethics />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="learning-loop" element={<LearningLoop />} />
          <Route path="observation" element={<Observation />} />
          <Route path="skill-training" element={<SkillTraining />} />
          <Route path="personalization" element={<Personalization />} />
          <Route path="growth" element={<Growth />} />
          <Route path="internship" element={<Internship />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
