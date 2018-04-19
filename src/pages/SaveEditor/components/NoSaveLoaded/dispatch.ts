
import { bindActionCreators } from "redux";

import { Dispatch } from "@/state/utils";

import { loadSavefile } from "@/services/save-editor/savefile/actions";

export interface DispatchProps {
    loadSavefile: typeof loadSavefile;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        loadSavefile
    }, dispatch);
}