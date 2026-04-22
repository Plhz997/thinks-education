import { useState } from 'react'
import { 
  Play, 
  RotateCcw, 
  Save, 
  FileCode, 
  MessageCircle,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
]

const mockCode = `# 计算阶乘的递归函数
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# 主程序
if __name__ == "__main__":
    num = 5
    result = factorial(num)
    print(f"The factorial of {num} is {result}")`

const mockExplanation = [
  { line: 1, text: '定义一个计算阶乘的递归函数' },
  { line: 2, text: '函数名为 factorial，参数为 n' },
  { line: 3, text: '基线条件：当 n 为 0 或 1 时，返回 1' },
  { line: 4, text: '递归调用：n 乘以 factorial(n-1)' },
  { line: 6, text: '主程序入口' },
  { line: 7, text: '设置要计算阶乘的数字' },
  { line: 8, text: '调用函数计算结果' },
  { line: 9, text: '打印结果' },
]

const mockAnalysis = {
  errors: [
    { line: 5, message: '缺少空白行', suggestion: '在函数结束后添加空白行' },
  ],
  suggestions: [
    '建议添加参数类型注解',
    '建议添加函数文档字符串',
    '考虑使用迭代方式实现以避免栈溢出',
  ],
  complexity: '时间复杂度: O(n), 空间复杂度: O(n)'
}

export function CodeLearning() {
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const [code, setCode] = useState(mockCode)
  const [showExplanation, setShowExplanation] = useState(true)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput('The factorial of 5 is 120')
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(mockCode)
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">智能编程学习</h1>
          <p className="text-text-secondary mt-1">服务计算机师范生或具备技术训练需求的师范生</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setSelectedLanguage(lang.value)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLanguage === lang.value
                          ? 'bg-primary text-white'
                          : 'bg-surface-tertiary text-text-secondary hover:bg-primary/5'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    {isRunning ? '运行中...' : '运行'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-tertiary transition-colors">
                    <Save className="w-4 h-4" />
                    保存
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                spellCheck={false}
              />
              <div className="absolute bottom-4 right-4 flex gap-1">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="font-semibold text-text-primary mb-4">运行结果</h3>
            <div className="h-32 bg-gray-900 rounded-lg p-4 overflow-auto">
              {output ? (
                <p className="text-green-400 font-mono text-sm">{output}</p>
              ) : (
                <p className="text-gray-500 text-sm">运行代码以查看结果...</p>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">逐行注释解释</h3>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showExplanation ? '收起' : '展开'}
              </button>
            </div>
            {showExplanation && (
              <div className="space-y-2">
                {mockExplanation.map((item) => (
                  <div key={item.line} className="flex items-start gap-4 p-3 bg-surface-tertiary rounded-lg">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-mono">
                      {item.line}
                    </span>
                    <span className="text-text-secondary">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-text-primary">代码分析</h3>
            </div>
            <div className="space-y-4">
              {mockAnalysis.errors.map((error, idx) => (
                <div key={idx} className="p-3 bg-danger/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-danger" />
                    <span className="text-sm font-medium text-danger">第{error.line}行</span>
                  </div>
                  <p className="text-sm text-text-secondary">{error.message}</p>
                  <p className="text-xs text-accent mt-1">{error.suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-text-primary">优化建议</h3>
            </div>
            <ul className="space-y-2">
              {mockAnalysis.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-text-secondary">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCode className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-text-primary">复杂度分析</h3>
            </div>
            <p className="text-sm text-text-secondary font-mono bg-surface-tertiary p-3 rounded-lg">
              {mockAnalysis.complexity}
            </p>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-text-primary">代码问答</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors text-left">
                <span className="text-sm text-text-primary">这段代码是如何工作的？</span>
              </button>
              <button className="w-full p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors text-left">
                <span className="text-sm text-text-primary">如何优化这段代码？</span>
              </button>
              <button className="w-full p-3 bg-surface-tertiary rounded-lg hover:bg-primary/5 transition-colors text-left">
                <span className="text-sm text-text-primary">递归和迭代有什么区别？</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
