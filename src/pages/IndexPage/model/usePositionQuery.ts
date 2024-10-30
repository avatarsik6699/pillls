import _ from "lodash";

import type { UsePositionListTypes } from "@/shared/api/queries/position/usePositionList";
import { usePositionList } from "@/shared/api/queries/position/usePositionList";

interface Params {
  variables: Partial<UsePositionListTypes.Variables>;
}

export const usePositionQuery = (params: Params) => {
  return usePositionList({
    enabled: guard(params.variables),
    variables: {
      ...params.variables,
      product: {
        id: params.variables.product!.id,
        name: params.variables.product!.name,
      },
    },
  });
};

function guard(
  variables: Params["variables"]
): variables is UsePositionListTypes.Variables {
  if (_.isNil(variables.product)) {
    return false;
  }

  return _.isString(variables.product.id) && _.isString(variables.product.name);
}
