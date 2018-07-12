import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import setGameObjectScaleReducer from "./set-scale";

const reducers = [setGameObjectScaleReducer];

export default reduceReducers<AppState, any>(...reducers);
