import type { AgendaItem } from "@/lib/types";

export const dedupeAgendaItems = (items: AgendaItem[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.agency}-${item.processNumber}-${item.meetingDate}-${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
