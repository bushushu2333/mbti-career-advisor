import type { DiagnoseRequest, DiagnoseResult } from "../types/index.ts";

const FUNCTIONS = ["Se", "Si", "Ne", "Ni", "Te", "Ti", "Fe", "Fi"] as const;

function isPerceiving(func: string): boolean {
  return func[0] === "S" || func[0] === "N";
}

function isJudging(func: string): boolean {
  return func[0] === "T" || func[0] === "F";
}

function identifyDominantAuxiliary(scores: Record<string, number>): {
  dominant: string;
  auxiliary: string;
} {
  const sorted = Object.entries(scores)
    .filter(([k]) => FUNCTIONS.includes(k as (typeof FUNCTIONS)[number]))
    .sort((a, b) => b[1] - a[1]);

  const dominant = sorted[0][0];
  const dominantIsPerceiving = isPerceiving(dominant);

  // 辅助功能需满足：
  // 1. 与主导功能态度相反（e/i）
  // 2. 与主导功能类别相反（感知/判断）
  const candidates = sorted.filter(([func]) => {
    const oppositeAttitude = func[1] !== dominant[1];
    const oppositeClass = dominantIsPerceiving
      ? isJudging(func)
      : isPerceiving(func);
    return oppositeAttitude && oppositeClass;
  });

  // 若找不到理想候选，放宽为仅需类别相反
  const fallbackCandidates = sorted.filter(([func]) => {
    return dominantIsPerceiving ? isJudging(func) : isPerceiving(func);
  });

  const auxiliary =
    candidates[0]?.[0] ?? fallbackCandidates[0]?.[0] ?? sorted[1]?.[0] ?? "";

  return { dominant, auxiliary };
}

function decideMbti(dominant: string, auxiliary: string): string {
  const firstLetter = dominant.includes("e") ? "E" : "I";

  const dominantType = dominant[0];
  const dominantAttitude = dominant[1];

  // J/P 判定：
  // 外倾判断（Te/Fe）或内倾感知（Si/Ni）→ J
  // 外倾感知（Se/Ne）或内倾判断（Ti/Fi）→ P
  const isJ =
    (dominantAttitude === "e" && (dominantType === "T" || dominantType === "F")) ||
    (dominantAttitude === "i" && (dominantType === "S" || dominantType === "N"));
  const lastLetter = isJ ? "J" : "P";

  // S/N/T/F 从两个功能中提取
  const funcTypes = new Set([dominantType, auxiliary[0]]);
  const perception = funcTypes.has("N") ? "N" : "S";
  const judgment = funcTypes.has("T") ? "T" : "F";

  return `${firstLetter}${perception}${judgment}${lastLetter}`;
}

export function inferMbti(body: DiagnoseRequest): DiagnoseResult {
  const scores = body.scores ?? {};
  const { dominant, auxiliary } = identifyDominantAuxiliary(scores);
  const mbti = decideMbti(dominant, auxiliary);
  return { mbti, dominant, auxiliary };
}
