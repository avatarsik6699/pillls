import React from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props extends React.ComponentPropsWithoutRef<typeof Switch> {}

const SortFilter = (props: React.PropsWithoutRef<Props>) => {
  return (
    <Label className="flex items-center gap-1">
      <Switch {...props} />
      Сначала дешёвые
    </Label>
  );
};

export default SortFilter;
