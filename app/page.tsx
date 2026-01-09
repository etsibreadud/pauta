import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DigestActions } from "@/components/DigestActions";
import { FetchNowButton } from "@/components/FetchNowButton";
import { Topbar } from "@/components/Topbar";
import { demoAgendaItems } from "@/lib/data/demoAgenda";
import { demoInterestProfile } from "@/lib/data/demoInterests";
import { scoreAgendaItem } from "@/lib/scoring/relevance";
import { formatDate, formatScore } from "@/lib/utils/format";
import { buildDigestEmail } from "@/lib/utils/email";

const scoredItems = demoAgendaItems
  .map((item) => ({ ...item, relevance: scoreAgendaItem(item, demoInterestProfile) }))
  .sort((a, b) => b.relevance.score - a.relevance.score)
  .slice(0, 5);

const digest = buildDigestEmail(scoredItems);

export default function DashboardPage() {
  return (
    <AppShell>
      <Topbar title="Dashboard" subtitle="Resumo inteligente de hoje" />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase text-slate-500">Hoje</p>
                <h2 className="text-2xl font-semibold">Pautas relevantes</h2>
              </div>
              <Link
                href="/agenda"
                className="rounded-full border border-ink-900 px-4 py-2 text-xs font-semibold"
              >
                Ver tudo
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {scoredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-100 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        {item.agency} · {formatDate(item.meetingDate)}
                      </p>
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {item.shortDescription}
                      </p>
                    </div>
                    <span className="badge border-ink-900 text-ink-900">
                      {formatScore(item.relevance.score)}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    {item.relevance.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-500">Ação rápida</p>
                <h2 className="text-2xl font-semibold">Gerar e-mail digest</h2>
              </div>
              <DigestActions subject={digest.subject} body={digest.body} />
            </div>
            <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold">Assunto:</p>
              <p className="mb-4">{digest.subject}</p>
              <p className="font-semibold">Corpo:</p>
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-600">
                {digest.body}
              </pre>
              <p className="mt-4 text-xs text-slate-500">
                O Pauta gera rascunhos apenas. Nenhum e-mail é enviado automaticamente.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">Monitoramento</p>
            <h2 className="text-2xl font-semibold">Agências</h2>
            <div className="mt-4 space-y-3">
              {["ANATEL", "ANEEL", "ANP", "ANVISA"].map((agency) => (
                <div
                  key={agency}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{agency}</p>
                    <p className="text-xs text-slate-500">Fonte demo · Última atualização 10:32</p>
                  </div>
                  <span className="badge border-mint/70 text-ink-900">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
            <FetchNowButton />
          </div>
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">Feedback</p>
            <h2 className="text-2xl font-semibold">Relevância inteligente</h2>
            <p className="mt-3 text-sm text-slate-600">
              Ajuste seus interesses para refinar o score. Marque itens como relevantes ou
              não relevantes para treinar sua base.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {demoInterestProfile.includeKeywords.map((keyword) => (
                <span key={keyword} className="badge border-slate-200">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
