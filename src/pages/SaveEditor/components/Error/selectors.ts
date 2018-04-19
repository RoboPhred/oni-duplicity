
import { createStructuredSelector } from "@/state/utils";

import { loadError } from "@/services/save-editor/savefile/selectors";


export interface StateProps {
    loadError: Error | null;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    loadError
});
export default mapStateToProps;
