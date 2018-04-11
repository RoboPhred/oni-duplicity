
import { createStructuredSelector } from "../../state/utils";

import {
    loadError
} from "../../services/save-editor/selectors";


export interface StateProps {
    loadError: Error | null;
}

const mapStateToProps = createStructuredSelector<StateProps>({
    loadError
});
export default mapStateToProps;
