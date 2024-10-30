import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

const Filters: React.FC<Props> = ({ children }) => {
  return (
    <ScrollArea className="whitespace-nowrap">
      <section className="flex min-h-[60px] w-max space-x-4 p-5">
        {children}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Filters;
