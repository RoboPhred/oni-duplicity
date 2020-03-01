import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setOfflineEnabled } from "../actions/set-offline-enabled";
import {
  isOfflineModeEnabled as isOfflineModeEnabledSelector,
  isOfflineModeSupported as isOfflineModeSupportedSelector
} from "../selectors";

export interface UseOfflineModeSettings {
  enabled: boolean;
  supported: boolean;
  setEnabled(enabled: boolean): void;
}
export default function useOfflineModeSettings(): UseOfflineModeSettings {
  const dispatch = useDispatch();
  const enabled = useSelector(isOfflineModeEnabledSelector);
  const supported = useSelector(isOfflineModeSupportedSelector);
  const setEnabled = React.useCallback(
    (enabled: boolean) => {
      dispatch(setOfflineEnabled(enabled));
    },
    [dispatch]
  );

  return {
    enabled,
    supported,
    setEnabled
  };
}
