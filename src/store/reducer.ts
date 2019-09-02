import { combineReducers, AnyAction } from "redux";

import { connectRouter } from "connected-react-router";

import i18nReducer from "@/services/i18n/reducer";
import oniSaveReducer from "@/services/oni-save/reducer";
import { OniSaveState, defaultOniSaveState } from "@/services/oni-save/state";
import { AppState, defaultAppState } from "@/state";

import history from "@/history";
const routerReducer = connectRouter(history);

const servicesReducer = combineReducers({
  i18n: i18nReducer,
  // FIXME: Not sure why I need to do this, perhaps some reducer in the reduceReducered oniSaveReducer does not specify a default
  oniSave: (state: OniSaveState = defaultOniSaveState, action: AnyAction) =>
    oniSaveReducer(state, action)
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    router: routerReducer(state.router, action as any),
    services: servicesReducer(state.services, action)
  };
}
