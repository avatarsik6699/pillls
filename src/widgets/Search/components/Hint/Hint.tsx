import React from "react";

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof CommandItem> {}

const Hint = React.forwardRef<React.ElementRef<typeof CommandItem>, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <CommandItem
        ref={ref}
        {...props}
        className={cn(className, { "cursor-pointer": !props.disabled })}
      >
        {children}
      </CommandItem>
    );
  }
);

Hint.displayName = "Hint";
export default Hint;
export type { Props as HintProps };
