
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../state/utils";

import { renameDuplicant } from "../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    renameDuplicant: typeof renameDuplicant;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        renameDuplicant
    }, dispatch);
}