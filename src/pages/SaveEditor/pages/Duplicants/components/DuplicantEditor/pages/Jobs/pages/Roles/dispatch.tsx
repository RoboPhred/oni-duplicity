
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../../../state/utils";

import {
    setDuplicantCurrentRole,
    setDuplicantTargetRole,
    setDuplicantRoleMastery,
    setDuplicantRoleExperience
} from "../../../../../../../../../../services/save-editor/duplicants/resume/actions";

export interface DispatchProps {
    setCurrentRole: typeof setDuplicantCurrentRole,
    setTargetRole: typeof setDuplicantTargetRole,
    setMastery: typeof setDuplicantRoleMastery;
    setExperience: typeof setDuplicantRoleExperience;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setCurrentRole: setDuplicantCurrentRole,
        setTargetRole: setDuplicantTargetRole,
        setMastery: setDuplicantRoleMastery,
        setExperience: setDuplicantRoleExperience
    }, dispatch);
}
