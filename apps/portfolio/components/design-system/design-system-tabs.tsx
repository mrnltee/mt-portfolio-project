"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DesignSystemTabs({
  portfolioSystem,
  mtDesign,
}: {
  portfolioSystem: ReactNode;
  mtDesign: ReactNode;
}) {
  return (
    <Tabs defaultValue="portfolio" className="w-full">
      <div className="border-b border-border-default bg-background-canvas">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TabsList aria-label="Design system versions" className="w-full justify-start gap-6 border-0">
            <TabsTrigger value="portfolio" className="px-0 py-4 sm:py-5">
              <span className="flex items-baseline gap-2">
                Portfolio UI
                <span className="text-caption font-normal text-text-tertiary">v1</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="mt-design" className="px-0 py-4 sm:py-5">
              <span className="flex items-baseline gap-2">
                MT Design
                <span className="text-caption font-normal text-text-tertiary">v2</span>
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="portfolio" className="mt-0 outline-none">
        {portfolioSystem}
      </TabsContent>
      <TabsContent value="mt-design" className="mt-0 outline-none">
        {mtDesign}
      </TabsContent>
    </Tabs>
  );
}
