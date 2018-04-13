
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import { setDuplicantSkillLevel, setDuplicantSkillExperience } from "../../../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    setLevel: typeof setDuplicantSkillLevel;
    setExperience: typeof setDuplicantSkillExperience;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setLevel: setDuplicantSkillLevel,
        setExperience: setDuplicantSkillExperience
    }, dispatch);
}