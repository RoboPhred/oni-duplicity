
import { bindActionCreators } from "redux";

import { Dispatch } from "../../state/utils";

import { loadSavefile, saveSavefile } from "../../services/save-editor/savefile/actions";

export interface DispatchProps {
    loadSavefile: typeof loadSavefile;
    saveSavefile: typeof saveSavefile;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        loadSavefile,
        saveSavefile
    }, dispatch);
}
