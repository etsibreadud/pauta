"use client";

import { useState } from "react";

export const PrivacyPolicyModal = ({ defaultUrl = "" }: { defaultUrl?: string }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(defaultUrl);

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500">Privacy Policy URL</label>
      <input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
        placeholder="https://sua-empresa.com/privacidade"
      />
      <button
        onClick={() => setOpen(true)}
        className="mt-3 rounded-full border border-ink-900 px-4 py-2 text-xs font-semibold"
      >
        Abrir política em modal
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Política de Privacidade</p>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold"
              >
                Fechar
              </button>
            </div>
            <div className="mt-4 h-[60vh] overflow-hidden rounded-2xl border border-slate-100">
              {url ? (
                <iframe
                  title="Política de Privacidade"
                  src={url}
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Insira uma URL válida para visualizar a política.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
