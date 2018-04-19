
import { createStructuredSelector } from "../../state/utils";

import {
    saveFileName,
    isSaveSaving
} from "../../services/save-editor/savefile/selectors";


export interface StateProps {
    saveFileName: string | null;
    isSaveSaving: boolean;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    saveFileName,
    isSaveSaving
});
export default mapStateToProps;

// Was pretty sure this used to work, once upon a time.
//export type StateProps = typeof mapStateToProps;
