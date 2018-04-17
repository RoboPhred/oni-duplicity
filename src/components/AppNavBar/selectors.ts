
import { createStructuredSelector } from "../../state/utils";

import {
    saveFileName,
    isSaveEnabled
} from "../../services/save-editor/savefile/selectors";


export interface StateProps {
    saveFileName: string | null;
    isSaveEnabled: boolean;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    saveFileName,
    isSaveEnabled
});
export default mapStateToProps;
