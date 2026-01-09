import { NextResponse } from "next/server";
import { adapters } from "@/lib/adapters/registry";

export async function POST() {
  const results = await Promise.all(
    adapters.map(async (adapter) => {
      try {
        const payload = await adapter.fetchAgenda();
        return {
          adapter: adapter.id,
          status: payload.status,
          itemCount: payload.items.length
        };
      } catch (error) {
        return {
          adapter: adapter.id,
          status: "error",
          itemCount: 0,
          error: error instanceof Error ? error.message : "Erro desconhecido"
        };
      }
    })
  );

  return NextResponse.json({ results });
}
