export interface OfflineModeState {
  supported: boolean;
  enabled: boolean;
}

const _defaultState: OfflineModeState = {
  supported: false,
  enabled: false
};

export const defaultOfflineModeState = Object.freeze(_defaultState);
