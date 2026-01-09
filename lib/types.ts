export type AgendaItem = {
  id: string;
  agency: string;
  meetingDate: string;
  title: string;
  processNumber: string;
  shortDescription: string;
  sourceUrl: string;
  attachments: string[];
  rawText: string;
  themeTags?: string[];
};

export type InterestProfile = {
  includeKeywords: string[];
  excludeKeywords: string[];
  priorityThemes: string[];
};

export type RelevanceResult = {
  score: number;
  explanation: string;
  matched: string[];
};

export type UploadAnalysis = {
  execSummary: string;
  legalInsights: string[];
  updateEmailSubject: string;
  updateEmailBody: string;
  keyExcerpts: { text: string; page?: number }[];
};
