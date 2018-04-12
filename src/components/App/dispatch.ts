
import { bindActionCreators } from "redux";

import { Dispatch } from "../../state/utils";

import { saveSavefile } from "../../services/save-editor/savefile/actions";

export interface DispatchProps {
    saveSavefile: typeof saveSavefile;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        saveSavefile
    }, dispatch);
}