import { reduceReducers } from "@/store/utils";

import offlineProbeCompletedReducer from "./offline-probe-completed";
import offlineSwitchCompletedReducer from "./offline-switch-completed";

export default reduceReducers(
  offlineProbeCompletedReducer,
  offlineSwitchCompletedReducer
);
