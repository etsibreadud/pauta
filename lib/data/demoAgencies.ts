export type Agency = {
  id: string;
  name: string;
  status?: "demo" | "live";
  source?: string;
};

export const demoAgencies: Agency[] = [
  {
    id: "anatel",
    name: "ANATEL",
    status: "demo",
    source: "Dados demonstrativos"
  },
  {
    id: "aneel",
    name: "ANEEL",
    status: "demo",
    source: "Dados demonstrativos"
  },
  {
    id: "anp",
    name: "ANP",
    status: "demo",
    source: "Dados demonstrativos"
  },
  {
    id: "anvisa",
    name: "ANVISA",
    status: "demo",
    source: "Dados demonstrativos"
  }
];
