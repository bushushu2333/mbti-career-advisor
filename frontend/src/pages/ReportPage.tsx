import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, RefreshCw, Share2, Loader2, History, Copy, Download, Check } from "lucide-react";
import { Header } from "../components/Header";
import { MbtiHero } from "../components/MbtiHero";
import { EightDimRadar, EightDimBars } from "../components/RadarChart";
import { CareerCards } from "../components/CareerCards";
import { ReportSection } from "../components/ReportSection";
import { TypeWriter } from "../components/TypeWriter";
import { saveToHistory } from "../utils/storage";
import type { ReportData } from "../types/api";

export function ReportPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ReportData | null>(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("mbti_report_data");
    if (!raw) {
      navigate("/test");
      return;
    }
    setData(JSON.parse(raw));
  }, [navigate]);

  useEffect(() => {
    if (!data) return;

    // 历史回看：已有完整报告则直接展示，不重新生成
    if (data.savedReport) {
      setReport(data.savedReport);
      setDone(true);
      setLoading(false);
      setError(null);
      return;
    }

    setReport("");
    setLoading(true);
    setError(null);
    setDone(false);

    const payload = {
      profile: data.profile,
      mbti: data.mbtiResult.mbti,
      mbtiTypeName: data.mbtiResult.typeName,
      mbtiDescription: data.mbtiResult.description,
      eightDimScores: data.eightDimResult.scores,
      dominant: data.eightDimResult.dominant,
      auxiliary: data.eightDimResult.auxiliary,
    };

    const controller = new AbortController();
    // 超时保护：60 秒未完成则中止，避免无限等待
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 60000);

    fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.body) throw new Error("响应为空");
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let localReport = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payloadStr = trimmed.slice(5).trim();

            if (payloadStr === "[DONE]") {
              setLoading(false);
              setDone(true);
              saveToHistory(data, localReport);
              return;
            }

            try {
              const parsed = JSON.parse(payloadStr);
              if (parsed.chunk) {
                localReport += parsed.chunk;
                setReport((prev) => prev + parsed.chunk);
              } else if (parsed.error) {
                setError(parsed.error);
                setLoading(false);
                return;
              }
            } catch {
              // ignore
            }
          }
        }
        setLoading(false);
        setDone(true);
        saveToHistory(data, localReport);
      })
      .catch((err) => {
        if (timedOut) {
          setError("报告生成超时（60秒），请点「重新生成」再试。");
          setLoading(false);
        } else if (err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      })
      .finally(() => clearTimeout(timeoutId));

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [data, retryCount]);

  // 复制报告全文到剪贴板
  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.alert("复制失败，请手动选择报告文本复制。");
    }
  };

  // 导出为 Markdown 文件
  const downloadReport = () => {
    const name = data?.profile?.name || "用户";
    const mbti = data?.mbtiResult?.mbti || "";
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-${mbti}-职业报告.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 原生分享（不支持则退化为复制）
  const shareReport = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${data?.profile?.name || ""} 的 MBTI 职业报告`,
          text: report,
        });
      } catch {
        // 用户取消，忽略
      }
    } else {
      copyReport();
    }
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        加载中...
      </div>
    );
  }

  const { profile, mbtiResult, eightDimResult, careers } = data;

  return (
    <div className="min-h-screen px-4 pb-20">
      <div className="mx-auto max-w-5xl">
        <Header />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/test")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            重新测评
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/history")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
            >
              <History className="h-4 w-4" />
              历史报告
            </button>
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4" />
              重生成
            </button>
            <button
              onClick={copyReport}
              disabled={!report}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700 disabled:opacity-40"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "已复制" : "复制"}
            </button>
            <button
              onClick={downloadReport}
              disabled={!report}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700 disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              导出
            </button>
            <button
              onClick={shareReport}
              disabled={!report}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              分享
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <MbtiHero mbti={mbtiResult.mbti} />

          <ReportSection title="八维认知功能雷达图" icon={<span className="text-xl">🧠</span>}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <EightDimRadar scores={eightDimResult.scores} />
              <EightDimBars scores={eightDimResult.scores} />
            </div>
            <div className="mt-4 text-sm text-slate-400">
              主导功能：<strong className="text-violet-300">{eightDimResult.dominant}</strong>
              <span className="mx-2">·</span>
              辅助功能：<strong className="text-fuchsia-300">{eightDimResult.auxiliary}</strong>
            </div>
          </ReportSection>

          <ReportSection title="推荐职业方向" icon={<span className="text-xl">💼</span>}>
            <CareerCards careers={careers} />
          </ReportSection>

          <ReportSection title="AI 职业发展报告" icon={<span className="text-xl">✨</span>}>
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <div className="mb-2">报告生成失败：{error}</div>
                <button
                  onClick={() => setRetryCount((c) => c + 1)}
                  className="rounded-lg bg-red-500/20 px-4 py-1.5 text-xs font-medium text-red-200 transition hover:bg-red-500/30"
                >
                  重新生成报告
                </button>
              </div>
            )}

            {loading && report === "" && (
              <div className="flex items-center gap-3 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
                正在根据 {profile.name} 的档案生成专属报告，请稍候...
              </div>
            )}

            <div className="markdown-body rounded-xl bg-slate-950/50 p-6">
              {report ? (
                <ReactMarkdown>{report}</ReactMarkdown>
              ) : null}
            </div>
          </ReportSection>
        </div>
      </div>
    </div>
  );
}
