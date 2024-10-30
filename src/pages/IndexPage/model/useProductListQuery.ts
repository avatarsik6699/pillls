import type { UseProductListTypes } from "@/shared/api/queries/product/useProductList";
import { useProductList } from "@/shared/api/queries/product/useProductList";

interface Params {
  variables: Partial<Omit<UseProductListTypes.Variables, "id">>;
}

export const useProductListQuery = (params: Params) => {
  return useProductList({
    variables: { name: params.variables.name! },
    enabled: guard(params.variables),
  });
};

function guard(
  variables: Params["variables"]
): variables is Omit<UseProductListTypes.Variables, "id"> {
  return Boolean(variables.name);
}
