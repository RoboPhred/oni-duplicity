import reduceReducers from "reduce-reducers";

import cloneDuplicantReducer from "./clone-duplicant";
import copyBehaviorsReducer from "./copy-behaviors";
import importWarnChecksumReducer from "./import-warn-checksum";
import mergeBehaviorsReducer from "./merge-behaviors";
import modifyBehaviorReducer from "./modify-behavior";
import parseProgressReducer from "./parse-progress";
import pasteBehaviorsReducer from "./paste-behaviors";
import receiveOniSaveReducer from "./receive-onisave";

export default reduceReducers(
  cloneDuplicantReducer,
  copyBehaviorsReducer,
  importWarnChecksumReducer,
  mergeBehaviorsReducer,
  modifyBehaviorReducer,
  parseProgressReducer,
  pasteBehaviorsReducer,
  receiveOniSaveReducer
);
