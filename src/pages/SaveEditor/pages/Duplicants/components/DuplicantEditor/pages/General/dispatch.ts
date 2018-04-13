
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import {
    setDuplicantHealthState,
    setDuplicantScale
} from "../../../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    setHealthState: typeof setDuplicantHealthState;
    setScale: typeof setDuplicantScale;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setHealthState: setDuplicantHealthState,
        setScale: setDuplicantScale
    }, dispatch);
}
