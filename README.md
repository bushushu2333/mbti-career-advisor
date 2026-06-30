# MBTI Career Advisor

> An AI-powered career-planning system based on **MBTI personality types** and **Jung's eight cognitive functions**

**English** | [简体中文](./README.zh-CN.md)

A full-stack web application that combines MBTI personality assessment, Jungian cognitive-function analysis, and a large language model to generate personalized career-development reports.

## ✨ Features

- **MBTI assessment** — 32 questions covering the E/I, S/N, T/F, J/P dimensions plus the A/T assertiveness subtype (16 types × A/T = 32 subtypes)
- **Jungian eight-function assessment** — Se / Si / Ne / Ni / Te / Ti / Fe / Fi scores with radar-chart visualization; infers the MBTI type from the dominant / auxiliary functions
- **Detailed personal profile** — major, grades, experience, skills, career values
- **AI streaming career report** — structured Markdown report generated in real time via SSE streaming
- **Report history** — saved locally, reviewable (up to 20 entries)
- **Export & share** — copy full text / export Markdown / native share

## 🛠 Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React 19 · Vite 6 · TailwindCSS 4 · Recharts · React Markdown |
| Backend | Node.js · Express 5 · TypeScript (tsx runtime) |
| LLM | Volcano Ark (Volcengine, Anthropic-protocol-compatible endpoint) |

## 🚀 Quick Start

### 1. Configure the LLM key

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and fill in your Volcano Ark API key:

```env
ANTHROPIC_AUTH_TOKEN=<your-volcano-ark-api-key>
ANTHROPIC_BASE_URL=https://ark.cn-beijing.volces.com/api/coding
ANTHROPIC_MODEL=<model-name>
API_TIMEOUT_MS=300000
PORT=3099
```

### 2. Install dependencies

```bash
# Root (shared scripts)
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 3. Start the dev servers

```bash
npm run dev
```

- Backend: <http://localhost:3099>
- Frontend: <http://localhost:5173> (frontend `/api` requests are proxied to `:3099`)

Open <http://localhost:5173> in your browser.

## 📁 Project Structure

```
backend/                          Express + TypeScript backend
  src/data/                       MBTI / 8-function question banks
  src/services/                   engines: MBTI, 8-function diagnosis, LLM report, career matching
  src/routes/                     API routes
  .env.example                    environment-variable template
frontend/                         React + Vite frontend
  src/pages/                      Home / Test / Report / History
  src/components/                 UI components
  vite.config.ts                  dev proxy (/api → :3099)
MBTI Job Planning.csv             32 MBTI types × recommended careers (Chinese, read by backend)
MBTI Job Advise.csv               32 MBTI types × recommended careers (English)
mbti_career_report_v2.0_*.py      standalone Python version (Volcano Ark, runs independently)
```

## 🔒 Security

- All keys are read from environment variables (`.env`) and are **never committed**. `.env` is gitignored.
- Copy `.env.example` to `.env` and fill in your own key.
- Legacy 2024 prototypes (Jupyter / Python files containing historical keys) and academic documents are intentionally excluded from this repository.

## 📚 Related Paper

Zhou, Y., Zhang, Y., Yu, S., & Liu, N. (2024). *Research on the Design of an AI Career Path Recommendation System Based on MBTI from a Cross-Cultural Perspective.* Artificial Intelligence Technology Research. <https://doi.org/10.18686/aitr.v2i1.3857>

## 📄 License

[MIT](./LICENSE) © 2026 Yizhou Zhou
