import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { UploadAnalyzer } from "@/components/UploadAnalyzer";

export default function UploadPage() {
  return (
    <AppShell>
      <Topbar title="Upload & Analyze" subtitle="Deep dive no processo" />
      <div className="mt-10 grid gap-6">
        <div className="card p-6">
          <p className="text-xs uppercase text-slate-500">Deep dive</p>
          <h2 className="text-2xl font-semibold">Análise documental completa</h2>
          <p className="mt-2 text-sm text-slate-600">
            Faça upload do processo para extrair resumo executivo, insights legais e um
            e-mail pronto para envio. Se a IA estiver desligada, usamos análise
            heurística.
          </p>
        </div>
        <UploadAnalyzer />
      </div>
    </AppShell>
  );
}
