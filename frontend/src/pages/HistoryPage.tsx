import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import { Header } from "../components/Header";
import { getHistory, deleteHistory, clearHistory } from "../utils/storage";
import type { HistoryEntry } from "../types/api";

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function HistoryPage() {
  const navigate = useNavigate();
  const [list, setList] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setList(getHistory());
  }, []);

  const viewEntry = (entry: HistoryEntry) => {
    localStorage.setItem("mbti_report_data", JSON.stringify(entry.data));
    navigate("/report");
  };

  const removeEntry = (id: string) => {
    setList(deleteHistory(id));
  };

  const handleClear = () => {
    if (list.length === 0) return;
    if (window.confirm(`确定清空全部 ${list.length} 条历史报告？此操作不可撤销。`)) {
      clearHistory();
      setList([]);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-20">
      <div className="mx-auto max-w-3xl">
        <Header />

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </button>
          {list.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              清空全部
            </button>
          )}
        </div>

        <h1 className="mb-1 text-2xl font-bold text-slate-100">历史报告</h1>
        <p className="mb-6 text-sm text-slate-400">
          共 {list.length} 条记录（本地保存，最多保留 20 条）
        </p>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-12 text-center">
            <div className="mb-3 text-4xl">📋</div>
            <p className="text-slate-300">还没有历史报告</p>
            <p className="mt-1 text-sm text-slate-500">完成一次测评生成报告后，会自动保存到这里</p>
            <button
              onClick={() => navigate("/test")}
              className="mt-6 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 text-sm font-medium text-white"
            >
              开始测评
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4 transition hover:border-violet-500/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 text-sm font-semibold text-violet-300">
                      {entry.mbti || "—"}
                    </span>
                    <span className="truncate font-medium text-slate-200">{entry.name}</span>
                    {entry.major && entry.major !== "—" && (
                      <span className="truncate text-sm text-slate-400">· {entry.major}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{formatTime(entry.createdAt)}</div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => viewEntry(entry)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600/80 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-violet-600"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    查看
                  </button>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    aria-label="删除"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 transition hover:border-red-500/40 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
