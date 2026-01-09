import { demoAgendaItems } from "@/lib/data/demoAgenda";
import type { AgencySourceAdapter } from "@/lib/adapters/types";
import { dedupeAgendaItems } from "@/lib/utils/dedupe";

export const demoAdapter: AgencySourceAdapter = {
  id: "demo",
  label: "Fonte demonstrativa",
  supports: ["demo"],
  fetchAgenda: async () => {
    const items = dedupeAgendaItems(demoAgendaItems);
    return {
      items,
      rawPayload: JSON.stringify({ items: demoAgendaItems }, null, 2),
      status: "demo"
    };
  }
};
