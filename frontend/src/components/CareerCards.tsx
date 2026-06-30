import { Briefcase, Star } from "lucide-react";

interface CareerCardsProps {
  careers: string[];
}

const careerIcons = [
  "💼", "🎓", "🧠", "💻", "🎨", "📊", "🏥", "✍️", "🔬", "🌱",
];

export function CareerCards({ careers }: CareerCardsProps) {
  if (!careers.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {careers.map((career, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 transition hover:border-violet-500/40 hover:bg-slate-800/80"
        >
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-violet-500/10 blur-xl transition group-hover:bg-violet-500/20"></div>
          <div className="relative flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-2xl"
            >
              {careerIcons[idx % careerIcons.length]}
            </div>
            <div className="flex-1"
            >
              <h4 className="text-lg font-semibold text-slate-100">{career}</h4>
              <div className="mt-2 flex items-center gap-1 text-amber-400"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < (idx < 3 ? 5 : idx < 6 ? 4 : 3) ? "fill-current" : "text-slate-600"}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400"
              >
                {idx < 3 ? "高度适配" : idx < 6 ? "比较适配" : "可探索方向"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
