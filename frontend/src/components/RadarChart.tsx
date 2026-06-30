import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FUNCTION_LABELS, FUNCTION_COLORS } from "../data/mbtiData";

interface RadarChartProps {
  scores: Record<string, number>;
}

export function EightDimRadar({ scores }: RadarChartProps) {
  const data = Object.entries(scores).map(([func, score]) => ({
    function: FUNCTION_LABELS[func] || func,
    score,
    fullMark: 50,
  }));

  return (
    <div className="h-80 w-full rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4 backdrop-blur-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(148,163,184,0.2)" />
          <PolarAngleAxis
            dataKey="function"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 50]}
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="八维得分"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="#8b5cf6"
            fillOpacity={0.35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "8px",
              color: "#e2e8f0",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EightDimBars({ scores }: RadarChartProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Object.entries(scores).map(([func, score]) => (
        <div
          key={func}
          className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-3"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="font-bold text-slate-200">{func}</span>
            <span className="text-sm text-slate-400">{FUNCTION_LABELS[func]}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800"
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(score / 50) * 100}%`,
                backgroundColor: FUNCTION_COLORS[func],
              }}
            />
          </div>
          <div className="mt-1 text-right text-sm font-medium text-slate-300">{score}</div>
        </div>
      ))}
    </div>
  );
}
