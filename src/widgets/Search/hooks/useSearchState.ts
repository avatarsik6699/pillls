import _ from "lodash";
import { useCallback, useMemo, useState } from "react";

const DEBOUNT_TIME = 1500;

interface Params {
  onSelect?: (value: string) => void;
  onChangeInputValue?: (value: string) => void;
}

export const useSearchState = (params: Params = {}) => {
  const [isOpen, setOpen] = useState(false);
  const [debInputValue, setDebInputValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onDebSetInputValue = useMemo(
    () =>
      _.debounce(text => {
        setDebInputValue(text);
      }, DEBOUNT_TIME),
    []
  );

  const onChangeInputValue = useCallback(
    (value: string) => {
      onDebSetInputValue(value);

      setInputValue(value);
      setOpen(!!value);

      params.onChangeInputValue?.(value);
    },
    [onDebSetInputValue, params]
  );

  const onSelectTip = useCallback(
    (value: string) => {
      setOpen(false);

      params.onSelect?.(value);

      setInputValue(value);
      setDebInputValue(value);
    },
    [params]
  );

  return {
    isOpen,
    onChangeInputValue,
    debInputValue,
    inputValue,
    onSelectTip,
  };
};
