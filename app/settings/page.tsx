import { AppShell } from "@/components/AppShell";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { Topbar } from "@/components/Topbar";
import { demoAgencies } from "@/lib/data/demoAgencies";

export default function SettingsPage() {
  return (
    <AppShell>
      <Topbar title="Settings" subtitle="Configurações do produto" />
      <div className="mt-10 grid gap-6">
        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Agências</p>
          <h2 className="text-2xl font-semibold">Fontes monitoradas</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {demoAgencies.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{agency.name}</p>
                  <p className="text-xs text-slate-500">{agency.source}</p>
                </div>
                <button className="rounded-full border border-ink-900 px-3 py-1 text-xs font-semibold">
                  Configurar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Interesses</p>
          <h2 className="text-2xl font-semibold">Palavras-chave e temas</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Palavras-chave</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                defaultValue="sanções, tarifas, espectro, concessão"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Palavras negativas</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                defaultValue="eventos, webinars"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-500">Temas prioritários</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              defaultValue="sanções, espectro, tarifas"
            />
          </div>
        </div>

        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Privacidade & AI</p>
          <h2 className="text-2xl font-semibold">Consentimento explícito</h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <span className="text-sm text-slate-600">
                Autorizo o envio de conteúdo para análise por IA de terceiros.
                <span className="block text-xs text-slate-500">
                  Última atualização: nunca
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4">
              <input type="checkbox" defaultChecked className="mt-1 h-4 w-4" />
              <span className="text-sm text-slate-600">
                Manter fallback não-AI quando o consentimento estiver desligado.
              </span>
            </label>
            <PrivacyPolicyModal />
          </div>
          <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 text-sm text-slate-600">
            <p className="text-xs font-semibold text-slate-500">O que armazenamos</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Agências selecionadas e configurações de fonte</li>
              <li>Interesses e temas prioritários</li>
              <li>Itens de pauta normalizados e seus scores</li>
              <li>Uploads, textos extraídos e análises geradas</li>
              <li>Rascunhos de e-mail e histórico de feedback</li>
            </ul>
          </div>
        </div>

        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Dados</p>
          <h2 className="text-2xl font-semibold">Retenção e exclusão</h2>
          <p className="mt-2 text-sm text-slate-600">
            Defina a retenção padrão de dados e apague seus registros quando quiser.
          </p>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-500">Retenção (dias)</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                defaultValue="180"
              />
            </div>
            <button className="rounded-full border border-ink-900 px-4 py-3 text-xs font-semibold">
              Salvar retenção
            </button>
            <button className="rounded-full bg-ink-900 px-4 py-3 text-xs font-semibold text-white">
              Excluir meus dados
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
