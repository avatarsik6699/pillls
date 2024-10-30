import "./index.css";

import _ from "lodash";
import React from "react";

import { Command } from "@/components/ui/command";
import type { Tip } from "@/shared/api/models";
import type { Utils } from "@/shared/types";

import Input from "./components/Input/Input";
import Hint from "./components/Tip/Tip";
import type { TipsListProps } from "./components/TipsList/TipsList";
import HintsList from "./components/TipsList/TipsList";
import type { useSearchState } from "./hooks/useSearchState";

type TipDto = Tip;

interface Props {
  state: Utils.R<typeof useSearchState>;
  tips: {
    meta: Pick<TipsListProps, "status">;
    list: TipDto[];
    count: number;
  };
}

const Search: React.FC<Props> = ({ state, tips, ...props }) => {
  return (
    <Command
      shouldFilter={false}
      className="relative top-0 z-auto overflow-visible shadow-md md:min-w-[450px]"
    >
      <Input
        onClickEnter={_.noop}
        value={state.inputValue}
        onValueChange={state.onChangeInputValue}
      />

      <HintsList
        count={tips.count}
        status={tips.meta.status}
        isOpen={state.isOpen}
      >
        {tips.list.map(item => (
          <Hint onSelect={state.onSelectTip} key={item.id}>
            {item.name}
          </Hint>
        ))}
      </HintsList>
    </Command>
  );
};

export default Search;
