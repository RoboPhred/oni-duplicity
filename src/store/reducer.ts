import reduceReducers from "reduce-reducers";
import { combineReducers, AnyAction } from "redux";

import i18nReducer from "@/services/i18n/reducer";
import oniSaveReducer from "@/services/oni-save/reducer";
import { AppState, defaultAppState } from "@/state";

const servicesReducer = combineReducers({
  i18n: i18nReducer,
  oniSave: oniSaveReducer
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action)
  };
}
