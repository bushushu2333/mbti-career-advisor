import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 text-center">
      <div className="inline-flex items-center justify-center gap-2">
        <Sparkles className="h-6 w-6 text-violet-400" />
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          MBTI 职业发展规划助手
        </h1>
      </div>
      <p className="mt-2 text-slate-400 text-sm">
        专业测评 · 八维分析 · AI 生成专属职业报告
      </p>
    </header>
  );
}
