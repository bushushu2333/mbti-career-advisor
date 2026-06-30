import Anthropic from "@anthropic-ai/sdk";
import { mbtiCareerMatch } from "./mbtiCareerMatch.ts";
import type { ReportRequest } from "../types/index.ts";

function getConfig() {
  const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.OPENAI_API_KEY;
  const baseUrl =
    process.env.ANTHROPIC_BASE_URL || "https://ark.cn-beijing.volces.com/api/coding";
  const model =
    process.env.ANTHROPIC_MODEL || process.env.OPENAI_MODEL || "deepseek-v4-pro";
  const timeoutMs = parseInt(process.env.API_TIMEOUT_MS || "300000", 10);

  if (!apiKey) {
    throw new Error("缺少 API Key：请设置 ANTHROPIC_AUTH_TOKEN");
  }

  return { apiKey, baseUrl, model, timeoutMs };
}

export function buildPrompt(req: ReportRequest): string {
  const {
    profile,
    mbti,
    mbtiTypeName,
    mbtiDescription,
    eightDimScores,
    dominant,
    auxiliary,
  } = req;

  const careers = mbtiCareerMatch.getCareers(mbti);
  const careerList = careers.join("、") || "暂无";

  const valuesText = Object.entries(profile.values || {})
    .map(([k, v]) => `${k}: ${v}/5`)
    .join("、");

  return `你是一位资深的职业规划顾问和 MBTI 认证分析师。请为以下用户生成一份专业、详细、图文并茂（用 Markdown 排版）的职业发展报告。

## 用户档案

- **姓名**：${profile.name}
- **性别**：${profile.gender}
- **年龄**：${profile.age}
- **当前身份**：${profile.identity}
- **学校**：${profile.school}
- **专业**：${profile.major}
- **学历**：${profile.education}
- **成绩**：${profile.grades}
- **相关课程**：${profile.courses}
- **实习/项目经历**：${profile.experience}
- **技能**：${profile.skills}
- **证书**：${profile.certificates}
- **期望行业**：${profile.industries}
- **期望工作地点**：${profile.location}
- **期望薪资范围**：${profile.salary}
- **期望工作模式**：${profile.workMode}
- **职业价值观权重**：${valuesText}

## MBTI 测评结果

- **类型**：${mbti}（${mbtiTypeName}）
- **一句话解读**：${mbtiDescription}
- **主导八维功能**：${dominant}
- **辅助八维功能**：${auxiliary}
- **八维分数**：Se=${eightDimScores.Se}, Si=${eightDimScores.Si}, Ne=${eightDimScores.Ne}, Ni=${eightDimScores.Ni}, Te=${eightDimScores.Te}, Ti=${eightDimScores.Ti}, Fe=${eightDimScores.Fe}, Fi=${eightDimScores.Fi}

## 推荐职业

${careerList}

## 报告要求

请用中文生成一份结构清晰、有感染力的报告，包含以下章节：

# ${profile.name} 的职业发展报告

## 一、你的 MBTI 画像：${mbti} ${mbtiTypeName}

详细解读该类型的核心特质、在职场中的优势和潜在盲点。结合 ${mbtiDescription} 展开。

## 二、八维认知功能分析

分析主导功能 ${dominant} 和辅助功能 ${auxiliary} 如何影响用户的职业选择。结合具体分数说明哪些功能是优势、哪些需要发展。

## 三、推荐职业深度解析

针对上面列出的每个推荐职业，给出：
- 适配度评分（高/中/低）
- 为什么适合该类型
- 需要补充的能力或经验
- 入门路径建议

## 四、基于档案的个性化建议

结合用户的专业、成绩、经历、技能、期望行业和价值观，给出 3-5 条具体的下一步行动建议。

## 五、职业发展路线图

给出短期（1 年内）、中期（3 年内）、长期（5 年以上）的发展路径。

要求：
1. 使用 Markdown 标题、列表、加粗等格式，便于前端渲染；
2. 语气专业、鼓励，适合大学生或职场新人；
3. 内容具体，不要泛泛而谈；
4. 总字数控制在 1500-2500 字。`;
}

export async function* generateReportStream(req: ReportRequest): AsyncGenerator<string> {
  await mbtiCareerMatch.load();
  const { apiKey, baseUrl, model, timeoutMs } = getConfig();
  const prompt = buildPrompt(req);

  const client = new Anthropic({
    apiKey,
    baseURL: baseUrl,
    timeout: timeoutMs,
  });

  const stream = await client.messages.create({
    model,
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}
