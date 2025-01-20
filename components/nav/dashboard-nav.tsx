"use client";

import { BottomNav } from "@/components/nav/bottom-nav";

export function DashboardNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 justify-center w-full">
      <main
        className="flex-1 w-full max-w-screen-md mx-auto flex flex-col space-y-4 px-4 pb-20 pt-6"
        style={{ zIndex: 0 }}
      >
        {children}
      </main>
      <div className="flex-shrink-0" style={{ zIndex: 1 }}>
      </div>
      <BottomNav />
    </div>
  );
}
