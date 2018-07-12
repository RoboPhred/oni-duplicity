import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import setAccessoryReducer from "./set-accessory";
import setElementDiseaseReducer from "./set-element-disease";

const reducers = [setAccessoryReducer, setElementDiseaseReducer];

export default reduceReducers<AppState, any>(...reducers);
