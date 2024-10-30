import { type ComponentPropsWithoutRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BaseSelectProps = Pick<
  ComponentPropsWithoutRef<typeof Select>,
  "onValueChange" | "defaultValue" | "value"
>;

interface Item {
  value: string;
  text: string;
}

interface Props extends BaseSelectProps {
  items: Item[] | undefined;
}

const FilterByProductTradeNames = ({ items = [], ...props }: Props) => {
  return (
    <Select {...props}>
      <SelectTrigger
        className={`
          flex h-full
          w-max
          items-center justify-between
          gap-4 border-none bg-gray-100 focus:ring-8 focus:ring-transparent`}
      >
        <SelectValue aria-label={props.value}>
          <span>Торг. название: </span>
          {items.find(item => item.value === props.value)?.text || "---"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item, idx) => (
          <SelectItem key={idx} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterByProductTradeNames;
