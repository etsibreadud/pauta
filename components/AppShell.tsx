import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-6 pb-16 pt-8">
      <Sidebar />
      <main className="flex-1">
        <div className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-soft lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};
