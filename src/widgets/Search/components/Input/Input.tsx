import React, { useCallback } from "react";

import { CommandInput } from "@/components/ui/command";

interface Props extends React.ComponentPropsWithoutRef<typeof CommandInput> {
  onClickEnter: (value: string) => void;
}

const Input: React.FC<Props> = ({ onClickEnter, ...props }) => {
  const onKeyDown = useCallback<NonNullable<Props["onKeyDown"]>>(
    event => {
      if (event.key === "Enter") {
        if (event.target instanceof HTMLInputElement) {
          onClickEnter(event.target.value);
        }
      }

      props.onKeyDown?.(event);
    },
    [onClickEnter, props]
  );

  return (
    <CommandInput
      {...props}
      onKeyDown={onKeyDown}
      placeholder="Введите название препарата (мин. 3 символа)"
    />
  );
};

export default Input;
