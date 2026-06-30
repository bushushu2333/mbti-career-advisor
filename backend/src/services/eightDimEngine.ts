import { EIGHT_DIM_QUESTIONS } from "../data/eightDimQuestions.ts";
import { inferMbti } from "./eightDimensionDiagnosis.ts";

interface EightDimResult {
  scores: Record<string, number>;
  mbti: string;
  dominant: string;
  auxiliary: string;
}

export function calculateEightDim(answers: number[]): EightDimResult {
  const scores: Record<string, number> = {
    Se: 0, Si: 0, Ne: 0, Ni: 0, Te: 0, Ti: 0, Fe: 0, Fi: 0,
  };

  // 统计每个功能的题数（题库中各功能题数可能不同：Se 有 4 题，其余各 3 题）
  const funcCount: Record<string, number> = {};
  EIGHT_DIM_QUESTIONS.forEach((q) => {
    funcCount[q.function] = (funcCount[q.function] || 0) + 1;
  });

  // 计分：answers[idx] 是 0-4 的选项索引，未答默认中间值 2
  EIGHT_DIM_QUESTIONS.forEach((q, idx) => {
    const score = answers[idx] ?? 2;
    scores[q.function] += score;
  });

  // 归一化到 0-50 分制：每功能满分为「题数 × 4」（每题最高 4 分）。
  // 用各功能实际题数做分母，使题库调整后仍正确（当前每功能均为 3 题，
  // 与原写死的 /12 等价；若将来某功能加题，无需再改这里）。
  Object.keys(scores).forEach((k) => {
    const maxRaw = (funcCount[k] || 1) * 4;
    scores[k] = Math.round((scores[k] / maxRaw) * 50);
  });

  const diagnosis = inferMbti({ scores });
  return {
    scores,
    mbti: diagnosis.mbti,
    dominant: diagnosis.dominant,
    auxiliary: diagnosis.auxiliary,
  };
}

export function getEightDimQuestions() {
  return EIGHT_DIM_QUESTIONS.map((q) => ({
    id: q.id,
    function: q.function,
    text: q.text,
    options: q.options,
  }));
}
