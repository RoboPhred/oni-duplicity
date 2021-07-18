import { reduceReducers } from "@/store/utils";

import changeGeyserParameter from "./change-geyser-parameter";
import changeGeyserTypeReducer from "./change-geyser-type";
import cloneDuplicantReducer from "./clone-duplicant";
import copyBehaviorsReducer from "./copy-behaviors";
import deleteLooseMaterial from "./delete-looe-material";
import importWarnChecksumReducer from "./import-warn-checksum";
import loadExampleSaveReducer from "./load-example";
import loadOniSaveReducer from "./load-onisave";
import mergeBehaviorsReducer from "./merge-behaviors";
import modifyBehaviorPathReducer from "./modify-behavior-path";
import modifyBehaviorReducer from "./modify-behavior";
import modifyDifficultyReducer from "./modify-difficulty";
import modifyPlanetReducer from "./modify-planet";
import modifyRawReducer from "./modify-raw";
import parseProgressReducer from "./parse-progress";
import pasteBehaviorsReducer from "./paste-behaviors";
import receiveOniSaveReducer from "./receive-onisave";

export default reduceReducers(
  changeGeyserParameter,
  changeGeyserTypeReducer,
  cloneDuplicantReducer,
  copyBehaviorsReducer,
  deleteLooseMaterial,
  importWarnChecksumReducer,
  loadExampleSaveReducer,
  loadOniSaveReducer,
  mergeBehaviorsReducer,
  modifyBehaviorPathReducer,
  modifyBehaviorReducer,
  modifyDifficultyReducer,
  modifyPlanetReducer,
  modifyRawReducer,
  parseProgressReducer,
  pasteBehaviorsReducer,
  receiveOniSaveReducer
);
