import React from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";

interface Props extends React.ComponentPropsWithoutRef<typeof CommandList> {
  isOpen: boolean;
  count: number;
  isLoading?: boolean;
}

const HintsList: React.FC<Props> = React.forwardRef<
  React.ElementRef<typeof CommandList>,
  Props
>(
  (
    { children, isOpen = false, isLoading = false, count = 0, ...props },
    ref
  ) => {
    return (
      <CommandList ref={ref} {...props}>
        {isLoading && <CommandLoading>Загрузка...</CommandLoading>}
        {isOpen && !isLoading && count === 0 && (
          <CommandEmpty>Ничего не найдено...</CommandEmpty>
        )}
        {isOpen && !isLoading && count > 0 && (
          <>
            <CommandGroup heading="Возможно вы имели ввиду...">
              <div className="flex flex-wrap">{children}</div>
            </CommandGroup>
          </>
        )}
      </CommandList>
    );
  }
);

HintsList.displayName = "HintsList";
export default HintsList;
