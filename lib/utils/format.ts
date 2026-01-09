import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (value: string) => {
  try {
    return format(parseISO(value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return value;
  }
};

export const formatScore = (score: number) => `${score.toFixed(0)}%`;
