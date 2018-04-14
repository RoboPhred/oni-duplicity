
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import {
    setDuplicantEyes,
    setDuplicantHair,
    setDuplicantHead,
    setDuplicantMouth,
    setDuplicantBody
} from "../../../../../../../../services/save-editor/duplicants/appearance/actions";

export interface DispatchProps {
    setEyes: typeof setDuplicantEyes;
    setHair: typeof setDuplicantHair;
    setHead: typeof setDuplicantHead;
    setMouth: typeof setDuplicantMouth;
    setBody: typeof setDuplicantBody;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setEyes: setDuplicantEyes,
        setHair: setDuplicantHair,
        setHead: setDuplicantHead,
        setMouth: setDuplicantMouth,
        setBody: setDuplicantBody,
    }, dispatch);
}
