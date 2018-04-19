
import { createStructuredSelector } from "@/state/utils";

import {
    isSaveChosen,
    isSaveLoading,
    loadError
} from "@/services/save-editor/savefile/selectors";


export interface StateProps {
    isSaveChosen: boolean;
    isSaveLoading: boolean;
    loadError: Error | null;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    isSaveChosen,
    isSaveLoading,
    loadError
});
export default mapStateToProps;
