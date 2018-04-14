
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import {
    setDuplicantGender,
    setDuplicantVoice,
    setDuplicantScale,
    setDuplicantHealthState,
} from "../../../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    setGender: typeof setDuplicantGender;
    setVoice: typeof setDuplicantVoice;
    setScale: typeof setDuplicantScale;
    setHealthState: typeof setDuplicantHealthState;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setGender: setDuplicantGender,
        setVoice: setDuplicantVoice,
        setScale: setDuplicantScale,
        setHealthState: setDuplicantHealthState
    }, dispatch);
}
