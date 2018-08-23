import { Reducer } from "redux";
import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import behaviorsReducer from "./behaviors";
import gameObjectReducer from "./game-object";

import dismissErrorReducer from "./dismiss-error";
import modifyOniSave from "./modify-onisave";
import parseProgressReducer from "./onisave-parse-progress";
import receiveOniSaveReducer from "./receive-onisave";
import selectPathReducer from "./select-path";
import setEditModeReducer from "./set-editmode";
import setLanguageReducer from "./set-language";

const reducers: Reducer<AppState, any>[] = [
  behaviorsReducer,
  gameObjectReducer,
  dismissErrorReducer,
  modifyOniSave,
  parseProgressReducer,
  receiveOniSaveReducer,
  selectPathReducer,
  setEditModeReducer,
  setLanguageReducer
];

export default reduceReducers<AppState, any>(...reducers);
