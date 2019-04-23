import reduceReducers from "reduce-reducers";

import changeGeyserTypeReducer from "./change-geyser-type";
import cloneDuplicantReducer from "./clone-duplicant";
import copyBehaviorsReducer from "./copy-behaviors";
import deleteLooseMaterial from "./delete-looe-material";
import importWarnChecksumReducer from "./import-warn-checksum";
import loadExampleSaveReducer from "./load-example";
import mergeBehaviorsReducer from "./merge-behaviors";
import modifyBehaviorPathReducer from "./modify-behavior-path";
import modifyBehaviorReducer from "./modify-behavior";
import modifyDifficultyReducer from "./modify-difficulty";
import modifyRawReducer from "./modify-raw";
import parseProgressReducer from "./parse-progress";
import pasteBehaviorsReducer from "./paste-behaviors";
import receiveOniSaveReducer from "./receive-onisave";

export default reduceReducers(
  changeGeyserTypeReducer,
  cloneDuplicantReducer,
  copyBehaviorsReducer,
  deleteLooseMaterial,
  importWarnChecksumReducer,
  loadExampleSaveReducer,
  mergeBehaviorsReducer,
  modifyBehaviorPathReducer,
  modifyBehaviorReducer,
  modifyDifficultyReducer,
  modifyRawReducer,
  parseProgressReducer,
  pasteBehaviorsReducer,
  receiveOniSaveReducer
);
