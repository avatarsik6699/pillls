import React from "react";

import { Badge } from "@/components/ui/badge";

interface Props {
  count: number;
  product: {
    name: string;
  };
}

const PositionsCountFindBySearch: React.FC<Props> = props => {
  return (
    <section className="flex pb-5 pl-5 pt-1">
      <span className="text-sm text-stone-500">
        Найдено <Badge variant="secondary">{props.count}</Badge> позиций по
        запросу{" "}
        <Badge className="text-sky-800" variant="secondary">
          {`«${props.product.name}»`}
        </Badge>
      </span>
    </section>
  );
};

export default PositionsCountFindBySearch;
