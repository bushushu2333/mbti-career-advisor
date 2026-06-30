import { MBTI_TYPE_NAMES, MBTI_DESCRIPTIONS } from "../data/mbtiData";

interface MbtiHeroProps {
  mbti: string;
}

export function MbtiHero({ mbti }: MbtiHeroProps) {
  const type16 = mbti.slice(0, 4);
  const subtype = mbti.slice(4);
  const typeName = MBTI_TYPE_NAMES[type16] || "";
  const description = MBTI_DESCRIPTIONS[type16] || "";

  // 根据类型生成一个稳定的渐变
  const gradients: Record<string, string> = {
    ISTJ: "from-slate-500 to-slate-700",
    ISFJ: "from-emerald-400 to-teal-600",
    INFJ: "from-violet-400 to-fuchsia-600",
    INTJ: "from-indigo-500 to-purple-700",
    ISTP: "from-zinc-400 to-slate-600",
    ISFP: "from-rose-300 to-pink-500",
    INFP: "from-violet-300 to-fuchsia-500",
    INTP: "from-blue-400 to-indigo-600",
    ESTP: "from-orange-400 to-red-500",
    ESFP: "from-yellow-400 to-orange-500",
    ENFP: "from-amber-300 to-rose-500",
    ENTP: "from-cyan-400 to-blue-600",
    ESTJ: "from-red-500 to-rose-700",
    ESFJ: "from-pink-400 to-rose-600",
    ENFJ: "from-fuchsia-400 to-purple-600",
    ENTJ: "from-blue-500 to-violet-700",
  };
  const gradient = gradients[type16] || "from-violet-500 to-fuchsia-600";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/70 p-8 backdrop-blur-sm">
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl`}></div>
      <div className="relative flex flex-col items-center gap-6 md:flex-row">
        <div
          className={`flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${gradient} text-4xl font-black text-white shadow-2xl`}
        >
          {type16}
        </div>
        <div className="text-center md:text-left">
          <div className="mb-1 text-sm font-medium text-violet-300">
            你的 MBTI 类型
          </div>
          <h2 className="mb-2 text-4xl font-bold text-white">
            {mbti}
            <span className="ml-3 text-2xl font-medium text-slate-400">{typeName}</span>
          </h2>
          <p className="max-w-xl text-slate-300">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            {subtype === "-A" ? "自信型 (Assertive)" : "动荡型 (Turbulent)"}
          </div>
        </div>
      </div>
    </div>
  );
}
