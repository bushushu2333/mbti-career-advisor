import { ReactNode } from "react";

interface ReportSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function ReportSection({ title, icon, children }: ReportSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-3">
        {icon && <div className="text-violet-400">{icon}</div>}
        <h3 className="text-xl font-bold text-violet-200">{title}</h3>
      </div>
      <div className="text-slate-300">{children}</div>
    </section>
  );
}
