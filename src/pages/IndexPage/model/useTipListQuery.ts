import type { UseTipListTypes } from "@/shared/api/queries/tip/useTipList";
import { useTipList } from "@/shared/api/queries/tip/useTipList";

interface Params {
  variables: Partial<UseTipListTypes.Variables>;
}

export const useTipListQuery = (params: Params) => {
  return useTipList({
    variables: { q: params.variables.q! },
    enabled: guard(params.variables),
    select: tips => ({ list: tips, count: tips.length }),
  });
};

function guard(
  variables: Params["variables"]
): variables is UseTipListTypes.Variables {
  return typeof variables.q === "string" && variables.q.length >= 3;
}
