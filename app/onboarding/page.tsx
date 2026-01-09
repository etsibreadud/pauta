import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { demoAgencies } from "@/lib/data/demoAgencies";

export default function OnboardingPage() {
  return (
    <AppShell>
      <Topbar title="Onboarding" subtitle="Configuração inicial" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Etapa 1</p>
          <h2 className="text-2xl font-semibold">Escolha as agências</h2>
          <p className="mt-2 text-sm text-slate-600">
            Selecione as agências que deseja monitorar. Você pode adicionar outras mais tarde.
          </p>
          <div className="mt-4 space-y-3">
            {demoAgencies.map((agency) => (
              <label
                key={agency.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{agency.name}</p>
                  <p className="text-xs text-slate-500">Fonte demo</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Etapa 2</p>
          <h2 className="text-2xl font-semibold">Seus interesses</h2>
          <p className="mt-2 text-sm text-slate-600">
            Adicione temas e palavras-chave para pontuar relevância.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500">Palavras-chave</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="ex: sanções, espectro, tarifas"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Palavras negativas</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="ex: eventos, webinars"
              />
            </div>
          </div>
        </div>
        <div className="card p-6 lg:col-span-2">
          <p className="text-xs uppercase text-slate-500">Etapa 3</p>
          <h2 className="text-2xl font-semibold">Privacidade & AI</h2>
          <p className="mt-2 text-sm text-slate-600">
            Antes de usar qualquer IA de terceiros, precisamos do seu consentimento explícito.
          </p>
          <div className="mt-4 flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-4">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <span className="text-sm text-slate-600">
                Eu autorizo o envio de conteúdo para provedores de IA para análise avançada.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" defaultChecked className="mt-1 h-4 w-4" />
              <span className="text-sm text-slate-600">
                Quero manter a análise local baseada em regras quando AI estiver desligada.
              </span>
            </label>
          </div>
          <button className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-xs font-semibold text-white">
            Concluir onboarding
          </button>
        </div>
      </div>
    </AppShell>
  );
}
