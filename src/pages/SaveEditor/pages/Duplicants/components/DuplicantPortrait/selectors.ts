
import { createSelector } from "reselect";
import { MinionIdentityBehavior, MinionResumeBehavior } from "oni-save-parser";

import { createStructuredSelector } from "@/state/utils";

import { makeGetBehaviorByName } from "@/services/save-editor/selectors";
import { makeGetDuplicantByID } from "@/services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    identityBehavior: MinionIdentityBehavior | null;
    resumeBehavior: MinionResumeBehavior | null;
}

const mapStateToProps = () => {
    const duplicant = makeGetDuplicantByID<Props>("duplicantID");
    return createStructuredSelector<Props, StateProps>({
        identityBehavior: makeGetBehaviorByName(duplicant, MinionIdentityBehavior),
        resumeBehavior: makeGetBehaviorByName(duplicant, MinionResumeBehavior)
    })
};
export default mapStateToProps;
