import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import modifyCurrentObjectBehaviorArray from "./modify-currentobject-behavior-array";
import setAccessoryReducer from "./set-accessory";
import setCurrentObjectBehaviorValueReducer from "./set-currentobject-behavior-value";
import setElementDiseaseReducer from "./set-element-disease";
import setHealthStateReducer from "./set-health-state";
import setIdentityGenderReducer from "./set-identity-gender";
import setModifierAmountReducer from "./set-modifier-amount";
import setTraitReducer from "./set-traits-trait";

const reducers = [
  modifyCurrentObjectBehaviorArray,
  setAccessoryReducer,
  setCurrentObjectBehaviorValueReducer,
  setElementDiseaseReducer,
  setHealthStateReducer,
  setIdentityGenderReducer,
  setModifierAmountReducer,
  setTraitReducer
];

export default reduceReducers<AppState, any>(...reducers);
