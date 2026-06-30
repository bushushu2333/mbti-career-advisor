export interface Profile {
  name: string;
  gender: string;
  age: string;
  identity: string;
  major: string;
  school: string;
  education: string;
  grades: string;
  courses: string;
  experience: string;
  skills: string;
  certificates: string;
  industries: string;
  location: string;
  salary: string;
  workMode: string;
  values: Record<string, number>;
}

export interface MbtiResult {
  mbti: string;
  typeName: string;
  description: string;
  subtype: "-A" | "-T";
  scores: Record<string, number>;
}

export interface EightDimResult {
  scores: Record<string, number>;
  mbti: string;
  dominant: string;
  auxiliary: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  function?: string;
}

export interface ReportData {
  profile: Profile;
  mbtiResult: MbtiResult;
  eightDimResult: EightDimResult;
  careers: string[];
  savedReport?: string;  // 已生成的报告全文（历史回看时预填，不再重新生成）
  createdAt?: string;    // ISO 时间戳
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  mbti: string;
  name: string;
  major: string;
  data: ReportData;
}
