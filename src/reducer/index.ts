import { Reducer } from "redux";
import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import behaviorsReducer from "./behaviors";
import gameObjectReducer from "./game-object";

import dismissErrorReducer from "./dismiss-error";
import modifyOniSave from "./modify-onisave";
import receiveOniSaveReducer from "./receive-onisave";
import selectPathReducer from "./select-path";
import setEditModeReducer from "./set-editmode";

const reducers: Reducer<AppState, any>[] = [
  behaviorsReducer,
  gameObjectReducer,
  dismissErrorReducer,
  modifyOniSave,
  receiveOniSaveReducer,
  selectPathReducer,
  setEditModeReducer
];

export default reduceReducers<AppState, any>(...reducers);
