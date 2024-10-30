import React, { useMemo } from "react";
import type { QueryHookResult } from "react-query-kit";

import {
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";

interface Props extends React.ComponentPropsWithoutRef<typeof CommandList> {
  count: number | undefined;
  status: QueryHookResult<unknown, unknown>["status"];
  isOpen: boolean;
}

const TipsList: React.FC<Props> = React.forwardRef<
  React.ElementRef<typeof CommandList>,
  Props
>(({ children, count = 0, status, isOpen, ...props }, ref) => {
  const Content = useMemo(() => {
    if (!isOpen) return null;

    if (status !== "success") {
      return <CommandLoading>Загрузка...</CommandLoading>;
    }

    if (status === "success") {
      if (count === 0) return <CommandEmpty>Ничего не найдено</CommandEmpty>;
      if (count > 0)
        return (
          <CommandGroup heading="Возможно вы имели ввиду">
            <div className="flex flex-wrap gap-1 pb-1 pl-2">{children}</div>
          </CommandGroup>
        );
    }

    return null;
  }, [children, count, isOpen, status]);

  return (
    <div className="absolute left-0 right-0 top-full z-50 rounded-b-2xl bg-inherit shadow-xl">
      <CommandList ref={ref} {...props} className="border-y-[1px]">
        {Content}
      </CommandList>
    </div>
  );
});

TipsList.displayName = "TipsList";

export type { Props as TipsListProps };
export default TipsList;
