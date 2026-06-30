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

export interface DiagnoseRequest {
  scores: Record<string, number>;
}

export interface DiagnoseResult {
  mbti: string;
  dominant: string;
  auxiliary: string;
}

export interface CareersResult {
  mbti: string;
  careers: string[];
}

export interface MbtiTestRequest {
  answers: number[];
}

export interface MbtiTestResult {
  mbti: string;
  typeName: string;
  description: string;
  subtype: "-A" | "-T";
  scores: Record<string, number>;
}

export interface EightDimTestRequest {
  answers: number[];
}

export interface EightDimTestResult {
  scores: Record<string, number>;
  mbti: string;
  dominant: string;
  auxiliary: string;
}

export interface ReportRequest {
  profile: Profile;
  mbti: string;
  mbtiTypeName: string;
  mbtiDescription: string;
  eightDimScores: Record<string, number>;
  dominant: string;
  auxiliary: string;
}
