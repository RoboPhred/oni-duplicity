import { AppState } from "@/state";

import { OniSaveState } from "../state";

export interface OniSaveServiceSelector<T> {
  (state: AppState): T;
  local(state: OniSaveState): T;
}

export function createServiceSelector<T>(
  selector: (state: OniSaveState) => T
): OniSaveServiceSelector<T> {
  const rootSelector = (state: AppState) => selector(state.services.oniSave);
  rootSelector.local = selector;
  return rootSelector;
}
