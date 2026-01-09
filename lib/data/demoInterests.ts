import type { InterestProfile } from "@/lib/types";

export const demoInterestProfile: InterestProfile = {
  includeKeywords: [
    "sanções",
    "tarifas",
    "espectro",
    "concessão",
    "consulta pública",
    "reajuste"
  ],
  excludeKeywords: ["painel", "evento"],
  priorityThemes: ["sanções", "espectro", "tarifas"]
};
