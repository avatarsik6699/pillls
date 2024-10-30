import { createQuery } from "react-query-kit";

import type { Utils } from "@/shared/types";

import { api } from "../..";

export namespace UseProductListTypes {
  export type Response = Awaited<Utils.R<typeof api.product.list>>;
  export type Variables = Utils.P<typeof api.product.list>;
}

export const useProductList = createQuery({
  queryKey: ["product-list"],
  fetcher: async (variables: UseProductListTypes.Variables) => {
    const result = await api.product.list(variables);

    return result;
  },
});
