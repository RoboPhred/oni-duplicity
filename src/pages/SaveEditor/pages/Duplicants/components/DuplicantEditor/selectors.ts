
import { createSelector } from "reselect";
import { createStructuredSelector } from "../../../../../../state/utils";

import { MinionIdentityBehavior } from "../../../../../../services/save-editor/behaviors";
import { makeGetBehaviorByName } from "../../../../../../services/save-editor/selectors";
import { makeGetDuplicantByID } from "../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    identityBehavior: MinionIdentityBehavior | null;
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    identityBehavior: makeGetBehaviorByName(makeGetDuplicantByID<Props>("duplicantID"), MinionIdentityBehavior)
});
export default mapStateToProps;
