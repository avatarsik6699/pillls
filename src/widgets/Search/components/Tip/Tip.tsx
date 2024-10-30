import React from "react";

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof CommandItem> {}

const Tip = React.forwardRef<React.ElementRef<typeof CommandItem>, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <CommandItem
        ref={ref}
        {...props}
        className={cn(className, {
          "cursor-pointer border-2": !props.disabled,
        })}
      >
        {children}
      </CommandItem>
    );
  }
);

Tip.displayName = "Tip";
export default Tip;
export type { Props as TipProps };
