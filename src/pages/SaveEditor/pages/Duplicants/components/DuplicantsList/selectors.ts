
import { GameObject } from "oni-save-parser";

import { createStructuredSelector } from "../../../../../../state/utils";

import { duplicantsIDs } from "../../../../../../services/save-editor/duplicants/selectors";

export interface StateProps {
    duplicantsIDs: number[];
}

const mapStateToProps = createStructuredSelector<StateProps>({
    duplicantsIDs
});
export default mapStateToProps;
