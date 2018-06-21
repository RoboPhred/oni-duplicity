import reduceReducers from "reduce-reducers";

import dismissErrorReducer from "./dismiss-error";
import receiveOniSaveReducer from "./receive-onisave";

const reducers = [dismissErrorReducer, receiveOniSaveReducer];
// Just one reducer right now; forward it out.
// @ts-ignore: We need to tell the reducers thay may receive a non-matching item.
//  I have not been able to craft a type that describes this though.
export default reduceReducers(...reducers);
