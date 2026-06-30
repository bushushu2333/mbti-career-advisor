import {
  MBTI_QUESTIONS,
  SUBTYPE_QUESTIONS,
  MBTI_TYPE_NAMES,
  MBTI_DESCRIPTIONS,
} from "../data/mbtiQuestions.ts";

interface MbtiResult {
  mbti: string;
  typeName: string;
  description: string;
  subtype: "-A" | "-T";
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

export function calculateMbti(answers: number[]): MbtiResult {
  // answers[i] 是第 i 题的选项索引（0 或 1）
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  MBTI_QUESTIONS.forEach((q, idx) => {
    const answerIdx = answers[idx] ?? 0;
    const opt = q.options[answerIdx];
    if (opt) {
      scores[opt.dimension] += opt.weight;
    }
  });

  const type16 =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  // A/T 计分
  let aScore = 0;
  let tScore = 0;
  SUBTYPE_QUESTIONS.forEach((q, idx) => {
    const answerIdx = answers[MBTI_QUESTIONS.length + idx] ?? 0;
    const opt = q.options[answerIdx];
    if (opt?.type === "A") aScore += opt.weight;
    if (opt?.type === "T") tScore += opt.weight;
  });
  const subtype = aScore >= tScore ? "-A" : "-T";

  return {
    mbti: type16 + subtype,
    typeName: MBTI_TYPE_NAMES[type16] || "",
    description: MBTI_DESCRIPTIONS[type16] || "",
    subtype,
    scores,
  };
}

export function getMbtiQuestions() {
  return [...MBTI_QUESTIONS, ...SUBTYPE_QUESTIONS].map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options.map((o) => o.text),
  }));
}
