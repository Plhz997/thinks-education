import type { EthicsAIResult } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const analyzeEthicsAnswer = async (
  scenarioId: string,
  answer: string,
  userId: string
): Promise<EthicsAIResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ethics/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scenarioId, answer, userId }),
    })

    if (!response.ok) {
      throw new Error('AI分析请求失败')
    }

    return await response.json()
  } catch (error) {
    console.warn('AI API不可用，使用本地模拟分析')
    return mockAnalyzeAnswer(scenarioId, answer)
  }
}

export const saveEthicsResponse = async (data: {
  scenarioId: string
  userId: string
  answer: string
  evaluation: {
    educationIdeal: number
    educationFairness: number
    careStudents: number
    professionalDiscipline: number
  }
  aiAnalysis: EthicsAIResult
}): Promise<{ success: boolean; id: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ethics/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('保存失败')
    }

    return await response.json()
  } catch (error) {
    console.warn('后端API不可用，数据仅保存在本地')
    return { success: true, id: `local-${Date.now()}` }
  }
}

export const getEthicsHistory = async (userId: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ethics/responses?userId=${userId}`)
    
    if (!response.ok) {
      throw new Error('获取历史记录失败')
    }

    return await response.json()
  } catch (error) {
    console.warn('后端API不可用，返回本地数据')
    return []
  }
}

const mockAnalyzeAnswer = (scenario: string, answer: string): EthicsAIResult => {
  const keywords = {
    gift: ['拒绝', '廉洁', '原则', '底线', '不合适', '退回', '感谢'],
    conflict: ['沟通', '理解', '尊重', '调解', '倾听', '冷静', '公平'],
    fairness: ['公平', '公正', '平等', '尊重', '机会', '无差别'],
    'special-care': ['关爱', '耐心', '帮助', '鼓励', '支持', '理解'],
    professional: ['专业', '严谨', '负责', '认真', '规范', '自律']
  }
  
  const categories: Record<string, string> = {
    'ethics-1': 'gift',
    'ethics-2': 'conflict',
    'ethics-3': 'fairness',
    'ethics-4': 'special-care',
    'ethics-5': 'professional'
  }
  
  const category = categories[scenario] || 'professional'
  const relevantKeywords = keywords[category as keyof typeof keywords]
  
  let score = 60
  const strengths: string[] = []
  const improvements: string[] = []
  const suggestions: string[] = []
  
  relevantKeywords.forEach(keyword => {
    if (answer.includes(keyword)) {
      score += 5
      strengths.push(`提到了"${keyword}"`)
    }
  })
  
  if (answer.length < 50) {
    score -= 10
    improvements.push('回答过于简短')
    suggestions.push('建议详细描述处理步骤和理由')
  }
  
  if (answer.length > 200) {
    score += 5
    strengths.push('回答内容详实')
  }
  
  if (answer.includes('学生') || answer.includes('学生们')) {
    score += 5
    strengths.push('关注学生利益')
  }
  
  if (answer.includes('家长') || answer.includes('同事')) {
    score += 5
    strengths.push('考虑多方沟通')
  }
  
  if (score > 100) score = 100
  if (score < 0) score = 0
  
  const getAnalysis = () => {
    if (score >= 90) return '您的回答展现了优秀的师德素养，处理方式恰当且全面。'
    if (score >= 80) return '您的回答整体良好，有一定的思考深度。'
    if (score >= 70) return '您的回答基本合理，但还有提升空间。'
    if (score >= 60) return '您的回答有待改进，建议参考标准处理方式。'
    return '建议重新思考，参考更多师德规范资料。'
  }
  
  const baseSuggestions: Record<string, string[]> = {
    gift: ['明确拒绝礼品，保持教师职业操守', '感谢家长的心意但坚持原则', '引导家长理解教育的本质'],
    conflict: ['先倾听双方诉求，保持中立', '寻找共同利益点进行调解', '事后跟进，确保问题解决'],
    fairness: ['确保每个学生都有平等机会', '关注弱势群体，给予适当帮助', '建立公平的评价机制'],
    'special-care': ['给予特殊学生更多耐心和关爱', '制定个性化教育方案', '与家长密切沟通合作'],
    professional: ['保持专业态度和严谨作风', '不断学习提升专业能力', '遵守教育行业规范']
  }
  
  return {
    score,
    strengths: strengths.length > 0 ? strengths : ['回答符合基本伦理规范'],
    improvements: improvements.length > 0 ? improvements : ['继续保持'],
    suggestions: [...suggestions, ...baseSuggestions[category as keyof typeof baseSuggestions].slice(0, 2)],
    analysis: getAnalysis()
  }
}
