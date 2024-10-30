import _ from "lodash";
import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useQueryParams = <
  QueryParams extends Record<string, string | number | boolean | undefined>,
>() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries()) as QueryParams;
  }, [searchParams]);

  const setQueryParams = useCallback(
    (newParams: QueryParams) => {
      const updatedParams = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined) {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, String(value));
        }
      });

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  const pushQueryParams = useCallback(
    (newParams: QueryParams | QueryParams[]) => {
      const updatedParams = new URLSearchParams(searchParams);

      const paramsArray = Array.isArray(newParams) ? newParams : [newParams];

      paramsArray.forEach(params => {
        Object.entries(params).forEach(([key, value]) => {
          if (value === undefined) {
            updatedParams.delete(key);
          } else {
            updatedParams.set(key, String(value));
          }
        });
      });

      navigate({ search: updatedParams.toString() }, { replace: true });
    },
    [searchParams, navigate]
  );

  const getQueryParam = useCallback(
    (key: keyof QueryParams) => {
      if (_.isString(key)) return searchParams.get(key) || undefined;
    },
    [searchParams]
  );

  const removeQueryParam = useCallback(
    (keys: keyof QueryParams | Array<keyof QueryParams>) => {
      const updatedParams = new URLSearchParams(searchParams);

      const keysArray = Array.isArray(keys) ? keys : [keys];

      keysArray.forEach(key => {
        if (_.isString(key)) {
          updatedParams.delete(key);
        }
      });

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  const hasQueryParam = useCallback(
    (keys: keyof QueryParams | Array<keyof QueryParams>) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];

      return keysArray.every(key => {
        if (_.isString(key)) {
          return searchParams.has(key);
        }
        return false;
      });
    },
    [searchParams]
  );

  return {
    _params: currentParams,
    get: getQueryParam,
    remove: removeQueryParam,
    add: pushQueryParams,
    set: setQueryParams,
    has: hasQueryParam,
  };
};
