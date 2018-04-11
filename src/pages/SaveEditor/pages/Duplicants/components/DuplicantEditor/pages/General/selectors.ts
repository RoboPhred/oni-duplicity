
import { GameObject } from "oni-save-parser";

import { createStructuredSelector } from "../../../../../../../../state/utils";

import { makeGetDuplicantByKey } from "../../../../../../../../services/save-editor/selectors";

import Props from "./props";

export interface StateProps {
    duplicant: GameObject | null;
}

const mapStateToProps = createStructuredSelector<Props, StateProps>({
    duplicant: makeGetDuplicantByKey<Props>("duplicantKey")
});
export default mapStateToProps;
