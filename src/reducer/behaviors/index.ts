import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import setAccessoryReducer from "./set-accessory";
import setElementDiseaseReducer from "./set-element-disease";
import setHealthStateReducer from "./set-health-state";
import setIdentityGenderReducer from "./set-identity-gender";
import setModifierAmountReducer from "./set-modifier-amount";

const reducers = [
  setAccessoryReducer,
  setElementDiseaseReducer,
  setHealthStateReducer,
  setIdentityGenderReducer,
  setModifierAmountReducer
];

export default reduceReducers<AppState, any>(...reducers);
