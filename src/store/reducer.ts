import { combineReducers, AnyAction } from "redux";

import { connectRouter } from "connected-react-router";

import i18nReducer from "@/services/i18n/reducer";
import oniSaveReducer from "@/services/oni-save/reducer";
import { AppState, defaultAppState } from "@/state";

import history from "@/history";
const routerReducer = connectRouter(history);

const servicesReducer = combineReducers({
  i18n: i18nReducer,
  oniSave: oniSaveReducer
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
