import type { AgendaItem, InterestProfile, RelevanceResult } from "@/lib/types";

const normalize = (value: string) => value.toLowerCase();

const containsAny = (haystack: string, keywords: string[]) => {
  const normalized = normalize(haystack);
  return keywords.filter((keyword) => normalized.includes(normalize(keyword)));
};

export const scoreAgendaItem = (
  item: AgendaItem,
  profile: InterestProfile
): RelevanceResult => {
  const corpus = [
    item.title,
    item.shortDescription,
    item.rawText,
    item.processNumber,
    item.themeTags?.join(" ") ?? ""
  ].join(" ");

  const includeMatches = containsAny(corpus, profile.includeKeywords);
  const excludeMatches = containsAny(corpus, profile.excludeKeywords);
  const priorityMatches = containsAny(corpus, profile.priorityThemes);

  const baseScore = includeMatches.length * 15 + priorityMatches.length * 20;
  const penalty = excludeMatches.length * 25;
  const themeBonus = item.themeTags?.some((theme) =>
    profile.priorityThemes.some((priority) =>
      normalize(theme).includes(normalize(priority))
    )
  )
    ? 10
    : 0;

  const score = Math.max(0, Math.min(100, baseScore + themeBonus - penalty));

  const explanationParts = [
    includeMatches.length
      ? `Encontrou ${includeMatches.length} palavra(s) de interesse.`
      : "Sem palavras-chave diretas.",
    priorityMatches.length
      ? `Tema prioritário: ${priorityMatches.join(", ")}.`
      : "Sem tema prioritário explícito.",
    excludeMatches.length
      ? `Palavras negativas detectadas: ${excludeMatches.join(", ")}.`
      : "Sem palavras negativas."
  ];

  return {
    score,
    explanation: explanationParts.join(" "),
    matched: [...new Set([...includeMatches, ...priorityMatches])]
  };
};
