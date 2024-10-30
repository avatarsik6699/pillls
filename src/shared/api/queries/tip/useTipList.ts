import { createQuery } from "react-query-kit";

import type { Utils } from "@/shared/types";

import { api } from "../..";

export namespace UseTipListTypes {
  export type Variables = Utils.P<typeof api.tip.list>;
}

export const useTipList = createQuery({
  queryKey: ["tip-list"],
  fetcher: async (variables: UseTipListTypes.Variables) => {
    return api.tip.list(variables);
  },
});
