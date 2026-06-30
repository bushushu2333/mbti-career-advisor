import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Compass, FileText } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-8 rounded-full bg-violet-500/20 blur-3xl"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-5xl shadow-2xl">
          🧭
        </div>
      </div>

      <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
        发现适合你人格的
        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          职业道路
        </span>
      </h1>

      <p className="mb-10 max-w-xl text-lg text-slate-400">
        通过 MBTI 人格测评、荣格八维认知功能分析，结合你的教育背景和职业偏好，
        由 AI 生成一份专属的职业发展报告。
      </p>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FeatureCard
          icon={<Brain className="h-6 w-6 text-violet-400" />}
          title="MBTI 测评"
          desc="32 道专业题目，精准定位你的人格类型"
        />
        <FeatureCard
          icon={<Compass className="h-6 w-6 text-fuchsia-400" />}
          title="八维分析"
          desc="24 道认知功能题，绘制你的能力雷达图"
        />
        <FeatureCard
          icon={<FileText className="h-6 w-6 text-pink-400" />}
          title="AI 报告"
          desc="图文并茂的独立报告页，专业又美观"
        />
      </div>

      <button
        onClick={() => navigate("/test")}
        className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-violet-900/30 transition hover:from-violet-500 hover:to-fuchsia-500"
      >
        开始测评
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>

      <p className="mt-4 text-xs text-slate-500">预计用时 8-12 分钟 · 报告可反复查看</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 text-left backdrop-blur-sm">
      <div className="mb-3">{icon}</div>
      <h3 className="mb-1 font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}
