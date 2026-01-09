"use client";

import { useState } from "react";

export const FetchNowButton = () => {
  const [status, setStatus] = useState<string>("");

  const handleClick = async () => {
    setStatus("Executando coleta...");
    const response = await fetch("/api/fetch-agendas", { method: "POST" });
    if (!response.ok) {
      setStatus("Falha ao coletar.");
      return;
    }
    const payload = (await response.json()) as {
      results: { adapter: string; status: string; itemCount: number }[];
    };
    const summary = payload.results
      .map((item) => `${item.adapter}: ${item.itemCount} itens`)
      .join(" | ");
    setStatus(`Concluído: ${summary}`);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="mt-6 w-full rounded-2xl border border-ink-900 px-4 py-3 text-xs font-semibold"
      >
        Rodar coleta agora
      </button>
      {status ? <p className="mt-2 text-xs text-slate-500">{status}</p> : null}
    </div>
  );
};
