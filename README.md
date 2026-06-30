# MBTI 职业发展规划助手

> 基于 **MBTI 人格类型** + **荣格八维认知功能** 的 AI 职业规划推荐系统

一个结合 MBTI 人格测评、荣格八维认知功能分析与大语言模型的全栈 Web 应用，为用户生成个性化的职业发展报告。

## ✨ 功能

- **MBTI 测评**：32 题，覆盖 E/I、S/N、T/F、J/P 四维度 + A/T 自信子类型（16 型 × A/T = 32 子型）
- **荣格八维认知功能测评**：Se / Si / Ne / Ni / Te / Ti / Fe / Fi 八维分数 + 雷达图可视化，由主导 / 辅助功能反推 MBTI
- **详细个人档案**：专业、成绩、经历、技能、职业价值观等
- **AI 流式职业报告**：调用大模型实时生成结构化 Markdown 报告（SSE 流式输出）
- **历史报告**：本地保存与回看（最多 20 条）
- **报告导出**：复制全文 / 导出 Markdown / 原生分享

## 🛠 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 19 · Vite 6 · TailwindCSS 4 · Recharts · React Markdown |
| 后端 | Node.js · Express 5 · TypeScript（tsx 运行时） |
| LLM | 火山方舟（Volcano Ark，Anthropic 协议兼容端点） |

## 🚀 快速开始

### 1. 配置 LLM 密钥

```bash
cp backend/.env.example backend/.env
```

编辑 `backend/.env`，填入火山方舟 API Key：

```env
ANTHROPIC_AUTH_TOKEN=<你的火山方舟 API Key>
ANTHROPIC_BASE_URL=https://ark.cn-beijing.volces.com/api/coding
ANTHROPIC_MODEL=<模型名>
API_TIMEOUT_MS=300000
PORT=3099
```

### 2. 安装依赖

```bash
# 根目录（共享脚本）
npm install

# 后端
cd backend && npm install && cd ..

# 前端
cd frontend && npm install && cd ..
```

### 3. 启动开发服务

```bash
npm run dev
```

- 后端：<http://localhost:3099>
- 前端：<http://localhost:5173>（前端 `/api` 请求自动代理到 3099）

浏览器打开 <http://localhost:5173> 即可使用。

## 📁 项目结构

```
backend/                          Express + TypeScript 后端
  src/data/                       MBTI / 八维 题库数据
  src/services/                   测评引擎、八维诊断、LLM 报告生成、职业匹配
  src/routes/                     API 路由
  .env.example                    环境变量模板
frontend/                         React + Vite 前端
  src/pages/                      首页 / 测评 / 报告 / 历史
  src/components/                 UI 组件
  vite.config.ts                  开发代理（/api → :3099）
MBTI Job Planning.csv             32 种 MBTI × 推荐职业（中文，后端读取）
MBTI Job Advise.csv               32 种 MBTI × 推荐职业（英文）
mbti_career_report_v2.0_*.py      Python 单文件版（火山方舟，可独立运行）
```

## 🔒 安全

- 所有密钥通过环境变量（`.env`）读取，**切勿提交**。`.env` 已在 `.gitignore` 中忽略。
- 复制 `.env.example` 为 `.env` 并填入自己的密钥。
- 旧原型（含历史密钥的 2024 Jupyter / Python 文件）与学术文档未包含在本仓库中。

## 📚 相关论文

Zhou, Y., Zhang, Y., Yu, S., & Liu, N. (2024). *Research on the Design of an AI Career Path Recommendation System Based on MBTI from a Cross-Cultural Perspective.* Artificial Intelligence Technology Research. <https://doi.org/10.18686/aitr.v2i1.3857>

## 📄 License

[MIT](./LICENSE) © 2026 Yizhou Zhou
