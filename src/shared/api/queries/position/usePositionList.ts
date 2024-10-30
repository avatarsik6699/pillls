import { createQuery } from "react-query-kit";

import type { Utils } from "@/shared/types";

import { api } from "../..";

export namespace UsePositionListTypes {
  export type Variables = Utils.P<typeof api.position.list>;
}

export const usePositionList = createQuery({
  queryKey: ["position-list"],
  fetcher: async (variables: UsePositionListTypes.Variables) => {
    return api.position.list(variables);
  },
});
