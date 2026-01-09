"use client";

import { useState } from "react";
import type { UploadAnalysis } from "@/lib/types";

export const UploadAnalyzer = () => {
  const [analysis, setAnalysis] = useState<UploadAnalysis | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("Analisando documento...");

    const response = await fetch("/api/upload-analyze", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setStatus("Falha ao analisar. Tente novamente.");
      return;
    }

    const payload = (await response.json()) as { analysis: UploadAnalysis };
    setAnalysis(payload.analysis);
    setStatus("Análise concluída.");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6"
      >
        <div>
          <label className="text-xs font-semibold text-slate-500">
            Upload do processo (PDF ou DOCX)
          </label>
          <input
            name="file"
            type="file"
            accept=".pdf,.docx"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-ink-900 px-6 py-3 text-xs font-semibold text-white"
          >
            Analisar documento
          </button>
          {status ? <p className="text-xs text-slate-500">{status}</p> : null}
        </div>
      </form>

      {analysis ? (
        <div className="grid gap-6">
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">Resumo executivo</p>
            <p className="mt-3 text-sm text-slate-600">{analysis.execSummary}</p>
          </div>
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">Insights jurídicos</p>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              {analysis.legalInsights.map((insight) => (
                <p key={insight}>{insight}</p>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">E-mail de atualização</p>
            <p className="mt-2 text-sm font-semibold">Assunto</p>
            <p className="text-sm text-slate-600">{analysis.updateEmailSubject}</p>
            <p className="mt-4 text-sm font-semibold">Corpo</p>
            <pre className="whitespace-pre-wrap text-sm text-slate-600">
              {analysis.updateEmailBody}
            </pre>
          </div>
          <div className="card p-6">
            <p className="text-xs uppercase text-slate-500">Trechos-chave</p>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              {analysis.keyExcerpts.map((excerpt, index) => (
                <p key={`${excerpt.text}-${index}`}>
                  “{excerpt.text}”
                  {excerpt.page ? ` (p. ${excerpt.page})` : ""}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
