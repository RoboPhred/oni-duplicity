
import { GameObject } from "oni-save-parser";

import { createStructuredSelector } from "../../../../../../state/utils";

import { duplicantKeys } from "../../../../../../services/save-editor/selectors";

export interface StateProps {
    duplicantKeys: string[];
}

const mapStateToProps = createStructuredSelector<StateProps>({
    duplicantKeys
});
export default mapStateToProps;
