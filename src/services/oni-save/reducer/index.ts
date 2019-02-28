import reduceReducers from "reduce-reducers";

import modifyOniSaveReducer from "./modify-behavior";
import parseProgressReducer from "./parse-progress";
import receiveOniSaveReducer from "./receive-onisave";

export default reduceReducers(
  modifyOniSaveReducer,
  parseProgressReducer,
  receiveOniSaveReducer
);
