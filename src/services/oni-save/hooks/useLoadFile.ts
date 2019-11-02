import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingStatus } from "../state";
import { loadOniSave } from "../actions/load-onisave";
import { loadingStatusSelector } from "../selectors/loading-status";

export interface UseLoadFile {
  disabled: boolean;
  onLoadSave(file: File): void;
}

function isBusy(status: LoadingStatus) {
  switch (status) {
    case LoadingStatus.Loading:
    case LoadingStatus.Saving:
      return true;
  }
  return false;
}

export default function useLoadFile(): UseLoadFile {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(loadingStatusSelector);
  const onLoadSave = React.useCallback((file: File) => {
    dispatch(loadOniSave(file));
  }, [dispatch]);
  return {
    disabled: isBusy(loadingStatus),
    onLoadSave
  };
}
