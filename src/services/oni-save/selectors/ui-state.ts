import { OniSaveState } from "../state";

import { createServiceSelector } from "./utils";

export const warnInputChecksumSelector = createServiceSelector(
  (state: OniSaveState) => state.warnInputChecksum
);
