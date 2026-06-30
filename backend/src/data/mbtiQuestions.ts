export interface MbtiQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    dimension: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
    weight: number;
  }[];
}

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  // E/I 维度（6 题）
  {
    id: 1,
    text: "在社交聚会后，你通常感到：",
    options: [
      { text: "精力充沛，还想继续交流", dimension: "E", weight: 1 },
      { text: "有些疲惫，需要独处恢复", dimension: "I", weight: 1 },
    ],
  },
  {
    id: 2,
    text: "你更喜欢通过哪种方式思考问题？",
    options: [
      { text: "说出来、与人讨论", dimension: "E", weight: 1 },
      { text: "先在心里想清楚再说", dimension: "I", weight: 1 },
    ],
  },
  {
    id: 3,
    text: "在团队中，你通常：",
    options: [
      { text: "主动发言、带动气氛", dimension: "E", weight: 1 },
      { text: "倾听观察、适时补充", dimension: "I", weight: 1 },
    ],
  },
  {
    id: 4,
    text: "周末你更倾向于：",
    options: [
      { text: "约朋友出去玩", dimension: "E", weight: 1 },
      { text: "在家看书或做自己的事", dimension: "I", weight: 1 },
    ],
  },
  {
    id: 5,
    text: "面对新环境，你通常：",
    options: [
      { text: "很快主动认识新朋友", dimension: "E", weight: 1 },
      { text: "先观察，慢慢熟悉", dimension: "I", weight: 1 },
    ],
  },
  {
    id: 6,
    text: "你更喜欢的工作方式是：",
    options: [
      { text: "团队协作、头脑风暴", dimension: "E", weight: 1 },
      { text: "独立专注、安静完成", dimension: "I", weight: 1 },
    ],
  },

  // S/N 维度（6 题）
  {
    id: 7,
    text: "你更关注：",
    options: [
      { text: "具体事实和细节", dimension: "S", weight: 1 },
      { text: "整体趋势和可能性", dimension: "N", weight: 1 },
    ],
  },
  {
    id: 8,
    text: "学习新知识时，你更喜欢：",
    options: [
      { text: "从实际案例和操作入手", dimension: "S", weight: 1 },
      { text: "先理解理论和概念框架", dimension: "N", weight: 1 },
    ],
  },
  {
    id: 9,
    text: "描述一件事时，你习惯：",
    options: [
      { text: "按时间顺序讲具体经过", dimension: "S", weight: 1 },
      { text: "提炼核心意义和联想", dimension: "N", weight: 1 },
    ],
  },
  {
    id: 10,
    text: "你更信任：",
    options: [
      { text: "过去的经验和已知方法", dimension: "S", weight: 1 },
      { text: "灵感和创新的思路", dimension: "N", weight: 1 },
    ],
  },
  {
    id: 11,
    text: "旅行时你更在意：",
    options: [
      { text: "行程、住宿、交通等具体安排", dimension: "S", weight: 1 },
      { text: "当地文化、氛围和独特体验", dimension: "N", weight: 1 },
    ],
  },
  {
    id: 12,
    text: "解决问题时，你更擅长：",
    options: [
      { text: "处理眼前具体的困难", dimension: "S", weight: 1 },
      { text: "发现潜在模式和长远方案", dimension: "N", weight: 1 },
    ],
  },

  // T/F 维度（6 题）
  {
    id: 13,
    text: "做决定时，你更重视：",
    options: [
      { text: "逻辑、公平和客观标准", dimension: "T", weight: 1 },
      { text: "人情、和谐和他人感受", dimension: "F", weight: 1 },
    ],
  },
  {
    id: 14,
    text: "朋友向你倾诉烦恼，你更倾向于：",
    options: [
      { text: "分析问题、给建议", dimension: "T", weight: 1 },
      { text: "共情陪伴、给支持", dimension: "F", weight: 1 },
    ],
  },
  {
    id: 15,
    text: "你更欣赏哪种领导风格？",
    options: [
      { text: "公正严明、以结果为导向", dimension: "T", weight: 1 },
      { text: "关怀下属、重视团队氛围", dimension: "F", weight: 1 },
    ],
  },
  {
    id: 16,
    text: "面对批评，你更在意：",
    options: [
      { text: "批评是否有道理、是否准确", dimension: "T", weight: 1 },
      { text: "批评的方式是否伤人", dimension: "F", weight: 1 },
    ],
  },
  {
    id: 17,
    text: "团队冲突时，你更关注：",
    options: [
      { text: "谁对谁错、如何解决", dimension: "T", weight: 1 },
      { text: "大家的情绪、如何安抚", dimension: "F", weight: 1 },
    ],
  },
  {
    id: 18,
    text: "你更认同哪种价值观？",
    options: [
      { text: "理性、真理、效率", dimension: "T", weight: 1 },
      { text: "善良、真诚、和谐", dimension: "F", weight: 1 },
    ],
  },

  // J/P 维度（6 题）
  {
    id: 19,
    text: "你更喜欢的生活方式是：",
    options: [
      { text: "有计划、有条理", dimension: "J", weight: 1 },
      { text: "灵活、随性、开放", dimension: "P", weight: 1 },
    ],
  },
  {
    id: 20,
    text: "面对截止日期，你通常：",
    options: [
      { text: "提前规划、尽早完成", dimension: "J", weight: 1 },
      { text: "在压力下效率更高", dimension: "P", weight: 1 },
    ],
  },
  {
    id: 21,
    text: "你的桌面/房间通常是：",
    options: [
      { text: "整洁有序、物品各归其位", dimension: "J", weight: 1 },
      { text: "乱中有序、随手可取", dimension: "P", weight: 1 },
    ],
  },
  {
    id: 22,
    text: "做项目时，你更享受：",
    options: [
      { text: "按计划推进、按时交付", dimension: "J", weight: 1 },
      { text: "边做边探索、保持灵活", dimension: "P", weight: 1 },
    ],
  },
  {
    id: 23,
    text: "周末安排，你倾向于：",
    options: [
      { text: "提前想好做什么", dimension: "J", weight: 1 },
      { text: "到时候看心情决定", dimension: "P", weight: 1 },
    ],
  },
  {
    id: 24,
    text: "你更看重：",
    options: [
      { text: "确定性和掌控感", dimension: "J", weight: 1 },
      { text: "可能性和新鲜感", dimension: "P", weight: 1 },
    ],
  },
];

export const SUBTYPE_QUESTIONS: {
  id: number;
  text: string;
  options: { text: string; type: "A" | "T"; weight: number }[];
}[] = [
  { id: 25, text: "面对压力时，你通常：", options: [{ text: "保持冷静，相信自己能应对", type: "A", weight: 1 }, { text: "容易焦虑，担心出错", type: "T", weight: 1 }] },
  { id: 26, text: "犯错后，你更倾向于：", options: [{ text: "快速调整，不太纠结", type: "A", weight: 1 }, { text: "反复回想，自责很久", type: "T", weight: 1 }] },
  { id: 27, text: "对新挑战的态度：", options: [{ text: "跃跃欲试，不太担心失败", type: "A", weight: 1 }, { text: "谨慎评估，害怕准备不足", type: "T", weight: 1 }] },
  { id: 28, text: "别人评价你时，你：", options: [{ text: "不太受影响，坚持自己", type: "A", weight: 1 }, { text: "比较敏感，容易放在心上", type: "T", weight: 1 }] },
  { id: 29, text: "等待结果时，你：", options: [{ text: "耐心等待，不过度担忧", type: "A", weight: 1 }, { text: "坐立不安，反复预想", type: "T", weight: 1 }] },
  { id: 30, text: "做重大决定前，你：", options: [{ text: "果断，相信直觉", type: "A", weight: 1 }, { text: "反复权衡，担心后悔", type: "T", weight: 1 }] },
  { id: 31, text: "面对批评，你通常：", options: [{ text: "理性看待，不容易动摇", type: "A", weight: 1 }, { text: "容易受到影响，怀疑自我", type: "T", weight: 1 }] },
  { id: 32, text: "你对自己未来的预期：", options: [{ text: "总体乐观，顺其自然", type: "A", weight: 1 }, { text: "常担心意外和风险", type: "T", weight: 1 }] },
];

export type MbtiDimension = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export const MBTI_TYPE_NAMES: Record<string, string> = {
  ISTJ: "检查者", ISFJ: "守护者", INFJ: "提倡者", INTJ: "建筑师",
  ISTP: "鉴赏家", ISFP: "探险家", INFP: "调停者", INTP: "逻辑学家",
  ESTP: "企业家", ESFP: "表演者", ENFP: "竞选者", ENTP: "辩论家",
  ESTJ: "总经理", ESFJ: "执政官", ENFJ: "主人公", ENTJ: "指挥官",
};

export const MBTI_DESCRIPTIONS: Record<string, string> = {
  ISTJ: "务实可靠，注重细节与责任，是组织中的稳定力量。",
  ISFJ: "温暖体贴，默默付出，善于照顾他人和维持传统。",
  INFJ: "理想主义，洞察力强，追求意义与深度连接。",
  INTJ: "战略思维，独立自主，善于规划长远目标。",
  ISTP: "冷静务实，喜欢动手解决具体问题，适应力强。",
  ISFP: "敏感艺术，追求自由与美好，重视个人价值。",
  INFP: "富有同理心，忠于内心价值，是天生的理想主义者。",
  INTP: "好奇心强，热爱分析，追求逻辑与真理。",
  ESTP: "精力充沛，敢于冒险，擅长临场应变。",
  ESFP: "热情活泼，享受当下，是人群中的开心果。",
  ENFP: "充满热情，创意无限，善于激励他人。",
  ENTP: "机智灵活，喜欢挑战，善于发现新可能。",
  ESTJ: "高效果断，注重秩序，是天生的管理者。",
  ESFJ: "热心助人，重视和谐，善于组织协调。",
  ENFJ: "富有魅力的领袖，关注他人成长，感染力强。",
  ENTJ: "果断自信，目标导向，具有天生的领导才能。",
};
