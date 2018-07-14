import reduceReducers from "reduce-reducers";

import { AppState } from "@/state";

import setAccessoryReducer from "@/reducer/behaviors/set-accessory";
import setCurrentObjectBehaviorValueReducer from "@/reducer/behaviors/set-currentobject-behavior-value";
import setElementDiseaseReducer from "@/reducer/behaviors/set-element-disease";
import setHealthStateReducer from "@/reducer/behaviors/set-health-state";
import setIdentityGenderReducer from "@/reducer/behaviors/set-identity-gender";
import setModifierAmountReducer from "@/reducer/behaviors/set-modifier-amount";
import setTraitReducer from "@/reducer/behaviors/set-traits-trait";

const reducers = [
  setAccessoryReducer,
  setCurrentObjectBehaviorValueReducer,
  setElementDiseaseReducer,
  setHealthStateReducer,
  setIdentityGenderReducer,
  setModifierAmountReducer,
  setTraitReducer
];

export default reduceReducers<AppState, any>(...reducers);
