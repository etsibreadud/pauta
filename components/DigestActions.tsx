"use client";

import { useState } from "react";

export const DigestActions = ({ subject, body }: { subject: string; body: string }) => {
  const [showHtml, setShowHtml] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`Assunto: ${subject}\n\n${body}`);
  };

  const handleDownload = () => {
    const eml = `Subject: ${subject}\nContent-Type: text/plain; charset="UTF-8"\n\n${body}`;
    const blob = new Blob([eml], { type: "message/rfc822" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pauta-digest.eml";
    link.click();
    URL.revokeObjectURL(url);
  };

  const htmlBody = `<html><body><h2>${subject}</h2><pre style="font-family:Arial, sans-serif; white-space:pre-wrap;">${body}</pre></body></html>`;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white"
      >
        Copiar resumo
      </button>
      <button
        onClick={handleDownload}
        className="rounded-full border border-ink-900 px-4 py-2 text-xs font-semibold"
      >
        Baixar .eml
      </button>
      <button
        onClick={() => setShowHtml((prev) => !prev)}
        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold"
      >
        {showHtml ? "Ocultar" : "Ver"} HTML
      </button>
      {showHtml ? (
        <div className="mt-4 w-full rounded-3xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
          <p className="font-semibold">Prévia HTML (compatível Gmail/Outlook)</p>
          <pre className="mt-2 whitespace-pre-wrap">{htmlBody}</pre>
        </div>
      ) : null}
    </div>
  );
};
