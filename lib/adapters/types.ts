import type { AgendaItem } from "@/lib/types";

export type SourceConfig = {
  type: "rss" | "html" | "pdf" | "demo";
  url?: string;
  notes?: string;
};

export type AgencySourceAdapter = {
  id: string;
  label: string;
  supports: SourceConfig["type"][];
  fetchAgenda: () => Promise<{
    items: AgendaItem[];
    rawPayload: string;
    status: "ok" | "demo" | "error";
  }>;
};
