# 后端API设计文档

## 概述

本文档描述了Thinks教育平台的后端API设计，包括：
- 职业信念培养模块的AI分析API
- 数据库表设计
- 如何集成真实AI服务（如OpenAI、阿里云、百度等）

---

## 一、API端点设计

### 1.1 师德情境分析 API

**POST** `/api/ethics/analyze`

请求体：
```json
{
  "scenarioId": "ethics-1",
  "answer": "我会礼貌地拒绝家长的礼物...",
  "userId": "s-math-1"
}
```

响应体：
```json
{
  "score": 85,
  "strengths": ["提到了'拒绝'", "提到了'原则'", "关注学生利益"],
  "improvements": ["回答过于简短"],
  "suggestions": ["建议详细描述处理步骤", "明确拒绝礼品，保持教师职业操守"],
  "analysis": "您的回答整体良好，有一定的思考深度。"
}
```

### 1.2 保存伦理训练记录 API

**POST** `/api/ethics/responses`

请求体：
```json
{
  "scenarioId": "ethics-1",
  "userId": "s-math-1",
  "answer": "我会礼貌地拒绝家长的礼物...",
  "evaluation": {
    "educationIdeal": 88,
    "educationFairness": 85,
    "careStudents": 82,
    "professionalDiscipline": 90
  },
  "aiAnalysis": {
    "score": 85,
    "strengths": ["提到了'拒绝'"],
    "improvements": ["回答过于简短"],
    "suggestions": ["建议详细描述处理步骤"],
    "analysis": "您的回答整体良好"
  }
}
```

响应体：
```json
{
  "success": true,
  "id": "ethics-response-xxx"
}
```

### 1.3 获取伦理训练历史 API

**GET** `/api/ethics/responses?userId=s-math-1`

响应体：
```json
[
  {
    "id": "ethics-response-xxx",
    "scenarioId": "ethics-1",
    "userId": "s-math-1",
    "answer": "我会礼貌地拒绝...",
    "evaluation": {...},
    "aiAnalysis": {...},
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

---

## 二、数据库表设计

### 2.1 ethics_responses 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | VARCHAR(36) | 主键，UUID |
| scenario_id | VARCHAR(50) | 情境ID |
| user_id | VARCHAR(50) | 用户ID |
| answer | TEXT | 用户回答内容 |
| evaluation_json | JSON | 四维评价数据 |
| ai_analysis_json | JSON | AI分析结果 |
| created_at | DATETIME | 创建时间 |

### 2.2 ethics_scenarios 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | VARCHAR(50) | 主键 |
| title | VARCHAR(200) | 情境标题 |
| description | TEXT | 情境描述 |
| category | VARCHAR(50) | 类别（gift/conflict/fairness等） |
| difficulty | INT | 难度等级(1-5) |
| created_at | DATETIME | 创建时间 |

---

## 三、AI服务集成方案

### 3.1 OpenAI API 集成示例

```python
# Python FastAPI 示例
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(api_key="YOUR_API_KEY")

class EthicsRequest(BaseModel):
    scenarioId: str
    answer: str
    userId: str

def analyze_with_openai(scenario: str, answer: str) -> dict:
    prompt = f"""
    你是一名教育伦理专家，请分析以下师范生的回答：
    
    情境类型：{scenario}
    
    学生回答：{answer}
    
    请从以下四个维度进行评分（0-100分）：
    1. 教育理想 - 对教育事业的热爱和追求
    2. 教育公平 - 对待学生的公平公正态度
    3. 关爱学生 - 关心学生成长和需求
    4. 专业自律 - 职业操守和专业态度
    
    同时请提供：
    - 回答亮点（3点以内）
    - 改进方向（3点以内）
    - 综合评语
    - 改进建议（3条）
    
    输出格式：JSON
    """
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    return response.choices[0].message.content
```

### 3.2 阿里云通义千问集成

```python
from alibabacloud_dashscope import DashScope

DashScope.api_key = "YOUR_API_KEY"

def analyze_with_qianwen(scenario: str, answer: str) -> dict:
    response = DashScope.Generation.call(
        model="qwen-plus",
        prompt=f"分析师德回答：情境={scenario}，回答={answer}",
        result_format="json"
    )
    return response.output.choices[0].message.content
```

### 3.3 百度文心一言集成

```python
from baidubce.services.qianfan import Qianfan

client = Qianfan(api_key="YOUR_API_KEY", secret_key="YOUR_SECRET")

def analyze_with_wenxin(scenario: str, answer: str) -> dict:
    response = client.chat.completions.create(
        model="ERNIE-4.0",
        messages=[{"role": "user", "content": f"分析师德回答..."}]
    )
    return response.choices[0].message.content
```

---

## 四、环境变量配置

```bash
# .env 文件
VITE_API_URL=http://localhost:8000/api

# 后端环境变量
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-4

# 或使用阿里云
DASHSCOPE_API_KEY=your-api-key

# 或使用百度
QIANFAN_API_KEY=your-api-key
QIANFAN_SECRET_KEY=your-secret-key

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=thinks_education
DB_USER=admin
DB_PASSWORD=password
```

---

## 五、本地后端开发

### 5.1 使用 Python FastAPI

```bash
# 安装依赖
pip install fastapi uvicorn openai pydantic python-dotenv

# 创建 main.py
# 运行
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 5.2 使用 Node.js Express

```bash
# 安装依赖
npm install express openai dotenv

# 创建 server.js
# 运行
node server.js
```

---

## 六、部署建议

### 6.1 开发环境

```bash
# 前端
npm run dev

# 后端（Python示例）
cd backend
uvicorn main:app --reload
```

### 6.2 生产环境

- **前端**：部署到 Vercel / Netlify / GitHub Pages
- **后端**：部署到 AWS EC2 / 阿里云ECS / 腾讯云CVM
- **数据库**：使用 MySQL 8.0+ / PostgreSQL
- **AI服务**：使用 OpenAI API 或国内大模型API

---

## 七、当前状态说明

当前项目使用**本地模拟AI分析**，原因：
1. 真实AI API需要付费（OpenAI约$0.015/1K tokens）
2. 国内访问OpenAI需要特殊网络配置
3. 演示版本需要保证稳定性

### 启用真实AI的步骤：

1. 获取AI服务API密钥（OpenAI/阿里云/百度）
2. 创建后端服务并实现AI调用逻辑
3. 设置环境变量 `VITE_API_URL`
4. 部署后端服务

---

## 八、文件结构

```
backend/
├── main.py              # FastAPI主文件
├── requirements.txt     # Python依赖
├── .env                 # 环境变量
├── routes/
│   └── ethics.py        # 伦理分析路由
├── services/
│   └── ai_analyzer.py   # AI分析服务
└── models/
    └── database.py      # 数据库模型
```
