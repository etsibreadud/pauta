import Link from "next/link";
import { Home, List, UploadCloud, Settings, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/agenda", label: "Agenda Explorer", icon: List },
  { href: "/upload", label: "Upload & Analyze", icon: UploadCloud },
  { href: "/onboarding", label: "Onboarding", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings }
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:gap-6 lg:px-6 lg:py-10">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
          P
        </div>
        <div>
          <p className="text-xl font-semibold">Pauta</p>
          <p className="text-xs text-slate-500">Monitoramento regulatório</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-ink-900"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-3xl border border-white/60 bg-white/70 p-4 text-xs text-slate-600">
        <p className="font-semibold text-ink-900">Status da fonte</p>
        <p>Agenda demonstrativa ativa. Configure fontes reais no Settings.</p>
      </div>
    </aside>
  );
};
