# SQL AI Agent

> 企业级 SQL 生成助手 - 基于 Schema 认知层 + LLM 的智能数据查询系统

## 🚀 项目简介

SQL AI Agent 是一个智能化的 SQL 生成工具，从传统的"用户输入 → LLM → SQL（瞎猜）"升级为"用户输入 + 数据字典 + 表关系 + 业务定义 → LLM → 正确 SQL"。

系统通过构建**数据认知层**，让 AI 真正理解你的数据结构，而不是盲目猜测。

## ✨ 核心功能

### 🧠 智能 SQL 生成
- 基于数据表结构、表关系和业务指标定义生成 SQL
- 支持多表 JOIN 查询
- 自动识别业务指标（如"新增用户"、"GMV"）

### ⚡ 实时流式输出
- AI 逐字输出 SQL，体验更流畅
- 无需等待完整响应

### 📊 Schema 可视化
- 实时展示数据表结构
- 显示字段类型和描述
- 表关系一目了然

### 🕓 查询历史
- 保存最近 20 条查询记录
- 快速回顾历史查询

### 🔧 调试面板
- 查看系统上下文
- 了解 AI 如何理解数据

## 🏗️ 系统架构

```
┌──────────────────────┐
│   Web UI (Next.js)   │
└─────────┬────────────┘
          ↓
┌──────────────────────┐
│ Query Orchestrator   │ ← 核心编排层
└─────────┬────────────┘
          ↓
┌──────────────────────┐
│   Context Engine     │
│ ┌────┬────┬────────┐ │
│ │Schema│关系│指标定义│ │
│ └────┴────┴────────┘ │
└─────────┬────────────┘
          ↓
┌──────────────────────┐
│   LLM (SQL Agent)    │
└─────────┬────────────┘
          ↓
┌──────────────────────┐
│   SQL Validator      │
└──────────────────────┘
```

## 📁 项目结构

```
sql-ai/
├── app/
│   ├── api/sql/route.ts    ← API 入口（极薄）
│   ├── page.tsx            ← 主页面
│   └── layout.tsx          ← 布局
├── core/                   ← ⭐ 核心层
│   ├── orchestrator/
│   │   └── queryOrchestrator.ts  ← 查询编排器
│   ├── context/
│   │   ├── schemaLoader.ts       ← Schema 加载器
│   │   ├── semanticLayer.ts      ← 语义层
│   │   └── contextBuilder.ts     ← 上下文构建器
│   ├── llm/
│   │   └── sqlAgent.ts           ← LLM 推理
│   ├── validator/
│   │   └── sqlValidator.ts       ← SQL 校验器
│   ├── history/
│   │   └── store.ts              ← 历史记录
│   └── types/
│       └── index.ts              ← 类型定义
├── data/
│   ├── schema.json               ← 数据表结构
│   └── metrics.json              ← 业务指标定义
└── components/
    ├── SchemaPanel.tsx           ← Schema 可视化
    ├── HistoryPanel.tsx          ← 历史记录面板
    └── DebugPanel.tsx            ← 调试面板
```

## 🛠️ 技术栈

- **前端框架**: Next.js 16
- **UI 样式**: Tailwind CSS 4
- **AI 集成**: OpenAI SDK (OpenRouter)
- **语言**: TypeScript
- **运行时**: Node.js

## 📦 快速开始

### 环境要求

- Node.js 18+
- npm / yarn / pnpm

### 安装

```bash
git clone https://github.com/your-username/sql-ai.git
cd sql-ai
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
OPENROUTER_API_KEY=your-api-key-here
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 🚀 部署到 Vercel

### 方式一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sql-ai)

### 方式二：手动部署

1. 将代码推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入你的仓库
5. 配置环境变量 `OPENROUTER_API_KEY`
6. 点击 "Deploy"

### 环境变量配置

在 Vercel 项目设置中添加：

| 变量名 | 说明 |
|--------|------|
| OPENROUTER_API_KEY | OpenRouter API 密钥 |

## 📝 使用示例

### 示例 1：统计新增用户

**输入**:
```
统计最近7天新增用户
```

**输出**:
```sql
SELECT COUNT(*)
FROM user_table
WHERE create_time >= CURRENT_DATE - INTERVAL 7 DAY;
```

### 示例 2：查询 GMV

**输入**:
```
统计最近30天的GMV
```

**输出**:
```sql
SELECT SUM(pay_amount)
FROM order_table
WHERE pay_time >= CURRENT_DATE - INTERVAL 30 DAY;
```

### 示例 3：多表 JOIN

**输入**:
```
统计每个国家的新增用户订单总额
```

**输出**:
```sql
SELECT u.country, SUM(o.pay_amount)
FROM user_table u
JOIN order_table o ON u.user_id = o.user_id
WHERE u.create_time >= CURRENT_DATE - INTERVAL 7 DAY
GROUP BY u.country;
```

## 🔧 自定义数据模型

### 修改 Schema

编辑 `src/data/schema.json`:

```json
{
  "tables": [
    {
      "name": "your_table",
      "desc": "表描述",
      "columns": [
        { "name": "column1", "type": "string", "desc": "字段描述" }
      ]
    }
  ],
  "relations": [
    {
      "left": "table1.column",
      "right": "table2.column",
      "type": "1:N"
    }
  ]
}
```

### 添加业务指标

编辑 `src/data/metrics.json`:

```json
[
  {
    "name": "指标名称",
    "definition": "指标定义说明"
  }
]
```

## 📄 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
