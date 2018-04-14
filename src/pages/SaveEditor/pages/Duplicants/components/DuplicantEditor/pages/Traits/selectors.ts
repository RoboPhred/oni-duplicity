
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { makeGetDuplicantTraits } from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    traits: string[];
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    traits: makeGetDuplicantTraits<Props>("duplicantID")
});
export default mapStateToProps;
