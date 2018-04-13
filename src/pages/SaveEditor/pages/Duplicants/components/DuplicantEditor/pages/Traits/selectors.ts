
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { makeGetDuplicantTraitsByID } from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    traits: string[];
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    traits: makeGetDuplicantTraitsByID<Props>("duplicantID")
});
export default mapStateToProps;
