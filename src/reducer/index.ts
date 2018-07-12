import reduceReducers from "reduce-reducers";

import dismissErrorReducer from "./dismiss-error";
import modifyOniSave from "./modify-onisave";
import receiveOniSaveReducer from "./receive-onisave";
import selectPathReducer from "./select-path";
import setAccessoryReducer from "./set-accessory";
import setEditModeReducer from "./set-editmode";

const reducers = [
  dismissErrorReducer,
  modifyOniSave,
  receiveOniSaveReducer,
  selectPathReducer,
  setAccessoryReducer,
  setEditModeReducer
];

// @ts-ignore: We need to tell the reducers thay may receive a non-matching item.
//  I have not been able to craft a type that describes this though.
export default reduceReducers(...reducers);
