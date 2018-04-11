
import { GameObject } from "oni-save-parser";

import { createStructuredSelector } from "../../../../../../state/utils";

import { makeGetDuplicantByKey } from "../../../../../../services/save-editor/selectors";

import Props from "./props";

export interface StateProps {
    duplicant: GameObject | null;
}

const mapStateToProps = (state: any, props: Props) => createStructuredSelector<StateProps>({
    duplicant: makeGetDuplicantByKey(props.duplicantKey)
});
export default mapStateToProps;
