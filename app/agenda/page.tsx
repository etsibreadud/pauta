import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { demoAgendaItems } from "@/lib/data/demoAgenda";
import { demoInterestProfile } from "@/lib/data/demoInterests";
import { scoreAgendaItem } from "@/lib/scoring/relevance";
import { formatDate, formatScore } from "@/lib/utils/format";

const scoredItems = demoAgendaItems.map((item) => ({
  ...item,
  relevance: scoreAgendaItem(item, demoInterestProfile)
}));

export default function AgendaExplorerPage() {
  return (
    <AppShell>
      <Topbar title="Agenda Explorer" subtitle="Busque e filtre itens" />
      <div className="mt-10 grid gap-6">
        <div className="card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Buscar por agência, processo ou tema"
            />
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-ink-900 px-4 py-2 text-xs font-semibold">
                Relevantes (&gt;= 60)
              </button>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">
                ANATEL
              </button>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">
                ANEEL
              </button>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">
                ANVISA
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {scoredItems.map((item) => (
            <div key={item.id} className="card p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {item.agency} · {formatDate(item.meetingDate)} · Processo {item.processNumber}
                  </p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.shortDescription}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    {item.relevance.explanation}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.themeTags?.map((theme) => (
                      <span key={theme} className="badge border-slate-200">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <span className="badge border-ink-900 text-ink-900">
                    {formatScore(item.relevance.score)}
                  </span>
                  <button className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white">
                    Marcar relevante
                  </button>
                  <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">
                    Abrir fonte
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
