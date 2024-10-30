import { createQuery } from "react-query-kit";

import { api } from "../..";

export namespace UseOnePositionTypes {
  export type Variables = {
    id: Parameters<typeof api.position.one>[0];
    params: Parameters<typeof api.position.one>[1];
  };
}

export const useOnePosition = createQuery({
  queryKey: ["position-one"],
  fetcher: async (variables: UseOnePositionTypes.Variables) => {
    return api.position.one(variables.id, variables.params);
  },
});
