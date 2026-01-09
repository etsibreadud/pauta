import type { AgendaItem, RelevanceResult } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";

export const buildDigestEmail = (
  items: Array<AgendaItem & { relevance: RelevanceResult }>
) => {
  const grouped = items.reduce<Record<string, AgendaItem[]>>((acc, item) => {
    const key = `${item.agency} - ${item.meetingDate}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const subject = `Resumo de pautas relevantes (${items.length})`;

  const bodySections = Object.entries(grouped).map(([group, groupItems]) => {
    const [agency, date] = group.split(" - ");
    const header = `${agency} | ${formatDate(date)}`;
    const itemLines = groupItems
      .map((item) => {
        return `• ${item.title} (Processo ${item.processNumber})\n  Score: ${item.relevance.score}%\n  Ação sugerida: Monitorar e preparar posicionamento.\n  Link: ${item.sourceUrl}`;
      })
      .join("\n\n");
    return `${header}\n${itemLines}`;
  });

  const body = `Olá!\n\nSegue o resumo das pautas com maior relevância:\n\n${bodySections.join(
    "\n\n"
  )}\n\nFico à disposição para detalhar qualquer item.`;

  return { subject, body };
};
