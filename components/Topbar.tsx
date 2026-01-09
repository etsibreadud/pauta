import { Bell, UserCircle } from "lucide-react";

export const Topbar = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold text-ink-700">{title}</p>
        {subtitle ? (
          <h1 className="text-3xl font-semibold text-ink-900">{subtitle}</h1>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-full border border-white/70 bg-white/70 p-3 text-slate-500">
          <Bell className="h-4 w-4" />
        </button>
        <button className="rounded-full border border-white/70 bg-white/70 p-3 text-slate-500">
          <UserCircle className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
