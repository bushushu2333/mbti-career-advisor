import type { HistoryEntry, ReportData } from "../types/api";

const HISTORY_KEY = "mbti_report_history";
const MAX_HISTORY = 20;

/** 读取全部历史报告（最新的在前）。 */
export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

/** 报告生成完成后，存入历史（带完整数据与全文，便于回看）。 */
export function saveToHistory(data: ReportData, report: string): HistoryEntry | null {
  if (!report.trim()) return null;
  const now = new Date().toISOString();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    mbti: data.mbtiResult?.mbti ?? "",
    name: data.profile?.name || "匿名用户",
    major: data.profile?.major || "—",
    data: { ...data, savedReport: report, createdAt: now },
  };
  const list = [entry, ...getHistory()].slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    // localStorage 满（报告可能很大），淘汰最旧的再试一次
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, Math.ceil(MAX_HISTORY / 2))));
    } catch {
      return null;
    }
  }
  return entry;
}

/** 删除单条历史。 */
export function deleteHistory(id: string): HistoryEntry[] {
  const list = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  return list;
}

/** 清空全部历史。 */
export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
