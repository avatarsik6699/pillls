import "./index.css";

import _ from "lodash";
import React, { useCallback, useMemo } from "react";

import { Command } from "@/components/ui/command";

import type { HintProps } from "./components/Hint/Hint";
import Hint from "./components/Hint/Hint";
import HintsList from "./components/HintsList/List";
import Input from "./components/Input/Input";

interface Props {
  hints: Array<{ label: string } & Pick<NonNullable<HintProps>, "value">>;
}

const Search: React.FC<Props> = ({ hints }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const onChangeLoadingBaseOnInputValue = useMemo(
    () =>
      _.debounce((inputValue: string) => {
        setLoading(false);
      }, 500),
    []
  );

  const onChangeInputValue = useCallback(
    (value: string) => {
      setInputValue(value);
      setOpen(Boolean(value));
      setLoading(Boolean(value));
      onChangeLoadingBaseOnInputValue(value);
    },
    [onChangeLoadingBaseOnInputValue]
  );

  const onSelectHint = useCallback((value: string) => {
    setInputValue(value);
    setOpen(false);
  }, []);

  const filteredCommands = useMemo(() => {
    return hints.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [hints, inputValue]);
  console.log(filteredCommands);
  return (
    <Command
      shouldFilter={false}
      className="rounded-md shadow-md md:min-w-[450px]"
    >
      <Input
        onClickEnter={_.noop}
        value={inputValue}
        onValueChange={onChangeInputValue}
      />

      <HintsList
        count={filteredCommands.length}
        isLoading={isLoading}
        isOpen={isOpen}
      >
        {filteredCommands.map(({ label, ...item }, idx) => (
          <Hint {...item} onSelect={onSelectHint} key={idx}>
            {label}
          </Hint>
        ))}
      </HintsList>
    </Command>
  );
};

export default Search;
