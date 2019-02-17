import reduceReducers from "reduce-reducers";

import parseProgressReducer from "./parse-progress";
import receiveOniSaveReducer from "./receive-onisave";

export default reduceReducers(parseProgressReducer, receiveOniSaveReducer);
