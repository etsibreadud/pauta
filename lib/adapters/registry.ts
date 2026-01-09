import type { AgencySourceAdapter } from "@/lib/adapters/types";
import { demoAdapter } from "@/lib/adapters/demoAdapter";

export const adapters: AgencySourceAdapter[] = [demoAdapter];

export const getAdapter = (id: string) =>
  adapters.find((adapter) => adapter.id === id) ?? demoAdapter;
