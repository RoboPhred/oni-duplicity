
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import { setDuplicantTraits } from "../../../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    setTraits: typeof setDuplicantTraits
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setTraits: setDuplicantTraits
    }, dispatch);
}