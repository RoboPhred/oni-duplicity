
import { createStructuredSelector } from "../../../../../../../../../../state/utils";

import {
    makeGetDuplicantByID,
} from "../../../../../../../../../../services/save-editor/duplicants/selectors";
import {
    JobStatus,
    makeGetDuplicantCurrentRole,
    makeGetDuplicantTargetRole,
    makeGetDuplicantRoleDetails
} from "../../../../../../../../../../services/save-editor/duplicants/resume/selectors";

import Props from "./props";
import { Vector3 } from "oni-save-parser/dts/interfaces";

export interface StateProps {
    currentRole: string | null;
    targetRole: string | null;
    roles: JobStatus[];
}

const mapStateToProps = () => {
    const dupSelector = makeGetDuplicantByID("duplicantID");
    return createStructuredSelector<Props, StateProps>({
        currentRole: makeGetDuplicantCurrentRole(dupSelector),
        targetRole: makeGetDuplicantTargetRole(dupSelector),
        roles: makeGetDuplicantRoleDetails(dupSelector),
    });
}
export default mapStateToProps;
