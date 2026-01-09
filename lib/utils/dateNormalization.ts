import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export const normalizeBrazilianDate = (value: string) => {
  const formats = ["dd/MM/yyyy", "d/M/yyyy", "dd 'de' MMMM 'de' yyyy"];
  for (const format of formats) {
    const parsed = parse(value, format, new Date(), { locale: ptBR });
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }
  return value;
};
