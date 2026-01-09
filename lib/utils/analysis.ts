import type { UploadAnalysis } from "@/lib/types";

export const buildFallbackAnalysis = (text: string): UploadAnalysis => {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const snippet = cleaned.slice(0, 1200);
  const summary = snippet
    ? `Resumo automático baseado no texto enviado: ${snippet}`
    : "Nenhum texto foi extraído do documento enviado.";

  const insights = [
    "Riscos: verificar obrigações regulatórias citadas e possíveis sanções.",
    "Oportunidades: mapear pontos de flexibilização ou incentivos mencionados.",
    "Prazos: identificar datas de consulta pública, adequação e vigência.",
    "Stakeholders: listar órgãos envolvidos e impactos sobre clientes e fornecedores.",
    "Impactos: avaliar efeitos financeiros, operacionais e reputacionais."
  ];

  const emailSubject = "Atualização sobre documento regulatório";
  const emailBody = `Olá!\n\nSegue uma atualização inicial com base no documento analisado.\n\nResumo executivo:\n${summary}\n\nSugestão: revisar pontos críticos e definir próximos passos de acompanhamento.\n\nFico à disposição.`;

  const excerpts = cleaned
    ? [
        {
          text: cleaned.split(" ").slice(0, 25).join(" ")
        }
      ]
    : [];

  return {
    execSummary: summary.slice(0, 1600),
    legalInsights: insights,
    updateEmailSubject: emailSubject,
    updateEmailBody: emailBody,
    keyExcerpts: excerpts
  };
};
