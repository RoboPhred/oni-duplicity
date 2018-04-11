
import { createStructuredSelector } from "../../state/utils";

import {
    saveFileName,
    isSaveChosen,
    isSaveLoading,
    isSaveEnabled,
    loadError
} from "../../services/save-editor/selectors";


export interface StateProps {
    saveFileName: string | null;
    isSaveChosen: boolean;
    isSaveLoading: boolean
    isSaveEnabled: boolean;
    loadError: Error | null;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    saveFileName,
    isSaveChosen,
    isSaveLoading,
    isSaveEnabled,
    loadError
});
export default mapStateToProps;

// Was pretty sure this used to work, once upon a time.
//export type StateProps = typeof mapStateToProps;
