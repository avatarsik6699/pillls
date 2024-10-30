import { useCallback, useState } from "react";

export const usePaginationState = () => {
  const [page, setPage] = useState<number>(1);

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  return {
    page,
    onChangePage,
  };
};
