import { AppState, createStructuredSelector } from "@/state";

import {
  loadState as loadI18nState,
  persistState as persistI18nState
} from "@/services/i18n/persist";

export function loadPersistedState(state: AppState): AppState {
  const persistedState = getStoredState();

  return {
    ...state,
    services: {
      ...state.services,
      i18n: loadI18nState(state.services.i18n, persistedState.i18n || {})
    }
  };
}

// Store the last persisted state to avoid setting the item
//  when no data has changed.
let lastPersistedState: any = null;

const buildPersistedState = createStructuredSelector({
  i18n: persistI18nState
});

export function savePersistedState(state: AppState) {
  const persistedState = buildPersistedState(state);
  if (lastPersistedState === persistedState) {
    return;
  }
  setStoredState(persistedState);
  lastPersistedState = persistedState;
}

const PERSISTED_STATE_KEY = "persisted-state";

function getStoredState(): any {
  const stateJson = localStorage.getItem(PERSISTED_STATE_KEY);
  if (!stateJson) {
    return {};
  }

  try {
    return JSON.parse(stateJson);
  } catch {
    return {};
  }
}

function setStoredState(state: any) {
  localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state));
}
