interface QuizCardProps {
  index: number;
  total: number;
  text: string;
  options: string[];
  selected: number;
  onSelect: (idx: number) => void;
}

export function QuizCard({
  index,
  total,
  text,
  options,
  selected,
  onSelect,
}: QuizCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6 backdrop-blur-sm">
      <div className="mb-4 text-xs font-medium text-violet-400">
        问题 {index + 1} / {total}
      </div>
      <h3 className="mb-5 text-lg font-medium text-slate-100">{text}</h3>
      <div className="space-y-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`w-full rounded-xl border px-5 py-3 text-left transition ${
              selected === idx
                ? "border-violet-500 bg-violet-500/20 text-violet-100"
                : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
