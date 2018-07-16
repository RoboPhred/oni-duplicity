import { createStructuredSelector, createSelector } from "reselect";

import { MinionResumeBehavior, MinionRoleGroup } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorPropertySelector } from "@/selectors/behaviors/utils";

const aptitudesSelector = getCurrentGameObjectBehaviorPropertySelector<
  MinionResumeBehavior,
  MinionResumeBehavior["templateData"]["AptitudeByRoleGroup"]
>(MinionResumeBehavior, ["templateData", "AptitudeByRoleGroup"]);

export interface AptitudeData {
  roleId: string;
  roleHash: number;
  aptitude: number;
  index: number;
}
const aptitudeDataSelector = createSelector(aptitudesSelector, aptitudes => {
  if (!aptitudes) {
    return null;
  }

  const data: AptitudeData[] = [];

  for (let i = 0; i < aptitudes.length; i++) {
    const [hstr, aptitude] = aptitudes[i];
    const roleId = MinionRoleGroup[hstr.hash];
    if (!roleId) {
      continue;
    }
    data.push({
      roleId,
      roleHash: hstr.hash,
      aptitude,
      index: i
    });
  }

  return data;
});

const structuredSelector = {
  aptitudes: aptitudeDataSelector
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
